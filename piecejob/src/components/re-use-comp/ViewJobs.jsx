import React, { useState, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaCheckCircle, FaClock, FaMoneyBillAlt, FaSave } from 'react-icons/fa';
import JobDetailsOverlay from './JobDetailsOverlay';
import { useSnackbar } from 'notistack';
import LoginFormPopup from './LoginForm';
import { useSelector } from 'react-redux';

function ViewJobs({ searchResults }) {

    const currentUser = useSelector((state) => state.auth.currentUser);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedJob, setSelectedJob] = useState(null);
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1960/api/jobs/')
            .then(response => response.json())
            .then(data => {
                setFilteredJobs(data);
            })
            .catch(error => {
                enqueueSnackbar('Error fetching data', error,  { variant: 'error' });
            });
    }, []);

    const handleJobClick = async (job) => {
        setSelectedJob(job);
        console.log("currentUser :", currentUser)
        try {
            await fetch('http://localhost:1960/api/jobs/selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobId: job._id })
            });
        } catch (error) {
            enqueueSnackbar('Error updating selection count', { variant: 'error' });
        }
    };

    const handleCloseOverlay = () => {
        setSelectedJob(null);
    };

    const openLoginForm = () => {
        setIsLoginFormOpen(true);
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
        if (filteredJobs.length === 0) {
            return <p className='text-2xl text-gray-950'> No search results found </p>;
        }
        return filteredJobs.map((job) => (            
                    <div key={job._id}
                        className={`p-4 mb-4 border rounded border-gray-300 bg-white ${selectedJob === job ? 'bg-blue-100' : ''}`}
                        onClick={() => handleJobClick(job)}
                    >
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{job.title}</h1>
                            <div className='flex items-center ml-2'>
                                <p className='bg-green-500 text-sm py-1 px-2 rounded text-white' style={{ borderRadius: '10%' }}>
                                    {job.status}
                                </p>
                            </div>
                            <div className='flex items-center ml-auto'>
                                <FaMoneyBillAlt className='mr-1' />
                                <p className='text-gray-600 text-sm py-1 px-2 rounded'>
                                    R{job.salary}
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

                            <div className='flex items-center ml-auto'>
                                <FaClock className='mr-1' />
                                <p className='text-gray-600 text-sm py-1 px-1.5 rounded'>
                                    {job.period}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center mt-2'>
                            <div className='flex items-center'>
                                <FaCheckCircle className='mr-1' />
                                <h5 className='text-sm'>{job.description}</h5>
                            </div>

                            <button className='flex items-center ml-auto bg-blue-500 p-1 text-white rounded'>
                                <FaSave className='mr-1' />
                                Save
                            </button>
                        </div>

                        <div className='flex justify-center mt-4'>
                            <div className='border-b-2 border-gray-300' style={{ width: '99%' }}></div>
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
                    <JobDetailsOverlay selectedJob={selectedJob} onClose={handleCloseOverlay} />
                    {isLoginFormOpen && (<LoginFormPopup onClose={closeLoginForm} />)}
                </div>
            </div>
        </div>
    );
}


export default ViewJobs;