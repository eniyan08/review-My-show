import React from "react";
// component
import Navbar from "../components/Navbar/navbar.component";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <div className="bg-slate-100">
                <Navbar />
                {children}
            </div>
        </>
    );
};

export default DefaultLayout;
