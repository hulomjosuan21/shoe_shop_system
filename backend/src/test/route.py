from flask import Blueprint, request
import json

test_bp = Blueprint('test_bp', __name__)

@test_bp.post('/')
# @limiter.limit("2 per minute")
def test():
    raw_data = request.get_data()

    try:
        json_data = request.get_json(
            force=True)
        return {"received_json": json_data}, 200
    except json.JSONDecodeError:
        return {"error": "Invalid JSON", "received_data": raw_data.decode('utf-8')}, 400
    except Exception as e:
        return {"error": str(e)}, 500