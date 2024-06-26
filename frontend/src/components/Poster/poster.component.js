import React from "react"
import { Link } from 'react-router-dom'
const Poster = (props) => {

    return (
        <>
            <div className="flex flex-col items-start px-3 pt-3">
                <Link to={{
                    pathname: `/info/${props.type}/${props.id}`,
                }}
                    className="lg:h-80 md:h-60 sm:h-50 rounded-xl">
                    <img
                        src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
                        alt={props.original_title}
                        className=" w-full h-full rounded-xl" />
                </Link>
                <h3 className={`text-lg font-bold pt-2 ${props.isDark ? "text-white" : "text-gray-700"}`}>
                    {props.title}
                    {props.name}
                </h3>
            </div>
        </>
    )
}

export default Poster