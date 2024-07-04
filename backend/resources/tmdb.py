from flask import jsonify
from flask_restful import Resource
from pymongo import MongoClient
from config import Config

# Initialize MongoDB client and database
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]

# Initialize Redis client 
redis_client = Config.REDIS_CLIENT

# Collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']

class Movies(Resource):
    """
    Resource for retrieving all movies.

    Methods:
    get: Handles GET requests to fetch all movies.
    """
    def get(self):
        """
        Handles HTTP GET requests to fetch all movies from the redis if found or else it fetches
        the data from movies collection.

        Returns:
            tuple: A list of all movies and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = 'movies'
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print('Data found in Redis')
            return eval(cached_data)
        else:
            try:
                movies = list(movies_collection.find({}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(movies))
                print("Movies fetched from the database")
                return movies, 200
            except Exception as e:
                print(f"Error fetching movies: {e}")
                return {"message": "An error occurred while fetching movies."}, 500

class TV_Shows(Resource):
    """
    Resource for retrieving TV shows by specific genres.

    Methods:
    get: Handles GET requests to fetch TV shows by specific genres.
    """

    def get(self):
        """
        Handles HTTP GET requests to fetch TV shows with specific genre IDs from 
        redis client if found or else it fetches data from the TV shows collection.

        Returns:
            tuple: A list of TV shows and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = 'tv_shows'
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print("TV Shows found in Redis")
            return eval(cached_data)
        else:
            try: 
                genre_ids = [10751, 10766, 10767, 99, 18, 37]  # List of genre IDs to filter by
                tv_shows = list(tv_shows_collection.find({'genre_ids': {"$in": genre_ids}}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(tv_shows))
                print("TV Shows fetched from the database")
                return tv_shows, 200
            except Exception as e:
                print(f"Error fetching TV shows: {e}")
                return {"message": "An error occurred while fetching TV shows."}, 500
        
    
class Premiere(Resource):
    """
    Resource for retrieving all premiere movies.

    Methods:
    get: Handles GET requests to fetch all premiere movies.
    """
    def get(self):
        """
        Handles HTTP GET requests to fetch all premiere movies from redis client if found or else
        it fetches data from the premiere collection.

        Returns:
            tuple: A list of premiere movies and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = 'premiere'
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print("Premiere data found in Redis")
            return eval(cached_data)
        else:
            try:
                premieres = list(premiere_collection.find({}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(premieres))
                print("Premieres fetched from the database")
                return premieres, 200
            except Exception as e:
                print(f"Error fetching premieres: {e}")
                return {"message": "An error occurred while fetching premiere movies."}, 500

    
class Top_Rated_Movies(Resource):
    """
    Resource for retrieving all top-rated movies.

    Methods:
    get: Handles GET requests to fetch all top-rated movies.
    """
    def get(self):
        """
        Handles HTTP GET requests to fetch all top-rated movies from redis client if found or else 
        it fetches data from the top-rated movies collection.

        Returns:
            tuple: A list of top-rated movies and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = 'top_movies'
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print("Top Movies data found in Redis")
            return eval(cached_data)
        else:
            try:
                top_movies = list(top_rated_movies_collection.find({}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(top_movies))
                print("Top rated movies fetched from the database")
                return top_movies, 200
            except Exception as e:
                print(f"Error fetching top-rated movies: {e}")
                return {"message": "An error occurred while fetching top-rated movies."}, 500
    
    
class Movie_By_Genre(Resource):
    """
    Resource for retrieving movies by genre.

    Methods:
    get: Handles GET requests to fetch movies by a specific genre.
    """

    def get(self, genre_id):
        """
        Handles HTTP GET requests to fetch movies by a specific genre from redis client or else it 
        fetches data from the movies collection.

        Args:
            genre_id (int): The genre ID to filter movies by.

        Returns:
            tuple: A list of movies for the specified genre and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = str(genre_id)
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print(genre_id, "found in Redis")
            return eval(cached_data)
        else:
            try:
                movie_by_genre = list(movies_collection.find({'genre_ids': genre_id}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(movie_by_genre))
                print(genre_id ,"fetched from the database")
                return movie_by_genre, 200
            except Exception as e:
                print(f"Error fetching movies by genre: {e}")
                return {"message": "An error occurred while fetching movies by genre."}, 500

    
class TV_Show_By_Genre(Resource):
    """
    Resource for retrieving TV shows by genre.

    Methods:
    get: Handles GET requests to fetch TV shows by a specific genre.
    """

    def get(self, genre_id):
        """
        Handles HTTP GET requests to fetch TV shows by a specific genre from redis client or else it 
        fetches data from the TV shows collection.

        Args:
            genre_id (int): The genre ID to filter TV shows by.

        Returns:
            tuple: A list of TV shows for the specified genre and HTTP status code 200, or an error message and HTTP status code 500 if an error occurs.
        """
        redis_key = str(genre_id)
        cached_data = redis_client.get(redis_key)
        if cached_data:
            print(genre_id, "found in Redis")
            return eval(cached_data)
        else:
            try:
                tv_show_by_genre = list(tv_shows_collection.find({'genre_ids': genre_id}, {'_id': 0}))
                redis_client.setex(redis_key, 120, str(tv_show_by_genre))
                print(genre_id ,"fetched from the database")
                return tv_show_by_genre, 200
            except Exception as e:
                print(f"Error fetching TV shows by genre: {e}")
                return {"message": "An error occurred while fetching TV shows by genre."}, 500
        