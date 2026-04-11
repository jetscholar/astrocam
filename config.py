import os
from dotenv import load_dotenv

load_dotenv()


class Config:
	SECRET_KEY = os.getenv("SECRET_KEY", "dev-key")
	MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017")
	MONGO_DB = os.getenv("MONGO_DB", "astrocam")
	CAPTURE_ROOT = os.getenv("CAPTURE_ROOT", "captures")
	HOST = os.getenv("HOST", "0.0.0.0")
	PORT = int(os.getenv("PORT", "6942"))