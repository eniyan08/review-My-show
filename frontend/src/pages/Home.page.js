import React, { useContext, useEffect } from 'react'
// components
import PosterSlider from '../components/PosterSlider/PosterSlider.component'
// data context
import { DataContext } from '../context/Data.context';

const HomePage = () => {

    const { popularMovies, premiereShows, popularTvshows, anime, fetchData, loading } = useContext(DataContext);

    useEffect(() => {
        if (!popularMovies) {
            fetchData('popularMovies');
        }
    }, [popularMovies, fetchData]);

    useEffect(() => {
        if (!premiereShows) {
            fetchData('premiereShows');
        }
    }, [premiereShows, fetchData]);

    useEffect(() => {
        if (!popularTvshows) {
            fetchData('popularTvshows');
        }
    }, [popularTvshows, fetchData]);

    useEffect(() => {
        if (!anime) {
            fetchData('anime');
        }
    }, [anime, fetchData]);
    if (loading.popularMovies) return <div className='mt-32'><p>Loading...</p></div>;
    if (!popularMovies) return <div className='mt-32'><p>No data available</p></div>;
    if (!loading.popularMovies) {

        return (
            <>
                {/* RECOMMENDED MOVIES */}
                <div className='container mx-auto pt-36 pb-8 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2'>
                    <PosterSlider
                        images={popularMovies}
                        title="Recommended Movies"
                        subtitle="Popular"
                        isDark={false} />
                </div>
                {/* --------------------------------------------------------------------------------------------- */}

                {/* PREMIERE */}
                <div className='bg-navColor-200 py-4 md:py-12'>
                    <div className='container mx-auto 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2'>
                        <div className='flex px-4 hidden sm:block'>
                            <img src='https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120:q-80/premiere-banner-web-collection-202208191200.png'
                                alt="Premiere"
                                className='w-full h-full'
                            />
                        </div>
                        <PosterSlider
                            images={premiereShows}
                            title="Premieres"
                            subtitle="Brand new release very Friday"
                            isDark={true} />
                    </div>
                </div>

                {/* --------------------------------------------------------------------------------------------- */}
                {/* ONLINE TV SHOWS */}
                <div className='container mx-auto pt-8 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2'>
                    <PosterSlider
                        images={popularTvshows}
                        title="Online TV Shows"
                        subtitle="Exclusives"
                        isDark={false} />
                </div>

                {/* -------------------------------------------------------------------------------------------------------- */}
                {/* ANIME SHOWS */}
                <div className='container mx-auto pt-8 pb-8 2xl:px-32 xl:px-10 lg:px-10 md:px-10 sm:px-2'>
                    <PosterSlider
                        images={anime}
                        title="Anime"
                        subtitle="Peak Fiction"
                        isDark={false} />
                </div>
            </>

        )
    }
}

export default HomePage