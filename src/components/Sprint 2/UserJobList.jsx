import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./userJobList.css";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../CommonAPI";
import { HashLoader } from 'react-spinners';
import { FaBuilding  } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { BsPersonWorkspace  } from "react-icons/bs";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import Error from './Sprint 2 Images/No User Found.png'

const UsersJobList = () => {
 

  const [listUser, setListUser] = useState("");
  console.log(listUser, "<><ListUseR><>");
  const [loading, setLoading] = useState(true);
  const [userJobList, setUserJobList] = useState(false);
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
        console.log(data, "userJobId----");
        if(data.status){
          setListUser(data.data);
          setLoading(false)
          setUserJobList(false)
        }
        else{
          setLoading(false)
          setUserJobList(true)
        }
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
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  console.log(userJobList,'userJobList----');
 return ( 
  <div>
    {loading ? (
      <div className="loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '0px', marginLeft: '-50px' }}>
        <ul>         
          <li style={{ color: "red" }}>
            <HashLoader  
              height={100}
              width={100}
              color="#1A237E"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper" 
            />
          </li>
        </ul>
      </div>
    ) : (
      <div className="user-job-background">
        <div className="user-job-list">
          {listUser && listUser.map((job, index) => (
            <div className="job-view" key={index}> 
              <div className="job-top">
                <div className="list-img">
                  {job.userDetails.profile_picture_path && job.userDetails.profile_picture_path.includes('data:image') ? (
                    <img src={job.userDetails.profile_picture_path} alt="Company Logo" />
                  ) : (
                    <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.userDetails.profile_picture_path}`} alt="Profile Logo" />
                  )}
                </div>    
                <div className="job-heading">
                  <div>{capitalize(job.userDetails.first_name)} {capitalize(job.userDetails.last_name)}</div>
                </div>
              </div>
              <div className="user-list-experience">
                <div className="userlist-employment_status">
                  <span className="brief-label"><BsPersonWorkspace />  Experience Level : </span>{job.resume.employment_status}
                </div>
              </div>
              <div className="brief-container">
                <div className="job-brief">
                  <span className="brief-label"><IoBookmarks />  Department : </span> {job.jobPreference.department}
                </div>
                <div className="job-brief">
                  <span className="brief-label"><FaBuilding /> Preferred Industry : </span> {job.jobPreference.industry}
                </div>
              </div>
              <div className="skill-and-button">
                <div className="skill-set">
                  {job.jobPreference.key_skills && job.jobPreference.key_skills.map((skill, index) => (
                    <span key={index} className="skill">
                      <span className="skill-text">{skill}</span>
                    </span>
                  ))}
                </div>
                <Button variant="contained" className="view-more-button" style={{ backgroundColor: "#5c6bc1" }} onClick={() => viewProfile(job.Signup.email)}>view more</Button>
              </div>        
            </div>
          ))}
        </div>
        <div>
          {userJobList &&  
            <div className="dashboardemployeerAccount" style={{marginTop:'20px'}}>
              <div className='dashboardemployeerAccount-background'>
                <img 
                  src={Error} 
                  alt='404' 
                  className='dashboardemployeerNotRegister' 
                  style={{ borderRadius: "10px" }} 
                />
                <br />
                <h5 className='dashboardemployeererrorText'>No Users Apply for this Job..!</h5>
              </div>
            </div>
          }
        </div>
      </div>
    )}
  </div>
);
}

export default UsersJobList;


  //<Grid
            //   key={index}
            //   container
            //   alignItems="center"
            //   // justifyContent="space-between"
            //   className="job-view"
            //   style={{width:"75%", marginLeft:"10%"}}
            // >
            //   <Grid container className="list-all" >
            //   <Grid item xs={3}>
            //   <div className="list-img">
            //      <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.userDetails.profile_picture_path}`} />
            //     </div>
            //   </Grid>
            //   <Grid item xs={7}>
            //    <div className="list-name">
            //        <h3>{job.userDetails.first_name}</h3>
            //      </div>
             
            //  <div>
            //   <h4>{job.resume.employment_status}</h4>
            //  </div>
            //     <div>
            //       <h4 className="lise-college">{job.college_details.college_name}</h4>
            //     </div>
            //   </Grid>
              //  {/* <Grid item xs={2} style={{marginTop:"4%"}} >
            //   <Button variant="contained" style={{backgroundColor:"#5c6bc1"}} onClick={()=> viewProfile(job.Signup.email)} >view profile</Button>
            //  </Grid>
            //  </Grid>
            // </Grid> */}
