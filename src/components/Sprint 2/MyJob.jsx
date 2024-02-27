import React, { useState, useEffect } from "react";
import "./myJob.css";
import { Grid, IconButton, CircularProgress  } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';



function MyJob() {
  const [jobView, setJobView] = useState([]);
  const [employee_id, setEmployeeId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [update, setUpdate] = useState("");

  // console.log(employee_id,"employee_id");
  console.log(jobView,"jobView");
  console.log(employee_id, "<===id");

  const location = useLocation();

  useEffect(() => {
    
    // Passing id and Fetching Data
    if (location.state && location.state.id) {
      const id = location.state.id; // id post
      setEmployeeId(id);
      async function postID() {
        try {
          const response = await fetch(
            "http://192.168.1.39:8000/employer_post_jobs/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ employee_id: id }),
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
          console.log("ID data posted successfully:", id);
          
        } catch (error) {
          console.error("Error posting id data to API:", error);
          // window.location.reload();
        }
      }
      postID();
    }
  }, [location.state]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (indexToDelete) => {
    setAnchorEl(null);
    if (indexToDelete !== undefined) {
      setJobView((prevJobView) => {
        return prevJobView.filter((_, index) => index !== indexToDelete);
      });
    }
  };

  const navigate = useNavigate();

  const changeDirect =(jobView)=>{
    navigate("/EditMyJob", { state: { jobView } })
  }

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
        <h2>
        <LinearProgress  />
                  Loading
        </h2>
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
          <Grid item xs={3} className="grid-one">
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
          <Grid item xs={3}></Grid>
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
            <Grid item xs={3} className="edit-btn">
              <IconButton
                id="icon-button"
                aria-controls={anchorEl ? 'icon-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="icon-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(index)}
                MenuListProps={{ 'aria-labelledby': 'icon-button' }}
              >
                <MenuItem onClick={() => changeDirect(job)}>Edit</MenuItem>
                <MenuItem onClick={() => handleClose(index)}>Delete</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        ))}
      </div>
    )}
  </div>
);
}

export default MyJob;


