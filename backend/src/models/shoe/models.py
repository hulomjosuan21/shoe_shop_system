from flask import request

from src.extensions import db
from datetime import datetime,timezone

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

class Category(db.Model):
    __tablename__ = 'categories'

    category_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    shoes = db.relationship('ShoeCategory', back_populates='category')

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))


class Shoe(db.Model):
    __tablename__ = 'shoes'

    shoe_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.brand_id', ondelete='SET NULL'), nullable=True)

    categories = db.relationship('ShoeCategory', back_populates='shoe')
    # order_items = db.relationship('OrderItem', backref='shoe', lazy=True)

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))


class ShoeCategory(db.Model):
    __tablename__ = 'shoe_categories'

    shoe_id = db.Column(db.Integer, db.ForeignKey('shoes.shoe_id', ondelete='CASCADE'), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id', ondelete='CASCADE'), primary_key=True)

    shoe = db.relationship('Shoe', back_populates='categories')
    category = db.relationship('Category', back_populates='shoes')

    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
