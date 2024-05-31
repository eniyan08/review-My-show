from pymongo import MongoClient
import requests
from config import Config

TMDB_API_KEY = Config.TMDB_API_KEY
TMDB_BASE_URL = Config.TMDB_BASE_URL


# models
# db
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]
# collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']

# fetching and storing movie data

def fetch_data(endpoint, params):
    response = requests.get(f"{TMDB_BASE_URL}/{endpoint}", params=params, proxies={"http": None, "https": None})
    # print("Here is the response::::", response)
    response.raise_for_status()
    return response.json()['results']

def fetch_and_store():
    print("Started fetching")

    for page in range(1,6):
        movies = fetch_data('movie/popular', {'api_key': TMDB_API_KEY, 'page': {page}})
        movies_collection.insert_many(movies)
    
    for page in range(1,6):
        tv_shows = fetch_data('tv/top_rated', {'api_key': TMDB_API_KEY, 'page': {page}})
        tv_shows_collection.insert_many(tv_shows)
    
    premieres = fetch_data('movie/upcoming', {'api_key': TMDB_API_KEY, 'page': 1})
    # premieres.extend(fetch_data('movie/upcoming', {'api_key': TMDB_API_KEY, 'page': 2}))
    premiere_collection.insert_many(premieres)

    top_rated_movies = fetch_data('movie/top_rated', {'api_key': TMDB_API_KEY, 'page': 1})
    top_rated_movies_collection.insert_many(top_rated_movies)

    print("Data fetched successfully")

fetch_and_store()