import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
// react-icons
import { BiSearch } from "react-icons/bi"
import { MdMenu } from "react-icons/md";
// components
import SecondaryNav from "./secondarynav.component";
import Menu from "./menu.component";
// data context
import { DataContext } from "../../context/Data.context";

const NavLg = () => {

    const { clearData } = useContext(DataContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        clearData()
        navigate('/')
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleMenuToggle = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-20 flex flex-col bg-gray-700">
                <div className="container mx-auto py-2 2xl:px-32 xl:px-16 lg:px-10 py-1 flex items-center justify-between">
                    <div className="flex items-center w-1/2 pl-2">
                        <div className="w-72 h-12">
                            <div className="flex text-2xl font-semibold pl-2 pt-1">
                                <h2 className="text-gray-200">review</h2>
                                <h2 className="text-red-500">my</h2>
                                <h2 className="text-gray-200">show</h2>
                            </div>
                        </div>

                        <div className="w-full flex items-center pl-2 bg-white gap-3 px-2 py-2 rounded-md">
                            <BiSearch type="button" />
                            <input type="search" className="w-full focus:outline-none" placeholder="Search for Movies, TV Shows, Series and Drama" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-6">

                        <button onClick={handleLogout}
                            className="hover:text-gray-800 hover:bg-white bg-navRed-400 text-white text-sm rounded-sm px-2 pb-1">
                            Log out
                        </button>
                        <div className="w-8 h-8 text-white">
                            <MdMenu
                                onClick={handleMenuToggle}
                                className="w-full h-full hover:text-red-500"
                            />
                        </div>
                    </div>
                </div>
                <SecondaryNav />
            </div>

            {isMenuOpen && (
                <div ref={menuRef}>
                    <Menu parentCallback={handleMenuToggle} />
                </div>
            )}
        </>
    )
}

const Navbar = () => {
    return (
        <>
            <div className="hidden lg:block">
                <NavLg />
            </div>
        </>
    )
}

export default Navbar