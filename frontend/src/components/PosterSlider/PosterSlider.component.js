import React from "react";
import Slider from "react-slick";
// component
import Poster from "../Poster/poster.component";
// config
import settings from "../../config/PosterCarousal.config";

const PosterSlider = (props) => {
    return (
        <>
            <div className='flex flex-col items start px-3'>
                <h3 className={`text-2xl font-bold pb-1 ${props.isDark ? "text-white" : "text-gray-700"}`}>{props.title}</h3>
                <p className={`text-lg font-bold ${props.isDark ? "text-white" : "text-gray-700"}`}>{props.subtitle}</p>
            </div>

            <Slider {...settings}>

                {props.images.map((data, index) => {
                    return (
                        <Poster {...data}
                            key={index}
                            isDark={props.isDark}
                        />
                    )
                }
                )}
            </Slider>
        </>
    )
}

export default PosterSlider