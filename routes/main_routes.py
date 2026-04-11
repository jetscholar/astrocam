from flask import Blueprint, render_template, jsonify
from database.connection import get_db

bp = Blueprint("main", __name__)


@bp.route("/")
def dashboard():
	db = get_db()
	recent_captures = list(
		db.get_collection("captures")
		.find({})
		.sort("captured_at", -1)
		.limit(10)
	)

	for item in recent_captures:
		item["_id"] = str(item["_id"])
		if item.get("captured_at"):
			item["captured_at"] = item["captured_at"].isoformat() + "Z"

	return render_template("dashboard.html", recent_captures=recent_captures)


@bp.route("/health")
def health():
	try:
		db = get_db()
		db.command("ping")

		return jsonify({
			"status": "ok",
			"mongo": "connected"
		})

	except Exception as e:
		return jsonify({
			"status": "error",
			"mongo": "disconnected",
			"error": str(e)
		}), 500