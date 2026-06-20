import os
import logging
import joblib

logger = logging.getLogger(__name__)

class TrafficAnomalyDetector:
    """
    Agent 3: Traffic Anomaly Detection Agent using Isolation Forest.
    
    This agent uses a pre-trained Isolation Forest model and baseline traffic
    metrics to flag anomalies in current active incidents.
    """
    
    def __init__(self, model_path: str = None):
        self.model_path = model_path
        self.model = None
        self.baseline_stats = None
        self.overall_mean_duration = 60.0  # Fallback duration in minutes

    def load(self, filepath: str) -> None:
        """
        Deserializes and loads model state from joblib.
        """
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Anomaly detector model state not found at {filepath}")
        state = joblib.load(filepath)
        self.model = state['model']
        self.baseline_stats = state['baseline_stats']
        self.overall_mean_duration = state.get('overall_mean_duration', 60.0)
        logger.info("[Agent 3 - Anomaly Detector] Model state loaded from %s.", filepath)
