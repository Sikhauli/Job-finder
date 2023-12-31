import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { loginUser, registerUser } from '../redux/api';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch, useSelector } from "react-redux";

const LoginFormPopup = ({ onClose, isLoginFormOpen }) => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [activeForm, setActiveForm] = useState("form1");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        form1: {
            email: "",
            password: ""
        },
        form2: {
            username: "",
            email: "",
            password: "",
        },
    });

    const handleInputChange = (formName, fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [formName]: {
                ...prevData[formName],
                [fieldName]: value,
            },
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { token, user } = await loginUser(formData.form1, dispatch);
            onClose();
        } catch (error) {
            enqueueSnackbar('Login failed', { variant: 'error' });
        }
        finally{
            dispatch(hideLoading());
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const { token, user } = await registerUser(formData.form2, dispatch);
            enqueueSnackbar('Registration successful', { variant: 'success' });
            onClose();
        } catch (error) {
            enqueueSnackbar('Registration failed', { variant: 'error' });
        }
        finally{
            dispatch(hideLoading());
        }
    };

    const handleClickInside = (e) => {
        e.stopPropagation();
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.popup') && isLoginFormOpen) {
            onClose();
        }
    };

    const switchToRegister = () => {
        setActiveForm("form2");
    };

    const switchToLogin = () => {
        setActiveForm("form1");
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
            {loading && <div>Loading...</div>}
            {activeForm === "form1" && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
                    <div className="bg-white p-6 rounded-lg w-2/4 shadow-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Login</h2>
                        <form className='w-full mt-8' onSubmit={handleLoginSubmit} onClick={handleClickInside}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.form1.email}
                                    onChange={(e) =>
                                        handleInputChange("form1", "email", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.form1.password}
                                    onChange={(e) =>
                                        handleInputChange("form1", "password", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className='mt-10'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-500 ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={switchToRegister} 
                                >
                                    To Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeForm === "form2" && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
                    <div className="bg-white p-6 rounded-lg w-2/4 shadow-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Register</h2>
                        <form className='w-full mt-8' onSubmit={handleRegisterSubmit} onClick={handleClickInside}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium">
                                    Username
                                </label>
                                <input
                                    type="string"
                                    id="username"
                                    value={formData.form2.username}
                                    onChange={(e) =>
                                        handleInputChange("form2", "username", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.form2.email}
                                    onChange={(e) =>
                                        handleInputChange("form2", "email", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.form2.password}
                                    onChange={(e) =>
                                        handleInputChange("form2", "password", e.target.value)
                                    }
                                    className="w-full border rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className='mt-10'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Register
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-500 ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={switchToLogin} 
                                >
                                    To Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginFormPopup;
