from flask import request, jsonify, Blueprint

from src.models.brand_model import Brand
from src.extensions import db
from src.utils.utils import save_file, delete_file

brand_bp = Blueprint('brand_bp', __name__)

@brand_bp.get('/all')
def get_all_brand():
    name = request.args.get('name')
    sort_by = request.args.get('sort_by', 'brand_id')
    order = request.args.get('order', 'asc')

    query = Brand.query

    if name:
        query = query.filter(Brand.name.ilike(f"%{name}%"))

    if order == 'desc':
        query = query.order_by(getattr(Brand, sort_by).desc())
    else:
        query = query.order_by(getattr(Brand, sort_by).asc())

    brands = query.all()
    return jsonify({'message': 'All brand fetched successfully',"value": [b.to_dict() for b in brands]}), 201


@brand_bp.post('/new')
def add_brand():
    try:
        brand_name = request.form.get('name')
        brand_image = request.files.get('brand_image')

        if not brand_name:
            return jsonify({'error': 'Brand name is required'}), 400

        if not brand_image:
            return jsonify({'error': 'No image file provided'}), 400

        res = save_file(brand_image, subfolder="images")

        new_brand = Brand(name=brand_name, brand_image=res["full_url"])
        db.session.add(new_brand)
        db.session.flush()

        db.session.commit()

        return jsonify({
            'message': 'New Brand added successfully',
            "value": new_brand.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@brand_bp.delete('/delete')
def delete_brand():
    try:
        data = request.get_json()
        brand_id = data.get('brand_id')

        if not brand_id:
            return jsonify({'error': 'Brand ID is required'}), 400

        brand = Brand.query.get_or_404(brand_id)

        if brand.brand_image:
            success = delete_file(brand.brand_image, subfolder="images")
            if not success:
                return jsonify({'error': 'Failed to delete the image file'}), 500

        db.session.delete(brand)
        db.session.flush()
        db.session.commit()

        return jsonify({'message': 'Brand deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
