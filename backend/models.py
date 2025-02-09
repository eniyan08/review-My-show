from pymongo import MongoClient, errors
import bcrypt
from config import Config
import certifi
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

# Constants for TMDB API
TMDB_API_KEY = Config.TMDB_API_KEY
TMDB_BASE_URL = Config.TMDB_BASE_URL

try:
    # Database setup
    client = MongoClient(
        Config.MONGO_URI,
        tls=True,
        tlsCAFile=certifi.where()
    )
    client.admin.command('ping')
    user_db = client[Config.USER_DB_NAME]

    # Collections
    users_collection = user_db['users']
    print("Connected to MongoDB successfully - models.py  !")

except (ConnectionFailure, ServerSelectionTimeoutError) as e:
    print(f"Failed to connect to MongoDB: {e} - models.py")
    raise


# utility functions
def hash_password(password):
    """
    Hashes a password using bcrypt.

    Args:
        password (str): The plain text password to be hashed.

    Returns:
        bytes: The hashed password.
    """
    try:
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    except Exception as e:
        print(f"Error hashing password: {e}")
        return None
    

def check_password(hashed_password, plain_password):
    """
    Checks a plain text password against a hashed password.

    Args:
        hashed_password (bytes): The hashed password.
        plain_password (str): The plain text password to check.

    Returns:
        bool: True if the password matches, False otherwise.
    """
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)
    except Exception as e:
        print(f"Error checking password: {e}")
        return False

# logging and signing
def find_user_by_username_or_email(username_or_email):
    """
    Finds a user by their username or email.

    Args:
        username_or_email (str): The username or email to search for.

    Returns:
        dict: The user document if found, None otherwise.
    """
    try:
        return users_collection.find_one({
            '$or': [{'username': username_or_email}, {'email': username_or_email}]
        })
    except errors.PyMongoError as e:
        print(f"Error finding user: {e}")
        return None
    


def insert_user(username, email, password):
    """
    Inserts a new user into the database.

    Args:
        username (str): The user's username.
        email (str): The user's email.
        password (str): The user's plain text password, which will be hashed before storing.

    Returns:
        None
    """
    hashed_password = hash_password(password)
    if hashed_password is None:
        return False

    user_data = {
        'username': username,
        'email': email,
        'password': hashed_password
    }

    try:
        users_collection.insert_one(user_data)
        return True
    except errors.DuplicateKeyError:
        print(f"User with username {username} or email {email} already exists.")
        return False
    except errors.PyMongoError as e:
        print(f"Error inserting user: {e}")
        return False
    
    

