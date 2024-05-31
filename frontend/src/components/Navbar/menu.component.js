import React, { useState } from 'react'
import { AiOutlineBell, AiOutlineRight } from 'react-icons/ai';
import { RiYoutubeLine } from 'react-icons/ri';
import { IoTicket, IoSettingsOutline, IoGiftOutline } from 'react-icons/io5';
import { BsCreditCard2Back, BsChatDots, BsCartCheck } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx'

const Menu = (props) => {
    const handleCloseMenu = () => {
        props.parentCallback()
    }
    return (
        <>
            <div className='fixed top-0 right-0  z-20 border border-gray-400 shadow-2xl shadow-zinc-500'>
                <div className='flex flex-col'>
                    <div className='flex bg-navColor-800 text-white text-lg font-bold w-full px-3 py-4'>
                        <h2>Hey!</h2>
                        <button onClick={handleCloseMenu}>
                            <RxCross2 className='absolute right-2 top-5 w-5 h-5 text-white' />
                        </button>
                    </div>
                    <div className='flex bg-white px-3 py-3 '>
                        <img src='https://in.bmscdn.com/webin/movies/superstar/rewards_login.png'
                            className='rounded-full w-10 h-10 mt-1' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Unlock special offers &</h3>
                            <h3 className='text-gray-900'>great benefits</h3>
                        </div>
                        <div className='mt-2 px-2' >
                            <button className='border rounded-md border-red-600 text-sm text-red-600 px-2 pt-1 pb-2'>Login / Register</button>
                        </div>
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <AiOutlineBell className=' w-5 h-5 mt-2' />
                        <h3 className='text-gray-900 mt-1 px-3'>Notifications</h3>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer ' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <BsCartCheck className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Your Orders</h3>
                            <h3 className='text-gray-800 text-xs'>View all your bookings and purchases</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <RiYoutubeLine className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Stream Library</h3>
                            <h3 className='text-gray-800 text-xs'>Rented & Purchased Movies</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <BsCreditCard2Back className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Play Credit Card</h3>
                            <h3 className='text-gray-800 text-xs'>View your Play Credit Card details and offers</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer ' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <BsChatDots className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Help & Support</h3>
                            <h3 className='text-gray-800 text-xs'>View commonly asked queries and Chats</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer ' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <IoSettingsOutline className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Account & Settings</h3>
                            <h3 className='text-gray-800 text-xs'>Location, Payments, Permissions & More</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer ' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <IoGiftOutline className=' w-5 h-5 mt-3' />
                        <div className='flex flex-col px-3'>
                            <h3 className='text-gray-900'>Rewards</h3>
                            <h3 className='text-gray-800 text-xs'>View your rewards and unlock new ones</h3>
                        </div>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer ' />
                    </div>
                    <hr />
                    <div className='flex bg-slate-50 px-3 pt-2 pb-3'>
                        <IoTicket className=' w-5 h-5 mt-2' />
                        <h3 className='text-gray-800 mt-1 px-3'>Book a smile</h3>
                        <AiOutlineRight className='absolute right-4 w-3 h-3 text-gray-600 mt-3 hover:text-red-600 cursor-pointer' />
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default Menu