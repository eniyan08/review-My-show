from dotenv import load_dotenv
from secret_key import SECRET_KEY
import os

load_dotenv()

class Config:
    MONGO_URI = 'mongodb://mongodb:27017/mydatabase'
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    INTERACTION_DB_NAME = 'interaction_db'

    SECRET_KEY = SECRET_KEY
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY', 'default_tmdb_api_key')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 
