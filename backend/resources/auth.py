from flask import request, jsonify
from flask_restful import Resource
import jwt
import datetime
from config import Config
# models
from models import insert_user, find_user_by_username_or_email, check_password

class SignUp(Resource):
    """
    Resource for user sign-up.
    
    Methods:
    post: Handles user registration.
    """

    def post(self):
        """
        Handles HTTP POST requests to register a new user.
        
        Request body should contain:
        - username (str): The username of the new user.
        - email (str): The email of the new user.
        - password (str): The password for the new user.
        
        Returns:
        - 201: User registered successfully.
        - 400: Missing required fields.
        - 409: Username or email already exists.
        """

        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return {'message': 'Missing required fields'}, 400

        if find_user_by_username_or_email(username) or find_user_by_username_or_email(email):
            return {'message': 'Username or email already exists'}, 409

        insert_user(username, email, password)
        return {'message': 'User registered successfully'}, 201

class Login(Resource):
    """
    Resource for user Login

    Methods:
    post: Handles user authentication and token generation
    """
    def post(self):
        """
        Handles HTTP POST requests to authenticate a user and return a JWT token.
        
        Request body should contain:
        - username_or_email (str): The username or email of the user.
        - password (str): The password of the user.
        
        Returns:
        - 200: Successful authentication, returns JWT token and username.
        - 400: Missing required fields.
        - 401: Invalid username/email or password.
        - 500: Internal server error.
        """
        try:
            data = request.get_json()
            username_or_email = data.get('username_or_email')
            password = data.get('password')
            if not username_or_email or not password:
                return {'message': 'Missing required fields'}, 400

            user = find_user_by_username_or_email(username_or_email)
            if not user or not check_password(user['password'], password):
                return {'message': 'Invalid username/email or password'}, 401
    
            token = jwt.encode(
                {'username': user['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hour=1)},
                Config.SECRET_KEY,
                algorithm='HS256'
            )
            return {'token': token, 'username':user['username']}, 200
        except Exception as e:
            print(f"Error: {e}")
            return {'message': 'Internal server error'}, 500