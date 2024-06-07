import React, { createContext, useState, useCallback } from 'react';
// axios
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const API_URL = '/api';

    // Home data
    const [popularMovies, setPopularMovies] = useState(() => {
        const savedPopularMoviesData = localStorage.getItem('popularMovies');
        return savedPopularMoviesData ? JSON.parse(savedPopularMoviesData) : null;
    })
    const [premiereShows, setPremiereShows] = useState(() => {
        const savedPremiereShowsData = localStorage.getItem('premiereShows');
        return savedPremiereShowsData ? JSON.parse(savedPremiereShowsData) : null;
    })
    const [popularTvshows, setPopularTvshows] = useState(() => {
        const savedPopularTvshowsData = localStorage.getItem('popularTvshows');
        return savedPopularTvshowsData ? JSON.parse(savedPopularTvshowsData) : null;
    })
    const [anime, setAnime] = useState(() => {
        const savedAnimeData = localStorage.getItem('anime');
        return savedAnimeData ? JSON.parse(savedAnimeData) : null;
    })

    // Movie Data
    const [actionMovies, setActionMovies] = useState(() => {
        const savedActionMovies = localStorage.getItem('actionMovies');
        return savedActionMovies ? JSON.parse(savedActionMovies) : null;
    })
    const [comedyMovies, setComedyMovies] = useState(() => {
        const savedComedyMovies = localStorage.getItem('comedyMovies');
        return savedComedyMovies ? JSON.parse(savedComedyMovies) : null;
    })
    const [crimeMovies, setCrimeMovies] = useState(() => {
        const savedCrimeMovies = localStorage.getItem('crimeMovies');
        return savedCrimeMovies ? JSON.parse(savedCrimeMovies) : null;
    })
    const [horrorMovies, setHorrorMovies] = useState(() => {
        const savedHorrorMovies = localStorage.getItem('horrorMovies');
        return savedHorrorMovies ? JSON.parse(savedHorrorMovies) : null;
    })
    const [sfMovies, setSfMovies] = useState(() => {
        const savedSfMovies = localStorage.getItem('sfMovies');
        return savedSfMovies ? JSON.parse(savedSfMovies) : null;
    })

    // TV Show Data
    const [actionShows, setActionShows] = useState(() => {
        const savedActionShows = localStorage.getItem('actionShows');
        return savedActionShows ? JSON.parse(savedActionShows) : null;
    })
    const [comedyShows, setComedyShows] = useState(() => {
        const savedComedyShows = localStorage.getItem('comedyShows');
        return savedComedyShows ? JSON.parse(savedComedyShows) : null;
    })
    const [crimeShows, setCrimeShows] = useState(() => {
        const savedCrimeShows = localStorage.getItem('crimeShows');
        return savedCrimeShows ? JSON.parse(savedCrimeShows) : null;
    })
    const [horrorShows, setHorrorShows] = useState(() => {
        const savedHorrorShows = localStorage.getItem('horrorShows');
        return savedHorrorShows ? JSON.parse(savedHorrorShows) : null;
    })
    const [sfShows, setSfShows] = useState(() => {
        const savedSfShows = localStorage.getItem('sfShows');
        return savedSfShows ? JSON.parse(savedSfShows) : null;
    })


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

            localStorage.setItem('popularMovies', JSON.stringify(movieResponse.data));
            localStorage.setItem('premiereShows', JSON.stringify(premiereResponse.data));
            localStorage.setItem('popularTvshows', JSON.stringify(tvResponse.data));
            localStorage.setItem('anime', JSON.stringify(animeResponse.data));

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

            localStorage.setItem('actionMovies', JSON.stringify(actionResponse.data));
            localStorage.setItem('comedyMovies', JSON.stringify(comedyResponse.data));
            localStorage.setItem('crimeMovies', JSON.stringify(crimeResponse.data));
            localStorage.setItem('horrorMovies', JSON.stringify(horrorResponse.data));
            localStorage.setItem('sfMovies', JSON.stringify(sfResponse.data));

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

            localStorage.setItem('actionShows', JSON.stringify(actionShowsResponse.data));
            localStorage.setItem('comedyShows', JSON.stringify(comedyShowsResponse.data));
            localStorage.setItem('crimeShows', JSON.stringify(crimeShowsResponse.data));
            localStorage.setItem('horrorShows', JSON.stringify(horrorShowsResponse.data));
            localStorage.setItem('sfShows', JSON.stringify(sfShowsResponse.data));

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
        setPopularMovies(null);
        setPremiereShows(null);
        setPopularTvshows(null);
        setAnime(null);
        setActionMovies(null)
        setComedyMovies(null)
        setCrimeMovies(null)
        setHorrorMovies(null)
        setSfMovies(null)
        setActionShows(null)
        setComedyShows(null)
        setCrimeShows(null)
        setHorrorShows(null)
        setSfShows(null)

    }, []);

    return (
        <DataContext.Provider value={{ popularMovies, premiereShows, popularTvshows, anime, actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData, loading, clearData }}>
            {children}
        </DataContext.Provider>
    );
};
