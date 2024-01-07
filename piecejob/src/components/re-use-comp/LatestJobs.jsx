import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loadingslice";
import {
    API,
    getAxiosError,
    API_BASE_URL,
    JOB_ENDPOINTS
} from "../../helpers/constants"

function LatestJobs() {

    const [searchResults, setSearchResults] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobIdsOnly, setJobIdsOnly] = useState([]);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetch(`${API_BASE_URL}${JOB_ENDPOINTS.selection}`)
            .then(response => response.json())
            .then(data => {
                const limitedData = data.slice(0, 5);
                const jobIdsOnly = limitedData.map(item => item.jobId);
                setJobIdsOnly(jobIdsOnly)
                setSearchResults(jobIdsOnly);
            })
            .catch(error => {
                enqueueSnackbar(error, { variant: 'error' });
            })
            .finally(() => {
                // dispatch(hideLoading());
            });
    }, [enqueueSnackbar, jobIdsOnly]);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    return (
        <div className='flex justify-center items-center h-screen bg-white mr-2' style={{ overflow: 'auto', overflowY: 'scroll' }}>
            <div className='w-full h-screen bg-white'>
                <nav className='w-full bg-transparent'>
                    <div className='flex justify-cente h-20 bg-transparent'>
                        <div className='w-full p-8 bg-white bg-transparent'>
                            <nav className='w-full flex justify-between items-center mb-4'>
                                <div className='relative'>
                                    <span className='mr-2 text-black-500'>TOP JOBS</span>
                                </div>
                            </nav>
                        </div>
                    </div>
                </nav>

                <div>

                    {

                        searchResults.map((job) => (
                            <div key={job?._id}
                                className={`p-4 mb-4 border text-xs rounded border-gray-300 bg-white ${selectedJob === job ? 'bg-blue-100' : ''}`}
                                onClick={() => handleJobClick(job)}
                            >
                                <div className='flex items-center'>
                                    <h1 className='text-xs font-semibold'>{job?.title}</h1>
                                    <div className='flex items-center ml-auto'>
                                        <p className='text-gray-600 text-xs py-1 px-2 rounded'>
                                            R{job?.salary}
                                        </p>
                                    </div>

                                </div>
                                <div className='flex items-center mt-2'>
                                    
                                  
                                </div>
                                <div className='flex items-center'>
                                    <h5 className='text-xs'>{job?.description}</h5>
                                </div>

                                <div className='flex justify-center mt-4'>
                                    <div className='border-b-2 border-gray-300' style={{ width: '99%' }}></div>
                                </div>

                                    { selectedJob === job && (
                                    <div className='bg-gray-100 p-4 mt-4 rounded text-xs'>
                                            <p>Location: {job?.location}</p> {/*  change all this and put job skills  */}
                                            <p>Company: {job?.company}</p>
                                        </div>
                                    )}

                            </div>
                        ))}

                </div>

            </div>
        </div>
    );
}



export default LatestJobs;
