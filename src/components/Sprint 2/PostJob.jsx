import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Autocomplete } from "@mui/material";
import "./PostJob.css"
import axios from "axios";
import { Radio, RadioGroup, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../CommonAPI';
import Popper from '@mui/material/Popper';
import { FaRegHandPointRight  } from "react-icons/fa";


const PostJob = () => {
  const employmentType = [
    "Full Time",
    "Part Time",
    "Hybrid",
    "Temporary",
    "InternShip",
    "Work From Home"
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
    "11 - 14 LPA",
    "15 - 18 LPA",
    "19 - 22 LPA",
    "23 - 26 LPA",
    "27 - 30 LPA",
    "More than  30 LPA",
  ]
  
  const navigate = useNavigate();

  const [jobPost, setJobPost] = useState({
    // company_name: "",
    job_title: "",
    // email:"",
    job_description: "",
    employee_type: "",
    job_role: "",
    location: [],
    skill_set: [],
    qualification: [],
    experience: "",
    salary_range: "",
    no_of_vacancies: "",
  });

  const [jobEmail, setJobEmail] = useState("");
  const [employment, setEmployment] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [skills, setSkills] = useState([]);
  const[experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [qualification, setQualification] = useState([]);
  const [Newlocation, setLocation] = useState([]);

  console.log(qualification,"qualifications===>");
  console.log(Newlocation, "<==Location");
  
  const [selectedLocation, setSelectedLocation] = useState([]);
  console.log(selectedLocation, '<===this is selected Location');

  const [errors, setErrors] = useState({
    
    job_title: false,
   
    job_description: false,
    employee_type: false,
    job_role: false,
    location: false,
    qualification: false,
    experience: false,
    salary_range: false,
    no_of_vacancies: false,
    additionalQueries : false
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
    } else if (name === "email") {
      setJobEmail(updatedValue);
      setErrors({ ...errors, email: !updatedValue }); 
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
    !Newlocation ||
    !selectedLocation || 
    !salary ||
    !additionalQueries ||
    qualification.length === 0 || null ||
    skills.length === 0 || null;

  // if (isAnyFieldEmpty) {
  //   // If any field is empty, show alert message
  //   alert("Please fill in all required fields");
  //   return;
  // }

    // If form is valid, submit data
    const token = localStorage.getItem("loginToken");
      const jobPostData = {
        ...jobPost,
        // email : jobEmail,
        experience : experience,
        employee_type: employment,
        job_role: jobRole,
        skill_set: skills,
        qualification : qualification,
        salary_range : salary,
        additional_queries : additionalQueries,
        location : selectedLocation,
        token:token
    };

      console.log(jobPostData);


      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", `${BASE_URL}/job_post/`);
      const apiUrl = `${BASE_URL}/job_post/`;

      try {
        const response = await axios.post(apiUrl, jobPostData, headers);
       
       
        console.log(response, "post JobData ===>");
        console.log(response.data.status, "Job Post Status==========>");

        if (response.data.status === true) {
          const id = response.data.data ;
          console.log(id,"Job posted Successfully");
          // window.location.reload();
          navigate("/MyJob", { state: { id } }); 
        } else {
          console.log("Error in posting the Job");
          alert("Please fill in all required fields")
        }
      } catch (error) {
        console.log(error);
        
      }
    
  };

 
  // company name fetch

  const [companyNameList, setCompanyName] = useState([])

  console.log(companyNameList,"<==company name list");

 
  

  useEffect(() => {
    const Companies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/company_name/`);
        if (!response.ok) {
          console.error("Failed to fetch Company Name");
          return;
        }else{
          
        }
        const data = await response.json();
        console.log(data, "<====company name====>");
        const companyNames = data.map((company) => company.company_name); // Extract company names

        setCompanyName(companyNames);
      } catch (error) {
        console.error("Error fetching Company Name:", error.message);
      }
    };

    Companies();
  }, []);

  // Location API

  useEffect(()=>{
    const token = localStorage.getItem("loginToken")
    const postLocation = async () =>{
      try{
      const response = await fetch(`${BASE_URL}/address_location/`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/josn",
        },
        body : JSON.stringify({token})
      }  
      );

      if(!response.ok){
        console.log("Failed to fetch Data");
      }

      const data = await response.json();
      const locationNames = data.map((location) => location.address_location);
      setLocation(locationNames);

      console.log(locationNames, "<-=-=-=location==data");
    }catch(error) {
      console.log("Error posting location data : ", error.message);
    }
      
    };
    postLocation();
  },[]);

   // Queries

   const [additionalQueries, setAdditionalQueries] = useState('');
   const questions = ["What is your last CTC ?",
                      "What is your expected salary ?",
                      "How much total experience do you have ?",
                      "What isthe notice period in your current company ?"];

   console.log(additionalQueries,"<====additionalQueries");
 
   const handleRadioChange = (event) => {
     setAdditionalQueries(event.target.value);
   };

   
 
// 



  return (
    <div>
     <Container  
    component="main"
    className="post_container"
    style={{ 
        marginBottom: "4rem",
        borderRadius: "10px",
        backgroundColor: "#E8EAF6",
        // boxShadow: "none" ,
        width:'80%',
        marginTop:'4rem'
    }}
>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            component="form"
            noValidate="false"
            style={{ marginTop: "1rem" }}
          >
            <h3 className="PostTitle">Post a Job</h3>
            <label style={{fontWeight:'bold',fontSize:"16px"}}>Job Title</label>
            <br />

            <TextField
              margin="normal"
              
              fullWidth
              id="job-title"
              label="Enter the Job Title"
              name="job_title"
              value={jobPost.job_title}
              onChange={(e) => handleChange(e, e.target.value, "job_title")}
              onBlur={(e)=>handleBlur("job_title", e.target.value)}
              error={errors.job_title}
              helperText={errors.job_title ? "Job Title is required" : ""}
              InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Set border radius
                    '& fieldset': {
                        borderColor: '#1A237E', // Set border color
                        borderWidth: '2px' // Set border width
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda', // Set border color on hover
                        borderWidth: '2px' // Set border width
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E', // Set border color on focus
                        borderWidth: '2px' // Set border width
                    },
                },
                color: "#1A237E" // Text color
            }}
            style={{backgroundColor:"white",borderRadius:"10px"}}
            FormHelperTextProps={{
              sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
          }}
            />
            {/* <TextField
    margin="normal"
    fullWidth
    id="job-title"
    label="Enter the Job Title"
    name="job_title"
    value={jobPost.job_title}
    onChange={(e) => handleChange(e, e.target.value, "job_title")}
    onBlur={(e)=>handleBlur("job_title", e.target.value)}
    error={errors.job_title}
    helperText={errors.job_title ? "Job Title is required" : ""}
    InputLabelProps={{
        style: { color: "#1A237E" } // Change label color
    }}
    sx={{
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px', // Set border radius
            '& fieldset': {
                borderColor: '#1A237E', // Set border color
                borderWidth: '2px' // Set border width
            },
            '&:hover fieldset': {
                borderColor: '#a2beda', // Set border color on hover
                borderWidth: '2px' // Set border width
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1A237E', // Set border color on focus
                borderWidth: '2px' // Set border width
            },
        },
        color: "#1A237E", // Text color
        backgroundColor: errors.job_title ? '#E8EAF6' : 'white', // Background color based on error
        borderRadius: "10px", // Border radius
    }}
    FormHelperTextProps={{
        sx: { backgroundColor: '#E8EAF6' } // Set background color for error message
    }}
/> */}


            <p style={{fontWeight:'bold',fontSize:"16px",marginTop:"10px",marginBottom:"-5px"}}>Job Description</p>
            <TextField
              margin="normal"
              fullWidth
              name="job_description"
              label="Enter the Job Description"
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
              InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Set border radius
                    '& fieldset': {
                        borderColor: '#1A237E', // Set border color
                        borderWidth: '2px' // Set border width
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda', // Set border color on hover
                        borderWidth: '2px' // Set border width
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E', // Set border color on focus
                        borderWidth: '2px' // Set border width
                    },
                },
                color: "#1A237E", // Text color
                // backgroundColor: errors.job_title ? '#E8EAF6' : 'white', // Background color based on error
                // borderRadius: "10px", // Border radius
            }}
            style={{backgroundColor:"white",borderRadius:"10px"}}
            FormHelperTextProps={{
              sx: { 
                  backgroundColor: '#E8EAF6',
                  marginTop:"-3px",
                  marginLeft:"-5px",
                  marginRight:"-5px",
                  padding:"5px",
                  paddingLeft:"20px"
              }
          }}
            />

            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label style={{fontWeight:'bold',fontSize:"16px"}}>Employment Type</label>

                <Autocomplete
    sx={{ mt: 2 }}
    options={employmentType}
    value={employment}
    onChange={(event, newValue) => {
        setEmployment(newValue);
        setErrors({ ...errors, employment: newValue === null }); 
    }}
    renderInput={(params) => (
        <TextField 
            {...params} 
            label="Select the Employment Type"
            error={errors.employment}
            helperText={errors.employment ? "Employment is required" : ""}
            onBlur={(e)=>handleBlur("employment", e.target.value )}
            InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
            }}
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                ),
                sx: {
                    '& .MuiSvgIcon-root': {
                        color:'#1A237E',
                        marginRight:'5px',
                      
                        marginBottom: '0' 
                    }
                }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                        borderColor: '#1A237E',
                        borderWidth: '2px'
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda',
                        borderWidth: '2px'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E',
                        borderWidth: '2px'
                    },
                },
                color: "#1A237E",
                backgroundColor: "white",
                borderRadius: "10px",
            }}
            FormHelperTextProps={{
                sx: { 
                    backgroundColor: '#E8EAF6',
                    marginTop:"-3px",
                    marginLeft:"-5px",
                    marginRight:"-5px",
                    padding:"5px",
                    paddingLeft:"20px"
                }
            }}
        />
    )}
    PopperComponent={(props) => (
        <Popper {...props} style={{backgroundColor: "white", borderRadius: "7px", border: "2px solid #1A237E",width:"500px"}}>
            {props.children}
        </Popper>
    )}
/>



              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label style={{fontWeight:'bold',fontSize:"16px"}}>Role</label>
                <Autocomplete
                  sx={{ mt: 2 }}
                  options={Role}
                  value={jobRole}
                  onChange={(event, newValue) => {
                    setJobRole(newValue);
                    setErrors({ ...errors, jobRole: newValue === null }); 
                  }}
                  renderInput={(job) => (
                    <TextField {...job} label="Select the Role"
                    error={errors.jobRole}
                    
                    onBlur={(e)=>handleBlur("jobRole", e.target.value)}
                    helperText={errors.jobRole ? "Role is Required" : null || ""} 
                    InputLabelProps={{
                      style: { color: "#1A237E" } // Change label color
                    }}
                      InputProps={{
                        ...job.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {job.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                        sx: {
                            '& .MuiSvgIcon-root': {
                                color:'#1A237E',
                                marginRight:'5px',
                              
                                marginBottom: '0' 
                            }
                        }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '10px', // Set border radius
                          '& fieldset': {
                              borderColor: '#1A237E', // Set border color
                              borderWidth: '2px' // Set border width
                          },
                          '&:hover fieldset': {
                              borderColor: '#a2beda', // Set border color on hover
                              borderWidth: '2px' // Set border width
                          },
                          '&.Mui-focused fieldset': {
                              borderColor: '#1A237E', // Set border color on focus
                              borderWidth: '2px' // Set border width
                          },
                      },
                      color: "#1A237E", // Text color
                      // backgroundColor: errors.job_title ? '#E8EAF6' : 'white', // Background color based on error
                      // borderRadius: "10px", // Border radius
                  }}
                  style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
                   />
                    
                  )}
                  PopperComponent={(props) => (
                    <Popper {...props} style={{backgroundColor: "white", borderRadius: "7px", border: "2px solid #1A237E",width:"500px"}}>
                        {props.children}
                    </Popper>
                )}
                />
              </Grid>
            </Grid>
          {/*   <label>Location*</label>
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
            */}

<           Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
            <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"10px"}}>Locations</label>
            <Autocomplete
              options={Newlocation}
              multiple
              fullWidth
              value={jobPost.selectedLocation}
              onChange={(event, newValue) =>{ 
                console.log("Selected Location:", newValue);
                setSelectedLocation(newValue);
                setErrors({ ...errors, location: newValue.length === 0 });
              }}
             
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select the Locations"
                  name="location"
                  error={errors.selectedLocation }
                  helperText={errors.selectedLocation ? "Location is required" : ""}
                  onBlur={(e)=>handleBlur("location", e.target.value)}
                  InputLabelProps={{
                    style: { color: "#1A237E" } // Change label color
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <React.Fragment>
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                    sx: {
                        '& .MuiSvgIcon-root': {
                            color:'#1A237E',
                            marginRight:'5px',
                          
                            marginBottom: '0' 
                        }
                    }
                }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px', // Set border radius
                        '& fieldset': {
                            borderColor: '#1A237E', // Set border color
                            borderWidth: '2px' // Set border width
                        },
                        '&:hover fieldset': {
                            borderColor: '#a2beda', // Set border color on hover
                            borderWidth: '2px' // Set border width
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1A237E', // Set border color on focus
                            borderWidth: '2px' // Set border width
                        },
                    },
                    color: "#1A237E" // Text color
                }}
                style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
                />
              )}
              PopperComponent={(props) => (
                <Popper {...props} style={{backgroundColor: "white", borderRadius: "7px", border: "2px solid #1A237E",width:"500px"}}>
                    {props.children}
                </Popper>
            )}
            />
            </Grid>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
            <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"10px"}}>Skills</label>
            <Autocomplete
              multiple
              options={jobSkills}
              value={skills}
              onChange={(event, newEvent) => { setSkills(newEvent);
                setErrors({ ...errors, skills: newEvent.length === 0 });  }}
              renderInput={(para) => <TextField {...para} label="Skills"
              error={errors.skills}
              helperText={errors.skills ? "Skills is Required" :"" } 
              InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
              }}
              InputProps={{
                ...para.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {para.InputProps.endAdornment}
                    </React.Fragment>
                ),
                sx: {
                    '& .MuiSvgIcon-root': {
                        color:'#1A237E',
                        marginRight:'5px',
                      
                        marginBottom: '0' 
                    }
                }
            }}
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Set border radius
                    '& fieldset': {
                        borderColor: '#1A237E', // Set border color
                        borderWidth: '2px' // Set border width
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda', // Set border color on hover
                        borderWidth: '2px' // Set border width
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E', // Set border color on focus
                        borderWidth: '2px' // Set border width
                    },
                },
                color: "#1A237E" // Text color
            }}
            style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
            //   onBlur={(e)=>handleBlur("skills" , e.target.value )}
              />}
              PopperComponent={(props) => (
                <Popper {...props} style={{backgroundColor: "white", borderRadius: "7px", border: "2px solid #1A237E",width:"500px"}}>
                    {props.children}
                </Popper>
            )}
            />
            </Grid>
            </Grid>
            {/* <br/> */}
        
            <label style={{fontWeight:'bold',fontSize:"16px",margin:"15px 0", marginBottom:"-10px"}}>Qualifications</label>
            <Autocomplete
            multiple
            id="job-qualifications"
            options={[]} // No options provided
            freeSolo // Allow manual entry
            value={qualification}
            onChange={(event, newEvent) => { setQualification(newEvent);
              setErrors({ ...errors, qualification: newEvent.length === 0 });  }}            
              renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                fullWidth
                label="Enter the Qualifications"
                variant="outlined"
                placeholder="Type & Enter"
                InputLabelProps={{
                  style: { color: "#1A237E" } // Change label color
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                      <React.Fragment>
                          {params.InputProps.endAdornment}
                      </React.Fragment>
                  ),
                  sx: {
                      '& .MuiSvgIcon-root': {
                          color:'#1A237E',
                          marginRight:'5px',
                        
                          marginBottom: '0' 
                      }
                  }
              }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '10px', // Set border radius
                      '& fieldset': {
                          borderColor: '#1A237E', // Set border color
                          borderWidth: '2px' // Set border width
                      },
                      '&:hover fieldset': {
                          borderColor: '#a2beda', // Set border color on hover
                          borderWidth: '2px' // Set border width
                      },
                      '&.Mui-focused fieldset': {
                          borderColor: '#1A237E', // Set border color on focus
                          borderWidth: '2px' // Set border width
                      },
                  },
                  color: "#1A237E" // Text color
              }}
              style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
              />
            )}
          />
                  
             
      
       {/*     <label>Qualification*</label>
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
              */}
          
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <label style={{fontWeight:'bold',fontSize:"16px"}}>Experience</label>
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
                <TextField {...exp} label="Selet the Experience" 
                error={errors.experience}
                helperText={errors.experience ? "Experience is Required" : ""} 
                onBlur={(e)=>handleBlur("experience", e.target.value)}
                InputLabelProps={{
                  style: { color: "#1A237E" } // Change label color
                }}
                InputProps={{
                  ...exp.InputProps,
                  endAdornment: (
                      <React.Fragment>
                          {exp.InputProps.endAdornment}
                      </React.Fragment>
                  ),
                  sx: {
                      '& .MuiSvgIcon-root': {
                          color:'#1A237E',
                          marginRight:'5px',
                        
                          marginBottom: '0' 
                      }
                  }
              }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '10px', // Set border radius
                      '& fieldset': {
                          borderColor: '#1A237E', // Set border color
                          borderWidth: '2px' // Set border width
                      },
                      '&:hover fieldset': {
                          borderColor: '#a2beda', // Set border color on hover
                          borderWidth: '2px' // Set border width
                      },
                      '&.Mui-focused fieldset': {
                          borderColor: '#1A237E', // Set border color on focus
                          borderWidth: '2px' // Set border width
                      },
                  },
                  color: "#1A237E" // Text color
              }}
              style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
                />)}
                PopperComponent={(props) => (
                  <Popper {...props} style={{backgroundColor: "white", borderRadius: "7px", border: "2px solid #1A237E",width:"330px"}}>
                      {props.children}
                  </Popper>
              )}
                
            />
            
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
                <label style={{fontWeight:'bold',fontSize:"16px"}}>No.of.Vacancies</label>
                <TextField
                  fullWidth
                  margin="normal"
                  id="job-vacancy"
                  label="Enter the Number of Vacancy"
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
                  InputLabelProps={{
                    style: { color: "#1A237E" } // Change label color
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px', // Set border radius
                        '& fieldset': {
                            borderColor: '#1A237E', // Set border color
                            borderWidth: '2px' // Set border width
                        },
                        '&:hover fieldset': {
                            borderColor: '#a2beda', // Set border color on hover
                            borderWidth: '2px' // Set border width
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1A237E', // Set border color on focus
                            borderWidth: '2px' // Set border width
                        },
                    },
                    color: "#1A237E" // Text color
                }}
                style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
              <label style={{fontWeight:'bold',fontSize:"16px"}}>Salary</label>
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
                <TextField {...range} label="Select the Salary Range" 
                error={errors.salary}
                helperText={errors.salary ? "Salary is Required" : ""} 
                onBlur={(e)=>handleBlur("Salary Range", e.target.value)}
                InputLabelProps={{
                  style: { color: "#1A237E" } // Change label color
                }}
                InputProps={{
                  ...range.InputProps,
                  endAdornment: (
                      <React.Fragment>
                          {range.InputProps.endAdornment}
                      </React.Fragment>
                  ),
                  sx: {
                      '& .MuiSvgIcon-root': {
                          color:'#1A237E',
                          marginRight:'5px',
                        
                          marginBottom: '0' 
                      }
                  }
              }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '10px', // Set border radius
                      '& fieldset': {
                          borderColor: '#1A237E', // Set border color
                          borderWidth: '2px' // Set border width
                      },
                      '&:hover fieldset': {
                          borderColor: '#a2beda', // Set border color on hover
                          borderWidth: '2px' // Set border width
                      },
                      '&.Mui-focused fieldset': {
                          borderColor: '#1A237E', // Set border color on focus
                          borderWidth: '2px' // Set border width
                      },
                  },
                  color: "#1A237E" // Text color
              }}
              style={{backgroundColor:"white",borderRadius:"10px"}}
                  FormHelperTextProps={{
                    sx: { backgroundColor: '#E8EAF6',marginTop:"-3px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px",paddingLeft:"20px"} // Set background color for error message
                  }}
                />)}
                PopperComponent={(props) => (
                  <Popper {...props} style={{backgroundColor: "#E8EAF6", borderRadius: "7px", border: "2px solid #1A237E",width:"330px"}}>
                      {props.children}
                  </Popper>
              )}
                
              />
              </Grid>
            </Grid>
           
            {/* <br /> */}
            <div style={{marginTop:"10px"}}>
                <p style={{fontWeight:'bold',fontSize:"16px"}}>
                Need to ask additional queries to the user ? 

                </p>
                <RadioGroup
                name="additional-queries"
                value={additionalQueries}
                onChange={handleRadioChange}
              >
              <p style={{marginTop:"-5px"}}>
                <FormControlLabel value="Yes" control={<Radio sx={{ color: '#1A237E' }}/>} label="Yes" />
                <FormControlLabel value="No" control={<Radio sx={{ color: '#1A237E' }}/>} label="No" />
                </p>
              </RadioGroup>
              {additionalQueries === 'Yes' && (
                <div style={{ fontSize: "16px" }}>
                {questions.map((question, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        <FaRegHandPointRight  style={{ marginRight: "8px", color: "#1A237E", fontSize: "24px",marginTop:"-15px" }} /> {/* Icon component */}
                        <p>{question}</p>
                    </div>
                ))}
            </div>
              )}

            </div>
            {/* <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div> */}
           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                    width:"180px",
                    borderRadius: '10px', // Rounded corners
                    padding: '7px 15px', // Padding
                    fontSize: '16px', // Font size
                    fontWeight: 'bold', // Bold font weight
                    textTransform: 'none', // Disable text transformation
                    boxShadow: 'none', // Disable box shadow
                    marginBottom:"20px",
                    color: 'white', // Set text color
                    backgroundColor: '#1A237E', // Set background color
                    '&:hover': {
                        backgroundColor: '#a2beda', // Change background color on hover
                        color: '#1A237E'
                    },
                }}
            > Submit
            </Button>
          </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default PostJob;