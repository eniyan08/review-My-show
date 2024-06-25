from flask import request, jsonify
from functools import wraps
import jwt
from config import Config

def token_required(f):
    print("authorization problem")
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
