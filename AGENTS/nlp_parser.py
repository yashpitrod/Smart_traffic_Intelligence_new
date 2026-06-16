import os
import json
import logging
import requests
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class NLPIncidentParser:
    """
    Agent 1: NLP Description Parser.
    Extracts structured fields from free-text descriptions (in any language like English,
    Kannada, or mixed) and maps them to our traffic dataset vocabulary.
    Supports Google Gemini (default/preferred) and regex heuristics fallback.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        # Look for Google Gemini key (supporting both GEMINI_API_KEY and GOOGLE_API_KEY)
        self.gemini_key = api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        
        if self.gemini_key:
            logger.info("Using Google Gemini API for structured NLP extraction.")
        else:
            logger.warning("No API key found for Gemini. Using heuristic fallback.")

    def _get_system_prompt(self) -> str:
        return """You are a structured extraction agent for Bengaluru traffic incidents.
Your task is to analyze free-text traffic descriptions (which could be in Kannada, English, mixed/Kannada-English code-mixed, or transliterated Kannada) and extract structural fields mapping to our dataset's vocabulary.

Allowed values for 'root_cause':
- "vehicle_breakdown"
- "accident"
- "road_maintenance"
- "water_logging"
- "tree_fall"
- "protest"
- "traffic_congestion"
- "vip_movement"
- "unplanned_utility_work"
- "general_delay"

Allowed values for 'vehicle_type':
- "bmtc_bus"
- "car"
- "two_wheeler"
- "auto_rickshaw"
- "hgv" (heavy goods vehicle like trucks/lorries)
- "lcv" (light commercial vehicle like tempos)
- "ambulance"
- null (when no specific vehicle type is involved or mentioned)

Allowed values for 'severity':
- 1 (low)
- 2 (medium)
- 3 (high)

Allowed values for 'action_needed':
- true
- false

'normalized_summary': A short, concise one-sentence summary of the incident in English.

You MUST respond with a valid JSON object ONLY. Do not include any markdown formatting like ```json or ```, no preamble, and no explanation. Return just raw JSON.
If you cannot parse the incident or if the text is completely irrelevant to traffic, return the JSON value: null.
"""

    def parse_with_heuristics(self, description: str) -> Dict[str, Any]:
        """
        Regex and keyword-based heuristic fallback if the LLM cannot be reached.
        Supports common English and Kannada keywords.
        """
        desc_lower = description.lower()
        
        # Determine root cause
        root_cause = "general_delay"
        if any(w in desc_lower for w in ["accident", "accidents", "collision", "hit", "ಅಪಘಾತ", "ಡಿಕ್ಕಿ"]):
            root_cause = "accident"
        elif any(w in desc_lower for w in ["breakdown", "break down", "puncture", "repair", "ಕೆಟ್ಟು", "ಕೆಲಸ", "ಪಂಚರ್"]):
            root_cause = "vehicle_breakdown"
        elif any(w in desc_lower for w in ["water", "rain", "flood", "clog", "puddle", "ನೀರು", "ಮಳೆ"]):
            root_cause = "water_logging"
        elif any(w in desc_lower for w in ["tree", "branch", "fall", "ಬಿದ್ದಿದೆ", "ಮರ"]):
            root_cause = "tree_fall"
        elif any(w in desc_lower for w in ["protest", "strike", "rally", "dharna", "procession", "ಪ್ರತಿಭಟನೆ", "ಮುಷ್ಕರ"]):
            root_cause = "protest"
        elif any(w in desc_lower for w in ["vip", "minister", "convoy", "ವಿಐಪಿ"]):
            root_cause = "vip_movement"
        elif any(w in desc_lower for w in ["work", "digging", "roadwork", "utility", "ಮೆಟ್ರೋ", "ರಸ್ತೆ ಕೆಲಸ"]):
            root_cause = "road_maintenance"

        # Determine vehicle type
        vehicle_type = None
        if any(w in desc_lower for w in ["bus", "bmtc", "ಬಸ್"]):
            vehicle_type = "bmtc_bus"
        elif any(w in desc_lower for w in ["car", "cab", "taxi", "ಕಾರು"]):
            vehicle_type = "car"
        elif any(w in desc_lower for w in ["bike", "scooter", "two wheeler", "cycle", "ಬೈಕ್", "ದ್ವಿಚಕ್ರ"]):
            vehicle_type = "two_wheeler"
        elif any(w in desc_lower for w in ["auto", "rickshaw", "ಆಟೋ"]):
            vehicle_type = "auto_rickshaw"
        elif any(w in desc_lower for w in ["truck", "lorry", "hgv", "container", "ಲಾರಿ"]):
            vehicle_type = "hgv"
        elif any(w in desc_lower for w in ["tempo", "lcv", "van"]):
            vehicle_type = "lcv"
        elif any(w in desc_lower for w in ["ambulance", "hospital", "ಆಂಬ್ಯುಲೆನ್ಸ್"]):
            vehicle_type = "ambulance"

        # Determine severity
        severity = 1
        if any(w in desc_lower for w in ["severe", "critical", "heavy", "deadly", "danger", "ತುಂಬಾ", "ಅಪಾಯ", "ಬಹಳ"]):
            severity = 3
        elif any(w in desc_lower for w in ["medium", "slow", "delay", "ಬ್ಲಾಕ್", "ನಿಧಾನ"]):
            severity = 2

        action_needed = True if root_cause != "general_delay" or severity >= 2 else False

        # Generate English summary
        summary = f"Traffic event ({root_cause.replace('_', ' ')}) reported in Bengaluru."
        if vehicle_type:
            summary = f"Incident involving {vehicle_type.replace('_', ' ')}: {root_cause.replace('_', ' ')}."
            
        return {
            "root_cause": root_cause,
            "vehicle_type": vehicle_type,
            "severity": severity,
            "action_needed": action_needed,
            "normalized_summary": summary
        }

    def _parse_with_gemini(self, description: str) -> Optional[Dict[str, Any]]:
        """
        Internal helper to parse description using Google Gemini REST API.
        """
        # Using gemini-1.5-flash which is standard and fast
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": "ಬಿಎಂಟಿಸಿ ಬಸ್ ಕೆಟ್ಟು ನಿಂತಿದೆ ಸರ್"}]
                },
                {
                    "role": "model",
                    "parts": [{"text": json.dumps({
                        "root_cause": "vehicle_breakdown",
                        "vehicle_type": "bmtc_bus",
                        "severity": 2,
                        "action_needed": True,
                        "normalized_summary": "BMTC bus has broken down at the reported location."
                    })}]
                },
                {
                    "role": "user",
                    "parts": [{"text": description}]
                }
            ],
            "systemInstruction": {
                "parts": [{"text": self._get_system_prompt()}]
            },
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.0
            }
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        response_json = response.json()
        
        text = response_json["candidates"][0]["content"]["parts"][0]["text"].strip()
        
        if text.lower() == "null":
            return None
            
        return json.loads(text)

    def parse_description(self, description: str) -> Optional[Dict[str, Any]]:
        """
        Sends the incident description to Google Gemini for parsing.
        Falls back to heuristics if API key is not configured or an error occurs.
        """
        if not description or not description.strip():
            return None

        # 1. Attempt Google Gemini if API key is available
        if self.gemini_key:
            try:
                return self._parse_with_gemini(description)
            except Exception as e:
                logger.error(f"Gemini parsing failed: {e}. Falling back to heuristics.")

        # 2. Heuristic fallback
        return self.parse_with_heuristics(description)
