from flask import Blueprint, request
from flask import jsonify

from src.extensions import db
from src.models.shoe.models import Brand
from src.utils.utils import save_file

shoe_bp = Blueprint('shoe_bp', __name__)

@shoe_bp.get('all/brand')
def get_all_brand():
    name = request.args.get('name')
    sort_by = request.args.get('sort_by', 'id')  # Default to 'id'
    order = request.args.get('order', 'asc')  # Default to 'asc'

    query = Brand.query

    if name:
        query = query.filter(Brand.name.ilike(f"%{name}%"))

    if order == 'desc':
        query = query.order_by(getattr(Brand, sort_by).desc())
    else:
        query = query.order_by(getattr(Brand, sort_by).asc())

    brands = query.all()
    return jsonify({'message': 'New Brand added successfully',"brands": [b.to_dict() for b in brands]}), 201


@shoe_bp.post('/new/brand')
def add_brand():
    try:
        brand_name = request.form.get('name')
        brand_image = request.files.get('brand_image')

        if not brand_name:
            return jsonify({'error': 'Brand name is required'}), 400

        if not brand_image:
            return jsonify({'error': 'No image file provided'}), 400

        new_brand = Brand(name=brand_name)
        db.session.add(new_brand)
        db.session.flush()

        filename = save_file(brand_image)
        image_url = request.host_url.rstrip("/") + f"/assets/images/{filename}"

        new_brand.brand_image = image_url
        db.session.commit()

        return jsonify({
            'message': 'New Brand added successfully',
            "brand": new_brand.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'error': str(e)}), 400

@shoe_bp.post('/new/category')
def add_category():
    ...
