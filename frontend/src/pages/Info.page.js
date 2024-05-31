import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
// axios
import axios from "axios";

const Info = () => {
    const { id } = useParams();
    const [info, setInfo] = useState([])
    useEffect(() => {
        const requestInfo = async () => {
            const getInfo = await axios.get(`http://localhost:5000/info/${id}`)
            console.log(getInfo.data)
            setInfo(getInfo.data)

        }
        requestInfo()

    }, [])
    console.log("info:", info)
    if (!info) return <div>Loading...</div>;
    return (
        <>
            <h2 className="pt-28">This is Info page</h2>
            <p>Movie ID: {id}</p>
            <p>Title:{info.title}</p>
            <p>Release Date:{info.release_date}</p>

        </>
    )

}
export default Info