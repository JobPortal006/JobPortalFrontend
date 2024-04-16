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


  const navigate = useNavigate();



  const ChangeDirect = (jobId) => {
    navigate("/EditMyJob",{state: { job_id: jobId }})
   console.log(jobId,"jpbidddjobiddd");
   
  };

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


  const userListing = (userJobId) =>{
    navigate("/UserJobList",{state:{userJobId}})
  }


  
  return (
    <div>
    <div className="job-main-div">
      {loading ? (
        // Display loading indicator while data is being fetched
        <div className="loading">
        <ul>         
         <li style={{color:"red"}}>

          <HashLoader color="#AB47BC" />
          </li>
          <li>Loading...!</li>
         
          </ul>

        </div>
      ) : ( 
        <div className="info-container">

          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className="myjob-container"
          >
            <Grid item xs={3} className="grid-one">
              <div>
                <h1  style={{color:"white"}} className="title-job">Title</h1>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <h3 className="location">Location</h3>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <h3 style={{marginLeft:"-12px"}} className="date">Date</h3>
              </div>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>

          {/* Render job view once data is loaded */}
          {jobView.map((job, index) => (
            <Grid
              key={index}
              container
              alignItems="center"
              justifyContent="space-between"
              className="job-display"
            >
              <Grid item xs={3} className="job-elements">
                <div>
                  <h3 className="title">{job.job_title}</h3>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h3 className="location">{job.location[0]}</h3>
                  <h3 className="location">{job.location[1]}</h3>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h3 className="date">{job.created_at}</h3>
                </div>
              </Grid>

              <Grid item xs={1} className="edit-btn">
               
              <Tooltip title="Edit"  placement="top" >
             
              <FontAwesomeIcon icon={faPenToSquare} style={{cursor:"pointer"}} onClick={() => ChangeDirect(job.job_post_id)} />
              
            </Tooltip>
        </Grid>
            <Grid item xs={1} className="delete-btn">
            <Tooltip title="Delete" placement="top" >
                <FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}}  onClick={() => handleDelete(job.job_post_id)}  />
                </Tooltip> 
             </Grid>

            <Grid item xs={1} className="view-btn">
            <Tooltip title="view Users" placement="top" >
                <FontAwesomeIcon icon={faEye} style={{cursor:"pointer"}}  onClick={() => userListing(job.job_post_id)}  />
                </Tooltip> 
             </Grid>
            </Grid>
          ))}
        </div>
      )}
    </div>
      {result && (
        <h1 style={{textAlign:"center"}}>No Job Post Yet</h1>
      )}
    </div>
  );
}

export default MyJob;


// import React, { useState, useEffect } from "react";
// import "./myJob.css";
// import { Grid, IconButton} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useLocation } from "react-router-dom";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { useNavigate } from "react-router-dom";
// import {HashLoader} from "react-spinners";
// import { makeStyles } from '@mui/styles';
// import BASE_URL from "../CommonAPI";



// const useStyles = makeStyles(() => ({
//   customButton: {
//     boxShadow: "none",
    
//   },
// }));


// function MyJob() {
//   const [jobView, setJobView] = useState([]);
//   const [employee_id, setEmployeeId] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [loading, setLoading] = useState(true); // State to track loading status

//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const classes = useStyles();

//   console.log(jobView,"jobView");
//   console.log(jobView && jobView.map(job => job.job_post_id), "<//=jobView-id-");

//   console.log(employee_id, "<===Employee_id");

//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("loginToken")
//       async function postID() {
//         try {
//           const response = await fetch(
//             `${BASE_URL}/employeer_post_jobs/`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               // body: JSON.stringify({ employee_id: id }),
//               body: JSON.stringify({ token }),
//             }
//           );
//           if (!response.ok) {
//             throw new Error("Failed to post id data to API");
//           }

//           const data = await response.json();
//           console.log(data, "====================");

//           // fetching data

//           if (data && Array.isArray(data.data) && Array.isArray(data.data[0])) {
//             setJobView(data.data[0]);
//             setLoading(false); // Set loading to false once data is fetched
//           } else {
//             console.error("Invalid data format received from API");
//           }
//           console.log("ID data posted successfully:");
//         } catch (error) {
//           console.error("Error posting id data to API:", error);
//           // window.location.reload();
//         }
//       }
//       postID();
//     // }
//   }, [location.state]);
  
//   const handleClick = (event, jobId) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedJobId(jobId);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const navigate = useNavigate();

//   const ChangeDirect = (jobId) => {
//     // setDialogOpen(false);
//     navigate("/EditMyJob",{state: { job_id: jobId }})
//     console.log(jobId,'job_id -----------------');
   
   
//   };


//    // Delete API
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
    
//         navigate("/UserJobList",{state:{userJobId}})
//         console.log(userJobId,"=-=-myjob---==userJobId");
//       }

  
//   return (
//     <div className="job-main-div">
//       {loading ? (
//         // Display loading indicator while data is being fetched
//         <div className="loading">
//         <ul>         
//          <li style={{color:"red"}}>
//           <HashLoader color="#5c6bc0" />
//           </li>
//           <li>Loading...!</li>
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
//             <Grid item xs={4} className="grid-one">
//               <div>
//                 <h3 style={{marginLeft:"10px"}} className="title-job" >Title</h3>
//               </div>
//             </Grid>
//             <Grid item xs={3}>
//               <div>
//                 <h3 className="location-job">Location</h3>
//               </div>
//             </Grid>
//             <Grid item xs={3}>
//               <div>
//                 <h3 className="date-job">Date</h3>
//               </div>
//             </Grid>
//             <Grid item xs={2}></Grid>
//           </Grid>

//           {/* Render job view once data is loaded */}
//           {jobView && jobView.map((job, index) => (
//             <Grid
//               key={index}
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               className="job-display"
//             >
//               <Grid item xs={4} className="job-elements">
//                 <div>
//                   <h1 className="title-job">{job.job_title}</h1>
//                 </div>
//               </Grid>
//               <Grid item xs={3}>
//                 <div>
//                 <h3 className="location">{job.location[0]}</h3>
//                 <h3 className="location">{job.location[1]}</h3>
//                 </div>
//               </Grid>
//               <Grid item xs={3}>
//                 <div>
//                   <h3 className="date">{job.created_at}</h3>
//                 </div>
//               </Grid>
//               <Grid item xs={2} className="edit-btn">
               
//               <IconButton
//               id="icon-button"
//               aria-controls={anchorEl ? "icon-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={anchorEl ? "true" : undefined}
//               onClick={(event) => handleClick(event,job.job_post_id)}
//               >
//               <MoreVertIcon />
//               </IconButton>
              
//               <Menu
//               className={classes.customButton}
//               id="icon-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={() => handleClose(index)}
//               // MenuListProps={{ "aria-labelledby": "icon-button" }}
//               >
//               <MenuItem onClick={() => ChangeDirect(selectedJobId)}>Edit</MenuItem>
//               <MenuItem onClick={() => handleDelete(selectedJobId)}>Delete</MenuItem>
//               <MenuItem onClick={() => userListing(selectedJobId)}>View Users</MenuItem>
//               </Menu>                
//               </Grid>
//             </Grid>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyJob;

