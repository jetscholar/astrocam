from flask import Flask
from config import Config
from routes.main_routes import bp as main_bp
from routes.camera_routes import bp as camera_bp


def create_app():
	app = Flask(__name__)
	app.config.from_object(Config)

	app.register_blueprint(main_bp)
	app.register_blueprint(camera_bp)

	return app


app = create_app()


if __name__ == "__main__":
	app.run(
		host=Config.HOST,
		port=Config.PORT,
		debug=True,
	)