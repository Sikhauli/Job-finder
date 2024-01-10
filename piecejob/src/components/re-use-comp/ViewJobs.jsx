import React, { useState, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaCheckCircle, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
import { GrSave } from "react-icons/gr";
import JobDetailsOverlay from './JobDetailsOverlay';
import { useSnackbar } from 'notistack';
import LoginFormPopup from './LoginForm';
import { useSelector } from 'react-redux';
import {
    API,
    getAxiosError,
    API_BASE_URL,
    JOB_ENDPOINTS,
    SAVED_ENDPOINTS
} from "../../helpers/constants"
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/loadingslice";
import { useDispatch } from "react-redux";

function ViewJobs({ searchResults }) {

    const currentUser = useSelector((state) => state.auth.currentUser);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedJob, setSelectedJob] = useState(null);
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoading());
        API.get(`${JOB_ENDPOINTS.get}`)
            .then(response => response.data)
            .then(data => {
                setFilteredJobs(data);
            })
            .catch(error => {
                enqueueSnackbar('Error fetching data', error, { variant: 'error' });
            })
            .finally(() => {
                dispatch(hideLoading());
            });
    }, []);

    const handleJobClick = async (job) => {
        dispatch(showLoading());
        setSelectedJob(job);
        try {           
            await API.post(`${JOB_ENDPOINTS.selection}`, { jobId: job._id });
        } catch (error) {
            enqueueSnackbar('Error updating selection count', { variant: 'error' });
        } finally {
            dispatch(hideLoading());
        }
    };

    const handleSaveClick = async (jobId) => {
        dispatch(showLoading());
        if(!currentUser){
            enqueueSnackbar('Login First to save Jobs', { variant: 'error' });
        }
        try {
            const response = await API.post(`${SAVED_ENDPOINTS.add}`, {
                jobId,
                userId: currentUser._id
            });
            enqueueSnackbar(response.data.message, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
        }finally{
            dispatch(hideLoading());
        }
    };

    const handleCloseOverlay = () => {
        setSelectedJob(null);
    };

    const openLoginPopup = () => {
        setIsLoginFormOpen(true);
        setSelectedJob(null)
    };

    const closeLoginForm = () => {
        setIsLoginFormOpen(false);
    };

   useEffect(() => {
        if (searchResults.length > 0) {
            setFilteredJobs(searchResults);
        }
    }, [searchResults]);

    const renderJobs = () => {
        return filteredJobs.map((job) => (            
                    <div key={job._id}
                        className={`p-4 w-auto mb-4 border rounded border-gray-300 bg-white ${selectedJob === job ? 'bg-blue-100' : ''}`}
                        onClick={() => handleJobClick(job)}
                    >
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{job.title}</h1>
                            <div className='flex items-center ml-2'>
                                <p className='bg-green-500 text-sm py-1 px-2 rounded text-white' style={{ borderRadius: '10%' }}>
                                    {job.status}
                                </p>
                            </div>
                           

                        </div>
                        <div className='flex items-center mt-2'>
                            <div className='flex items-center'>
                                <FaBuilding className='mr-1' />
                                <h5 className='text-sm'>{job.company}</h5>
                            </div>
                            <div className='flex items-center ml-2'>
                                <FaMapMarkerAlt className='mr-1' />
                                <p className='text-black text-sm py-1 px-0 rounded'>
                                    {job.location}
                                </p>
                            </div>

                            
                        </div>

                        <div className='flex items-center mt-2'>
                            <div className='flex items-center'>
                                <FaCheckCircle className='mr-1' />
                                <h5 className='text-sm'>{job.description}</h5>
                            </div>

                            
                        </div>

                        <div className='flex justify-center mt-4'>
                            <div className='border-b-2 border-gray-300' style={{ width: '99%' }}></div>
                        </div>
                        <div className="flex mt-2">
                            <div className='flex bg-gray-200 border border-blue-400 p-2 items-center mr-2'>
                                <FaMoneyBillAlt className='mr-1' />
                                <p className='text-gray-600 text-sm py-1 px-2 rounded'>
                                    R{job.salary}
                                </p>
                            </div>
                            <div className='flex bg-gray-200 border border-blue-400 p-2 items-center mr-2'>
                                <FaClock className='mr-1' />
                                <p className='text-gray-600 text-sm py-1 px-1.5 rounded'>
                                    {job.period}
                                </p>
                            </div>
                            <button className='flex bg-blue-500 border border-blue-400 p-2 items-center mr-2 rounded ml-auto'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveClick(job._id);
                                }}
                            >
                                <GrSave className='mr-1' />
                                Save
                            </button>
                        </div>
                       
                    </div>
                ))
            
    };

    return (
        <div className='flex justify-center items-center h-screen bg-white overflow-auto overflow-y-scroll'>
            <div className='w-full h-screen bg-white'>
                <nav className='w-full bg-transparent'>
                    <div className='flex justify-cente h-20 bg-transparent'>
                        <div className='w-full p-8 bg-white bg-transparent'>
                            <nav className='w-full flex justify-between items-center mb-4'>
                                <div className='text-lg font-semibold'>RESULTS ({filteredJobs.length})</div>
                                <span className='ml-auto mr-2 text-gray-600'>Sort by:</span>
                                <select className='p-2 bg-white border border-gray-300 rounded'>
                                    <option>Relevance</option>
                                    <option>Date</option>
                                    <option>Popularity</option>
                                </select>
                            </nav>
                        </div>
                    </div>
                </nav>
                <div>

                    {renderJobs()}
                    <JobDetailsOverlay 
                        selectedJob={selectedJob}
                        onClose={handleCloseOverlay}
                        isLoggedIn={!!currentUser}
                        openLoginPopup={openLoginPopup}
                        handleCloseOverlay={handleCloseOverlay}
                    />
                    {isLoginFormOpen && (<LoginFormPopup onClose={closeLoginForm} />)}
                </div>
            </div>
        </div>
    );
}


export default ViewJobs;