from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    MONGO_URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6'
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    TV_SHOW_DB_NAME = 'tv_show_db'
    PREMIERE_DB_NAME = 'premiere_db'

    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key') 
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY', 'default_tmdb_api_key')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 