import os
import uuid
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename

def ApiResponse(success,message,payload,status):
    return jsonify({
        "success": success,
        "message": message,
        "payload": payload
    }), status

def ApiErrorResponse(e, status):
    if isinstance(e, IntegrityError):
        original_error = getattr(e.orig, 'diag', None)
        if original_error and hasattr(original_error, 'message_detail'):
            return jsonify({'error': original_error.message_detail}), 409

        return jsonify({'error': str(e).split('\n')[0]}), 409

    return jsonify({'error': str(e)}), status

class RemoveFile:
    def __init__(self, file_url, subfolder="files"):
        self.file_url = file_url
        self.subfolder = subfolder
        self.filename = file_url.split(f"/uploads/{subfolder}/")[-1]

        self.file_path = os.path.join(
            current_app.config['UPLOAD_FOLDER'],
            subfolder,
            self.filename
        )

    def remove(self):
        try:
            if os.path.isfile(self.file_path):
                os.remove(self.file_path)
                return True
            return False
        except Exception as e:
            print(f"Error deleting file: {e}")
            return False

class SaveFile:
    def __init__(self, file, subfolder="files"):
        self.filename = secure_filename(file.filename)
        self.unique_filename = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d%H%M%S')}.{self.filename.rsplit('.', 1)[-1]}"

        upload_folder = current_app.config['UPLOAD_FOLDER']
        self.folder_path = os.path.join(upload_folder, subfolder)
        os.makedirs(self.folder_path, exist_ok=True)

        self.file_path = os.path.join(self.folder_path, self.unique_filename)
        base_url = request.host_url.rstrip('/')
        self.file_url = f"uploads/{subfolder}/{self.unique_filename}"
        self.full_url = f"{base_url}/{self.file_url}"

        self._file = file

    def save(self):
        self._file.save(self.file_path)


def rate_limit_error_handlers(app):
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({
            "error": "Rate limit exceeded",
            "message": str(e.description)
        }), 429