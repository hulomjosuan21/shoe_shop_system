import os

from flask import Blueprint, send_from_directory, abort, current_app
from werkzeug.security import safe_join

upload_bp = Blueprint('upload_bp',__name__)

@upload_bp.get('/<folder>/<filename>')
def serve_uploaded_file(folder: str, filename: str):
    folder_path = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)

    if not os.path.isdir(folder_path):
        abort(404)

    file_path = safe_join(folder_path, filename)
    if not file_path or not os.path.isfile(file_path):
        abort(404)

    return send_from_directory(folder_path, filename)