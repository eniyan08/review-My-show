import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// axios
import axios from "axios";
// react-icons
import { FaPlayCircle } from 'react-icons/fa';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { VscThumbsupFilled, VscThumbsdownFilled } from "react-icons/vsc";
// component
import Comment from "../components/Comments/comments.component";


const Info = () => {

    const username = localStorage.getItem('username')

    // --------------------------------------------------------------------------------------

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/home')
    }

    const { id } = useParams();
    const [info, setInfo] = useState([])

    useEffect(() => {
        const requestInfo = async () => {
            const getInfo = await axios.get(`http://localhost:5000/info/${id}`)
            setInfo(getInfo.data)
        }
        requestInfo()

    }, [id])

    // --------------------------------------------------------------------------------

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/info/comment/${id}`)
                setComments(response.data)
            } catch (error) {
                console.error("Error fetching comments:", error)
            }
        };

        fetchComments();
    }, [id]);

    // -------------------------------------------------------------------------------------------------------------------------------

    const handlePostComment = async () => {
        await axios.post('http://localhost:5000/info/comment', { movie_id: id, username: username, text: commentText })
            .then(response => {
                const fetchComments = async () => {
                    try {
                        const response = await axios.get(`http://localhost:5000/info/comment/${id}`)
                        setComments(response.data)
                    } catch (error) {
                        console.error("Error fetching comments:", error)
                    }
                };

                fetchComments();
                setComments([...comments, response.data]);
                setCommentText("");

            })
            .catch(error => console.error(error));
    };

    // -----------------------------------------------------------------------------------------------------------------------

    const handleLikeComment = async (commentId) => {
        await axios.post('http://localhost:5000/info/comment/like', { movie_id: id, comment_id: commentId })
            .then(response => {
                setComments(comments.map(comment => {
                    if (comment.comment_id === commentId) {
                        return { ...comment, likes: comment.likes + 1 };
                    }
                    return comment;
                }));
            })
            .catch(error => console.error(error));
    };

    // -------------------------------------------------------------------------------------------------------------------------

    const handleDislikeComment = async (commentId) => {
        await axios.post('http://localhost:5000/info/comment/dislike', { movie_id: id, comment_id: commentId })
            .then(response => {
                setComments(comments.map(comment => {
                    if (comment.comment_id === commentId) {
                        return { ...comment, dislikes: comment.dislikes + 1 };
                    }
                    return comment;
                }));
            })
            .catch(error => console.error(error));
    };

    // ----------------------------------------------------------------------------------

    const [yes, setYes] = useState(false)
    const handleYes = () => {
        setYes(true)
    }
    const handleNo = () => {
        setYes(false)
    }

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    //   -----------------------------------------------------------------------------------------

    if (!info) return <div>Loading...</div>;

    return (
        <>
            <div className="mt-24">
                <div className="relative w-full h-full">
                    <div className="absolute w-full h-full"
                        style={{ backgroundImage: "linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%)" }}
                    />
                    <div className="w-full h-96" style={{ height: "24rem" }}>
                        <img src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                            alt="poster"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute flex w-full h-96 top-10">
                        <div className="absolute container  mx-auto flex w-full h-full">
                            <div className="ml-10 w-fit h-fit text-white ">
                                <FaLongArrowAltLeft className=" hover:text-red-600"
                                    onClick={handleBack} />
                            </div>
                            <img src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                                alt="poster"
                                className="h-80 w-60 rounded-lg ml-12"
                            />
                            <div className="flex flex-col text-white pl-8 ">
                                <div className="flex gap-2 bg-gray-800 w-fit rounded-full pr-2">
                                    <FaPlayCircle className="text-red-600 mt-1" />
                                    <span className="font-semibold">PREMIERE</span>
                                </div>
                                {/* <span className="mt-2">Brand new releases every Friday</span> */}
                                <span className="text-3xl font-bold pt-4">{info.title}</span>
                                <span className="pt-4">English</span>
                                <span className="pt-4">Release date: {info.release_date}</span>
                                <span className="pt-4">Rating: {info.vote_average}/10</span>
                                <span className="pt-4 w-5/6">{info.overview}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-6 my-4 px-6 pt-2 pb-4 border border-gray-300 rounded-lg shadow-md">
                    <div className="flex py-2 text-start gap-3 pl-12">

                        <h3 className="mt-1 font-bold text-lg text-gray-700">Have you watched this movie?</h3>
                        <IoMdCheckmark onClick={handleYes}
                            className="mt-2 w-5 h-5 bg-blue-500 hover:bg-green-500 rounded-sm text-white" />
                        <RxCross2 onClick={handleNo}
                            className="mt-2 w-5 h-5 bg-gray-700 hover:bg-red-500 rounded-sm text-white" />


                        {yes && <div className="flex gap-3 pl-64">
                            <h3 className="mt-1 font-bold text-lg text-gray-700">Do you like it?</h3>
                            <VscThumbsupFilled className="mt-2 w-5 h-5 text-blue-500 hover:text-green-500" />
                            <VscThumbsdownFilled className="mt-2 w-5 h-5 text-gray-700 hover:text-red-500" />
                            <div className="flex gap-3 pl-64">
                                <h3 className="mt-1 font-bold text-lg text-gray-700">Give us your rating :</h3>
                                <div className="flex space-x-1 ">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`text-2xl ${index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => {
                                                    setHover(index)
                                                    console.log(rating)
                                                }
                                                }
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                                <span className="star">&#9733;</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        }

                    </div>
                </div>
                <div className="mx-6 p-6 flex flex-col border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="pl-12 font-bold text-2xl text-gray-700">Comments Section</h2>
                    <div className=" px-12 py-6 w-full">
                        <div className="mb-4">
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Write a comment about this movie..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handlePostComment}
                            >
                                Post Comment
                            </button>
                        </div>
                        <div>
                            {comments.map((comment, index) => (
                                <Comment
                                    key={index}
                                    comment={comment}
                                    onLike={() => handleLikeComment(comment.comment_id)}
                                    onDislike={() => handleDislikeComment(comment.comment_id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info