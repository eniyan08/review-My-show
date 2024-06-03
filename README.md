# review My show

## Description

Hey there...! Review My Show is a web application designed to provide a platform for users to discover and review movies. The project leverages React for the frontend, Flask for the backend, and MongoDB for the database.

Movie data is fetched from The Movie Database (TMDB) API and stored in MongoDB. Users can browse through various movies, read public reviews, and contribute their own reviews. This application aims to provide a centralized platform for movie enthusiasts to share their opinions and find out what others think about a movie.

## Features

# Browse Movies:
    View detailed information about movies fetched from the TMDB API.
# User Reviews: 
    Post your own reviews and read reviews from other users.
# Real-Time Updates: 
    Enjoy a seamless experience with real-time updates without page reloads.
# Responsive Design: 
    Access the platform from any device with a responsive UI built using React
## Pre-requisites

- Node.js
- Python
- MongoDB

## Setup

### Frontend

1. Navigate to frontend directory.

    ```bash
    cd frontend
    ```

2. Install dependencies.

    ```bash
    npm install
    ```

3. Start the development server.

    ```bash
    npm start
    ```

### Backend

1. Navigate to backend directory.

    ```bash
    cd backend
    ```

2. Create a virtual environment.

    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment.

      ```bash
      venv/Scripts/activate
      ```

4. Install dependencies.

    ```bash
    pip install -r requirements.txt
    ```
5. Fetch the Movie Data from TMDB.

    ```bash
    python fetch_and_store.py
    ```

6. Start the Flask server.

    ```bash
    python app.py
    ```

### Database

Make sure MongoDB is running on your machine. By default it runs on `mongodb://localhost:27017`.

## Usage

Access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000`.

