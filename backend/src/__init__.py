import os

from flask import Flask, send_from_directory, abort
from flask_cors import CORS
from werkzeug.security import safe_join

from src.auth.routes import auth_bp
from src.config import Config
from src.extensions import db, migrate, jwt, bcrypt, limiter
from src.routes.brand_routes import brand_bp
from src.routes.category_routes import category_bp
from src.test.route import test_bp
from src.uploads.routes import upload_bp
from src.utils.utils import rate_limit_error_handlers

def initialize_app():

    app = Flask(__name__)

    upload_base_folder = os.path.join(app.root_path, 'uploads')
    os.makedirs(upload_base_folder, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = upload_base_folder

    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)

    upload_folder = os.path.join(app.root_path, 'uploads')
    os.makedirs(upload_folder, exist_ok=True)
    app.config['UPLOAD_FOLDER'] = upload_folder

    rate_limit_error_handlers(app)

    with app.app_context():
        db.create_all()


    app.register_blueprint(upload_bp, url_prefix="/uploads")
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(brand_bp, url_prefix='/brand')
    app.register_blueprint(category_bp, url_prefix='/category')
    app.register_blueprint(test_bp, url_prefix='/test')
    print(app.url_map)

    return app