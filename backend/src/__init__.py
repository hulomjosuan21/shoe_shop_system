import os

from flask import Flask, send_from_directory
from flask_cors import CORS

from src.auth.routes import auth_bp
from src.config import Config
from src.extensions import db, migrate, jwt, bcrypt, limiter
from src.models.shoe.routes import shoe_bp
from src.test.route import test_bp
from src.utils.utils import rate_limit_error_handlers

def initialize_app():

    app = Flask(__name__)

    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'assets/')
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)

    @app.get('/assets/images/<filename>')
    def serve_image(filename):
        return send_from_directory(os.path.join(app.root_path, '..', 'assets/images'), filename)

    rate_limit_error_handlers(app)

    with app.app_context():
        from src.models.shoe.models import Shoe,ShoeCategory,Brand,Category
        from src.models.user.model import User
        db.create_all()

    app.register_blueprint(test_bp, url_prefix='/test')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(shoe_bp, url_prefix='/shoe')
    print(app.url_map)

    return app