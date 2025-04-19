import os
import uuid
from datetime import datetime

from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename

def delete_file(file_url, subfolder="files"):
    filename = file_url.split(f"/uploads/{subfolder}/")[-1]

    if not filename:
        return False

    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], subfolder, filename)

    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
            return True
        else:
            return False
    except Exception as e:
        print(f"Error deleting file: {e}")
        return False

def save_file(file, subfolder="files"):
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{filename.rsplit('.', 1)[-1]}"

    upload_folder = current_app.config['UPLOAD_FOLDER']
    folder_path = os.path.join(upload_folder, subfolder)

    os.makedirs(folder_path, exist_ok=True)

    file_path = os.path.join(folder_path, unique_filename)
    file.save(file_path)

    base_url = request.host_url
    file_url = f"uploads/{subfolder}/{unique_filename}"
    full_url = f"{base_url}{file_url}"

    return {"full_url": full_url, "file_url": file_url}

def rate_limit_error_handlers(app):
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({
            "error": "Rate limit exceeded",
            "message": str(e.description)
        }), 429