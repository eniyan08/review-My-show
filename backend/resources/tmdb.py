from flask import jsonify
from flask_restful import Resource
from pymongo import MongoClient
from config import Config

# db
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]
# collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']

class Movies(Resource):
    def get(self):
        movies = list(movies_collection.find({}, {'_id': 0}))
        return movies, 200

class TV_Shows(Resource):
    def get(self):
        tv_shows = list(tv_shows_collection.find({'genre_ids':{"$in": [10751,10766,10767,99,18,37]}}, {'_id': 0}))
        return (tv_shows), 200
    
class Premiere(Resource):
    def get(self):
        premieres = list(premiere_collection.find({}, {'_id': 0}))
        return (premieres), 200
    
class Top_Rated_Movies(Resource):
    def get(self):
        top_movies = list(top_rated_movies_collection.find({}, {'_id': 0}))
        return (top_movies), 200
    
class Movie_By_Genre(Resource):
    def get(self, genre_id):
        movie_by_genre = list(movies_collection.find({'genre_ids':genre_id}, {'_id': 0}))
        return (movie_by_genre), 200
    
class TV_Show_By_Genre(Resource):
    def get(self, genre_id):
        tv_show_by_genre = list(tv_shows_collection.find({'genre_ids':genre_id}, {'_id': 0}))
        return (tv_show_by_genre), 200