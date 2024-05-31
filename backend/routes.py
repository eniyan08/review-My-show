from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import bcrypt
from config import Config
from bson.objectid import ObjectId
# models
from models import insert_user, find_user_by_username_or_email, check_password

# db
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]
# collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']

# routes
# 1
auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if find_user_by_username_or_email(username) or find_user_by_username_or_email(email):
        return jsonify({'message': 'User already exists'}), 409

    insert_user(username, email, password)
    return jsonify({'message': 'User registered successfully'}), 201

@auth_blueprint.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    user = find_user_by_username_or_email(username_or_email)
    if not user or not check_password(user['password'], password):
        return jsonify({'message': 'Invalid username/email or password'}), 401

    return jsonify({'message': 'Login successful'}), 200

# 2
tmdb_api_blueprint = Blueprint('api', __name__)
@tmdb_api_blueprint.route('/movies', methods=['GET'])
def get_movies():
    # fetch_and_store()
    movies = list(movies_collection.find({}, {'_id': 0}))
    print(jsonify(movies))
    return jsonify(movies)

@tmdb_api_blueprint.route('/tv_shows', methods=['GET'])
def get_tv_shows():
    tv_shows = list(tv_shows_collection.find({}, {'_id': 0}))
    return jsonify(tv_shows)

@tmdb_api_blueprint.route('/premiere', methods=['GET'])
def get_premiere():
    premieres = list(premiere_collection.find({}, {'_id': 0}))
    return jsonify(premieres)

@tmdb_api_blueprint.route('/top_rated_movies', methods=['GET'])
def get_top_rated_movies():
    top_movies = list(top_rated_movies_collection.find({}, {'_id': 0}))
    return jsonify(top_movies)

@tmdb_api_blueprint.route('/movies/genre/<int:genre_id>', methods=['GET'])
def get_movie_by_genre(genre_id):
    movie_by_genre = list(movies_collection.find({'genre_ids':genre_id}, {'_id': 0}))
    return jsonify(movie_by_genre)

@tmdb_api_blueprint.route('/tv_shows/genre/<int:genre_id>', methods=['GET'])
def get_tv_show_by_genre(genre_id):
    tv_show_by_genre = list(tv_shows_collection.find({'genre_ids':genre_id}, {'_id': 0}))
    return jsonify(tv_show_by_genre)

# 3
info_blueprint = Blueprint('/info', __name__)
@info_blueprint.route('/<int:id>', methods=['GET'])
def get_info(id):
        movie_details = list(movies_collection.find({'id':id}, {'_id': 0}))
        print("data:",jsonify(movie_details))
        return jsonify(movie_details)

    