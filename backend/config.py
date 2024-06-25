from dotenv import load_dotenv
import os
import secrets

load_dotenv()

class Config:
    MONGO_URI = 'mongodb://mongodb:27017'
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    INTERACTION_DB_NAME = 'interaction_db'

    SECRET_KEY = secrets.token_hex(16)
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY', 'default_tmdb_api_key')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 
