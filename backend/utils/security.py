"""
backend/utils/security.py

Shared security / sanitisation helpers used across agent and route modules.
"""

from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode


def sanitize_url(url: str) -> str:
    """
    Redact the 'key' query parameter from a URL to prevent API-key leaks
    in log output or error messages.

    Returns the sanitised URL string, or '[REDACTED_URL]' if parsing fails.
    """
    try:
        parsed = urlparse(url)
        queries = parse_qsl(parsed.query)
        redacted = [(k, "[REDACTED]" if k == "key" else v) for k, v in queries]
        new_query = urlencode(redacted)
        return urlunparse(parsed._replace(query=new_query))
    except Exception:
        return "[REDACTED_URL]"
