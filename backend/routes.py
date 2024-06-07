from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import jwt
import datetime
from functools import wraps
from config import Config
from bson.objectid import ObjectId
# models
from models import insert_user, find_user_by_username_or_email, check_password

# db
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]
interaction_db = client[Config.INTERACTION_DB_NAME]
# collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']
interactions_collection = interaction_db['interactions']


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            print("Token has expired!")
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            print("Token is invalid!")
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(*args, **kwargs)
    return decorated

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
        return jsonify({'message': 'Username or email already exists'}), 409

    insert_user(username, email, password)
    return jsonify({'message': 'User registered successfully'}), 201

@auth_blueprint.route('/', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')
    print(username_or_email, password)
    if not username_or_email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    user = find_user_by_username_or_email(username_or_email)
    if not user or not check_password(user['password'], password):
        return jsonify({'message': 'Invalid username/email or password'}), 401
    
    token = jwt.encode(
        {'username': user['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        Config.SECRET_KEY,
        algorithm='HS256'
    )
    return jsonify({'token': token, 'username':user['username']}), 200

# 2
tmdb_api_blueprint = Blueprint('tmdb', __name__)
@tmdb_api_blueprint.route('/movies', methods=['GET'])
def get_movies():
    movies = list(movies_collection.find({}, {'_id': 0}))
    return jsonify(movies), 200

@tmdb_api_blueprint.route('/tv_shows', methods=['GET'])
def get_tv_shows():
    tv_shows = list(tv_shows_collection.find({'genre_ids':{"$in": [10751,10766,10767,99,18,37]}}, {'_id': 0}))
    return jsonify(tv_shows), 200

@tmdb_api_blueprint.route('/premiere', methods=['GET'])
def get_premiere():
    premieres = list(premiere_collection.find({}, {'_id': 0}))
    return jsonify(premieres), 200

@tmdb_api_blueprint.route('/top_rated_movies', methods=['GET'])
def get_top_rated_movies():
    top_movies = list(top_rated_movies_collection.find({}, {'_id': 0}))
    return jsonify(top_movies), 200

@tmdb_api_blueprint.route('/movies/genre/<int:genre_id>', methods=['GET'])
def get_movie_by_genre(genre_id):
    movie_by_genre = list(movies_collection.find({'genre_ids':genre_id}, {'_id': 0}))
    return jsonify(movie_by_genre), 200

@tmdb_api_blueprint.route('/tv_shows/genre/<int:genre_id>', methods=['GET'])
def get_tv_show_by_genre(genre_id):
    tv_show_by_genre = list(tv_shows_collection.find({'genre_ids':genre_id}, {'_id': 0}))
    return jsonify(tv_show_by_genre), 200

# 3
info_blueprint = Blueprint('/info', __name__)
@info_blueprint.route('/<int:id>', methods=['GET'])
def get_info(id):
        movie_details = movies_collection.find_one({'id':id}, {'_id': 0})
        tv_show_details = tv_shows_collection.find_one({"id":id}, {'_id': 0})
        if movie_details:
            return jsonify(movie_details), 200
        elif tv_show_details:
            return jsonify(tv_show_details), 200

@info_blueprint.route('/comment/<int:id>', methods=['GET'])
def get_comment(id):
    interaction = interactions_collection.find_one({"movie_id": str(id)}, {'_id':0})
    if interaction:
        comments = interaction.get('comments', [])
        for comment in comments:
            comment['comment_id'] = str(comment['comment_id'])
        return jsonify(comments), 200
    else:
        return jsonify([]), 200

@info_blueprint.route('/comment', methods=['POST'])
@token_required
def post_comment():
    data = request.json
    movie_id = data['movie_id']
    username = data['username']
    text = data['text']

    comment = {
        "comment_id": ObjectId(),
        "user_id": username,
        "text": text,
        "likes": 0,
        "dislikes": 0
    }

    interactions_collection.update_one(
        {"movie_id": movie_id},
        {"$push": {"comments": comment}},
        upsert=True
    )

    return jsonify({"message": "Comment added"}), 201

@info_blueprint.route('/comment/like', methods=['POST'])
@token_required
def like_comment():
    data = request.get_json()
    movie_id = data['movie_id']
    comment_id = data['comment_id']

    interactions_collection.update_one(
        {"movie_id": movie_id, "comments.comment_id": ObjectId(comment_id)},
        {"$inc": {"comments.$.likes": 1}}
    )

    return jsonify({"message": "Comment liked"}), 200

@info_blueprint.route('/comment/dislike', methods=['POST'])
@token_required
def dislike_comment():
    data = request.get_json()
    movie_id = data['movie_id']
    comment_id = data['comment_id']

    interactions_collection.update_one(
        {"movie_id": movie_id, "comments.comment_id": ObjectId(comment_id)},
        {"$inc": {"comments.$.dislikes": 1}}
    )

    return jsonify({"message": "Comment disliked"}), 200