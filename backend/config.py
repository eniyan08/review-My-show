from dotenv import load_dotenv
import os
import secrets

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

    MONGO_URI = 'mongodb://mongodb:27017'

    # Database names
    USER_DB_NAME = 'user_db'
    MOVIE_DB_NAME = 'movie_db'
    INTERACTION_DB_NAME = 'interaction_db'

    #Generate a secret key for the application
    SECRET_KEY = secrets.token_hex(16)
    
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY', 'default_tmdb_api_key')
    TMDB_BASE_URL = 'https://api.themoviedb.org/3' 
