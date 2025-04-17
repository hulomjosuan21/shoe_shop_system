from typing import List, Dict, Any, Optional, Type, Union
import datetime

from flask import request, jsonify
from werkzeug.utils import secure_filename
import os
import random
import string
from datetime import datetime, date

ASSETS_DIR = os.path.join(os.getcwd(), 'assets')
IMAGE_DIR = os.path.join(ASSETS_DIR, 'images')
OTHER_DIR = os.path.join(ASSETS_DIR, 'others')

os.makedirs(IMAGE_DIR, exist_ok=True)
os.makedirs(OTHER_DIR, exist_ok=True)

def generate_random_string(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def save_file(file):
    original_filename = secure_filename(file.filename)
    file_type = file.content_type
    print(f"File type: {file_type}")

    file_ext = os.path.splitext(original_filename)[1]

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")
    random_str = generate_random_string()
    new_filename = f"{timestamp}_{random_str}{file_ext}"

    if file_type.startswith('image/'):
        save_path = os.path.join(IMAGE_DIR, new_filename)
        category = 'image'
    else:
        save_path = os.path.join(OTHER_DIR, new_filename)
        category = 'other'

    file.save(save_path)

    return new_filename

def rate_limit_error_handlers(app):
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({
            "error": "Rate limit exceeded",
            "message": str(e.description)
        }), 429