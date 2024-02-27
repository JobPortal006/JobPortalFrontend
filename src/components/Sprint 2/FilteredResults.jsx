import React, { useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillAlt, faUser, faBuilding, faTools } from '@fortawesome/free-solid-svg-icons';
import "../Sprint 2/FIlteredResults.css";
import SearchBar from "../HomePage/searchBar";
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";

function FilteredResults(two) {
  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);

    console.log(two,"<===two");
    const twoArray = two.two;
  
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = twoArray.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleJobSelect = async (selectedJob) => {
        try {
            setLoading(true);
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
        } catch (error) {
            console.error('Error sending selected job data to the backend:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div>
      <Grid container>
     
      <Grid  >
            {loading ? (
                <div className="loading-popup">Loading...</div>
            ) : (
                <div className="job-container" style={{ marginTop: '60px' }}>
                    <SearchBar isJobSearchPage={true} />
                    {currentJobs.map((job, index) => (
                        <div key={index} className="job-card" onClick={() => handleJobSelect(job)}>
                            <div className="job-header">
                                <div className="job-title company-logo">
                                    {job.company_logo && job.company_logo.includes('data:image') ? (
                                        <img src={job.company_logo} alt="Company Logo" />
                                    ) : (
                                        <img src={`data:image/jpeg;base64,${job.company_logo}`} alt="Company Logo" />
                                    )}
                                    {job.company_name}
                                </div>
                                <div className="company-name " >{job.job_title}</div>
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
                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastJob >= currentJobs.length}>Next</button>
                    </div>
                </div>
            )}
            </Grid>
            </Grid>
            
            </div>
    );
}

export default FilteredResults;