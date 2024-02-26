import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PostJob = () => {
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
  
  const navigate = useNavigate();

  const [jobPost, setJobPost] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    employee_type: "",
    job_role: "",
    location: "",
    skill_set: [],
    qualification: "",
    experience: "",
    salary_range: "",
    no_of_vacancies: "",
  });

  const [employment, setEmployment] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState([]);
  const[experience, setExperience] = useState("");
  const [salary, setSalary] = useState("")


  const [errors, setErrors] = useState({
    company_name: false,
    job_title: false,
    job_description: false,
    employee_type: false,
    job_role: false,
    location: false,
    qualification: false,
    experience: false,
    salary_range: false,
    no_of_vacancies: false,
  });

  const handleChange = (e, value, name) => {
    let updatedValue = value;

    // Update the state based on the name of the field
    if (name === "company_name") {
      setJobPost({ ...jobPost, company_name: updatedValue });
    } else if (name === "job_title") {
      setJobPost({ ...jobPost, job_title: updatedValue });
    } else if (name === "job_description") {
      setJobPost({ ...jobPost, job_description: updatedValue });
    } else if (name === "location") {
      setJobPost({ ...jobPost, location: updatedValue });
    } else if (name === "qualification") {
      setJobPost({ ...jobPost, qualification: updatedValue });
    } else if (name === "experience") {
      setJobPost({ ...jobPost, experience: updatedValue });
    } else if (name === "salary_range") {
      setJobPost({ ...jobPost, salary_range: updatedValue });
    } else if (name === "no_of_vacancies") {
      setJobPost({ ...jobPost, no_of_vacancies: updatedValue });
    } else if (name === "employee_type") {
      setEmployment(updatedValue);
      setErrors({ ...errors, employee_type: !updatedValue }); 
    } else if (name === "job_role") {
      setJobRole(updatedValue);
      setErrors({ ...errors, job_role: !updatedValue }); 
    } else if (name === "skills") {
      setSkills(value);
    }



    // Perform validation for the field
    const isFieldEmpty = !updatedValue.trim();

    // Update the errors state based on the validation result
    setErrors({
      ...errors,
      [name]: isFieldEmpty,
    });
  };

  const handleBlur = (name, value) => {
    const isFieldEmpty = !value.trim();
    setErrors({ ...errors, [name]: isFieldEmpty });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty

     const isAnyFieldEmpty =
    Object.values(errors).some((error) => error) ||
    !employment === null ||
    !jobRole ||
    !experience ||
    !salary ||
    skills.length === 0 || null;

  if (isAnyFieldEmpty) {
    // If any field is empty, show alert message
    alert("Please fill in all required fields");
    return;
  }

    // If form is valid, submit data
  
      const jobPostData = {
        ...jobPost,
        experience : experience,
        employee_type: employment,
        job_role: jobRole,
        skill_set: skills,
        salary_range : salary,
    };

      console.log(jobPostData);

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", "http://192.168.1.38:8000/job_post/");
      const apiUrl = "http://192.168.1.38:8000/job_post/";

      try {
        const response = await axios.post(apiUrl, jobPostData, headers);
        console.log(response, "post JobData ===>");
        console.log(response.data.status, "Job Post Status==========>");

        if (response.data.status === true) {
          console.log("Job posted Successfully");
          // window.location.reload();
        navigate("/MyJob");
        } else {
          console.log("Error in posting the Job");
          alert("Please fill in all required fields")
        }
      } catch (error) {
        console.log(error);
        
      }
    
  };

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
            <h3>Post a Job</h3>
            <br />
            <label>Company Name*</label>
            <br />
            <TextField
              margin="normal"
              fullWidth
              id="company-name"
              label="Company Name"
              name="company_name"
              required
              value={jobPost.company_name}
              onChange={(e) => handleChange(e, e.target.value, "company_name")}
              onBlur={(e) => handleBlur("company_name", e.target.value)}
              error={errors.company_name}
              helperText={errors.company_name ? "Company Name is required" : ""}
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
              onChange={(e) => handleChange(e, e.target.value, "job_title")}
              onBlur={(e)=>handleBlur("job_title", e.target.value)}
              error={errors.job_title}
              helperText={errors.job_title ? "Job Title is required" : ""}
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
              onChange={(e) => handleChange(e, e.target.value, "job_description")}
              onBlur={(e)=>handleBlur("job-description", e.target.value)}
              error={errors.job_description}
              helperText={
                errors.job_description ? "Job Description is required" : ""
              }
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label>Employment Type*</label>

                <Autocomplete
                  sx={{ mt: 2 }}
                  options={employmentType}
                  value={employment}
                  onChange={(event, newValue) => {
                    setEmployment(newValue);
                    setErrors({ ...errors, employment: newValue === null }); 

                  }}
                 
                  renderInput={(text) => (
                    <TextField {...text} label="Employment Type"
                    error={errors.employment}
                    helperText={errors.employment ? "Employment is required" : ""}
                    onBlur={(e)=>handleBlur("employment", e.target.value )}
                     />
                    
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label>Role*</label>
                <Autocomplete
                  sx={{ mt: 2 }}
                  options={Role}
                  value={jobRole}
                  onChange={(event, newValue) => {
                    setJobRole(newValue);
                    setErrors({ ...errors, jobRole: newValue === null }); 
                  }}
                  renderInput={(job) => (
                    <TextField {...job} label="Role"
                    error={errors.jobRole}
                    
                    onBlur={(e)=>handleBlur("jobRole", e.target.value)}
                    helperText={errors.jobRole ? "Role is Required" : null || ""} 
                   />
                    
                  )}
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
              onChange={(e) => handleChange(e, e.target.value, "location")}
              onBlur={(e)=> handleBlur("location" , e.target.value)}
              error={errors.location}
              helperText={errors.location ? "Location is required" : ""}
            />
            <br />
            <br />
            <label>Skills*</label>
            <br />
            <br />
            <Autocomplete
              multiple
              options={jobSkills}
              value={skills}
              onChange={(event, newEvent) => { setSkills(newEvent);
                setErrors({ ...errors, skills: newEvent.length === 0 });  }}
              renderInput={(para) => <TextField {...para} label="Skills"
              error={errors.skills}
              helperText={errors.skills ? "Skills is Required" :"" } 
            //   onBlur={(e)=>handleBlur("skills" , e.target.value )}
              />}
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
              onChange={(e) =>
                handleChange(e, e.target.value, "qualification")
              }
              onBlur={(e)=>handleBlur("qualification", e.target.value)}
              error={errors.qualification}
              helperText={
                errors.qualification ? "Qualification is required" : ""
              }
            />

           

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <label>Experience*</label>
              <Autocomplete
              sx={{mt:2}}
              fullWidth
              options={experienceOptions}
              value={experience}
              onChange={(event, newValue) => {
                setExperience(newValue);
                setErrors({ ...errors, experience: newValue === null }); 
              }}
              renderInput={(exp) => (
                <TextField {...exp} label="Experience" 
                error={errors.experience}
                helperText={errors.experience ? "Experience is Required" : ""} 
                onBlur={(e)=>handleBlur("experience", e.target.value)}/>)}
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
                  onChange={(e) =>
                    handleChange(e, e.target.value, "no_of_vacancies")
                  }
                  onBlur={(e)=>handleBlur("no_of_vacancies",e.target.value)}
                  error={errors.no_of_vacancies}
                  helperText={
                    errors.no_of_vacancies ? "Vacancy is required" : ""
                  }
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
              <label>Salary</label>
              <Autocomplete 
              sx={{mt:2}}
              fullWidth
              options={salaryType}
              value={salary}
              onChange={(event, newValue) => {
                setSalary(newValue);
                setErrors({ ...errors, salary_range: newValue === null }); 
              }}
              renderInput={(range) => (
                <TextField {...range} label="Salary Range" 
                error={errors.salary}
                helperText={errors.salary ? "Salary is Required" : ""} 
                onBlur={(e)=>handleBlur("Salary Range", e.target.value)}/>)}
              
              
              
              />
              </Grid>
            </Grid>
           
            <br />
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PostJob;
