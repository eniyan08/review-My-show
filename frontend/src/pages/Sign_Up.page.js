import React, { useState } from 'react';
// axios
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Sign_Up = () => {
    // const API_URL = '/api';
    const API_URL = process.env.REACT_APP_API_URL;

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const validate = () => {
        const errors = {};
        if (!form.username) errors.username = 'Username is required';
        if (!form.email) errors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email address is invalid';
        if (!form.password) errors.password = 'Password is required';
        if (form.password.length > 0 && form.password.length < 6) errors.password = 'Password must be at least 6 characters long';
        return errors;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // e.preventDefault() is called to prevent the default behavior of the form submission, 
        // which would normally cause the page to reload. This allows you to handle the form submission with JavaScript instead.

        const validationErrors = validate();

        // This line calls a function named validate and stores its return value in the validationErrors constant.
        // The validate function is expected to check the form's input fields for any errors (such as missing required fields, incorrect formats, etc.) 
        // and return an object containing any validation errors it finds.

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await axios.post(`${API_URL}/auth/signup`, form);
                setSuccess(response.data.message);
                setForm({
                    username: '',
                    email: '',
                    password: ''
                });

                navigate('/')
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrors({ server: error.response.data.message });
                } else {
                    // Handle cases where error.response is undefined
                    console.error('Error:', error);
                    setErrors({ server: 'An unexpected error occurred. Please try again later.' });
                }
            }
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-32 p-6 border border-gray-300 rounded-lg shadow-md">
                <div className='flex flex-col py-2 text-center'>
                    <h1 className='text-2xl font-bold text-gray-600 py-2'>Welcome to</h1>
                    <div className="flex text-4xl font-bold place-content-center">
                        <h2 className="text-gray-400">review</h2>
                        <h2 className="text-red-500">my</h2>
                        <h2 className="text-gray-400">show</h2>
                    </div>
                </div>
                <h2 className="text-md font-semibold mt-4 mb-2 text-gray-600 text-start">Sign up to begin</h2>
                {success && <p className="text-green-500">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Username'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 mb-5 rounded-md">
                        Sign Up
                    </button>
                    {!errors.server && <Link to='/' className='text-sm text-blue-500'>Back to Login?</Link>}
                    {errors.server && <div className='flex text-sm'>
                        <p className="text-red-500">{errors.server}.</p>
                        <Link to='/' className='text-blue-500 ml-2'>Back to Login?</Link>
                    </div>}
                </form>
            </div>
        </>
    );
};

export default Sign_Up;
