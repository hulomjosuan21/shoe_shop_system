from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from langchain_ollama.llms import OllamaLLM

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["1000 per hour", "5000 per day"],
    headers_enabled=True
)
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()

model = OllamaLLM(model="llama3.2")

