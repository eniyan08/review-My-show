import React, { useEffect, useContext } from "react";
// components
import PosterSlider from '../components/PosterSlider/PosterSlider.component'
// data context
import { DataContext } from '../context/Data.context';

const Movies = () => {

    const { actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, fetchData, loading } = useContext(DataContext)

    useEffect(() => {
        if (!actionMovies || !comedyMovies || !crimeMovies || !horrorMovies || !sfMovies) {
            fetchData('MovieData')
        }
    }, [actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, fetchData]);


    if (loading.movieData) {
        return <div className='mt-28'><p>Loading...</p></div>;
    }
    if (!actionMovies) {
        return <div className='mt-28'><p>No data available</p></div>;
    }

    return (
        <>
            <div className='container pt-32 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={actionMovies}
                    type="movie"
                    title="Action"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={comedyMovies}
                    type="movie"
                    title="Comedy"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={crimeMovies}
                    type="movie"
                    title="Crime"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={horrorMovies}
                    type="movie"
                    title="Horror"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 pb-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={sfMovies}
                    type="movie"
                    title="Science Fiction"
                    subtitle=""
                    isDark={false} />
            </div>
        </>
    )
}

export default Movies