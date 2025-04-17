from flask import Blueprint, request
from flask import jsonify

from src.extensions import db
from src.models.shoe.models import Brand
from src.utils.utils import save_file

shoe_bp = Blueprint('shoe_bp', __name__)

@shoe_bp.get('all/brand')
def get_all_brand():
    brands = Brand.query.all()
    return jsonify({'message': 'New Brand added successfully',"brands": [b.to_dict() for b in brands]}), 201


@shoe_bp.post('/new/brand')
def add_brand():
    try:
        brand_name = request.form.get('name')
        brand_image = request.files.get('brand_image')

        if not brand_name:
            return jsonify({'error': 'Brand name is required'}), 400

        if brand_image:
            filename = save_file(brand_image)
        else:
            return jsonify({'error': 'No image file provided'}), 400

        value = request.host_url.rstrip("/") + f"/assets/images/{filename}"

        new_brand = Brand(name=brand_name, brand_image=value)
        db.session.add(new_brand)
        db.session.commit()

        return jsonify({
            'message': 'New Brand added successfully',
            "brand": new_brand.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@shoe_bp.post('/new/category')
def add_category():
    ...
