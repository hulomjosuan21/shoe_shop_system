from src.extensions import db
from datetime import datetime, timezone

class Brand(db.Model):
    __tablename__ = 'brands'

    brand_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    shoes = db.relationship('Shoe', backref='brand', lazy=True)
    brand_image = db.Column(db.String(300))

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "brand_id": self.brand_id,
            "name": self.name,
            "brand_image": self.brand_image,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }