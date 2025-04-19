from flask import request, Blueprint, jsonify

from src.models.category_model import Category
from src.extensions import db

category_bp = Blueprint('category_bp',__name__)

@category_bp.get('/all')
def get_all_categories():
    name = request.args.get('name')
    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')

    query = Category.query

    if name:
        query = query.filter(Category.name.ilike(f"%{name}%"))

    if order == 'desc':
        query = query.order_by(getattr(Category, sort_by).desc())
    else:
        query = query.order_by(getattr(Category, sort_by).asc())

    categories = query.all()
    return jsonify({'message': 'New Brand added successfully', "value": [c.to_dict() for c in categories]}), 201

@category_bp.post('/new')
def add_category():
    data = request.get_json()
    try:
        if not isinstance(data, list):
            return jsonify({'error': 'Expected a list of categories'}), 400

        created_categories = []

        for item in data:
            name = item.get('name')

            if not name:
                continue

            existing = Category.query.filter_by(name=name).first()
            if existing:
                continue

            category = Category(name=name)
            db.session.add(category)
            created_categories.append(name)

        db.session.commit()

        return jsonify({
            'message': 'New Brand added successfully',
            'value': []
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400