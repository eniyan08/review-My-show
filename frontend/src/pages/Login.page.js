import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// axios
import axios from 'axios';

const Login = () => {
    // const API_URL = '/api';
    const API_URL = 'http://localhost:5000';

    const [form, setForm] = useState({
        username_or_email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const validate = () => {
        const errors = {}
        if (!form.username_or_email) {
            errors.username_or_email = 'Username or Email is required'
        }
        if (!form.password) errors.password = 'Password is required'
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }
        else {
            try {
                const response = await axios.post(`${API_URL}/auth/login`, form);
                const token = response.data.token
                const username = response.data.username
                const setToken = (token, username, expiresIn) => {
                    const expiryTime = new Date().getTime() + expiresIn * 1000;
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', username)
                    localStorage.setItem('expiryTime', expiryTime)
                }
                setToken(token, username, 3600) // token expires in 1 hour
                setForm({
                    username_or_email: '',
                    password: ''
                })
                navigate('/home')
            } catch (error) {
                setErrors({ server: 'Invalid username/email or password' })
            }
        }
    }

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

                <h2 className="text-md mt-4 font-semibold mb-2 text-gray-600 text-start">Login to your account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username_or_email"
                            name="username_or_email"
                            value={form.username_or_email}
                            onChange={handleChange}
                            placeholder='Your username or email'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {errors.username_or_email && <p className="text-red-500 text-sm">{errors.username_or_email}</p>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Your password'
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                        Log In
                    </button>
                    <div></div>
                    <p className="block text-md font-medium text-gray-600 py-4">Don't have an account?</p>
                    <Link to='/signup' className="block w-full bg-blue-500 text-center text-white py-2 rounded-md">
                        Sign Up
                    </Link>
                    {errors.server && <p className="text-red-500 text-sm mt-4">{errors.server}</p>}
                </form>
            </div>
        </>
    )
}

export default Login
