
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import '../HomePage/UserDahboard.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../CommonAPI';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import {HashLoader} from "react-spinners";
import Error from "../HomePage/homeimages/404_Error.png"
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { faMapMarkerAlt, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { BsFillBookmarksFill, BsFillBookmarkCheckFill  } from "react-icons/bs";


export const Notifications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [userDashboardError, setUserDashboardError] = useState(false);
  const [loading1, setLoading1] = useState(false); // Initialize loading1 as false
  const jobsPerPage = 9;

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    const googleToken =localStorage.getItem('googleToken');
    let requestData;

    if (token === null){
      const responsetoken = googleToken
   
    requestData = {
      token: responsetoken,
      // Add other data you need to send here
    };
  }
  else{
    requestData = {
      token: token,
      // Add other data you need to send here
    };
  }
    // Fetch applied jobs
    fetch(`${BASE_URL}/get_job_notifications/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        if (data.status && data.data) {
          // Update state with fetched data
          setAppliedJobs(data.data);
          setLoading(false);
          setUserDashboardError(false)
        } else {
          setError(data.message || 'Failed to fetch data');
          setLoading(false);
          setUserDashboardError(true)
        }
      })
      .catch(error => {
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleCardClick = async (selectedJob) => {
    const Token = localStorage.getItem('loginToken');
    const Token1 = {
      selectedJob,
      token: Token
    };

    try {
      setLoading1(true); // Set loading1 to true when sending request
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
      console.error('Error sending selected job data to the backend:', error);
    } finally {
      setLoading1(false); // Set loading1 to false after request is complete
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  if (loading || loading1) { // Show loading indicator while loading or loading1 is true
    // document.body.style.overflow = 'hidden';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100vh',marginTop:'-100px' }}>
         {/* <BeatLoader color="#1A237E" css={override} />  */}
         <HashLoader  height={100}
            width={100}
            color="#1A237E"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper" />
      </div>
    );
  }

  // Flatten the nested array
  const flattenedJobs = appliedJobs.flat();
  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedJobs = flattenedJobs.slice(startIndex, endIndex);

  return (
    <div>
      {
        userDashboardError &&   
        // <div className='userDashboard-background1'>
        //   <img src={Error} alt='404' className='userDashboard-image'/><br></br>
        //   <h5 className='errorText'>You haven't applied to any jobs yet..!</h5>
        //   </div>
        <div className="dashboardemployeerAccount" style={{marginTop:'75px',marginBottom:"-30px"}}>
        <div className='dashboardemployeerAccount-background'>
          <img 
            src={Error} 
            alt='404' 
            className='dashboardemployeerNotRegister' 
            style={{ borderRadius: "10px" }} 
          />
          <br />
          <h5 className='dashboardemployeererrorText'>No Notifications So far..!</h5>
        </div>
        </div>
      }
      <div className="dashboard-container" style={{marginTop:"90px"}}>
        {displayedJobs.map((job, index) => (
          // <Card key={index} className="applied-job" onClick={() => handleCardClick(job)}>
          //   <CardContent className='cardcontent'>
          //     <Typography variant="h5" component="h2" style={{ color: '#1A237E', fontWeight: 'bold' }}>
          //       {job.job_title}
          //     </Typography>
          //     <Typography color="textSecondary">
          //       Company: {job.company_name}
          //     </Typography>
          //     <Typography variant="body2" component="p">
          //       Role: {job.job_role}
          //     </Typography>
          //   </CardContent>
          // </Card>
          <div key={index} className="dashboard-job-box" onClick={() => handleCardClick(job)}>
          <div className="saved-job-top">
               <div className="job-heading">
                 <div>{job.job_title}</div>
                 <div className="company-name1" style={{ marginTop: '8px' }}>{job.company_name}</div>
               </div>
               <div className="company-img">
                 {job.company_logo_path && job.company_logo_path.includes('data:image') ? (
                   <img src={job.company_logo_path} alt="Company Logo" />
                 ) : (
                   <img
                     src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.company_logo_path}`}
                     alt="Company Logo"
                   />
                 )}
               </div>
             </div>
          <div className='saved-job-content'>
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
                <div >
                <div className="filter-skill-set">
                   {job.skills && job.skills.map((skills, index) => (
                     <span key={index} className="skill">
                     <span className="saved-skill-text">{skills}</span>
                   </span>
                   ))}
                 </div>
                <div className="created-at" style={{marginLeft:'10px'}}>
                    <span className="brief-label1"><FaClockRotateLeft icon={faBuilding} /><span className="text"> {job.date} ago </span></span> 


                    {/* <span className="save-icon" style={{cursor:"pointer"}} onClick={() => handleBookmark(job.job_post_id)} > 
                    {bookmarkedJobs.includes(job.job_post_id) ? <BsFillBookmarkCheckFill /> : <BsFillBookmarksFill />}
                    {bookmarkedJobs.includes(job.job_post_id) ? 'Saved' : 'Save'}
                    </span> */}


                  </div>           
                </div>   
                     
          </div>       
        </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {page > 1 && (
          <Button variant="contained" className="pagination-button" style={{ marginLeft: "100px", marginBottom: "20px" }} onClick={handlePrevPage}>
            Previous
          </Button>
        )}
        {flattenedJobs.length > endIndex && (
          <Button variant="contained" className="pagination-button" style={{ marginLeft: "100px", marginBottom: "20px" }} onClick={handleNextPage}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

