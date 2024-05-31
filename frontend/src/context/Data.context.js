import React, { createContext, useState, useEffect, useCallback } from 'react';
// axios
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
        popularMovies: false,
        premiereShows: false,
        popularTvshows: false,
        anime: false
    });


    // Home Effect
    useEffect(() => {
        if (popularMovies) {
            localStorage.setItem('popularMovies', JSON.stringify(popularMovies));
        }
    }, [popularMovies]);

    useEffect(() => {
        if (premiereShows) {
            localStorage.setItem('premiereShows', JSON.stringify(premiereShows));
        }
    }, [premiereShows]);

    useEffect(() => {
        if (popularTvshows) {
            localStorage.setItem('popularTvshows', JSON.stringify(popularTvshows));
        }
    }, [popularTvshows]);

    useEffect(() => {
        if (anime) {
            localStorage.setItem('anime', JSON.stringify(anime));
        }
    }, [anime]);

    // Movie Effect
    useEffect(() => {
        if (actionMovies) {
            localStorage.setItem('actionMovies', JSON.stringify(actionMovies));
        }
    }, [actionMovies]);

    useEffect(() => {
        if (comedyMovies) {
            localStorage.setItem('comedyMovies', JSON.stringify(comedyMovies));
        }
    }, [comedyMovies]);

    useEffect(() => {
        if (crimeMovies) {
            localStorage.setItem('crimeMovies', JSON.stringify(crimeMovies));
        }
    }, [crimeMovies]);

    useEffect(() => {
        if (horrorMovies) {
            localStorage.setItem('horrorMovies', JSON.stringify(horrorMovies));
        }
    }, [horrorMovies]);

    useEffect(() => {
        if (sfMovies) {
            localStorage.setItem('sfMovies', JSON.stringify(sfMovies));
        }
    }, [sfMovies]);

    // TV Show Effect
    useEffect(() => {
        if (actionShows) {
            localStorage.setItem('actionShows', JSON.stringify(actionShows));
        }
    }, [actionShows]);

    useEffect(() => {
        if (comedyShows) {
            localStorage.setItem('comedyShows', JSON.stringify(comedyShows));
        }
    }, [comedyShows]);

    useEffect(() => {
        if (crimeShows) {
            localStorage.setItem('crimeShows', JSON.stringify(crimeShows));
        }
    }, [crimeShows]);

    useEffect(() => {
        if (horrorShows) {
            localStorage.setItem('horrorShows', JSON.stringify(horrorShows));
        }
    }, [horrorShows]);

    useEffect(() => {
        if (sfShows) {
            localStorage.setItem('sfShows', JSON.stringify(sfShows));
        }
    }, [sfShows]);


    const fetchData = useCallback(async (type) => {
        // Home
        if (type === 'popularMovies' && !popularMovies) {
            setLoading((prev) => ({ ...prev, popularMovies: true }));
            const response = await axios.get('http://localhost:5000/api/movies');
            localStorage.setItem('popularMovies', JSON.stringify(response.data));
            setPopularMovies(response.data);

            setLoading((prev) => ({ ...prev, popularMovies: false }));

        } else if (type === 'premiereShows' && !premiereShows) {
            setLoading((prev) => ({ ...prev, premiereShows: true }));
            const response = await axios.get('http://localhost:5000/api/premiere');
            localStorage.setItem('premiereShows', JSON.stringify(response.data));
            setPremiereShows(response.data);

            setLoading((prev) => ({ ...prev, premiereShows: false }));

        } else if (type === 'popularTvshows' && !popularTvshows) {
            setLoading((prev) => ({ ...prev, popularTvshows: true }));
            const response = await axios.get('http://localhost:5000/api/tv_shows');
            localStorage.setItem('popularTvshows', JSON.stringify(response.data));
            setPopularTvshows(response.data);

            setLoading((prev) => ({ ...prev, popularTvshows: false }));

        } else if (type === 'anime' && !anime) {
            setLoading((prev) => ({ ...prev, anime: true }));
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/16');
            localStorage.setItem('anime', JSON.stringify(response.data))
            setAnime(response.data);

            setLoading((prev) => ({ ...prev, anime: false }));

        }
        // Movie 
        else if (type === 'actionMovies' && !actionMovies) {
            const response = await axios.get('http://localhost:5000/api/movies/genre/28');
            setActionMovies(response.data);
        } else if (type === 'comedyMovies' && !comedyMovies) {
            const response = await axios.get('http://localhost:5000/api/movies/genre/35');
            setComedyMovies(response.data);
        } else if (type === 'crimeMovies' && !crimeMovies) {
            const response = await axios.get('http://localhost:5000/api/movies/genre/80');
            setCrimeMovies(response.data);
        } else if (type === 'horrorMovies' && !horrorMovies) {
            const response = await axios.get('http://localhost:5000/api/movies/genre/27');
            setHorrorMovies(response.data);
        } else if (type === 'sfMovies' && !sfMovies) {
            const response = await axios.get('http://localhost:5000/api/movies/genre/878');
            setSfMovies(response.data);
        }
        // TV Show
        else if (type === 'actionShows' && !actionShows) {
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/10759');
            setActionShows(response.data);
        } else if (type === 'comedyShows' && !comedyShows) {
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/35');
            setComedyShows(response.data);
        } else if (type === 'crimeShows' && !crimeShows) {
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/80');
            setCrimeShows(response.data);
        } else if (type === 'horrorShows' && !horrorShows) {
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/10768');
            setHorrorShows(response.data);
        } else if (type === 'sfShows' && !sfShows) {
            const response = await axios.get('http://localhost:5000/api/tv_shows/genre/10765');
            setSfShows(response.data);
        }
    }, [popularMovies, premiereShows, popularTvshows, anime, actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, actionShows, comedyShows, crimeShows, horrorShows, sfShows])

    const clearData = useCallback(() => {
        localStorage.removeItem('popularMovies');
        localStorage.removeItem('premiereShows');
        localStorage.removeItem('popularTvshows');
        localStorage.removeItem('anime');
        // localStorage.removeItem('actionMovies');
        // localStorage.removeItem('comedyMovies');
        // localStorage.removeItem('crimeMovies');
        // localStorage.removeItem('horrorMovies');
        // localStorage.removeItem('sfMovies');
        // localStorage.removeItem('actionShows');
        // localStorage.removeItem('comedyShows');
        // localStorage.removeItem('crimeShows');
        // localStorage.removeItem('horrorShows');
        // localStorage.removeItem('sfShows');
        setPopularMovies(null);
        setPremiereShows(null);
        setPopularTvshows(null);
        setAnime(null);
    }, []);

    return (
        <DataContext.Provider value={{ popularMovies, premiereShows, popularTvshows, anime, actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData, loading, clearData }}>
            {children}
        </DataContext.Provider>
    );
};
