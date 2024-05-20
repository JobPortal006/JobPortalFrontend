// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Button } from '@material-ui/core';
// import '../HomePage/UserDahboard.css';
// import { useNavigate } from 'react-router-dom';
// import BASE_URL from '../CommonAPI';
// import { BeatLoader } from 'react-spinners';
// import { css } from '@emotion/react';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

// const UserDashboard = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [loading1, setLoading1] = useState(true);
//   const jobsPerPage = 9;

//   useEffect(() => {
//     const token=localStorage.getItem('loginToken')
//     const requestData = {
//       token: token,
//       // Add other data you need to send here
//   };

//     // Fetch applied jobs
//     fetch(`${BASE_URL}/view_apply_jobs/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // body: JSON.stringify({ user_id: 7 }),
//       body: JSON.stringify(requestData)

//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.status && data.data) {
//           // Update state with fetched data
//           setAppliedJobs(data.data);
//           setLoading(false);
//         } else {
//           setError(data.message || 'Failed to fetch data');
//           setLoading(false);
//         }
//       })
//       .catch(error => {
//         setError(error.message || 'Failed to fetch data');
//         setLoading(false);
//       });
//   }, []);

//   const handleCardClick = async (selectedJob) => {
//     const Token= localStorage.getItem('loginToken')
//     const Token1={
//       selectedJob, 
//         token:Token
//     }
//       try {
//           setLoading1(true);
//           const response = await fetch(`${BASE_URL}/job_details/`, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(Token1),
//           });
//           if (!response.ok) {
//            throw new Error('Failed to send selected job data to the backend');
    
    
//           } else {
//               navigate('/JobDetails');
//           }
//           console.log('Selected job data sent successfully:', selectedJob);
//       } catch (error) {
//           console.error('Error sending selected job data to the backend:', error);
//       } finally {
//           setLoading1(false);
//       }
//     };

//   const handleNextPage = () => {
//     setPage(page + 1);
//   };

//   const handlePrevPage = () => {
//     setPage(page - 1);
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//         <BeatLoader color="#1A237E" css={override} />
//         <p>Applied Job Information...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Flatten the nested array
//   const flattenedJobs = appliedJobs.flat();
//   const startIndex = (page - 1) * jobsPerPage;
//   const endIndex = startIndex + jobsPerPage;
//   const displayedJobs = flattenedJobs.slice(startIndex, endIndex);

//   return (
//     <div>
      
//     <div className="dashboard-container">
//       {displayedJobs.map((job, index) => (
//         <Card key={index} className="applied-job" onClick={() => handleCardClick(job)}>
//           <CardContent className='cardcontent'>
//             <Typography variant="h5" component="h2" style={{ color: '#1A237E', fontWeight: 'bold' }}>
//               {job.job_title}
//             </Typography>
//             <Typography color="textSecondary">
//               Company: {job.company_name}
//             </Typography>
//             <Typography variant="body2" component="p">
//               Role: {job.job_role}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
    
//     </div>
  
//     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         {page > 1 && (
//           <Button variant="contained"  className="pagination-button" style={{marginLeft:"100px", marginBottom:"20px"}} onClick={handlePrevPage}>
//             Previous
//           </Button>
//         )}
//         {flattenedJobs.length > endIndex && (
//           <Button variant="contained"  className="pagination-button" style={{marginLeft:"100px", marginBottom:"20px"}} onClick={handleNextPage}>
//             Next
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import '../HomePage/UserDahboard.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../CommonAPI';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import {HashLoader} from "react-spinners";
import Error from "../HomePage/homeimages/No_Data.jpg"
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { faMapMarkerAlt, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { BsFillBookmarksFill, BsFillBookmarkCheckFill  } from "react-icons/bs";


const override = css`
  display: block;
  margin: 0 auto;
`;

const UserDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [userDashboardError, setUserDashboardError] = useState(false);
  const [loading1, setLoading1] = useState(false); // Initialize loading1 as false
  const jobsPerPage = 6;

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
    fetch(`${BASE_URL}/view_apply_jobs/`, {
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
  // else {
  //   // Re-enable scrolling if loading is false 
  //   document.body.style.overflow = 'auto';
  // }

  // if (error) {
  //   return <div style={{backgroundColor:'red'}}>Error: {error}</div>;
  // }

  // Flatten the nested array
  const flattenedJobs = appliedJobs.flat();
  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedJobs = flattenedJobs.slice(startIndex, endIndex);

  return (
    <div style={{margin:"0 20px"}}>
    <div>
       {
        userDashboardError &&  
        <div className='userDashboard-background1'>
          <img src={Error} alt='404' className='userDashboard-image'/><br></br>
          <h5 className='errorText'>You haven't applied to any jobs yet..!</h5>
          </div>
      }
      <div className="dashboard-container">
  {displayedJobs.map((job, index) => (
    <div key={index} className="dashboard-job-box" style={{maxWidth:'500px'}} onClick={() => handleCardClick(job)}>
      <div className="userdashboard-job-title">
        <div>{job.job_title}</div>
      </div>        
      <div className='saved-job-content'>
        <div className="brief" style={{ marginBottom: '8px', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
        <div style={{ display: 'flex', marginTop: "5px" }}> 
          <div className="job-brief">
            <span className="brief-label"><BsFillFileCheckFill/> Job Role : </span>{job.job_role}
          </div>  
        </div>
        <div className="brief2" style={{ marginBottom: "10px" }}>
          <span className="brief-label"><BsPersonSquare  icon={faBuilding} /> Employee Type : </span>{job.employee_type}
        </div>    
        <div className="filter-skill-set" style={{marginBottom:'-5px'}}>
          {job.skills && job.skills.map((skills, index) => (
            <span key={index} className="skill">
              <span className="saved-skill-text">{skills}</span>
            </span>
          ))}
        </div>
      </div> 
      <div className="userdashboard-job-top">
        <div className="userdashboard-job-heading">
          <div className="userdashboard-company-name1">{job.company_name}</div>
        </div>
        <div className="userdashboard-company-img">
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
    </div>
  ))}
</div>


      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {page > 1 && (
          <Button variant="contained" className="pagination-button" style={{ marginLeft: "-750px", marginBottom: "20px" }} onClick={handlePrevPage}>
            Previous
          </Button>
        )}
        {flattenedJobs.length > endIndex && (
          <Button variant="contained" className="pagination-button" style={{ marginRight:'-750px', marginBottom: "20px" }} onClick={handleNextPage}>
            Next
          </Button>
        )}
      </div>
    </div>
    </div>

  );
};

export default UserDashboard;
