# flask-backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

# Import configuration and resource modules
from config import Config
from resources.auth import Login, SignUp
from resources.tmdb import Movies, TV_Shows, Premiere, Top_Rated_Movies, Movie_By_Genre, TV_Show_By_Genre
from resources.info import Info, Get_Comment, Post_Comment, Like, Dislike

# Initialize the Flask application
app = Flask(__name__)

# Load configuration from Config object
app.config.from_object(Config)

# Initialize Flask-RESTful API and wrap the Flask app
api = Api(app)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(app)

# Register Resources
# Authentication endpoints
api.add_resource(Login,'/auth/login')
api.add_resource(SignUp, '/auth/signup')

# TMDB (The Movie Database) endpoints
api.add_resource(Movies, '/tmdb/movies')
api.add_resource(TV_Shows, '/tmdb/tv_shows')
api.add_resource(Premiere, '/tmdb/premiere')
api.add_resource(Top_Rated_Movies, '/tmdb/top_rated_movies')
api.add_resource(Movie_By_Genre, '/tmdb/movies/genre/<int:genre_id>')
api.add_resource(TV_Show_By_Genre, '/tmdb/tv_shows/genre/<int:genre_id>')

# Information and interactions endpoints
api.add_resource(Info, '/info/<string:type>/<int:id>')
api.add_resource(Get_Comment, '/info/<string:type>/comment/<int:id>') #get comment
api.add_resource(Post_Comment, '/info/<string:type>/comment') #post comment
api.add_resource(Like, '/info/<string:type>/comment/like')
api.add_resource(Dislike, '/info/<string:type>/comment/dislike')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
