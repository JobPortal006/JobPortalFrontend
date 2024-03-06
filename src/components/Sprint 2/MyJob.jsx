import React, { useState, useEffect } from "react";
import "./myJob.css";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {HashLoader} from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Tooltip from "@mui/material/Tooltip";
import Backdrop from '@mui/material/Backdrop';


// import UserContext from "./contextFilter";


function MyJob() {
  const [jobView, setJobView] = useState([]);
  const [employee_id, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading status


  console.log(employee_id,"employee_id===id");
  console.log(jobView, "jobView");
  

  const location = useLocation();

  useEffect(() => {
    // Passing id and Fetching Data
    // if (location.state && location.state.id) {
      // const id = location.state.id; // id post
      // setEmployeeId(id);
      async function postID() {
        try {
          const response = await fetch(
            "http://192.168.1.44:8000/employeer_post_jobs/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({ employee_id: id }),
              body: JSON.stringify({ employee_id: 13 }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to post id data to API");
          }

          const data = await response.json();
          console.log(data, "====================");

          // fetching data

          if (data && Array.isArray(data.data) && Array.isArray(data.data[0])) {
            setJobView(data.data[0]);
            setLoading(false); // Set loading to false once data is fetched
          } else {
            console.error("Invalid data format received from API");
          }
          console.log("ID data posted successfully:");
        } catch (error) {
          console.error("Error posting id data to API:", error);
          // window.location.reload();
        }
      }
      postID();
    // }
  }, [location.state]);


  const navigate = useNavigate();



  const ChangeDirect = (jobId) => {
    navigate("/EditMyJob",{state: { job_id: jobId }})
   console.log(jobId,"jpbidddjobiddd");
   
  };

  // Delete API
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch("http://192.168.1.62:8000/delete_job/", {
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


  // UPDATE AND DELETE api 

  //   useEffect(() => {

  //   if (location.state && location.state.id) {
  //     const JobId = jobView.job_post_id;
  //     console.log(JobId, "JobId");
  //     setUpdate(JobId);
  //     async function postID() {
  //       try {
  //         const response = await fetch(
  //           "http://192.168.1.57:8000/update_job/",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ job_id: JobId }),
  //           }
  //         );
  //         if (!response.ok) {
  //           throw new Error("Failed to post id data to API");

  //         }
  //         console.log("ID data posted successfully:", JobId);

  //       } catch (error) {
  //         console.error("Error posting id data to API:", error);
  //         // window.location.reload();
  //       }
  //     }
  //     postID();
  //   }
  // }, [location.state]);

  return (
    <div className="main-div">
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
          <h1>My Job</h1>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className="job-container"
          >
            <Grid item xs={4} className="grid-one">
              <div>
                <h1 className="title">Title</h1>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <h3 className="location">Location</h3>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <h3 className="date">Date</h3>
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
              <Grid item xs={4} className="job-elements">
                <div>
                  <h1 className="title">{job.job_title}</h1>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h3 className="location">{job.location}</h3>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h3 className="date">{job.created_at}</h3>
                </div>
              </Grid>
              <Grid item xs={1} className="edit-btn">
               
              <Tooltip title="Edit"  placement="top" >
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => ChangeDirect(job.job_post_id)} />
            </Tooltip>
        </Grid>
            <Grid item xs={1} className="delete-btn">
            <Tooltip title="Delete" placement="top" >
                <FontAwesomeIcon icon={faTrash}  onClick={() => handleDelete(job.job_post_id)}  />
                </Tooltip>
               
                
              </Grid>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyJob;


