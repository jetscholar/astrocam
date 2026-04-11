from pathlib import Path
from datetime import datetime
from config import Config


def ensure_capture_dirs():
	root = Path(Config.CAPTURE_ROOT)
	stills = root / "stills"
	previews = root / "previews"
	sessions = root / "sessions"

	stills.mkdir(parents=True, exist_ok=True)
	previews.mkdir(parents=True, exist_ok=True)
	sessions.mkdir(parents=True, exist_ok=True)

	return {
		"root": root,
		"stills": stills,
		"previews": previews,
		"sessions": sessions,
	}


def build_still_filename(prefix: str = "capture", ext: str = "jpg") -> str:
	ts = datetime.now().strftime("%Y%m%d_%H%M%S")
	return f"{prefix}_{ts}.{ext}"