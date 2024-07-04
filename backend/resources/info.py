from flask import request, jsonify
from flask_restful import Resource
from pymongo import MongoClient
from config import Config
from bson.objectid import ObjectId
from resources.decorator import token_required

# Initialize MongoDB client and database
client = MongoClient(Config.MONGO_URI)
movie_db = client[Config.MOVIE_DB_NAME]
interaction_db = client[Config.INTERACTION_DB_NAME]

# Collections
movies_collection = movie_db['movies']
tv_shows_collection = movie_db['tv_shows']
premiere_collection = movie_db['premiere']
top_rated_movies_collection = movie_db['top_rated_movies']
interactions_collection = interaction_db['interactions']

class Info(Resource):
    """
    Resource for retrieving information about movies or tv shows by id

    Methods:
    get: Handles GET request to fetch details of a movie or a tv show
    """
    def get(self,type, id):
        """
        Handles HTTP GET requests to fetch details of a movie or TV show by ID.
        
        This method searches for a movie or TV show with the given ID in the 
        respective collections. If found, it returns the details of the movie 
        or TV show.

        Args:
        id (str): The ID of the movie or TV show to retrieve.

        Returns:
        tuple: A dictionary containing the details of the movie or TV show 
                   and the HTTP status code 200 if found, or an empty dictionary 
                   and HTTP status code 404 if not found.
        """
        if type=="movie":
            movie_details = movies_collection.find_one({'id':id}, {'_id': 0})
            return movie_details, 200
        elif type=="tvshow":
            tv_show_details = tv_shows_collection.find_one({"id":id}, {'_id': 0})
            return tv_show_details, 200
        
        else:
             return {'message': 'Item not found'}, 404

class Get_Comment(Resource):
    """
    Resource for retrieving the comments of a movie or tv show

    Methods:
    get: Handles GET request to fetch the comments of a movie or tv show
    """
    def get(self, type, id):
        """
        This method retrieves the comments of a movie or tv show with the given
        ID in the interactions collection. If found it returns the comments of 
        the movie or tv show

        Args:
        id (str): The ID of the movie or TV show comment to retrieve.

        Returns:
        tuple: A dictionary containing the comments of the movie or TV show 
                   and the HTTP status code 200 if found, or an empty dictionary 
                   and HTTP status code 204 if not found.
        """
        if type=="movie":
            interaction = interactions_collection.find_one({"movie_id": str(id)}, {'_id':0})
        elif type=="tvshow":
            interaction = interactions_collection.find_one({"tvshow_id": str(id)}, {'_id':0})
        if interaction:
            comments = interaction.get('comments', [])
            for comment in comments:
                comment['comment_id'] = str(comment['comment_id'])
            return comments, 200
        else:
            return [], 204

class Post_Comment(Resource):
    """
    Resource for posting comments on a movie.
    
    Methods:
    post: Handles POST requests to add a comment to a movie.
    """

    @token_required
    def post(self, type):
        """
        Handles HTTP POST requests to add a comment to a movie.
        
        This method requires a valid JWT token. It extracts the movie ID, username,
        and comment text from the request data, creates a new comment, and inserts
        it into the interactions collection.

        Request JSON should contain:
        - movie_id (str): The ID of the movie to comment on.
        - username (str): The username of the commenter.
        - text (str): The text of the comment.

        Returns:
        tuple: A success message and HTTP status code 201 if the comment is added.
        """
        try:
            data = request.json
            id = data['id']
            username = data['username']
            text = data['text']

            comment = {
                "comment_id": ObjectId(),
                "user_id": username,
                "text": text,
                "likes": 0,
                "dislikes": 0
            }
            if type=="movie":
                result = interactions_collection.update_one(
                    {"movie_id": id},
                    {"$push": {"comments": comment}},
                    upsert=True
                )
            elif type=="tvshow":
                result = interactions_collection.update_one(
                    {"tvshow_id": id},
                    {"$push": {"comments": comment}},
                    upsert=True
                )
            print("Result", result)
            print(result.modified_count)
           
            return {"message": "Comment added"}, 201

        except Exception as e:
            print(f"Error in posting the comment: {e}")
            return {"message": "An error occured while processing your request"}, 500

class Like(Resource):
    """
    Resource for posting like on a comment

    Methods:
    post: Handles POST request to add a like to a comment
    """
    @token_required
    def post(self, type):
        """
        Handles HTTP POST requests to add a like to a comment

        This method requires a valid JWT token. It extracts the movie ID and
        comment id from the request data, and update the like of the comment
        in the interactions collection

        Request JSON should contain:
        - movie_id (str): The ID of the movie to comment on.
        - comment_id (BSON): The ID of the comment to like.

        Returns:
        tuple: A success message and HTTP status code 201 if the like is added 
        """
        try:
            data = request.get_json()
            id = data['id']
            comment_id = data['comment_id']

            if not id or not comment_id:
                return {"message": "movie_id/tvshow_id and comment_id are required"}, 400
            
            if type=="movie":
                result = interactions_collection.update_one(
                    {"movie_id": id, "comments.comment_id": ObjectId(comment_id)},
                    {"$inc": {"comments.$.likes": 1}}
                )
            elif type=="tvshow":
                result = interactions_collection.update_one(
                    {"tvshow_id": id, "comments.comment_id": ObjectId(comment_id)},
                    {"$inc": {"comments.$.likes": 1}}
                )

            return {"message": "Comment liked"}, 201

        except Exception as e:
            print(f"Error in liking the comment: {e}")
            return {"message": "An error occured while processing your request"}, 500
        
    
class Dislike(Resource):
    """
    Resource for posting dislike on a comment

    Methods:
    post: Handles POST request to add a dislike to a comment
    """
    @token_required
    def post(self, type):
        """
        Handles HTTP POST requests to add a dislike to a comment

        This method requires a valid JWT token. It extracts the movie ID and
        comment id from the request data, and update the dislike of the comment
        in the interactions collection

        Request JSON should contain:
        - movie_id (str): The ID of the movie to comment on.
        - comment_id (BSON): The ID of the comment to dislike.

        Returns:
        tuple: A success message and HTTP status code 201 if the dislike is added 
        """
        try:
            data = request.get_json()
            id = data['id']
            comment_id = data['comment_id']

            if not id or not comment_id:
                return {"message": "movie_id and comment_id are required"}, 400
            
            if type=="movie":
                result = interactions_collection.update_one(
                    {"movie_id": id, "comments.comment_id": ObjectId(comment_id)},
                    {"$inc": {"comments.$.dislikes": 1}}
                )
            elif type=="tvshow":
                result = interactions_collection.update_one(
                    {"tvshow": id, "comments.comment_id": ObjectId(comment_id)},
                    {"$inc": {"comments.$.dislikes": 1}}
                )

            # if result.modified_count == 0:
            #     return {"message": "Comment not found or no change made"}, 404

            return {"message": "Comment disliked"}, 201
        
        except Exception as e:
            print(f"Error in disliking the comment: {e}")
            return {"message": "An error occured while processing your request"}, 500