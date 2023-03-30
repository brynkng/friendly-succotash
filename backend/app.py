from flask import Flask, Response, request
from app_config import init_app

app = Flask(__name__)
init_app(app)


@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """
    Handles user login
    Args:
        username: string
        password: string
    """

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return {"success": False, "error": "Username and password are required"}, 401

    if app.config["user_repo"].validate_login(username, password):
        return {"success": True}
    else:
        return {
            "success": False,
            "error": "Username/password combination not found",
        }, 401


@app.before_request
def basic_authentication():
    """Handles CORS preflight response"""
    if request.method.lower() == "options":
        return Response(headers={"Access-Control-Allow-Headers": ["content-type"]})
