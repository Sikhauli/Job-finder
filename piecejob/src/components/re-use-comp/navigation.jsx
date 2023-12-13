import React, { useState, useEffect } from 'react';
import defaultPic from '../../assets/1.jpeg';
import logo from '../../assets/logo.jpeg';
import defaultUser from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';
import LoginFormPopup from './LoginForm';
import ProfileFormPopup from './LoginForm';
import { useSelector } from 'react-redux';
import { selectedUser } from "../redux/selectors"

const Navigation = ({ isLoggedIn, username }) => {

    const navigate = useNavigate();

    // const currentUser = useSelector(selectedUser);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleLoginPopup = () => {
        setShowLoginPopup(!showLoginPopup);
    };
    
    const toggleProfilePopup = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
        setShowDropdown(false);
    };

    const closeProfilePopup = () => {
        setShowLoginPopup(false);
        setShowDropdown(false);
    };

    console.log("currentUser :", currentUser)
 
    return (
        <nav className="bg-transparent border-b py-4 p-7">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src={logo}  
                        alt="Logo"
                        className="h-10 w-10"
                    />
                    <div className="text-blue-500 text-xl font-semibold">Job Search</div>
                </div>
                <div className="relative inline-block text-blue-500">
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        {currentUser ? (
                            <>
                                <img
                                    src={defaultUser} 
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => navigate('/profile')}
                                />
                                <div>{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</div>
                            </>
                        ) : (
                            <>
                                <img
                                    src={defaultUser} 
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                    onClick={toggleLoginPopup}
                                />
                                <div className="cursor-pointer text-blue-500" onClick={toggleLoginPopup}>
                                    Login
                                </div>
                            </>
                        )}
                    </button>
                    {showDropdown && !isLoggedIn && (
                        <div className="absolute top-10 right-0 bg-white p-2 space-y-2 shadow-md">
                            <div className="p-2 text-gray-700 cursor-pointer hover:bg-gray-100">  
                                {currentUser &&(
                                <span className="text-blue-500 cursor-pointer">
                                    Logout
                                </span>
                                )}
                              
                                {showLoginPopup && (
                                    <LoginFormPopup onClose={closeLoginPopup} />
                                )}
                            </div>
                        </div>
                    )}

                    {showDropdown && isLoggedIn && (
                        <div className="absolute top-10 right-0 bg-white p-2 space-y-2 shadow-md">
                            <div className="p-2 text-blue-500 cursor-pointer hover:bg-gray-100">
                                <span className="text-blue-500 cursor-pointer" onClick={toggleProfilePopup}>
                                    Logout
                                </span>
                                <span className="text-blue-500 cursor-pointer" onClick={toggleProfilePopup}>
                                    Profile
                                </span>
                                {showProfilePopup && (
                                    <ProfileFormPopup onClose={closeProfilePopup} />
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navigation;
