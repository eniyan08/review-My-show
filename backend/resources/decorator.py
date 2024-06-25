from flask import request, jsonify
from functools import wraps
import jwt
from config import Config

def token_required(f):
    """
    A decorator to protect routes that require authentication via a JWT token.

    This decorator checks for a JWT token in the 'Authorization' header of the
    incoming request. If the token is missing, expired, or invalid, it returns
    an appropriate error message and status code.

    Usage example:
        @app.route('/comment')
        @token_required
        def post_comment():
            return {'message': 'Comment has been posted'}

    Args:
        f (function): The route function to be decorated.

    Returns:
        function: The decorated function with token validation.
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Token is missing!'}, 401
        try:
            token = token.split(" ")[1]
            jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
           
        except jwt.ExpiredSignatureError:
            return {'message': 'Token has expired!'}, 401
        except jwt.InvalidTokenError:
            return {'message': 'Token is invalid!'}, 401
        return f(*args, **kwargs)
    return decorated
