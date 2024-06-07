import React from 'react';
// icons
import { VscThumbsupFilled, VscThumbsdownFilled } from "react-icons/vsc";

const Comment = ({ comment, onLike, onDislike }) => {
    return (
        <div className="mb-4 p-4 flex border border-gray-200 rounded">
            <div className='flex w-full'>
                <p className='font-semibold'>{comment.user_id} :</p>
                <p className='px-2 w-11/12'>{comment.text}</p>

            </div>
            <div className="w-1/12 mr-4 gap-8 flex justify-end">
                <button
                    className="flex items-center gap-1 text-blue-500 hover:text-navRed-400"
                    onClick={onLike}
                >
                    <VscThumbsupFilled />
                    {comment.likes}
                </button>
                <button
                    className="flex items-center gap-1 text-gray-700 hover:text-navRed-400"
                    onClick={onDislike}
                >
                    <VscThumbsdownFilled />
                    {comment.dislikes}
                </button>
            </div>

        </div>
    );
};

export default Comment;