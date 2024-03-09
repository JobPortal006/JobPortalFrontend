import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import UserContext from "./contextFilter";
import BASE_URL from '../CommonAPI';

const EditMyJob = () => {
  const employmentType = [
    "Full Time",
    "Part Time",
    "Hybrid",
    "Temporary",
    "InternShip",
  ];

  const Role = [
    "Engineering",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
  ];

  const jobSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "SQL",
  ];

  const experienceOptions = [
    "0-1 year",
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
    "6-7 years",
    "7-8 years",
    "8-9 years",
    "9-10 years",
    "11-13 years",
    "14-16 years",
    "17-19 years",
    "20-22 years",
    "23-25 years",
    "26-28 years",
    "29-30 years",
    "30+ years", 
  ];
 
  const salaryType = [
    "Less than 2 LPA",
    "2 - 4 LPA",
    "4 - 6 LPA",
    "6 - 8 LPA",
    "8 - 10 LPA",
    "10 - 14 LPA",
    "15 - 18 LPA",
    "19 - 22 LPA",
    "23 - 26 LPA",
    "27 - 30 LPA",
    "More than  30 LPA",
  ]
  
 

  const [jobPost, setJobPost] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    employee_type: "",
    job_role: "",
    location: "",
    skills: [],
    qualification: "",
    experience: "",
    salary_range: "",
    no_of_vacancies: "",
  });

  // const [employment, setEmployment] = useState("");
  // const [jobRole, setJobRole] = useState("");
  // const [skillSet, setSkills] = useState([]);
  // const [experience, setExperience] = useState("");
  // const [salary, setSalary] = useState("")

  const HandleUpdate = async (event) => {
    event.preventDefault();

    const jobPostData = {
      ...jobPost
        // experience: experience,
        // employee_type: employment,
        // job_role: jobRole,
        // skills: skillSet,
        // salary_range: salary,
    };

    console.log(jobPostData);

   
  // Post

  try {
    const response = await fetch(
      `${BASE_URL}/update_job/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobPostData),
      }
    );

  
    if (!response.ok) {
      throw new Error("Failed to post id data to API");
    }

    const dataUpdate = await response.json();
    console.log(dataUpdate, "Update====================Data");
    
    // fetching data

   
    console.log("ID data posted successfully:");
  } catch (error) {
    console.error("Error posting id data to API:", error);
    // window.location.reload();
  }
  };

  const location = useLocation();
  const viewJobId = location.state.job_id
  console.log(viewJobId,"viewJobID====>");

  // useEffect(() => {
  //   if (location.state && location.state.jobId) {
  //     const id = location.state.jobId;
  //     console.log(id, "location id===>");
  //   }
  // }, [location.state]);

  const [fetchJob, setFetchJob] =  useState("")

console.log(fetchJob,"fetchJob===>");

 

  const{updateJobId} = useContext(UserContext);
  console.log(updateJobId,'updateJobId')

  // useEffect(() => {
  //   // Passing id and Fetching Data
  //   // if (location.state && location.state.jobId) {
  //     // const id = location.state.jobId;
  //     async function postID() {
  //       try {
  //         const response = await fetch(
  //           " http://192.168.1.57:8000/demoupdate/",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ job_id: viewId}),
  //           }
  //         );

        
  //         if (!response.ok) {
  //           throw new Error("Failed to post id data to API");
  //         }

  //         const data = await response.json();
  //         console.log(data, "Job_id_====================Data");
  //         setJobPost(data[0])
  //         // fetching data

         
  //         console.log("ID data posted successfully:");
  //       } catch (error) {
  //         console.error("Error posting id data to API:", error);
  //         // window.location.reload();
  //       }
  //     }
  //     postID();
  //   // }
  // },[viewId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get_job_details_by_id/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ job_id: 44 }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
  
        const data = await response.json();
        console.log(data, "Job_id_====================Data");
        setJobPost(data[0]);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };
  
    fetchData();
  }, [viewJobId]);  
  


  return (
    <div>
      <Container
        component="main"
        style={{ width: "80%", marginBottom: "10rem" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            noValidate="false"
            style={{ marginTop: "1rem" }}
          >
            <h3>Edit My Job</h3>
            <br />
            <label>Company Name*</label>
            <br />
            <TextField
              margin="normal"
              fullWidth
              id="company-name"
              label={   "Company Name"}
              name="company_name"
              required
              value={jobPost.company_name}
              onChange={(e) => setJobPost({ ...jobPost, company_name: e.target.value })}
            />
            <br />
            <br />

            <label>Job Title*</label>
            <br />
            <TextField
              margin="normal"
              fullWidth
              id="job-title"
              label="Job Title"
              name="job_title"
              value={jobPost.job_title}
              onChange={(e) => setJobPost({ ...jobPost, job_title: e.target.value })}
            />

            <p style={{ marginTop: "1rem" }}>Job Description*</p>
            <TextField
              margin="normal"
              fullWidth
              name="job_description"
              label="Job Description"
              type="text"
              id="job-description"
              multiline
              rows={4}
              value={jobPost.job_description}
              onChange={(e) => setJobPost({ ...jobPost, job_description: e.target.value })}
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label>Employment Type*</label>
                <Autocomplete
                  sx={{ mt: 2 }}
                  options={employmentType}
                  value={jobPost.employee_type}
                  onChange={(event, newEvent) => setJobPost({...jobPost, employee_type : newEvent})}
                  renderInput={(text) => <TextField {...text} label="Employment Type" />}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label>Role*</label>
                <Autocomplete   
                  sx={{ mt: 2 }}
                  options={Role}
                  value={jobPost.job_role}
                  onChange={(event, newEvent) => setJobPost({...jobPost, job_role : newEvent})}
                  renderInput={(job) => <TextField {...job} label="Role" />}
                />
              </Grid>
            </Grid>
            <br />
            <label>Location*</label>
            <br />
            <TextField
              margin="normal"
              required
              fullWidth
              id="job-location"
              label="Location"
              name="location"
              value={jobPost.location}
              onChange={(e) => setJobPost({ ...jobPost, location: e.target.value })}
            />
            <br />
            <br />
            <label>Skills*</label>
            <br />
            <br />
            <Autocomplete
              multiple
              options={jobSkills}
              value={jobPost.skills}
              onChange={(event, newEvent) => setJobPost({...jobPost, skills : newEvent })}
              renderInput={(para) => <TextField {...para} label="Skills" />}
            />
            <br />
            <label>Qualification*</label>
            <TextField
              margin="normal"
              fullWidth
              id="job-qualification"
              label="Qualification"
              name="qualification"
              value={jobPost.qualification}
              onChange={(e) => setJobPost({ ...jobPost, qualification: e.target.value})}
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                <label>Experience*</label>
                <Autocomplete
                  sx={{ mt: 2 }}
                  fullWidth
                  options={experienceOptions}
                  value={jobPost.experience}
                  onChange={(event, newEvent) => setJobPost({...jobPost, experience :newEvent})}
                  renderInput={(exp) => <TextField {...exp} label="Experience" />}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
                <label>No.of.Vacancies*</label>
                <TextField
                  fullWidth
                  margin="normal"
                  id="job-vacancy"
                  label="Vacancy"
                  name="no_of_vacancies"
                  type="number"
                  value={jobPost.no_of_vacancies}
                  inputProps={{ min: 1 }}
                  onChange={(e) => setJobPost({ ...jobPost, no_of_vacancies: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
                <label>Salary*</label>
                <Autocomplete 
                sx={{mt:2}}
                  fullWidth
                  options={salaryType}
                  value={jobPost.salary_range}
                  onChange={(event, newEvent) => setJobPost({ ...jobPost, salary_range:newEvent})}
                  renderInput={(range) => <TextField {...range} label="Salary Range" />}
                />
              </Grid>
            </Grid>
            <br />
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={HandleUpdate}
              >
                Update
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default EditMyJob;


