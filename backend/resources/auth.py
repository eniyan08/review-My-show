from flask import request, jsonify
from flask_restful import Resource
import jwt
import datetime
from config import Config
# models
from models import insert_user, find_user_by_username_or_email, check_password

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return ({'message': 'Missing required fields'}), 400

        if find_user_by_username_or_email(username) or find_user_by_username_or_email(email):
            return ({'message': 'Username or email already exists'}), 409

        insert_user(username, email, password)
        return ({'message': 'User registered successfully'}), 201

class Login(Resource):
    def post(self):
        try:
            print("inside login post api")
            data = request.get_json()
            username_or_email = data.get('username_or_email')
            password = data.get('password')
            if not username_or_email or not password:
                return ({'message': 'Missing required fields'}), 400

            user = find_user_by_username_or_email(username_or_email)
            print("user:", user)
            if not user or not check_password(user['password'], password):
                return ({'message': 'Invalid username/email or password'}), 401
    
            token = jwt.encode(
                {'username': user['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                Config.SECRET_KEY,
                algorithm='HS256'
            )
            return {'token': token, 'username':user['username']}, 200
        except:
            return ({'message': 'Internal server error'}), 500