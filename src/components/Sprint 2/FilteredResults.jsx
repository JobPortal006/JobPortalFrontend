import React, { useState,useEffect, useContext} from "react";
import "../Sprint 2/FIlteredResults.css";
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import UserContext from "./contextFilter";
import BASE_URL from '../CommonAPI';
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { faMapMarkerAlt, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { BsFillBookmarksFill, BsFillBookmarkCheckFill  } from "react-icons/bs";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {HashLoader} from "react-spinners";
import { useSelector } from 'react-redux';

function FilteredResults() {
  
    const navigate = useNavigate();
    const [errorTwo, setErrorTwo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scrollbar, setScrollbar] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5);
    const [PageButton, setPageButton] = useState(false);

    const { searchJob, oneData ,companyList, jobData} = useContext(UserContext);
    console.log(searchJob,'=====raghul data1')
    // console.log(oneData,'=====raghul data2')
    const searchResponse = useSelector(state => state.searchResponse);
    console.log(searchResponse, '=====Redux search response');
    const companyResponse = useSelector(state => state.companyResponse);
    console.log(companyResponse, '=====Redux search companyResponse');

    useEffect(()=>{},[searchJob,oneData,companyList])

    // Determine which data to use for rendering
    const dataToUse = searchJob ? searchJob : oneData || companyList?.data || jobData?.data;

    // console.log(dataToUse,"<====DATATOUSE");


    // const [resultdataToUse, setResultdataToUse] = useState("");


    // const Employee_type_result = JSON.parse(localStorage.getItem("Employee_type_result"));
    // const Company_result = JSON.parse(localStorage.getItem("Company_result"));
    // const Search_result = JSON.parse(localStorage.getItem("Search_result"));
    // const filter_result = JSON.parse(localStorage.getItem("filter_result"));
    // console.log(Company_result,'Company_result----------');
    // const dataToUse = Search_result ? Search_result : filter_result || Company_result || Employee_type_result;
    // useEffect(() => {
    //   // Retrieve stored data from localStorage
    //   const storedDataToUse = JSON.parse(localStorage.getItem("dataToUse"));
    //   console.log(storedDataToUse, 'storedDataToUse------->');
    
    //   // Check if storedDataToUse is equal to dataToUse
    //   if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(dataToUse)) {
    //     // If equal, set resultdataToUse to storedDataToUse
    //     setResultdataToUse(storedDataToUse);
    //   } else {
    //     // If not equal, remove the previous dataToUse from localStorage
    //     localStorage.removeItem("dataToUse");
    //     // Set resultdataToUse to the current dataToUse
    //     setResultdataToUse(dataToUse);
    //     // Update localStorage with the new dataToUse
    //     localStorage.setItem("dataToUse", JSON.stringify(dataToUse));
    //   }
    // }, []); // Empty dependency array ensures the effect runs only once on component mount
    
    // console.log(resultdataToUse, 'resultdataToUse------->');
    
    
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = dataToUse?.slice(indexOfFirstJob, indexOfLastJob);
    console.log(currentJobs,'currentJobs-------');
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
   
  useEffect(() => {
    if (currentJobs) {
        const savedjob = currentJobs.map(job => job.saved);
        const savedjobId = currentJobs.filter(job => job.saved === "Saved").map(job => job.id);
        console.log(savedjob, "savedjob-----?");
        console.log(savedjobId, "savedjobId--->");
        if (savedjob.includes("Saved")) {
            setBookmarkedJobs(prevBookmarkedJobs => [...prevBookmarkedJobs, ...savedjobId]);
        }
    }
    if(dataToUse !== null){
     if(dataToUse.length>=5){
      console.log(dataToUse.length,'DATATOUSE,length');
      setPageButton(true)
    }
  }
}, [currentJobs,dataToUse]);


console.log(bookmarkedJobs,'bookmarkedJobs---------');
   // 
   const token = localStorage.getItem("loginToken");

   const handleBookmark = async (jobId) => {
       const bookmarkData = {
           token,
           job_id: jobId,
       };
   
       try {
           
           let response;
   
           // Check if the job is already bookmarked
           if (bookmarkedJobs.includes(jobId)) {
               // If already bookmarked, send data to update the bookmark
               response = await fetch(`${BASE_URL}/delete_saved_job/`, {
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(bookmarkData),
               });
           } else {
               // If not bookmarked, send data to save the job as a new bookmark
               response = await fetch(`${BASE_URL}/saved_job/`, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify(bookmarkData),
               });
           }
   
    if (!response.ok) {
               throw new Error('Failed to update bookmark status for the job');
           } else {
               // If successful, update the bookmark status locally
               if (bookmarkedJobs.includes(jobId)) {
                   // If job is already bookmarked, remove it
                   setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
               } else {
                   // If job is not bookmarked, add it
                   setBookmarkedJobs([...bookmarkedJobs, jobId]);
                   
               }
           }
           console.log('Bookmark status updated successfully for job ID:', jobId);
       } catch (error) {
           setErrorTwo(error);
           console.error('Error updating bookmark status for job ID:', jobId, error);
       } finally {
           
       }
   };

    const [noResult, setNoResult] = useState(false)

    if(dataToUse === null || dataToUse === undefined){
        setNoResult(true)
        // alert("Hello Everyone")
        
    }
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const handleJobSelect = async (selectedJob) => {
      const Token = localStorage.getItem('loginToken');
      const Token1 = { selectedJob, token: Token };

      try {
          setScrollbar(true);
          setLoading(true);
          const response = await fetch(`${BASE_URL}/job_details/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Token1),
          });
          if (!response.ok) {
              throw new Error('Failed to send selected job data to the backend');
          } else {
              navigate('/JobDetails');
          }
          console.log('Selected job data sent successfully:', selectedJob);
      } catch (error) {
          setScrollbar(false);
          setErrorTwo(error);
          console.error('Error sending selected job data to the backend:', error);
      } finally {
          setLoading(false);
          setScrollbar(false);
          document.body.style.overflow = 'auto'; // Enable scrollbar
      }
  };

  

    if (errorTwo) {
        return <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
        >Error: Server Not Responding
        </p>; 
      }


    return (
        <div>
          {scrollbar ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')}
            <Grid container>
       
        <Grid>
    {loading ? (
      // <div className="loading-popup">Loading...</div> 
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width:'130%',
      alignItems: 'center',height: '100vh',marginTop:'150px',overflow: 'hidden',backgroundColor:'red' }}>
      <ul>         
       <li>

        <HashLoader  height={100}
            width={100}
            color="#1A237E"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper" />
        </li>
        </ul>

      </div>
    ) : (
      <div className="job-result" style={{ marginTop: '230px' }}>
        {currentJobs.map((job, index) => (
          <div key={index} className="job-box" >
            <div onClick={() => handleJobSelect(job)} >
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

                <div className="brief" style={{ marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden',maxWidth:'650px', textOverflow: 'ellipsis' }}>
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
            </div>

              {/* Bottom of the job */}
              <div style={{ backgroundColor: '#a2beda',padding:"10px", margin: "0 -20px -20px -20px",borderRadius:"10px", cursor:"default" }}>
              <div className="filter-skill-set">
                {job.skills && job.skills.map((skills, index) => (
                  // <span key={index} className="brief11" style={{ marginRight: '5px' }}>{skills}</span>
                  <span key={index} className="skill">
                  <span className="filter-skill-text">{skills}</span>
                </span>
                ))}
              </div>
              <div className="created-at">
                  <span className="brief-label1"><FaClockRotateLeft icon={faBuilding} /><span className="text"> {job.created_at} ago </span></span> 
                  <span className="save-icon" style={{cursor:"pointer"}} onClick={() => handleBookmark(job.id)} > 
                  {bookmarkedJobs.includes(job.id) ? <BsFillBookmarkCheckFill /> : <BsFillBookmarksFill />}
                  {bookmarkedJobs.includes(job.id) ? 'Saved' : 'Save'}
                  </span>
                </div>           
              </div>          
          </div>
        ))}
         <div className="pagination" style={{ marginBottom:"20px"}}>
          {
            PageButton && 
            <div>
                <Button variant="contained" style={{backgroundColor:"#5C6BC0",color:"white",marginRight:"29rem"}} 
                onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
                startIcon={<NavigateBeforeIcon />}>Previous</Button>

                <Button variant="contained" style={{backgroundColor:"#5C6BC0",color:"white"}} 
                onClick={() => paginate(currentPage + 1)} disabled={indexOfLastJob >= dataToUse.length}
                endIcon={<NavigateNextIcon />}>Next</Button>
                </div>
                      }
                      </div>
                  </div>  
                )}  
              </Grid>
  
              </Grid>
              <div>
               {noResult && <h1>No Result Found </h1>}
              </div>
              </div>
      );
  }
  
  export default FilteredResults;

