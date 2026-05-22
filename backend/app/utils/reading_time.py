def estimate_read_time(text: str) -> int:
    words = len(text.split())
    minutes = max(1, round(words / 200))
    return minutes
