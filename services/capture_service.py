from datetime import datetime
from database.connection import get_db
from services.camera_service import capture_still
from services.storage_service import ensure_capture_dirs, build_still_filename


def create_capture(notes: str | None = None) -> dict:
	dirs = ensure_capture_dirs()
	filename = build_still_filename(prefix="astrocam", ext="jpg")
	filepath = dirs["stills"] / filename

	camera_result = capture_still(str(filepath))
	if not camera_result.get("success"):
		raise RuntimeError("Camera capture failed")

	doc = {
		"filename": filename,
		"filepath": str(filepath),
		"type": "image",
		"captured_at": datetime.utcnow(),
		"notes": notes or "",
		"exposure_ms": camera_result.get("exposure_ms"),
		"gain": camera_result.get("gain"),
		"width": camera_result.get("width"),
		"height": camera_result.get("height"),
		"status": "saved",
	}

	db = get_db()
	result = db.get_collection("captures").insert_one(doc)

	doc["_id"] = str(result.inserted_id)
	doc["captured_at"] = doc["captured_at"].isoformat() + "Z"
	return doc