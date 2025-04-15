
from src.extensions import db
import enum
from datetime import datetime, timezone

class AuthMethodEnum(enum.Enum):
    EMAIL = "email"
    GOOGLE = "google"

class UserRoleEnum(enum.Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    password_hash = db.Column(db.String(128))
    auth_method = db.Column(db.Enum(AuthMethodEnum, name='auth_method_enum'), nullable=False)
    role = db.Column(db.Enum(UserRoleEnum, name='user_role_enum'), nullable=False, default=UserRoleEnum.CUSTOMER)
    profile_picture = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'auth_method': self.auth_method.value,
            'role': self.role.value,
            'profile_picture': self.profile_picture,
            'created_at': self.created_at
        }