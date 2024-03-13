import React, { useState,useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillAlt, faUser, faBuilding, faTools } from '@fortawesome/free-solid-svg-icons';
import "../Sprint 2/FIlteredResults.css";
import SearchBar from "../HomePage/searchBar";
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";
import UserContext from "./contextFilter";
import BASE_URL from '../CommonAPI';


function FilteredResults() {
  
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);
    const { searchJob, oneData ,companyList} = useContext(UserContext);
    console.log(searchJob,'=====raghul data1')
    console.log(oneData,'=====raghul data2')


    useEffect(()=>{},[searchJob,oneData,companyList])
    // Determine which data to use for rendering
    const dataToUse = searchJob ? searchJob : oneData || companyList?.data ;
  
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = dataToUse?.slice(indexOfFirstJob, indexOfLastJob);
 
    

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleJobSelect = async (selectedJob) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/job_details/`, {
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
                <div className="job-result" style={{ marginTop: '60px' }}>
                <SearchBar isJobSearchPage={true} />
                    {currentJobs.map((job, index) => (
                        <div key={index} className="job-box" onClick={() => handleJobSelect(job)}>
                            <div className="job-top">
                                <div className="job-heading company-img">
                                    {job.company_logo_path && job.company_logo_path.includes('data:image') ? (
                                        <img src={job.company_logo_path} alt="Company Logo" />
                                    ) : (
                                        <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.company_logo_path}`} alt="Company Logo" />
                                    )}
                                    {job.company_name}
                                </div>
                                <div className="company-view " >{job.job_title}</div>
                            </div>
                            <div className="job-brief">
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faMapMarkerAlt} /> Location:</span> {job.location}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faMoneyBillAlt} /> Salary:</span> {job.salary_range}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faUser} /> Job Type:</span> {job.employee_type}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faTools} /> Qualification:</span> {job.qualification ? job.qualification.join(','):''}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faUser} /> Experience:</span> {job.experience}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faBuilding} /> Vacancies:</span> {job.no_of_vacancies}
                                </div>
                                <div className="brief">
                                    <span className="brief-label"><FontAwesomeIcon icon={faTools} /> Skills:</span> {job.skills ? job.skills.join(', ') : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastJob >= oneData.length}>Next</button>
                    </div>
                </div>
            )}
            </Grid>
            </Grid>
            
            </div>
    );
}

export default FilteredResults;
