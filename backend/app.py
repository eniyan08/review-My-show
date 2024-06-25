# flask-backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
# modules
from config import Config
from resources.auth import Login, SignUp
from resources.tmdb import Movies, TV_Shows, Premiere, Top_Rated_Movies, Movie_By_Genre, TV_Show_By_Genre
from resources.info import Info, Get_Comment, Post_Comment, Like, Dislike

app = Flask(__name__)

app.config.from_object(Config)
api = Api(app) # wrapping the app with restful api
CORS(app)
# Register Resources
# auth
api.add_resource(Login,'/auth/login')
api.add_resource(SignUp, '/auth/signup')
# tmdb
api.add_resource(Movies, '/tmdb/movies')
api.add_resource(TV_Shows, '/tmdb/tv_shows')
api.add_resource(Premiere, '/tmdb/premiere')
api.add_resource(Top_Rated_Movies, '/tmdb/top_rated_movies')
api.add_resource(Movie_By_Genre, '/tmdb/movies/genre/<int:genre_id>')
api.add_resource(TV_Show_By_Genre, '/tmdb/tv_shows/genre/<int:genre_id>')
# info
api.add_resource(Info, '/info/<int:id>')
api.add_resource(Get_Comment, '/info/comment/<int:id>') #get comment
api.add_resource(Post_Comment, '/info/comment') #post comment
api.add_resource(Like, '/info/comment/like')
api.add_resource(Dislike, '/info/comment/dislike')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
