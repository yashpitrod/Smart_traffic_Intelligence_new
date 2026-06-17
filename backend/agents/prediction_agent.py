import os
import logging
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Constants: Dataset vocabularies used for one-hot / label encoding.
# These MUST stay in sync with the training pipeline so that column order
# matches between training and inference.
# ---------------------------------------------------------------------------

EVENT_CAUSE_CATEGORIES: List[str] = [
    "vehicle_breakdown",
    "tree_fall",
    "accident",
    "water_logging",
    "pot_holes",
    "construction",
    "public_event",
    "procession",
    "vip_movement",
    "protest",
    "congestion",
    "road_conditions",
    "others",
]

VEHICLE_TYPE_CATEGORIES: List[str] = [
    "bmtc_bus",
    "ksrtc_bus",
    "heavy_vehicle",
    "lcv",
    "truck",
    "private_bus",
    "private_car",
    "taxi",
    "auto",
    "others",
]

# Peak-hour windows used for the is_peak_hour derived feature.
PEAK_HOURS: set = {7, 8, 9, 17, 18, 19}

# Corridor encoding: named major road → 2, ORR variants → 1, everything else → 0.
ORR_VARIANTS: set = {
    "ORR East 1", "ORR East 2",
    "ORR North 1", "ORR North 2",
    "ORR West 1",
}


class PredictionAgent:
    """
    Agent 2 — Prediction Agent (two XGBoost models).

    This agent always runs for every incident submission and every map-marker
    click.  It takes a feature vector built from either the user's form
    submission or a stored incident's fields, feeds it into two pre-trained
    XGBoost models, and returns a priority classification plus an estimated
    resolution duration.

    Models
    ------
    1. **Priority Classifier** (XGBoost binary classifier)
       - Trained on all authenticated incidents where ``priority`` is not null.
       - Target: priority encoded as 0 (Low) / 1 (High).
       - Class imbalance handled via ``scale_pos_weight``.
       - Returns predicted class + probability score.

    2. **Duration Regressor** (XGBoost regressor)
       - Trained on ~3,205 authenticated incidents where resolution_minutes
         is computable, positive, and ≤ 1,440 (24 h outlier cap).
       - Target: resolution_minutes (float).
       - Returns estimated minutes until clearance.

    Both models share the same feature vector and are serialised with joblib.
    They are loaded once at FastAPI startup and kept in memory; inference
    takes < 100 ms.

    Current State
    -------------
    This is a **placeholder implementation**.  All public methods return mock
    values that conform to the final API contract.  Search for ``TODO`` to
    find every integration point where real model logic will replace the
    placeholder.
    """

    def __init__(
        self,
        classifier_path: Optional[str] = None,
        regressor_path: Optional[str] = None,
        junction_lookup_path: Optional[str] = None,
        zone_encoder_path: Optional[str] = None,
    ):
        """
        Parameters
        ----------
        classifier_path : str, optional
            Filesystem path to the serialised XGBoost priority classifier
            (joblib). Example: ``backend/models/priority_classifier.joblib``
        regressor_path : str, optional
            Filesystem path to the serialised XGBoost duration regressor
            (joblib). Example: ``backend/models/duration_regressor.joblib``
        junction_lookup_path : str, optional
            Path to a serialised dict mapping junction names → recurrence
            counts. Example: ``backend/models/junction_recurrence.joblib``
        zone_encoder_path : str, optional
            Path to a serialised LabelEncoder for the ``zone`` column.
            Example: ``backend/models/zone_label_encoder.joblib``
        """
        self.classifier_path = classifier_path
        self.regressor_path = regressor_path
        self.junction_lookup_path = junction_lookup_path
        self.zone_encoder_path = zone_encoder_path

        # Model slots — populated by load_models()
        self.classifier = None           # XGBClassifier instance
        self.regressor = None            # XGBRegressor instance
        self.junction_recurrence: Dict[str, int] = {}  # junction → count
        self.zone_encoder = None         # sklearn LabelEncoder

        self._models_loaded: bool = False

    # ------------------------------------------------------------------
    # Model lifecycle
    # ------------------------------------------------------------------

    def load_models(self) -> None:
        """
        Deserialise pre-trained models from disk into memory.

        This method is called once during FastAPI startup
        (``@app.on_event("startup")``).  It must be idempotent — calling it
        twice is harmless.

        TODO (future integration):
        --------------------------
        1. Import joblib.
        2. Load the XGBoost priority classifier from ``self.classifier_path``
           into ``self.classifier``.
        3. Load the XGBoost duration regressor from ``self.regressor_path``
           into ``self.regressor``.
        4. Load the junction recurrence lookup dict from
           ``self.junction_lookup_path`` into ``self.junction_recurrence``.
        5. Load the zone LabelEncoder from ``self.zone_encoder_path``
           into ``self.zone_encoder``.
        6. Set ``self._models_loaded = True``.
        7. Log model metadata (feature count, training date, etc.) at INFO
           level for observability.

        Raises
        ------
        FileNotFoundError
            If any of the required model files do not exist on disk.
        """
        # --- Placeholder: mark as loaded so predict methods can run ---
        logger.warning(
            "PredictionAgent.load_models() — using PLACEHOLDER mode. "
            "No real models loaded.  Replace this with joblib.load() calls."
        )
        self._models_loaded = True

    # ------------------------------------------------------------------
    # Feature engineering
    # ------------------------------------------------------------------

    def build_feature_vector(self, incident: Dict[str, Any]) -> np.ndarray:
        """
        Transform raw incident fields into the numeric feature vector
        expected by both XGBoost models.

        Parameters
        ----------
        incident : dict
            A dictionary containing the raw incident fields.  Expected keys
            (all optional — missing keys are handled with safe defaults):

            - ``event_type``  : str  ("planned" | "unplanned")
            - ``event_cause`` : str  (one of EVENT_CAUSE_CATEGORIES)
            - ``veh_type``    : str | None
            - ``requires_road_closure`` : bool | int
            - ``start_datetime`` : str (ISO 8601) or datetime
            - ``zone``        : str | None
            - ``junction``    : str | None
            - ``corridor``    : str | None
            - ``planned_duration_minutes`` : float | None

        Returns
        -------
        np.ndarray
            1-D float array whose length and column order match the training
            feature matrix exactly.

        Feature vector layout (in order)
        --------------------------------
        0.  event_type            — binary: planned=1, unplanned=0
        1.  corridor_rank         — ordinal: 0 / 1 / 2
        2…14. event_cause one-hot — 13 columns (len of EVENT_CAUSE_CATEGORIES)
        15…24. veh_type one-hot   — 10 columns (len of VEHICLE_TYPE_CATEGORIES)
        25. requires_road_closure — 0 or 1
        26. hour_of_day           — int 0–23
        27. day_of_week           — int 0–6
        28. is_peak_hour          — 0 or 1
        29. is_weekend            — 0 or 1
        30. zone (label-encoded)  — int (unknown → dedicated code)
        31. junction_recurrence   — int (unknown → 1)
        32. planned_duration_minutes — float (0.0 for unplanned)

        TODO (future integration):
        --------------------------
        1. Parse ``start_datetime`` → extract hour_of_day, day_of_week,
           is_peak_hour, is_weekend.
        2. Encode ``event_type`` as binary int.
        3. Compute ``corridor_rank`` from the corridor string using the
           ORR_VARIANTS set and named-corridor list.
        4. One-hot encode ``event_cause`` against EVENT_CAUSE_CATEGORIES.
        5. One-hot encode ``veh_type`` against VEHICLE_TYPE_CATEGORIES.
           If veh_type is None, all columns are 0.
        6. Encode ``requires_road_closure`` as 0/1.
        7. Label-encode ``zone`` using ``self.zone_encoder``.  Use a
           reserved "unknown" code for null / unseen zones.
        8. Look up ``junction`` in ``self.junction_recurrence``.  Default 1
           for unknown / null junctions.
        9. Set ``planned_duration_minutes`` (0 if unplanned or missing).
        10. Concatenate all features into a single np.ndarray and return.
        """
        # --- Placeholder: return a zero vector of the expected length ---
        # Total features: 1 + 1 + 13 + 10 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 33
        feature_length = (
            1                                # event_type
            + 1                              # corridor_rank
            + len(EVENT_CAUSE_CATEGORIES)    # event_cause one-hot (13)
            + len(VEHICLE_TYPE_CATEGORIES)   # veh_type one-hot (10)
            + 1                              # requires_road_closure
            + 1                              # hour_of_day
            + 1                              # day_of_week
            + 1                              # is_peak_hour
            + 1                              # is_weekend
            + 1                              # zone (label-encoded)
            + 1                              # junction_recurrence
            + 1                              # planned_duration_minutes
        )
        logger.debug(
            "build_feature_vector() — returning placeholder zero-vector "
            "of length %d",
            feature_length,
        )
        return np.zeros(feature_length, dtype=np.float64)

    # ------------------------------------------------------------------
    # Individual prediction methods
    # ------------------------------------------------------------------

    def predict_priority(self, features: np.ndarray) -> Dict[str, Any]:
        """
        Run the XGBoost **binary classifier** to predict incident priority.

        Parameters
        ----------
        features : np.ndarray
            The feature vector produced by ``build_feature_vector()``.

        Returns
        -------
        dict
            ``{"priority": "High" | "Low", "confidence": float}``
            where confidence is the classifier's probability score for the
            predicted class (0.0–1.0).

        TODO (future integration):
        --------------------------
        1. Reshape ``features`` to ``(1, -1)`` for single-sample prediction.
        2. Call ``self.classifier.predict_proba(X)`` to get class
           probabilities.
        3. Determine predicted class from argmax of probabilities.
        4. Map class index back to label: 0 → "Low", 1 → "High".
        5. Set confidence = probability of the predicted class.
        6. Return ``{"priority": label, "confidence": confidence}``.
        """
        # --- Placeholder: return mock High priority with 78% confidence ---
        logger.debug("predict_priority() — returning placeholder mock values.")
        return {
            "priority": "High",
            "confidence": 0.78,
        }

    def predict_duration(self, features: np.ndarray) -> int:
        """
        Run the XGBoost **regressor** to predict resolution duration.

        Parameters
        ----------
        features : np.ndarray
            The feature vector produced by ``build_feature_vector()``.

        Returns
        -------
        int
            Estimated resolution time in minutes, rounded to the nearest
            whole number.  Always ≥ 1.

        TODO (future integration):
        --------------------------
        1. Reshape ``features`` to ``(1, -1)`` for single-sample prediction.
        2. Call ``self.regressor.predict(X)`` to get raw float prediction.
        3. Clamp result to ``max(1, round(prediction))``.
        4. Return the integer.
        """
        # --- Placeholder: return a mock 45-minute estimate ---
        logger.debug("predict_duration() — returning placeholder mock value.")
        return 45

    # ------------------------------------------------------------------
    # Orchestration
    # ------------------------------------------------------------------

    def predict_incident(self, incident: Dict[str, Any]) -> Dict[str, Any]:
        """
        End-to-end prediction pipeline for a single incident.

        This is the method called by the ``POST /predict`` route.  It
        orchestrates the full Agent 2 flow exactly as described in
        Architecture.md:

        1. Build the feature vector from raw incident fields.
        2. Run the priority classifier → priority label + confidence.
        3. Run the duration regressor → estimated minutes.
        4. Compute the estimated resolution timestamp
           (``current_time + estimated_duration_minutes``).
        5. Assemble and return the final API response.

        Parameters
        ----------
        incident : dict
            Raw incident data from the request body.  See
            ``build_feature_vector()`` for expected keys.

        Returns
        -------
        dict
            {
                "priority": "High" | "Low",
                "confidence": float,
                "estimated_duration_minutes": int,
                "estimated_resolution_time": str   # ISO 8601
            }

        Raises
        ------
        RuntimeError
            If ``load_models()`` has not been called yet.
        """
        if not self._models_loaded:
            raise RuntimeError(
                "PredictionAgent models are not loaded. "
                "Call load_models() during application startup."
            )

        # Step 1 — Feature engineering
        features = self.build_feature_vector(incident)

        # Step 2 — Priority classification (XGBoost classifier)
        priority_result = self.predict_priority(features)

        # Step 3 — Duration regression (XGBoost regressor)
        estimated_minutes = self.predict_duration(features)

        # Step 4 — Compute estimated resolution timestamp
        now = datetime.now()
        estimated_resolution_time = now + timedelta(minutes=estimated_minutes)

        # Step 5 — Assemble final response matching the API contract
        return {
            "priority": priority_result["priority"],
            "confidence": round(priority_result["confidence"], 4),
            "estimated_duration_minutes": estimated_minutes,
            "estimated_resolution_time": estimated_resolution_time.isoformat(),
        }
