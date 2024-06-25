from flask import request, jsonify
from flask_restful import Resource
from pymongo import MongoClient
from config import Config
from bson.objectid import ObjectId
from resources.decorator import token_required
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

class Info(Resource):
    def get(self, id):
        movie_details = movies_collection.find_one({'id':id}, {'_id': 0})
        tv_show_details = tv_shows_collection.find_one({"id":id}, {'_id': 0})
        if movie_details:
            return (movie_details), 200
        elif tv_show_details:
            return (tv_show_details), 200

class Get_Comment(Resource):
    def get(self, id):
        interaction = interactions_collection.find_one({"movie_id": str(id)}, {'_id':0})
        if interaction:
            comments = interaction.get('comments', [])
            for comment in comments:
                comment['comment_id'] = str(comment['comment_id'])
            return (comments), 200
        else:
            return ([]), 200

class Post_Comment(Resource):
    @token_required
    def post(self):
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

        return ({"message": "Comment added"}), 201
    
class Like(Resource):
    @token_required
    def post(slef):
        data = request.get_json()
        movie_id = data['movie_id']
        comment_id = data['comment_id']

        interactions_collection.update_one(
            {"movie_id": movie_id, "comments.comment_id": ObjectId(comment_id)},
            {"$inc": {"comments.$.likes": 1}}
        )

        return ({"message": "Comment liked"}), 200
    
class Dislike(Resource):
    @token_required
    def post(self):
        data = request.get_json()
        movie_id = data['movie_id']
        comment_id = data['comment_id']

        interactions_collection.update_one(
            {"movie_id": movie_id, "comments.comment_id": ObjectId(comment_id)},
            {"$inc": {"comments.$.dislikes": 1}}
        )

        return ({"message": "Comment disliked"}), 200