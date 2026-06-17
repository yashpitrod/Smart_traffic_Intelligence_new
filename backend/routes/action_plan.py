"""
Route: GET /action-plan  (Server-Sent Events)

Agent 4 — Action Planner.

Accepts the full incident + prediction context as query parameters,
calls the ActionPlannerAgent which streams each text chunk back to
the frontend as an SSE event.
"""

import logging
from typing import Optional

from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse

from backend.agents.action_planner import ActionPlannerAgent

logger = logging.getLogger(__name__)

router = APIRouter()

# ---------------------------------------------------------------------------
# Singleton agent instance — initialised by main.py at startup
# ---------------------------------------------------------------------------
_agent: Optional[ActionPlannerAgent] = None

def init_action_planner(agent: ActionPlannerAgent) -> None:
    """
    Inject the loaded ActionPlannerAgent singleton into this route module.
    """
    global _agent
    _agent = agent
    logger.info("Action plan route initialised with ActionPlannerAgent instance.")

# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------

@router.get(
    "/action-plan",
    summary="Stream an LLM action plan as Server-Sent Events",
    tags=["Action Plan"],
)
async def get_action_plan(
    request: Request,
    event_type: Optional[str] = None,
    event_cause: Optional[str] = None,
    address: Optional[str] = None,
    junction: Optional[str] = None,
    corridor: Optional[str] = None,
    police_station: Optional[str] = None,
    zone: Optional[str] = None,
    priority: Optional[str] = None,
    confidence: Optional[str] = None,
    estimated_duration_minutes: Optional[str] = None,
    requires_road_closure: Optional[str] = None,
    nlp_cause: Optional[str] = None,
    nlp_summary: Optional[str] = None,
    is_zone_alert: Optional[str] = None,
) -> StreamingResponse:
    """
    Streams the Agent 4 action plan token-by-token as SSE.
    """
    if _agent is None:
        raise HTTPException(
            status_code=503,
            detail="Action planner agent is not initialised.",
        )

    params = {
        "event_type": event_type or "unplanned",
        "event_cause": event_cause or "unknown",
        "address": address or "Unknown location",
        "junction": junction or "Unknown junction",
        "corridor": corridor or "Non-corridor",
        "police_station": police_station or "Local station",
        "zone": zone or "Unknown zone",
        "priority": priority or "High",
        "confidence": confidence or "0",
        "estimated_duration_minutes": estimated_duration_minutes or "60",
        "requires_road_closure": requires_road_closure or "false",
        "nlp_cause": nlp_cause or "",
        "nlp_summary": nlp_summary or "",
        "is_zone_alert": is_zone_alert or "false",
    }

    return StreamingResponse(
        _agent.stream_plan(params),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )

