"""
Smart Traffic Intelligence System — FastAPI Entry Point

Initialises all agents, loads models, and mounts API routes.
Run with:  uvicorn backend.main:app --reload
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.agents.prediction_agent import PredictionAgent
from backend.routes.predict import router as predict_router, init_prediction_agent

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Application
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Smart Traffic Intelligence API",
    description=(
        "Bengaluru traffic incident prediction, anomaly detection, "
        "and action planning."
    ),
    version="0.1.0",
)

# Allow the frontend dev server to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Startup: load agents and models
# ---------------------------------------------------------------------------


@app.on_event("startup")
async def startup_event() -> None:
    """
    Called once when the server starts.

    1. Instantiate agents.
    2. Load serialised models from disk (or placeholder mode).
    3. Inject loaded agents into route modules.
    """
    logger.info("=== Smart Traffic Intelligence — starting up ===")

    # --- Agent 2: Prediction Agent ---
    prediction_agent = PredictionAgent(
        classifier_path="backend/models/priority_classifier.joblib",
        regressor_path="backend/models/duration_regressor.joblib",
        junction_lookup_path="backend/models/junction_recurrence.joblib",
        zone_encoder_path="backend/models/zone_label_encoder.joblib",
    )
    prediction_agent.load_models()
    init_prediction_agent(prediction_agent)

    # TODO: Initialise Agent 1 (NLP Parser), Agent 3 (Anomaly Detector),
    #       and Agent 4 (Action Planner) here following the same pattern.

    logger.info("=== All agents initialised ===")


# ---------------------------------------------------------------------------
# Mount routers
# ---------------------------------------------------------------------------
app.include_router(predict_router, prefix="", tags=["Prediction"])

# TODO: Mount remaining routers:
#   app.include_router(nlp_router, prefix="", tags=["NLP"])
#   app.include_router(anomaly_router, prefix="", tags=["Anomaly"])
#   app.include_router(action_plan_router, prefix="", tags=["Action Plan"])
#   app.include_router(heatmap_router, prefix="", tags=["Heatmap"])
#   app.include_router(incidents_router, prefix="", tags=["Incidents"])
#   app.include_router(analytics_router, prefix="", tags=["Analytics"])
#   app.include_router(feedback_router, prefix="", tags=["Feedback"])
