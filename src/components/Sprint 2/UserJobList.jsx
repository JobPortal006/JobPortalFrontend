import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./userJobList.css";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../CommonAPI";

const UsersJobList = () => {
 

  const [listUser, setListUser] = useState("");
  console.log(listUser, "<><ListUseR><>");

  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state.userJobId;
  console.log(jobId, "<JobID=====>");

  const [mail, setMail] = useState([])
  useEffect(() => {
    if (listUser) {
        const emails = listUser.map(item => item?.Signup?.email);
        setMail(emails);
        console.log(emails, "mail--mail--mail");
    }
}, [listUser]);
  // Post Api

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user_job_apply_list/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ job_id: jobId }),
        });

        const data = await response.json();
        console.log(data, "userJobId----data---><");
        setListUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const viewProfile = (userId) =>{
    navigate("/Listprofile", {state:{userId}})

    console.log(userId,"';';email';';");
  }

  return (
    <div className="user-job-list" style={{margin:"5%"}} >
      {listUser && listUser.map((job, index) => (
            <Grid
              key={index}
              container
              alignItems="center"
              // justifyContent="space-between"
              className="job-view"
              style={{width:"75%", marginLeft:"10%"}}
            >
              <Grid container className="list-all" >
              <Grid item xs={3}>
              <div className="list-img">
                 <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.userDetails.profile_picture_path}`} />
                </div>
              </Grid>
              <Grid item xs={7}>
               <div className="list-name">
                   <h3>{job.userDetails.first_name}</h3>
                 </div>
             
             <div>
              <h4>{job.resume.employment_status}</h4>
             </div>
                <div>
                  <h4 className="lise-college">{job.college_details.college_name}</h4>
                </div>
              </Grid>

             <Grid item xs={2} style={{marginTop:"4%"}} >
              <Button variant="contained" style={{backgroundColor:"#5c6bc1"}} onClick={()=> viewProfile(job.Signup.email)} >view profile</Button>
             </Grid>
             </Grid>
            </Grid>
          ))}
    </div>
  );
};

export default UsersJobList;
