import React, { useState,useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMoneyBillAlt, faUser, faBuilding, faTools } from '@fortawesome/free-solid-svg-icons';
import "../Sprint 2/FIlteredResults.css";
// import SearchBar from "../HomePage/searchBar";
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import UserContext from "./contextFilter";
import BASE_URL from '../CommonAPI';
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { FaClock  } from "react-icons/fa";
import { BsClipboardCheckFill ,BsFillBookmarksFill  } from "react-icons/bs";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


function FilteredResults() {
  
    const navigate = useNavigate();
    const [errorTwo, setErrorTwo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);

    const { searchJob, oneData ,companyList, jobData} = useContext(UserContext);
    console.log(searchJob,'=====raghul data1')
    console.log(oneData,'=====raghul data2')
    


    useEffect(()=>{},[searchJob,oneData,companyList])

    // Determine which data to use for rendering
    const dataToUse = searchJob ? searchJob : oneData || companyList?.data || jobData?.data;


   

   

    console.log(dataToUse,"<====DATATOUSE");
  
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = dataToUse?.slice(indexOfFirstJob, indexOfLastJob);

    useEffect(() => {
        console.log("Hello");
    }, []);
 
    console.log(currentJobs,"<===CurrentJobs");
    const [noResult, setNoResult] = useState(false)

    if(dataToUse === null){
        setNoResult(true)
        alert("Hello Everyone")
        
    }
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleJobSelect = async (selectedJob) => {
        const Token= localStorage.getItem('loginToken')
        const Token1={
            selectedJob,
            token:Token
        }
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/job_details/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Token1),
            });
            if (!response.ok) {
             throw new Error('Failed to send selected job data to the backend');
                
                 
            } else {
                navigate('/JobDetails');
            }
            console.log('Selected job data sent successfully:', selectedJob);
        } catch (error) {
            setErrorTwo(error)
            console.error('Error sending selected job data to the backend:', error);
        } finally {
            setLoading(false);
        }
    };

    if (errorTwo) {
        return <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
        >Error: Server Not Responding
        </p>; 
      }

    return (
        <div>
        <Grid container>
       
        <Grid>
    {loading ? (
      <div className="loading-popup">Loading...</div> 
    ) : (
      <div className="job-result" style={{ marginTop: '300px', marginLeft: "20px", width: '800px' }}>
        {currentJobs.map((job, index) => (
          <div key={index} className="job-box" onClick={() => handleJobSelect(job)}>
            <div className="job-top">
              <div className="company-img">
                {job.company_logo_path && job.company_logo_path.includes('data:image') ? (
                  <img src={job.company_logo_path} alt="Company Logo" />
                ) : (
                  <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.company_logo_path}`} alt="Company Logo" />
                )}
              </div>
              <div className="job-heading">
                <div>{job.job_title}</div>
                <div className="company-name1">{job.company_name}</div>
              </div>
            </div>
            <div className="brief" style={{ marginBottom: '8px', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <span className="brief-label"><BsFileEarmarkTextFill/> Job Description : </span> {job.job_description}
            </div>
            
            <div style={{ display: 'inline-block', gap: '10px' }}>
              <div className="job-brief">
                <span className="brief-label"><FaLocationDot  icon={faMapMarkerAlt} /></span>
                 {job.location && job.location.map((location, index) => (
                <span key={index} className="brief11" style={{ marginRight: '5px' }}>{location}</span>
              ))}
              </div>
              <div className="job-brief">
                <span className="brief-label"><FaIndianRupeeSign icon={faMoneyBillAlt} /></span> {job.salary_range}
              </div>
              <div className="job-brief">
                <span className="brief-label"><BsFillBagCheckFill /></span> {job.experience}
              </div>
            </div>
            <div style={{ display: 'flex',marginTop:"5px" }}> 
              <div className="job-brief">
              <span className="brief-label"><BsFillFileCheckFill/> Job Role : </span>{job.job_role}
            </div>  
            <div className="job-brief">
              <span className="brief-label"><BsPersonFillCheck icon={faBuilding} /> Openings : </span>{job.no_of_vacancies}
              </div>
            </div>
            <div className="brief2" style={{marginBottom:"10px" }}>
              <span className="brief-label"><BsPersonSquare  icon={faBuilding} /> Employee Type : </span>{job.employee_type}
            </div>
            <div style={{ backgroundColor: '#a2beda',padding:"10px", margin: "0 -20px -20px -20px",borderRadius:"10px" }}>
            <div className="skill-set">
              {job.skills && job.skills.map((skills, index) => (
                <span key={index} className="brief11" style={{ marginRight: '5px' }}>{skills}</span>
              ))}
            </div>
            <div className="created-at">
                <span className="brief-label1"><FaClockRotateLeft icon={faBuilding} /><span className="text"> {job.created_at} ago </span></span> 
                <span className="save-icon"><BsFillBookmarksFill /> Save</span>
              </div>
            </div>
          </div>
        ))}
         <div className="pagination" style={{ marginBottom:"20px"}}>
              <Button variant="contained" style={{backgroundColor:"#5C6BC0",color:"white",marginRight:"29rem"}} 
              onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
              startIcon={<NavigateBeforeIcon />}>Previous</Button>
              <Button variant="contained" style={{backgroundColor:"#5C6BC0",color:"white"}} 
              onClick={() => paginate(currentPage + 1)} disabled={indexOfLastJob >= dataToUse.length}
              endIcon={<NavigateNextIcon />}>Next</Button>
          </div>
      </div>  
    )}
  </Grid>
  
              </Grid>
              <div>
               {noResult && <h1>No Result Found</h1>}
              </div>
              </div>
      );
  }
  
  export default FilteredResults;