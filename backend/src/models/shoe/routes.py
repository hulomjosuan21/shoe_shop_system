from flask import Blueprint

from src.models.shoe.models import Brand

shoe_bp = Blueprint('shoe_bp', __name__)

@shoe_bp.post('/new/brand')
def add_brand():
    from flask import request, jsonify
    from src.extensions import db

    data = request.get_json()

    try:
        new_brand = Brand(name=data.get('name'))
        db.session.add(new_brand)
        db.session.commit()
        return jsonify({'message': 'New Brand added successfully', 'new_brand': new_brand.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400