import React, { useEffect, useContext } from "react";
// components
import PosterSlider from '../components/PosterSlider/PosterSlider.component'
// data context
import { DataContext } from '../context/Data.context';

const Tv_shows = () => {

    const { actionShows, comedyShows, crimeShows, horrorShows, sfShows, fetchData } = useContext(DataContext)

    useEffect(() => {
        if (!actionShows) {
            fetchData('actionShows');
        }
    }, [actionShows, fetchData]);

    useEffect(() => {
        if (!comedyShows) {
            fetchData('comedyShows');
        }
    }, [comedyShows, fetchData]);

    useEffect(() => {
        if (!crimeShows) {
            fetchData('crimeShows');
        }
    }, [crimeShows, fetchData]);

    useEffect(() => {
        if (!horrorShows) {
            fetchData('horrorShows');
        }
    }, [horrorShows, fetchData]);

    useEffect(() => {
        if (!sfShows) {
            fetchData('sfShows');
        }
    }, [sfShows, fetchData]);

    if (!actionShows) return <div>Loading...</div>;
    return (
        <>
            <div className='container mx-auto mt-28 pt-4 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={actionShows}
                    title="Action & Adventure"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={comedyShows}
                    title="Comedy"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={crimeShows}
                    title="Crime"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={horrorShows}
                    title="War & Politics"
                    subtitle=""
                    isDark={false} />
            </div>

            <div className='container pt-4 pb-4 mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2  '>
                <PosterSlider
                    images={sfShows}
                    title="Sci-Fi & Fantasy"
                    subtitle=""
                    isDark={false} />
            </div>
        </>
    )
}

export default Tv_shows