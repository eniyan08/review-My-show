import React, { useEffect, useContext } from "react";
// components
import PosterSlider from '../components/PosterSlider/PosterSlider.component'
// data context
import { DataContext } from '../context/Data.context';

const Tv_shows = () => {

    const { actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData, loading } = useContext(DataContext)

    useEffect(() => {
        if (!actionShows || !comedyShows || !crimeShows || !horrorShows || !sfShows) {
            fetchData('TV')
        }
    }, [actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData]);


    if (loading.tvData) {
        return <div className='mt-28'><p>Loading...</p></div>;
    }

    if (!actionShows) {
        return <div className='mt-28'><p>No data available</p></div>;
    }

    return (
        <>
            <div className='container mx-auto mt-28 pt-4 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={actionShows}
                    type="tvshow"
                    title="Action & Adventure"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={comedyShows}
                    type="tvshow"
                    title="Comedy"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={crimeShows}
                    type="tvshow"
                    title="Crime"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={horrorShows}
                    type="tvshow"
                    title="War & Politics"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 pb-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={sfShows}
                    type="tvshow"
                    title="Sci-Fi & Fantasy"
                    subtitle=""
                    isDark={false} />
            </div>
        </>
    )
}

export default Tv_shows