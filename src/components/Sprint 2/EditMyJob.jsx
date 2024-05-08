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
import EditIcon from '@mui/icons-material/Edit';

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
  
  const [editMode, setEditMode] = useState(false); // State to control edit mode
 
  const [jobPost, setJobPost] = useState({
    company_name: "",
    job_title: "",
    job_description: "",
    employee_type: "",
    job_role: "",
    location: [],
    skills: [],
    qualification: [],
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
            body: JSON.stringify({ job_id: viewJobId }),
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
    <div style={{
      background:'linear-gradient(90deg, rgba(26,35,126,1) 0%, rgba(232,234,246,1) 100%)',paddingTop:'2rem',paddingBottom:'2rem'}}>
      <Container
        component="main"
        style={{ 
          borderRadius: "10px",
          backgroundColor: "#E8EAF6",
          // boxShadow: "none" ,
          width:'70%'
      }}
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
            <h3 className="PostTitle">Edit Job</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <label style={{ marginRight: 'auto',fontWeight:'bold',fontSize:"16px" }}>Company Name</label> */}
            <label style={{ marginRight: 'auto',fontWeight:'bold',fontSize:"16px",color:'#1A237E',marginBottom:"-20px" }}>Job Title</label>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width:"100px",
                borderRadius: '10px', // Rounded corners
                padding: '7px 15px', // Padding
                fontSize: '16px', // Font size
                fontWeight: 'bold', // Bold font weight
                textTransform: 'none', // Disable text transformation
                boxShadow: 'none', // Disable box shadow
                color: 'white', // Set text color
                backgroundColor: '#303F9F', // Set background color
                '&:hover': {
                    backgroundColor: '#1A237E', // Change background color on hover
                    color: 'white '
                }
            }}
              endIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          </div>
            {/* <TextField
              margin="normal"
              fullWidth
              id="company-name"
              label={   "Company Name"}
              name="company_name"
              required
              value={jobPost.company_name}
              onChange={(e) => setJobPost({ ...jobPost, company_name: e.target.value })}
              disabled={!editMode}
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
              sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
          }}
            /> */}
            <TextField
              margin="normal"
              fullWidth
              id="job-title"
              // label="Job Title"
              placeholder="Enter the Job Title"
              name="job_title"
              value={jobPost.job_title}
              onChange={(e) => setJobPost({ ...jobPost, job_title: e.target.value })}
              disabled={!editMode}
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
              sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
          }}
            />

            <p style={{fontWeight:'bold',fontSize:"16px",marginTop:"10px",marginBottom:"-5px",color:'#1A237E'}}>Job Description</p>
            <TextField
              margin="normal"
              fullWidth
              name="job_description"
              // label="Job Description"
              placeholder="Enter the Job Description"
              type="text"
              id="job-description"
              multiline
              rows={4}
              value={jobPost.job_description}
              onChange={(e) => setJobPost({ ...jobPost, job_description: e.target.value })}
              disabled={!editMode}
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
              sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
          }}
            />

            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
              <label style={{fontWeight:'bold',fontSize:"16px",color:'#1A237E',marginBottom:'15px'}}>Employment Type</label>
                <Autocomplete
                  // sx={{ mt: 2 }}
                  options={employmentType}
                  placeholder="Select the Employment Type"
                  value={jobPost.employee_type}
                  onChange={(event, newEvent) => setJobPost({...jobPost, employee_type : newEvent})}
                  disabled={!editMode}
                  renderInput={(text) => <TextField {...text} />}
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
                  sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
              }}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} xl={6} xxl={6}>
                <label style={{fontWeight:'bold',fontSize:"16px",color:'#1A237E',marginBottom:'15px'}}>Role</label>
                <Autocomplete   
                  // sx={{ mt: 2 }}
                  options={Role}
                  value={jobPost.job_role}
                  placeholder="Select the Role"
                  onChange={(event, newEvent) => setJobPost({...jobPost, job_role : newEvent})}
                  renderInput={(job) => <TextField {...job}  />}
                  disabled={!editMode}
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
                  sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
              }}
                />
              </Grid>
            </Grid>
            <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"15px",color:'#1A237E',marginTop:'20px'}}>Locations</label>
        
            <Autocomplete
            multiple
             options={jobPost.location}
            value={jobPost.location}
            onChange={(event, newEvent) => setJobPost({...jobPost, location : newEvent })}
            renderInput={(para) => <TextField {...para}
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
          }}  />}
            disabled={!editMode}
            
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
            sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
        }}
          />
             <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"15px",color:'#1A237E',marginTop:'20px'}}>Skills</label>

            <Autocomplete
              multiple
              options={jobSkills}
              value={jobPost.skills}
              onChange={(event, newEvent) => setJobPost({...jobPost, skills : newEvent })}
              renderInput={(para) => <TextField {...para}
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
            }}   />}
              disabled={!editMode}
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
              sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
          }}
            />
            <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"15px",color:'#1A237E',marginTop:'20px'}}>Qualification</label>
            <Autocomplete
            multiple
             options={jobPost.qualification}
            value={jobPost.qualification}
            onChange={(event, newEvent) => setJobPost({...jobPost, qualification : newEvent })}
            renderInput={(para) => <TextField {...para}  InputProps={{
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
          }}  />}
            disabled={!editMode}
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
            sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
        }}
          />


          {/*   <TextField
              margin="normal"
              fullWidth
              id="job-qualification"
              label="Qualification"
              name="qualification"
              value={jobPost.qualification}
              onChange={(e) => setJobPost({ ...jobPost, qualification: e.target.value})}
            />
            */}
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"15px",color:'#1A237E'}}>Experience</label>
                <Autocomplete
                  // sx={{ mt: 2 }}
                  fullWidth
                  options={experienceOptions}
                  value={jobPost.experience}
                  onChange={(event, newEvent) => setJobPost({...jobPost, experience :newEvent})}
                  renderInput={(exp) => <TextField {...exp}  InputProps={{
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
                }}  />}
                  disabled={!editMode}
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
                  sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
              }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
                <label style={{fontWeight:'bold',fontSize:"16px",color:'#1A237E'}}>No.of.Vacancies</label>
                <TextField
                  fullWidth
                  margin="normal"
                  id="job-vacancy"
                  // label="Vacancy"
                  name="no_of_vacancies"
                  type="number"
                  value={jobPost.no_of_vacancies}
                  inputProps={{ min: 1 }}
                  onChange={(e) => setJobPost({ ...jobPost, no_of_vacancies: e.target.value })}
                  disabled={!editMode}
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
                  sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
              }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} xl={4} xxl={4}>
                <label style={{fontWeight:'bold',fontSize:"16px",marginBottom:"15px",color:'#1A237E'}}>Salary</label>
                <Autocomplete 
                // sx={{mt:2}}
                  fullWidth
                  options={salaryType}
                  value={jobPost.salary_range}
                  onChange={(event, newEvent) => setJobPost({ ...jobPost, salary_range:newEvent})}
                  renderInput={(range) => <TextField {...range}  InputProps={{
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
                }}  />}
                  disabled={!editMode}
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
                  sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
              }}
                />
              </Grid>
            </Grid>
            <br />
            {/* <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={HandleUpdate}
              >
                Update
              </Button>
            </div> */}
            {/* <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={HandleUpdate}
                disabled={!editMode} // Disable the button when not in edit mode
              >
                Update
              </Button>
            </div> */}
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={HandleUpdate}
                disabled={!editMode}
                sx={{
                    width:"250px",
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
            > Update
            </Button>
          </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default EditMyJob;