from dotenv import load_dotenv
import os
import secrets
import redis

# Load environment variables from a .env file
load_dotenv()

class Config:
    """
    Configuration class for setting up the application environment and constants.

    Attributes:
        MONGO_URI (str): The URI for connecting to the MongoDB database.
        USER_DB_NAME (str): The name of the user database.
        MOVIE_DB_NAME (str): The name of the movie database.
        INTERACTION_DB_NAME (str): The name of the interaction database.
        SECRET_KEY (str): A secret key for securing sessions and tokens.
        TMDB_API_KEY (str): API key for accessing The Movie Database (TMDB) API.
        TMDB_BASE_URL (str): Base URL for the TMDB API.
    """

    # MONGO_URI = 'mongodb://mongodb:27017/rms_database'
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/default_database')
    # Database names
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    INTERACTION_DB_NAME = 'interaction_db'

    #Generate a secret key for the application
    SECRET_KEY = secrets.token_hex(16)
    # TMDB_API_KEY = 'c977679de6afcab8e7a9312fea820565'
    TMDB_API_KEY = os.getenv('TMDB_API_KEY', 'c977679de6afcab8e7a9312fea820565')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 

    # Redis client setup
    redis_client = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)
