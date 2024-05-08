// import React, { useState, useEffect, useContext } from "react";
// import "./myJob.css";
// import { Button, Grid,IconButton, Menu, MenuItem } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {HashLoader} from "react-spinners";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// import Tooltip from "@mui/material/Tooltip";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import BASE_URL from '../CommonAPI';
// import UserContext from "./contextFilter";


// function MyJob() {
//   const [jobView, setJobView] = useState([]);
//   const [employee_id, setEmployeeId] = useState("");
//   const [loading, setLoading] = useState(true); // State to track loading status
//   const [result, setResult] = useState(false); 
//   console.log(employee_id,"employee_id===id");
//   console.log(jobView, "jobView");
  

//   const location = useLocation();
 

//   useEffect(() => {
//     // Passing id and Fetching Data
//     // if (location.state && location.state.id) {
//       // const id = location.state.id; // id post
//       // setEmployeeId(id);
//       const token = localStorage.getItem("loginToken")
//       async function postID() {
//         try {
//           const response = await fetch(

//             `${BASE_URL}/employeer_post_jobs/`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ token }),
//               // body: JSON.stringify({ employee_id: id }),
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Failed to post id data to API");
//           }

//           const data = await response.json();
//           console.log(data, "====================");

         

//           // fetching data
//           if (data.status){
//             if (data && Array.isArray(data.data) && Array.isArray(data.data[0])) {
//               setJobView(data.data[0]);
//               setLoading(false); // Set loading to false once data is fetched
//               console.log(data[0].job_post_id);
//             } else {
//               console.error("Invalid data format received from API");
//             }
//             console.log("ID data posted successfully:");
//           }
//           else{
//             setLoading(false);
//             setResult(true)
//           }
//         } catch (error) {
//           console.error("Error posting id data to API:", error);
//           // window.location.reload();
//         }
//       }
//       postID();
//     // }
//   }, []);


//   const navigate = useNavigate();



//   const ChangeDirect = (jobId) => {
//     navigate("/EditMyJob",{state: { job_id: jobId }})
//    console.log(jobId,"jpbidddjobiddd");
   
//   };

//   // Delete API
//   const handleDelete = async (jobId) => {
//     try {

//       const response = await fetch(`${BASE_URL}/delete_job/`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ job_id: jobId }),
//       });
     
//       if (!response.ok) {
//         throw new Error("Failed to delete job");
//       }else{
//         console.log(response,"response");

//       }
      
//       console.log("Job deleted successfully");
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };


//   const userListing = (userJobId) =>{
//     navigate("/UserJobList",{state:{userJobId}})
//   }


  
//   return (
//     <div>
//     <div className="job-main-div">
//     {loading ? (
//         // Display loading indicator while data is being fetched
//         <div className="loading">
//         <ul>         
//          <li style={{color:"red"}}>

//           <HashLoader  height={100}
//               width={100}
//               color="#1A237E"
//               ariaLabel="grid-loading"
//               radius="12.5"
//               wrapperStyle={{}}
//               wrapperClass="grid-wrapper" />
//           </li>
//           {/* <li>Loading...!</li> */}
         
//           </ul>

//         </div>

//       ) : ( 
//         <div className="info-container">

//           <Grid
//             container
//             alignItems="center"
//             justifyContent="space-between"
//             className="myjob-container"
//           >
//             <Grid item xs={3} className="grid-one">
//               <div>
//                 <h1  style={{color:"white"}} className="title-job">Title</h1>
//               </div>
//             </Grid>
//             <Grid item xs={3}>
//               <div>
//                 <h3 className="location">Location</h3>
//               </div>
//             </Grid>
//             <Grid item xs={3}>
//               <div>
//                 <h3 style={{marginLeft:"-12px"}} className="date">Date</h3>
//               </div>
//             </Grid>
//             <Grid item xs={2}></Grid>
//           </Grid>

//           {/* Render job view once data is loaded */}
//           {jobView.map((job, index) => (
//             <Grid
//               key={index}
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               className="job-display"
//             >
//               <Grid item xs={3} className="job-elements">
//                 <div>
//                   <h3 className="title">{job.job_title}</h3>
//                 </div>
//               </Grid>
//               <Grid item xs={3}>
//                 <div>
//                   <h3 className="location">{job.location[0]}</h3>
//                   <h3 className="location">{job.location[1]}</h3>
//                 </div>
//               </Grid>
//               <Grid item xs={3}>
//                 <div>
//                   <h3 className="date">{job.created_at}</h3>
//                 </div>
//               </Grid>

//               <Grid item xs={1} className="edit-btn">
               
//               <Tooltip title="Edit"  placement="top" >
             
//               <FontAwesomeIcon icon={faPenToSquare} style={{cursor:"pointer"}} onClick={() => ChangeDirect(job.job_post_id)} />
              
//             </Tooltip>
//         </Grid>
//             <Grid item xs={1} className="delete-btn">
//             <Tooltip title="Delete" placement="top" >
//                 <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}}  onClick={() => handleDelete(job.job_post_id)}  />
//                 </Tooltip> 
//              </Grid>

//             <Grid item xs={1} className="view-btn">
//             <Tooltip title="view Users" placement="top" >
//                 <FontAwesomeIcon icon={faEye} style={{cursor:"pointer"}}  onClick={() => userListing(job.job_post_id)}  />
//                 </Tooltip> 
//              </Grid>
//             </Grid>
//           ))}
//         </div>
//       )}
//     </div>
//       {result && (
//         <h1 style={{textAlign:"center"}}>No Job Post Yet</h1>
//       )}
//     </div>
//   );
// }

// export default MyJob;


import React, { useState, useEffect, useContext } from "react";
import "./myJob.css";
import { Button, Grid,IconButton, Menu, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {HashLoader} from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BASE_URL from '../CommonAPI';
import UserContext from "./contextFilter";
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { BsFillBookmarksFill, BsFillBookmarkCheckFill  } from "react-icons/bs";
import { faMapMarkerAlt, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SearchJobImage from './Sprint 2 Images/Data loading.jpg';

function MyJob() {
  const [jobView, setJobView] = useState([]);
  const [employee_id, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading status
  const [result, setResult] = useState(false); 
  console.log(employee_id,"employee_id===id");
  console.log(jobView, "jobView");
  

  const location = useLocation();
 

  useEffect(() => {
    // Passing id and Fetching Data
    // if (location.state && location.state.id) {
      // const id = location.state.id; // id post
      // setEmployeeId(id);
      const token = localStorage.getItem("loginToken")
      async function postID() {
        try {
          const response = await fetch(

            `${BASE_URL}/employeer_post_jobs/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
              // body: JSON.stringify({ employee_id: id }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to post id data to API");
          }

          const data = await response.json();
          console.log(data, "====================");

         

          // fetching data
          if (data.status){
            if (data && Array.isArray(data.data) && Array.isArray(data.data[0])) {
              setJobView(data.data[0]);
              setLoading(false); // Set loading to false once data is fetched
              console.log(data[0].job_post_id);
            } else {
              console.error("Invalid data format received from API");
            }
            console.log("ID data posted successfully:");
          }
          else{
            setLoading(false);
            setResult(true)
          }
        } catch (error) {
          console.error("Error posting id data to API:", error);
          // window.location.reload();
        }
      }
      postID();
    // }
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);


  const navigate = useNavigate();
  const handleClick = (event, jobId) => {
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  const [selectedJobId, setSelectedJobId] = useState(null);
  // Delete API
  const handleDelete = async (jobId) => {
    try {

      const response = await fetch(`${BASE_URL}/delete_job/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id: jobId }),
      });
     
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }else{
        console.log(response,"response");

      }
      
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const ChangeDirect = (jobId) => {
    // setDialogOpen(false);
    navigate("/EditMyJob",{state: { job_id: jobId }})
    console.log(jobId,'job_id -----------------');
   
   
  };
  const userListing = (userJobId) =>{
    navigate("/UserJobList",{state:{userJobId}})
  }
  const [isOpenDropdown, setIsOpenDropdown] = useState(null);

  const toggleDropdown = (event, index) => {
    event.stopPropagation(); // Prevents dropdown from closing when clicking on itself
    if (isOpenDropdown === index) {
      setIsOpenDropdown(null);
    } else {
      setIsOpenDropdown(index);
    }
  };

  
  return (
    <div>
    <div className="job-main-div" style={{
        width:"80%",
        marginLeft:"100px"
    }}>
    {loading ? (
        // Display loading indicator while data is being fetched
        <div className="loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100vh',marginTop:'-100px' }}>
        <ul>         
         <li style={{color:"red"}}>

          <HashLoader  height={100}
              width={100}
              color="#1A237E"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper" />
          </li>
          {/* <li>Loading...!</li> */}
         
          </ul>

        </div>

      ) : ( 
        <div className="info-container">

         
         {jobView.map((job, index) => (
  <div key={index} className="dashboardjob-box">
   <div className="Dashboardjob-heading">
  <div className="job-title">{job.job_title}</div>
  <div className="dropdown">
    <button className="ellipsis" onClick={(event) => handleClick(event, job.job_post_id)}>
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
    <div className="dropdown-content">
      <button onClick={() => ChangeDirect(job.job_post_id)}>Edit</button>
      <button onClick={() => handleDelete(job.job_post_id)}>Delete</button>
      <button onClick={() => userListing(job.job_post_id)}>View Users</button>
    </div>
  </div>
</div>

    <div className="dashboard-body">
    <div className="brief" style={{ marginBottom: '8px', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <span className="brief-label"><BsFileEarmarkTextFill /> Job Description: </span> {job.job_description}
    </div>

    <div style={{ display: 'inline-block', gap: '10px' }}>
      <div className="job-brief">
        <span className="brief-label"><FaLocationDot icon={faMapMarkerAlt} /></span>
        {job.location && job.location.map((location, locIndex) => (
          <span key={locIndex} className="brief11" style={{ marginRight: '5px' }}>{location}</span>
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
        <span className="brief-label"><BsFillFileCheckFill /> Job Role: </span>{job.job_role}
      </div>
      <div className="job-brief">
        <span className="brief-label"><BsPersonFillCheck icon={faBuilding} /> Openings: </span>{job.no_of_vacancies}
      </div>
    </div>
    <div className="brief2" style={{ marginBottom: "10px" }}>
      <span className="brief-label"><BsPersonSquare icon={faBuilding} /> Employee Type: </span>{job.employee_type}
    </div>
    <div className="job-details">
  <div className="skill-set">
    {job.skills && job.skills.map((skill, index) => (
      <span key={index} className="skill">
        <span className="skill-text">{skill}</span>
      </span>
    ))}
  </div>
  <div className="created-at">
  <div className="created-icon"><FaClockRotateLeft icon={faBuilding} /></div><p>{job.created_at}</p>
  </div>
</div>

      </div>
  </div>
))}


        </div>
      )}
    </div>


    
      {result && (
       <div className="dashboardemployeerAccount">
       <div className='dashboardemployeerAccount-background'>
         <img 
           src={SearchJobImage} 
           alt='404' 
           className='dashboardemployeerNotRegister' 
           style={{ borderRadius: "10px" }} 
         />
         <br />
         <h5 className='dashboardemployeererrorText'>No Jobs Posted yet..!</h5>
       </div>
     </div>



      )}
    </div>
  );
}

export default MyJob;