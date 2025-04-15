from flask import Flask

from src.auth.routes import auth_bp
from src.config import Config
from src.extensions import db, migrate, jwt, bcrypt
from src.models.shoe.routes import shoe_bp

def initialize_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        from src.models.shoe.models import Shoe,ShoeCategory,Brand,Category
        from src.models.user.model import User
        db.create_all()

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(shoe_bp, url_prefix='/shoe')
    # print(app.url_map)

    return app