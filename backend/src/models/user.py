from ..extensions import db
import enum
from datetime import datetime, timezone

class AuthMethodEnum(enum.Enum):
    EMAIL = "email"
    GOOGLE = "google"

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    password_hash = db.Column(db.String(128))
    auth_method = db.Column(db.Enum(AuthMethodEnum, name='auth_method_enum'), nullable=False)
    profile_picture = db.Column(db.String(300))
    date_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))