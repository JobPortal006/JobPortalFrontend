import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillAlt, faUser, faBuilding, faTools } from '@fortawesome/free-solid-svg-icons';
import '../JobPostSample/JobPostSampleStyle.css';
import SearchBar from "../HomePage/searchBar";
import { useNavigate } from 'react-router-dom';

export const Newpost = () => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    console.log(jobs,"jobs")
    const [loading, setLoading] = useState(false); // Track loading state

    useEffect(() => { 
        async function fetchJobs() {
            try {
                setLoading(true); // Set loading state when fetching jobs starts
                const response = await fetch('http://192.168.1.39:8000/job_details_by_employeeType_view/');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const responseData = await response.json();
                console.log(responseData);
                const { status, statusCode, message, data } = responseData;
                if (status && statusCode === 200 && Array.isArray(data) && data.length > 0) {
                    setJobs(data); // Update jobs state with the fetched data
                } else {
                    console.error('Invalid data format received from API:', message);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false); // Reset loading state when fetching jobs completes
            }
        }   
        fetchJobs();
    }, []);

    const handleJobSelect = async (selectedJob) => {
        try {
            setLoading(true); // Set loading state when fetching job details starts
            const response = await fetch('http://192.168.1.39:8000/job_details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedJob),
            });
            if (!response.ok) {
                throw new Error('Failed to send selected job data to the backend');
            } else {
                navigate('/JobDetails');
            }
            console.log('Selected job data sent successfully:', selectedJob);
            // Add any further handling as needed
        } catch (error) {
            console.error('Error sending selected job data to the backend:', error);
        } finally {
            setLoading(false); // Reset loading state when fetching job details completes
        }
    };
    return (
        <>
            {loading ? (
                <div className="loading-popup">Loading...</div> // Render loading popup
            ) : (
                <div className="job-container">
                    <SearchBar isJobSearchPage={true} />
                    {jobs.map((job, index) => (
                        <div key={index} className="job-card" onClick={() => handleJobSelect(job)}>
                            <div className="job-header">
                                <div className="job-title">{job.job_title}</div>
                                <div className="company-name">{job.company_name}</div>
                            </div>
                            <div className="job-details">
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faMapMarkerAlt} /> Location:</span> {job.location}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faMoneyBillAlt} /> Salary:</span> {job.salary_range}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faUser} /> Job Type:</span> {job.employee_type}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faTools} /> Qualification:</span> {job.job_role}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faUser} /> Experience:</span> {job.experience}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faBuilding} /> Vacancies:</span> {job.no_of_vacancies}
                                </div>
                                <div className="detail">
                                    <span className="detail-label"><FontAwesomeIcon icon={faTools} /> Skills:</span> {job.skills ? job.skills.join(', ') : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </> 
    );
}