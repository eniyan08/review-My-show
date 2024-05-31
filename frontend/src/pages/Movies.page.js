import React, { useEffect, useContext } from "react";
// components
import PosterSlider from '../components/PosterSlider/PosterSlider.component'
// data context
import { DataContext } from '../context/Data.context';

const Movies = () => {

    const { actionMovies, comedyMovies, crimeMovies, horrorMovies, sfMovies, fetchData } = useContext(DataContext)

    useEffect(() => {
        if (!actionMovies) {
            fetchData('actionMovies');
        }
    }, [actionMovies, fetchData]);

    useEffect(() => {
        if (!comedyMovies) {
            fetchData('comedyMovies');
        }
    }, [comedyMovies, fetchData]);

    useEffect(() => {
        if (!crimeMovies) {
            fetchData('crimeMovies');
        }
    }, [crimeMovies, fetchData]);

    useEffect(() => {
        if (!horrorMovies) {
            fetchData('horrorMovies');
        }
    }, [horrorMovies, fetchData]);

    useEffect(() => {
        if (!sfMovies) {
            fetchData('sfMovies');
        }
    }, [sfMovies, fetchData]);

    if (!actionMovies) return <div>Loading...</div>;
    return (
        <>
            <div className='container pt-32 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={actionMovies}
                    title="Action"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={comedyMovies}
                    title="Comedy"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={crimeMovies}
                    title="Crime"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={horrorMovies}
                    title="Horror"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 pb-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={sfMovies}
                    title="Science Fiction"
                    subtitle=""
                    isDark={false} />
            </div>
        </>
    )
}

export default Movies