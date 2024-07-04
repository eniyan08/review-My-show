import React, { createContext, useState, useCallback } from 'react';
// axios
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const API_URL = '/api';

    // Home Data
    const [popularMovies, setPopularMovies] = useState(null)
    const [premiereShows, setPremiereShows] = useState(null)
    const [popularTvshows, setPopularTvshows] = useState(null)
    const [anime, setAnime] = useState(null)

    // Movie Data
    const [actionMovies, setActionMovies] = useState(null)
    const [comedyMovies, setComedyMovies] = useState(null)
    const [crimeMovies, setCrimeMovies] = useState(null)
    const [horrorMovies, setHorrorMovies] = useState(null)
    const [sfMovies, setSfMovies] = useState(null)

    // TV Show Data
    const [actionShows, setActionShows] = useState(null)
    const [comedyShows, setComedyShows] = useState(null)
    const [crimeShows, setCrimeShows] = useState(null)
    const [horrorShows, setHorrorShows] = useState(null)
    const [sfShows, setSfShows] = useState(null)


    const [loading, setLoading] = useState({
        homeData: false,
        movieData: false,
        tvData: false,
    });


    const fetchData = useCallback(async (type) => {
        // Home
        if (type === 'HomeData' && !popularMovies && !premiereShows && !popularTvshows && !anime) {
            setLoading((prev) => ({ ...prev, homeData: true }));

            const movieResponse = await axios.get(`${API_URL}/tmdb/movies`);
            const premiereResponse = await axios.get(`${API_URL}/tmdb/premiere`);
            const tvResponse = await axios.get(`${API_URL}/tmdb/tv_shows`);
            const animeResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/16`);

            setPopularMovies(movieResponse.data);
            setPremiereShows(premiereResponse.data);
            setPopularTvshows(tvResponse.data);
            setAnime(animeResponse.data);

            setLoading((prev) => ({ ...prev, homeData: false }));

        }

        // Movie 
        else if (type === 'MovieData' && !actionMovies && !comedyMovies && !crimeMovies && !horrorMovies && !sfMovies) {
            setLoading((prev) => ({ ...prev, movieData: true }));

            const actionResponse = await axios.get(`${API_URL}/tmdb/movies/genre/28`);
            const comedyResponse = await axios.get(`${API_URL}/tmdb/movies/genre/35`);
            const crimeResponse = await axios.get(`${API_URL}/tmdb/movies/genre/80`);
            const horrorResponse = await axios.get(`${API_URL}/tmdb/movies/genre/27`);
            const sfResponse = await axios.get(`${API_URL}/tmdb/movies/genre/878`);

            setActionMovies(actionResponse.data);
            setComedyMovies(comedyResponse.data);
            setCrimeMovies(crimeResponse.data);
            setHorrorMovies(horrorResponse.data);
            setSfMovies(sfResponse.data);

            setLoading((prev) => ({ ...prev, movieData: false }));

        }

        // TV Show
        else if (type === 'TV' && !actionShows && !comedyShows && !crimeShows && !horrorShows && !sfShows) {
            setLoading((prev) => ({ ...prev, tvData: true }));

            const actionShowsResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/10759`);
            const comedyShowsResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/35`);
            const crimeShowsResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/80`);
            const horrorShowsResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/10768`);
            const sfShowsResponse = await axios.get(`${API_URL}/tmdb/tv_shows/genre/10765`);

            setActionShows(actionShowsResponse.data);
            setComedyShows(comedyShowsResponse.data);
            setCrimeShows(crimeShowsResponse.data);
            setHorrorShows(horrorShowsResponse.data);
            setSfShows(sfShowsResponse.data);

            setLoading((prev) => ({ ...prev, tvData: false }));
        }

    }, [popularMovies, premiereShows, popularTvshows, anime, actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, actionShows, comedyShows, crimeShows, horrorShows, sfShows])

    const clearData = useCallback(() => {
        localStorage.clear()
    }, []);

    return (
        <DataContext.Provider value={{ popularMovies, premiereShows, popularTvshows, anime, actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData, loading, clearData }}>
            {children}
        </DataContext.Provider>
    );
};
