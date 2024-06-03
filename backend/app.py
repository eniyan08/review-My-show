# flask-backend/app.py
from flask import Flask
from flask_cors import CORS
# modules
from config import Config
from routes import auth_blueprint, tmdb_api_blueprint, info_blueprint

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Register Blueprints
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(tmdb_api_blueprint, url_prefix='/api')
app.register_blueprint(info_blueprint, url_prefix='/info')

if __name__ == '__main__':
    app.run(debug=True)
