import React from "react";
import { Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
// navigate
import { useNavigate } from 'react-router-dom';

const SecondaryNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <nav className="bg-gray-800 py-2 hidden lg:block">
                <div className="container mx-auto flex items-start gap-3 2xl:px-28 xl:px-12 lg:px-6 py-1 justify-between hover:text-white">
                    <div className="flex items-center gap-4 px-7 text-gray-300 text-sm">
                        <Link className="hover:text-red-500 text-md"
                            to='/home'>Home</Link>
                        <Link to='/movies' className="hover:text-red-500 cursor-pointer">Movies</Link>
                        <Link to='' className="hover:text-red-500 cursor-pointer">Series</Link>
                        <Link to='/tv_shows' className="hover:text-red-500 cursor-pointer">TV Shows</Link>
                    </div>

                </div>

            </nav>
        </>
    )
}



export default SecondaryNav