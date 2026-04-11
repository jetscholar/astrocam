from flask import Blueprint, jsonify, request
from services.capture_service import create_capture

bp = Blueprint("camera", __name__, url_prefix="/camera")


@bp.route("/capture", methods=["POST"])
def capture():
	try:
		payload = request.get_json(silent=True) or {}
		notes = (payload.get("notes") or "").strip()

		doc = create_capture(notes=notes)

		return jsonify({
			"status": "ok",
			"capture": doc,
		}), 201

	except Exception as e:
		return jsonify({
			"status": "error",
			"error": str(e),
		}), 500