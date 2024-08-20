from pymongo import MongoClient
import requests
from config import Config


# Constants for TMDB API
TMDB_API_KEY = Config.TMDB_API_KEY
TMDB_BASE_URL = Config.TMDB_BASE_URL


# Database setup
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]

# Collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']


def fetch_data(endpoint, params):
    """
    Fetches data from the TMDB API.

    Args:
        endpoint (str): The API endpoint to hit.
        params (dict): The parameters to include in the API request.

    Returns:
        list: The results from the API response.

    Raises:
        requests.exceptions.HTTPError: If the request returns an unsuccessful status code.
    """
    response = requests.get(f"{TMDB_BASE_URL}/{endpoint}", params=params, proxies={"http": None, "https": None})
    response.raise_for_status()
    return response.json()['results']

def fetch_and_store():
    """
    Fetches popular movies, top-rated TV shows, upcoming premieres, and top-rated movies from the TMDB API
    and stores them in the MongoDB collections.
    """
    print("Started fetching")

    # Fetch and store popular movies (5 pages)
    for page in range(1,6):
        movies = fetch_data('movie/popular', {'api_key': TMDB_API_KEY, 'page': {page}})
        for movie in movies:
            if not movies_collection.find_one({'id': movie['id']}):
                movies_collection.insert_one(movie)
            else:
                continue
        
    
    # Fetch and store top-rated TV shows (5 pages)
    for page in range(1,6):
        tv_shows = fetch_data('tv/top_rated', {'api_key': TMDB_API_KEY, 'page': {page}})
        for show in tv_shows:
            if not tv_shows_collection.find_one({'id': show['id']}):
                tv_shows_collection.insert_one(show)
            else:
                continue
    
    # Fetch and store upcoming premieres (1 page)
    premieres = fetch_data('movie/upcoming', {'api_key': TMDB_API_KEY, 'page': 1})
    for premiere in premieres:
            if not premiere_collection.find_one({'id': premiere['id']}):
                premiere_collection.insert_one(premiere)
            else:
                continue

    # Fetch and store top-rated movies (1 page)
    top_rated_movies = fetch_data('movie/top_rated', {'api_key': TMDB_API_KEY, 'page': 1})
    for movie in top_rated_movies:
            if not top_rated_movies_collection.find_one({'id': movie['id']}):
                top_rated_movies_collection.insert_one(movie)
            else:
                continue

    print("Successfully fetched Movie database")

fetch_and_store()