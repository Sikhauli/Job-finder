
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';


function JobDetailsOverlay({ selectedJob, onClose, isLoggedIn, openLoginPopup, handleCloseOverlay }) {

    const { enqueueSnackbar } = useSnackbar();
    const currentUser = useSelector((state) => state.auth.currentUser);

    if (!selectedJob) {
        return null;
    }

    const handleApplyClick = async () => {
        try {
            if (!currentUser) {
                openLoginPopup();
                return;
            }
            const response = await fetch('http://localhost:1960/api/jobs/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId: selectedJob._id,
                    userId: currentUser._id, 
                }),
            });

            if (response.ok) {
                enqueueSnackbar('Job applied successfully', { variant: 'success' });
                handleCloseOverlay()
            } else {
                const data = await response.json();
                enqueueSnackbar(data.message || 'Failed to apply for the job', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error applying for job:', error);
            enqueueSnackbar(error, { variant: 'error' });
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-md w-2/4 shadow-md w-96 h-96 overflow-y-hidden relative">
                <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
                    <FaTimes className="text-xl" />
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{selectedJob.title}</h2>
                <p className="text-gray-700 mb-6">{selectedJob.description}</p>
                <div className="text-gray-600">
                    <p className="mb-2"><strong>Location:</strong> {selectedJob.location}</p>
                    <p className="mb-2"><strong>Company:</strong> {selectedJob.company}</p>
                    <p className="mb-2"><strong>Salary:</strong> {selectedJob.salary}</p>
                </div>
                <div className="mt-20 flex justify-end space-x-4">  
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 px-4 py-2 rounded" onClick={handleApplyClick}>
                            Apply Now
                        </button>
                </div>
            </div>
        </div>
    );
}

export default JobDetailsOverlay;
