from flask import Blueprint

from flask import request, jsonify
from ..extensions import db
from ..models.user.model import User, AuthMethodEnum, UserRoleEnum

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/create/user')
def create_user():
    data = request.get_json()
    try:
        user = User(
            email=data['email'],
            name=data.get('name'),
            password_hash=data.get('password_hash'),
            auth_method=AuthMethodEnum(data['auth_method']),
            role=UserRoleEnum(data['role']),
            profile_picture=data.get('profile_picture')
        )

        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created successfully', 'user': user.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@auth_bp.get('/users')
def get_users():
    users = User.query.all()
    return jsonify({"users": [u.to_dict() for u in users], "message": "Users fetched successfully"}), 200

@auth_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'auth_method': user.auth_method.value,
        'profile_picture': user.profile_picture,
        'date_created': user.date_created.isoformat()
    })

@auth_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    user.email = data.get('email', user.email)
    user.name = data.get('name', user.name)
    user.password_hash = data.get('password_hash', user.password_hash)
    if 'auth_method' in data:
        user.auth_method = AuthMethodEnum(data['auth_method'])
    user.profile_picture = data.get('profile_picture', user.profile_picture)

    try:
        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
