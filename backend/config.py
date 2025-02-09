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
        REDIS_HOST (str): Tha name of the Redis host
        REDIS_PORT (str): Port number of the Redis host
        REDIS_CLIENT (str): Intermediator between application and redis server
    """

    # MongoDB setup
    MONGO_URI = os.getenv('MONGO_URI')
    # Database names
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    INTERACTION_DB_NAME = 'interaction_db'

    #Generate a secret key for the application
    SECRET_KEY = secrets.token_hex(16)
    
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY', 'default_tmdb_api_key')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 
    TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
    # Redis client setup
    REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
    REDIS_PORT = os.getenv('REDIS_PORT', 6379)
    REDIS_CLIENT = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)

