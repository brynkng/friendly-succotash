import os
from flask_cors import CORS
from local_user_repo import LocalUserRepository


def init_app(app):
    # Initialize CORS config
    CORS(app)

    # Initialize user repository
    if os.environ.get("ENV") == "PROD":
        # Implement prod repo
        pass
    else:
        user_repo = LocalUserRepository()

    app.config["user_repo"] = user_repo
