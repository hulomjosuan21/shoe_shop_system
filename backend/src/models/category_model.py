from src.extensions import db
from datetime import datetime, timezone

class Category(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    shoes = db.relationship('ShoeCategory', back_populates='category')

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "category_id": self.category_id,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }