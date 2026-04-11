from pathlib import Path


def capture_still(output_path: str) -> dict:
	"""
	Temporary stub.
	Writes a placeholder file so the backend flow can be tested
	before real Pi camera hardware is added.
	"""
	path = Path(output_path)
	path.write_bytes(b"ASTROCAM_PLACEHOLDER_IMAGE")

	return {
		"success": True,
		"width": None,
		"height": None,
		"exposure_ms": None,
		"gain": None,
	}