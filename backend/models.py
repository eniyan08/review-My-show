from pymongo import MongoClient
import bcrypt
from config import Config

TMDB_API_KEY = Config.TMDB_API_KEY
TMDB_BASE_URL = Config.TMDB_BASE_URL

# models
# db
client = MongoClient(Config.MONGO_URI)
user_db = client[Config.USER_DB_NAME]

# collections
users_collection = user_db['users']


# utility functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(hashed_password, plain_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

# logging and signing
def find_user_by_username_or_email(username_or_email):
    return users_collection.find_one({
        '$or': [{'username': username_or_email}, {'email': username_or_email}]
    })

def insert_user(username, email, password):
    hashed_password = hash_password(password)
    user_data = {
        'username': username,
        'email': email,
        'password': hashed_password
    }
    users_collection.insert_one(user_data)

