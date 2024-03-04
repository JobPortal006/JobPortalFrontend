
// import React, { useEffect, useState } from 'react';
// import { CircularProgress, Typography, Grid, TextField, Container, Button,Input } from '@mui/material';
// import { Select, MenuItem } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import {
//     AccordionSummary,
//     AccordionDetails,

// } from '@mui/material';
// //  import FormContainer from './FormContainer';



// const UserProfile = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [resume, setResume] = useState(null);

//     const [formData, setFormData] = useState({
//         data: {
//             Signup: {
//                 email: '',
//                 mobile_number: ''
//             },
//             userDetails: {
//                 first_name: '',
//                 last_name: '',
//                 gender: '',
//                 date_of_birth: ''
//             },
//             address: {
//                 permanent: {
//                     address_type: 'Permanent',
//                     city: '',
//                     state: '',
//                     country: '',
//                     pincode: '',
//                     street: ''
//                 },

//                 current: {
//                     address_type: 'Current',
//                     city: '',
//                     state: '',
//                     country: '',
//                     pincode: '',
//                     street: ''
//                 }
//             },

//             education_details: {
//                 hsc_end_year: '',
//                 hsc_percentage: '',
//                 hsc_start_year: '',
//                 hsc_school_name: '',
//                 sslc_end_year: '',
//                 sslc_percentage: '',
//                 sslc_school_name: '',
//                 sslc_start_year: ''
//             },
//             college_details: {
//                 college_end_year: '',
//                 college_name: '',
//                 college_percentage: '',
//                 college_start_year: '',
//                 degree: '',
//                 department: '',
//                 education_type: ''
//             },
//             PG_college_details: {
//                 pg_college_degree: '',
//                 pg_college_department: '',
//                 pg_college_end_year: '',
//                 pg_college_name: '',
//                 pg_college_percentage: '',
//                 pg_college_start_year: '',
//                 pg_college_education_type: ''
//             },
//             Diploma_college_details: {
//                 diploma_college_degree: '',
//                 diploma_college_department: '',
//                 diploma_college_end_year: '',
//                 diploma_college_name: '',
//                 diploma_college_percentage: '',
//                 diploma_college_start_year: '',
//                 diploma_college_education_type: ''
//             },
//             jobPreference: {
//                 department: '',
//                 industry: '',
//                 key_skills: '',
//                 prefered_locations: ''
//             },
//             // resume: null 

//         }
//     });

//      // Handle resume upload
//      const handleResumeChange = (event) => {
//         const file = event.target.files[0];
//         setResume(file);
//     };

//     // Handle removing the resume
//     const handleRemoveResume = () => {
//         setResume(null);

//         // Clear the file input value
//         const fileInput = document.getElementById('resume-input');
//         if (fileInput) {
//             fileInput.value = '';
//         }
//     };

//     useEffect(() => {
//         // Fetch data from the API
//         fetch('http://192.168.1.44:8000/get_user_details_view/')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setUserData(data);
//                 // Set resume data
//             // setResume(data.resume);
//                 setFormData({
//                     data: {
//                         Signup: {
//                             email: data.Signup.email,
//                             mobile_number: data.Signup.mobile_number
//                         },
//                         userDetails: {
//                             first_name: data.userDetails.first_name,
//                             last_name: data.userDetails.last_name,
//                             gender: data.userDetails.gender,
//                             date_of_birth: data.userDetails.date_of_birth
//                         },
//                         address: {
//                             permanent: {
//                                 address_type: data.address.permanent.address_type,
//                                 city: data.address.permanent.city,
//                                 state: data.address.permanent.state,
//                                 country: data.address.permanent.country,
//                                 pincode: data.address.permanent.pincode,
//                                 street: data.address.permanent.street
//                             },
//                             current: {
//                                 address_type: data.address.current.address_type,
//                                 city: data.address.current.city,
//                                 state: data.address.current.state,
//                                 country: data.address.current.country,
//                                 pincode: data.address.current.pincode,
//                                 street: data.address.current.street
//                             }
//                         },
//                         education_details: {
//                             hsc_start_year: data.education_details.hsc_start_year,
//                             hsc_end_year: data.education_details.hsc_end_year,
//                             hsc_percentage: data.education_details.hsc_percentage,
//                             hsc_school_name: data.education_details.hsc_school_name,
//                             sslc_end_year: data.education_details.sslc_end_year,
//                             sslc_percentage: data.education_details.sslc_percentage,
//                             sslc_school_name: data.education_details.sslc_school_name,
//                             sslc_start_year: data.education_details.sslc_start_year
//                         },
//                         college_details: {
//                             college_end_year: data.college_details.college_end_year,
//                             college_name: data.college_details.college_name,
//                             college_percentage: data.college_details.college_percentage,
//                             college_start_year: data.college_details.college_start_year,
//                             degree: data.college_details.degree,
//                             department: data.college_details.department,
//                             education_type: data.college_details.education_type
//                         },
//                         PG_college_details: {
//                             pg_college_degree: data.PG_college_details.pg_college_degree,
//                             pg_college_department: data.PG_college_details.pg_college_department,
//                             pg_college_end_year: data.PG_college_details.pg_college_end_year,
//                             pg_college_name: data.PG_college_details.pg_college_name,
//                             pg_college_percentage: data.PG_college_details.pg_college_percentage,
//                             pg_college_start_year: data.PG_college_details.pg_college_start_year,
//                             pg_college_education_type: data.PG_college_details.pg_college_education_type
//                         },
//                         Diploma_college_details: {
//                             diploma_college_degree: data.Diploma_college_details.diploma_college_degree,
//                             diploma_college_department: data.Diploma_college_details.diploma_college_department,
//                             diploma_college_end_year: data.Diploma_college_details.diploma_college_end_year,
//                             diploma_college_name: data.Diploma_college_details.diploma_college_name,
//                             diploma_college_percentage: data.Diploma_college_details.diploma_college_percentage,
//                             diploma_college_start_year: data.Diploma_college_details.diploma_college_start_year,
//                             diploma_college_education_type: data.Diploma_college_details.diploma_college_education_type
//                         },
//                         jobPreference: {
//                             department: data.jobPreference.department,
//                             industry: data.jobPreference.industry,
//                             key_skills: data.jobPreference.key_skills,
//                             prefered_locations: data.jobPreference.prefered_locations
//                         }
//                     }
//                 }); // Set initial form data
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             data: {
//                 ...prevData.data,
//                 Signup: {
//                     ...prevData.data.Signup,
//                     [name]: value
//                 },
//                 userDetails: {
//                     ...prevData.data.userDetails,
//                     [name]: value
//                 },

//                 education_details: {
//                     ...prevData.data.education_details,
//                     [name]: value
//                 },
//                 college_details: {
//                     ...prevData.data.college_details,
//                     [name]: value
//                 },
//                 PG_college_details: {
//                     ...prevData.data.PG_college_details,
//                     [name]: value
//                 },
//                 Diploma_college_details: {
//                     ...prevData.data.Diploma_college_details,
//                     [name]: value
//                 },
//                 jobPreference: {
//                     ...prevData.data.jobPreference,
//                     [name]: value
//                 }

//             }
//         }));
//     };
//     const handlePermanentAddressChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             data: {
//                 ...prevData.data,
//                 address: {
//                     ...prevData.data.address,
//                     permanent: {
//                         ...prevData.data.address.permanent,
//                         [name]: value
//                     }
//                 }
//             }
//         }));
//     };

//     const handleCurrentAddressChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             data: {
//                 ...prevData.data,
//                 address: {
//                     ...prevData.data.address,
//                     current: {
//                         ...prevData.data.address.current,
//                         [name]: value
//                     }
//                 }
//             }
//         }));
//     };


//     const response = {
//         data: {
//             Signup: {
//                 email: '',
//                 mobile_number: ''
//             },
//             userDetails: {
//                 first_name: '',
//                 last_name: '',
//                 gender: '',
//                 date_of_birth: ''
//             },
//             address: {
//                 permanent: {
//                     address_type: 'Permanent',
//                     city: '',
//                     state: '',
//                     country: '',
//                     pincode: '',
//                     street: ''
//                 },
//                 current: {
//                     address_type: 'Current',
//                     city: '',
//                     state: '',
//                     country: '',
//                     pincode: '',
//                     street: ''
//                 }
//             },
//             education_details: {
//                 hsc_end_year: '',
//                 hsc_percentage: '',
//                 hsc_start_year: '',
//                 hsc_school_name: '',
//                 sslc_end_year: '',
//                 sslc_percentage: '',
//                 sslc_school_name: '',
//                 sslc_start_year: ''
//             },
//             college_details: {
//                 college_end_year: '',
//                 college_name: '',
//                 college_percentage: '',
//                 college_start_year: '',
//                 degree: '',
//                 department: '',
//                 education_type: ''
//             },
//             PG_college_details: {
//                 pg_college_degree: '',
//                 pg_college_department: '',
//                 pg_college_end_year: '',
//                 pg_college_name: '',
//                 pg_college_percentage: '',
//                 pg_college_start_year: '',
//                 pg_college_education_type: ''
//             },
//             Diploma_college_details: {
//                 diploma_college_degree: '',
//                 diploma_college_department: '',
//                 diploma_college_end_year: '',
//                 diploma_college_name: '',
//                 diploma_college_percentage: '',
//                 diploma_college_start_year: '',
//                 diploma_college_education_type: ''
//             },
//             jobPreference: {
//                 department: '',
//                 industry: '',
//                 key_skills: '',
//                 prefered_locations: ''
//             }
//         }
//     };

//     const jsonResponse = JSON.stringify(response);
//     console.log(jsonResponse);



//     // const handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     console.log("Updated Form Data:", formData);

//     //     // Send updated form data to the backend API
//     //     fetch('http://192.168.1.44:8000/update_user_details/', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify(formData),
//     //     })
//     //         .then(response => {
//     //             if (!response.ok) {
//     //                 throw new Error('Failed to update user details');
//     //             }

//     //             // Handle success response if needed
//     //             console.log("User details updated successfully");
//     //         })
//     //         .catch(error => {
//     //             // Handle error if the request fails
//     //             console.error('Error updating user details:', error);
//     //         });
//     // };


// // submit to response with proper 
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Updated Form Data:", formData);

//         // Send updated form data to the backend API
//         fetch('http://192.168.1.44:8000/update_user_details/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to update user details');
//             }
//             // If response is successful, parse the JSON response
//             return response.json();
//         })
//         .then(data => {
//             // Handle the data received from the server
//             console.log("Response from server:", data);
//             // Optionally, perform further actions based on the response
//         })
//         .catch(error => {
//             // Handle error if the request fails
//             console.error('Error updating user details:', error);
//         });
//     };

//     if (loading) {
//         return <CircularProgress />; // Display loading indicator
//     }

//     if (error) {
//         return <Typography>Error: {error.message}</Typography>; // Display error message
//     }

//     if (!userData || !formData) {
//         return null; // Handle case when userData is not available yet
//     }

//     return (
//         <div className='profilebackground-div'>
//             <div className="profilebackground-div">
//                 <Container style={{ marginTop: '60px' }} >
//                     <Typography variant="h4" align="center" gutterBottom>
//                         Profile
//                     </Typography>


//                     <form onSubmit={handleSubmit} >
//                         {/* User Details Accordion */}

//                         <AccordionSummary >
//                             <Typography variant="h6">User Details</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     {/* First Column */}
//                                     <TextField className='textfield'
//                                         label='First Name'
//                                         name="first_name"
//                                         onChange={handleChange}
//                                         value={formData.data.userDetails.first_name}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label='Last Name'
//                                         name="last_name"
//                                         value={formData.data.userDetails.last_name}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"



//                                     />
//                                     <TextField className='textfield'
//                                         label='Date-of-birth (month/date/year)'
//                                         name="date_of_birth"
//                                         value={formData.data.userDetails.date_of_birth}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"




//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     {/* Second Column */}
//                                     <TextField className='textfield'
//                                         label='Mobile Number'
//                                         name="mobile_number"
//                                         value={formData.data.Signup.mobile_number}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"



//                                     />
//                                     <TextField className='textfield'
//                                         label="gender"
//                                         name="gender"
//                                         value={formData.data.userDetails.gender}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         displayEmpty
//                                         margin="dense"




//                                     >
//                                         {/* <MenuItem value="" disabled>Select Gender</MenuItem>
//                                            <MenuItem className='male' value="male">Male</MenuItem>
//                                            <MenuItem value="female">Female</MenuItem>
//                                            <MenuItem value="other">Other</MenuItem> */}
//                                     </TextField>
//                                     {/* <label htmlFor="profile-picture-input">Upload Profile Picture:</label>
//                                        <br></br>
//                                        <Input
//                                            type="file"
//                                            accept="image/*"
//                                            onChange={handleChange}
//                                            margin="dense"
//                                            id="profile-picture-input"
//                                        /> */}
//                                 </Grid>
//                             </Grid>

//                             {/* {profilePicture && (
//                                    <div>
//                                        <Avatar
//                                            alt="Profile Picture"
//                                            src={URL.createObjectURL(profilePicture)}
//                                            sx={{ width: 100, height: 100, marginTop: 2 }}
//                                        />
//                                        <Button color="secondary" onClick={handleRemoveProfilePicture}>
//                                            Remove Picture
//                                        </Button>
//                                    </div>
//                                )} */}
//                         </AccordionDetails>

//                         {/* Address Accordion */}

//                         <AccordionSummary >
//                             <Typography variant="h6">Address</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Typography variant="h6"> Permanent and current Address:</Typography>

//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6} >
//                                     {/* First Column */}
//                                     <TextField className='textfield'
//                                         label="permanent Street"
//                                         name="street"
//                                         value={formData.data.address.permanent.street}
//                                         onChange={handlePermanentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label=" permanent City"
//                                         name="city"
//                                         value={formData.data.address.permanent.city}

//                                         onChange={handlePermanentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="permanent pincode"
//                                         name="pincode"
//                                         value={formData.data.address.permanent.pincode}

//                                         onChange={handlePermanentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />

//                                     <TextField className='textfield'
//                                         label="permanent Country"
//                                         name="country"
//                                         value={formData.data.address.permanent.country}

//                                         onChange={handlePermanentAddressChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="permanent State"
//                                         name="state"
//                                         value={formData.data.address.permanent.state}

//                                         onChange={handlePermanentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />

//                                 </Grid>
//                                 <Grid item xs={12} sm={6} >
//                                     {/* <Typography variant="h6">Current Address</Typography> */}
//                                     <TextField className='textfield'
//                                         label="Current Street"
//                                         name="street"
//                                         value={formData.data.address.current.street}
//                                         onChange={handleCurrentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="Current City"
//                                         name="city"
//                                         value={formData.data.address.current.city}

//                                         onChange={handleCurrentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="Current Pincode"
//                                         name="pincode"
//                                         value={formData.data.address.current.pincode}

//                                         onChange={handleCurrentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />

//                                     <TextField className='textfield'
//                                         label="Current Country"
//                                         name="country"
//                                         value={formData.data.address.current.country}

//                                         onChange={handleCurrentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="Current State"
//                                         name="state"
//                                         value={formData.data.address.current.state}

//                                         onChange={handleCurrentAddressChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />

//                                 </Grid>
//                             </Grid>
//                         </AccordionDetails>


//                         {/* Educatiom Accordion */}

//                         <AccordionSummary > <Typography variant="h6">Education details</Typography></AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>

//                                     {/* First Column */}
//                                     <TextField className='textfield'
//                                         label="SSLC-school-name"
//                                         name="sslc_school_name"
//                                         value={formData.data.education_details.sslc_school_name}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="SSLC-start-year"
//                                         name="sslc_start_year"
//                                         value={formData.data.education_details.sslc_start_year}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="SSLC-end-year"
//                                         name="sslc_end_year"
//                                         value={formData.data.education_details.sslc_end_year}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="SSLC-percentage"
//                                         name="sslc_percentage"
//                                         value={formData.data.education_details.sslc_percentage}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                 </Grid>

//                                 <Grid item xs={12} sm={6}>
//                                     {/* Second Column */}
//                                     <TextField className='textfield'
//                                         label="HSC-school-name"
//                                         name="hsc_school_name"
//                                         value={formData.data.education_details.hsc_school_name}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="HSC-start-year"
//                                         name="hsc_start_year"
//                                         value={formData.data.education_details.hsc_start_year}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="HSC-end-year"
//                                         name="hsc_end_year"
//                                         value={formData.data.education_details.hsc_end_year}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="HSC-percentage"
//                                         name="hsc_percentage"
//                                         value={formData.data.education_details.hsc_percentage}

//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography sx={{ width: '100%' }} >UG Details:</Typography>
//                                     {/* Third Column */}
//                                     <TextField className='textfield'
//                                         label="College-name"
//                                         name="college_name"
//                                         value={formData.data.college_details.college_name}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="College-start-year"
//                                         name="college_start_year"
//                                         value={formData.data.college_details.college_start_year}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"



//                                     />
//                                     <TextField className='textfield'
//                                         label="College-end-year"
//                                         name="college_end_year"
//                                         value={formData.data.college_details.college_end_year}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="College-percentage"
//                                         name="college_percentage"
//                                         value={formData.data.college_details.college_percentage}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                 </Grid>

//                                 <Grid item xs={12} sm={6} >
//                                     <Typography sx={{ color: 'transparent' }}> . </Typography>
//                                     {/* Fourth Column */}
//                                     <TextField className='textfield'
//                                         label="Department"
//                                         name="department"
//                                         value={formData.data.college_details.department}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                     <TextField className='textfield'
//                                         label="Degree"
//                                         name="degree"
//                                         value={formData.data.college_details.degree}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                 </Grid>


//                                 {/* pg and diplamo */}
//                                 <Grid item xs={12}>
//                                     {/* Radio Buttons for PG/Diploma */}
//                                     <FormControl component="fieldset">
//                                         <RadioGroup
//                                             className='radio_button'
//                                             row
//                                             aria-label="education-type"
//                                             name="education_type"
//                                             value={formData.data.PG_college_details}
//                                             onChange={handleChange}
//                                         >
//                                             <FormControlLabel
//                                                 className='pg_button1'
//                                                 value="pg"
//                                                 control={<Radio />}
//                                                 label="PG"
//                                             />
//                                             <FormControlLabel
//                                                 className='pg_button2'
//                                                 value="diploma"
//                                                 control={<Radio />}
//                                                 label="Diploma"
//                                             />
//                                         </RadioGroup>
//                                     </FormControl>
//                                 </Grid>

//                                 {/* Additional Fields based on Radio Button selection */}
//                                 {/* {formData.data.college_details.education_type === 'pg' && ( */}
//                                 <>
//                                     {/* Additional PG Fields */}
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="PG-College-name"
//                                             name="pg_college_name"
//                                             value={formData.data.PG_college_details.pg_college_name}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-start-year"
//                                             name="pg_college_start_year"
//                                             value={formData.data.PG_college_details.pg_college_start_year}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-end-year"
//                                             name="pg_college_end_year"
//                                             value={formData.data.PG_college_details.pg_college_end_year}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"


//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-percentage"
//                                             name="pg_college_percentage"
//                                             value={formData.data.PG_college_details.pg_college_percentage}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"


//                                         />
//                                         {/* Add other PG fields here */}
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="PG-College-department"
//                                             name="pg_college_department"
//                                             value={formData.data.PG_college_details.pg_college_department}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"


//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-degree"
//                                             name="pg_college_degree"
//                                             value={formData.data.PG_college_details.pg_college_degree}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"


//                                         />
//                                     </Grid>
//                                 </>
//                                 {/* )} */}

//                                 {/* {formData.data.education_type === 'diploma' && ( */}
//                                 <>
//                                     {/* Additional Diploma Fields */}
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="Diploma-college-name"
//                                             name="diploma_college_name"
//                                             value={formData.data.Diploma_college_details.diploma_college_name}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-start-year"
//                                             name="diploma_college_start_year"
//                                             value={formData.data.Diploma_college_details.diploma_college_start_year}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-end-year"
//                                             name="diploma_college_end_year"
//                                             value={formData.data.Diploma_college_details.diploma_college_end_year}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-percentage"
//                                             name="diploma_college_percentage"
//                                             value={formData.data.Diploma_college_details.diploma_college_percentage}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         {/* Add other Diploma fields here */}
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="Diploma-college-department"
//                                             name="diploma_college_department"
//                                             value={formData.data.Diploma_college_details.diploma_college_department}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-degree"
//                                             name="diploma_college_degree"
//                                             value={formData.data.Diploma_college_details.diploma_college_degree}
//                                             onChange={handleChange}
//                                             fullWidth
//                                             margin="dense"

//                                         />
//                                     </Grid>
//                                 </>
//                                 {/* )} */}
//                             </Grid>
//                         </AccordionDetails>


//                         {/* job preference */}

//                         <AccordionSummary > <Typography variant="h6">Job Preference</Typography></AccordionSummary>
//                         <AccordionDetails>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={6}>
//                                     {/* First Column */}
//                                     <TextField className='textfield'
//                                         label="Key-skills"
//                                         name="key_skills"
//                                         value={formData.data.jobPreference.key_skills}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="Industry"
//                                         name="industry"
//                                         value={formData.data.jobPreference.industry}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"

//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <TextField className='textfield'
//                                         label="Department"
//                                         name="department"
//                                         value={formData.data.jobPreference.department}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                     <TextField className='textfield'
//                                         label="Prefered locations"
//                                         name="prefered_locations"
//                                         value={formData.data.jobPreference.prefered_locations}
//                                         onChange={handleChange}
//                                         fullWidth
//                                         margin="dense"


//                                     />
//                                 </Grid>

//                             </Grid>

//                         </AccordionDetails>



//                         {/* resume */}
//                         <AccordionSummary >
//                         <Typography variant="h6">Resume</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {/* First Column */}
//                                 <label htmlFor="resume-input">Upload Resume:</label>
//                                 <Input
//                                     type="file"
//                                     accept=".pdf,.doc,.docx"
//                                     onChange={handleResumeChange}
//                                     margin="dense"
//                                     id="resume-input"
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 {/* Second Column */}
//                                 {resume && (
//                                     <div>
//                                         <Typography variant="subtitle1">Uploaded Resume:</Typography>
//                                         <Typography>{resume.name}</Typography>
//                                         <Button color="secondary" onClick={handleRemoveResume}>
//                                             Remove Resume
//                                         </Button>
//                                     </div>
//                                 )}
//                             </Grid>
//                         </Grid>
//                     </AccordionDetails>

//                         <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>

//                     </form>



//                 </Container>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;



// =========================================================================ffor Image
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Grid, TextField, Container, Button, Input, Avatar } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {
    AccordionSummary,
    AccordionDetails,

} from '@mui/material';
import { BeatLoader } from 'react-spinners';
//  import FormContainer from './FormContainer';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
`;

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resume, setResume] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [userId, setUserId] = useState(39); // Initial user ID
    const [postData, setPostdata] = useState(null);
    console.log(postData, '=====postdata=====')
    // Handle removing the profile picture

    useEffect(() => {
        // Fetch user data from the API
        fetch('http://192.168.1.44:8000/get_user_details/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId // Make sure userId is defined in your component
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then(data => {
                setPostdata(data); // Set fetched user data
                setLoading1(false); // Set loading to false when data fetching is complete
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setLoading1(false); // Set loading to false in case of error
            });
    }, []);
    const handleRemoveProfilePicture = () => {
        setProfilePicture(null);

        // Clear the file input value
        const fileInput = document.getElementById('profile-picture-input');
        if (fileInput) {
            fileInput.value = '';
        }
    };
    // Handle profile picture upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        setProfilePicture(file);

        // Update userDetails to include profile_picture
        setFormData((prevUserDetails) => ({
            ...prevUserDetails,
            profile_picture: file,
        }));
    };

    const [name, setName] = useState('');

    const [formData, setFormData] = useState({
        data: {
            Signup: {
                email: '',
                mobile_number: ''
            },
            userDetails: {
                first_name: '',
                last_name: '',
                gender: '',
                date_of_birth: '',
                // profile_picture_path:''
            },
            address: {
                permanent: {
                    address_type: 'Permanent',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    street: ''
                },

                current: {
                    address_type: 'Current',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    street: ''
                }
            },

            education_details: {
                hsc_end_year: '',
                hsc_percentage: '',
                hsc_start_year: '',
                hsc_school_name: '',
                sslc_end_year: '',
                sslc_percentage: '',
                sslc_school_name: '',
                sslc_start_year: ''
            },
            college_details: {
                college_end_year: '',
                college_name: '',
                college_percentage: '',
                college_start_year: '',
                degree: '',
                department: '',
                education_type: ''
            },
            PG_college_details: {
                pg_college_degree: '',
                pg_college_department: '',
                pg_college_end_year: '',
                pg_college_name: '',
                pg_college_percentage: '',
                pg_college_start_year: '',
                pg_college_education_type: ''
            },
            Diploma_college_details: {
                diploma_college_degree: '',
                diploma_college_department: '',
                diploma_college_end_year: '',
                diploma_college_name: '',
                diploma_college_percentage: '',
                diploma_college_start_year: '',
                diploma_college_education_type: ''
            },
            professionalDetails: {
                companies: [
                    {
                        company_name: '',
                        years_of_experience: 0,
                        job_role: '',
                        skills: ''
                    },
                    {
                        company_name: '',
                        years_of_experience: 0,
                        job_role: '',
                        skills: ''
                    }
                ],
                numberOfCompanies: '2'
            },
            jobPreference: {
                department: '',
                industry: '',
                key_skills: '',
                prefered_locations: ''
            },
            // resume: null 

        }
    });

    // Handle resume upload
    const handleResumeChange = (event) => {
        const file = event.target.files[0];
        setResume(file);
    };

    // Handle removing the resume
    const handleRemoveResume = () => {
        setResume(null);

        // Clear the file input value
        const fileInput = document.getElementById('resume-input');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    useEffect(() => {
        // Fetch data from the API
        fetch('http://192.168.1.44:8000/get_user_details_view/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                // Set resume data
                // setResume(data.resume);
                setFormData({
                    data: {
                        Signup: {
                            email: data.Signup.email,
                            mobile_number: data.Signup.mobile_number
                        },
                        userDetails: {
                            first_name: data.userDetails.first_name,
                            last_name: data.userDetails.last_name,
                            gender: data.userDetails.gender,
                            date_of_birth: data.userDetails.date_of_birth,
                            // profile_picture_path:userData.profile_picture_path
                        },
                        address: {
                            permanent: {
                                address_type: data.address.permanent.address_type,
                                city: data.address.permanent.city,
                                state: data.address.permanent.state,
                                country: data.address.permanent.country,
                                pincode: data.address.permanent.pincode,
                                street: data.address.permanent.street
                            },
                            current: {
                                address_type: data.address.current.address_type,
                                city: data.address.current.city,
                                state: data.address.current.state,
                                country: data.address.current.country,
                                pincode: data.address.current.pincode,
                                street: data.address.current.street
                            }
                        },
                        education_details: {
                            hsc_start_year: data.education_details.hsc_start_year,
                            hsc_end_year: data.education_details.hsc_end_year,
                            hsc_percentage: data.education_details.hsc_percentage,
                            hsc_school_name: data.education_details.hsc_school_name,
                            sslc_end_year: data.education_details.sslc_end_year,
                            sslc_percentage: data.education_details.sslc_percentage,
                            sslc_school_name: data.education_details.sslc_school_name,
                            sslc_start_year: data.education_details.sslc_start_year
                        },
                        college_details: {
                            college_end_year: data.college_details.college_end_year,
                            college_name: data.college_details.college_name,
                            college_percentage: data.college_details.college_percentage,
                            college_start_year: data.college_details.college_start_year,
                            degree: data.college_details.degree,
                            department: data.college_details.department,
                            education_type: data.college_details.education_type
                        },
                        PG_college_details: {
                            pg_college_degree: data.PG_college_details.pg_college_degree,
                            pg_college_department: data.PG_college_details.pg_college_department,
                            pg_college_end_year: data.PG_college_details.pg_college_end_year,
                            pg_college_name: data.PG_college_details.pg_college_name,
                            pg_college_percentage: data.PG_college_details.pg_college_percentage,
                            pg_college_start_year: data.PG_college_details.pg_college_start_year,
                            pg_college_education_type: data.PG_college_details.pg_college_education_type
                        },
                        Diploma_college_details: {
                            diploma_college_degree: data.Diploma_college_details.diploma_college_degree,
                            diploma_college_department: data.Diploma_college_details.diploma_college_department,
                            diploma_college_end_year: data.Diploma_college_details.diploma_college_end_year,
                            diploma_college_name: data.Diploma_college_details.diploma_college_name,
                            diploma_college_percentage: data.Diploma_college_details.diploma_college_percentage,
                            diploma_college_start_year: data.Diploma_college_details.diploma_college_start_year,
                            diploma_college_education_type: data.Diploma_college_details.diploma_college_education_type
                        },
                        jobPreference: {
                            department: data.jobPreference.department,
                            industry: data.jobPreference.industry,
                            key_skills: data.jobPreference.key_skills,
                            prefered_locations: data.jobPreference.prefered_locations
                        },
                        professionalDetails: {
                            companies: data.professionalDetails.companies,
                            numberOfCompanies: data.professionalDetails.numberOfCompanies
                        }
                    }
                }); // Set initial form data
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        // const { name, value } = event.target;
        const { name, value } = event.target;
        console.log(value, 'companyname')
        const [field, index, subfield] = name.split('.');
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                Signup: {
                    ...prevData.data.Signup,
                    [name]: value
                },
                userDetails: {
                    ...prevData.data.userDetails,
                    [name]: value
                },

                education_details: {
                    ...prevData.data.education_details,
                    [name]: value
                },
                college_details: {
                    ...prevData.data.college_details,
                    [name]: value
                },
                PG_college_details: {
                    ...prevData.data.PG_college_details,
                    [name]: value
                },
                Diploma_college_details: {
                    ...prevData.data.Diploma_college_details,
                    [name]: value
                },
                jobPreference: {
                    ...prevData.data.jobPreference,
                    [name]: value
                },
                professionalDetails: {
                    ...prevData.data.professionalDetails,
                    [name]: value
                },
                // professionalDetails: {
                //     ...prevData.data.professionalDetails.companies,
                //     [name]: value
                // }


            }
        }));
    };
    const handlePermanentAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                address: {
                    ...prevData.data.address,
                    permanent: {
                        ...prevData.data.address.permanent,
                        [name]: value
                    }
                }
            }
        }));
    };

    const handleCurrentAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                address: {
                    ...prevData.data.address,
                    current: {
                        ...prevData.data.address.current,
                        [name]: value
                    }
                }
            }
        }));
    };


    const response = {
        data: {
            Signup: {
                email: '',
                mobile_number: ''
            },
            userDetails: {
                first_name: '',
                last_name: '',
                gender: '',
                date_of_birth: '',
                // profile_picture_path:''
            },
            address: {
                permanent: {
                    address_type: 'Permanent',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    street: ''
                },
                current: {
                    address_type: 'Current',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    street: ''
                }
            },
            education_details: {
                hsc_end_year: '',
                hsc_percentage: '',
                hsc_start_year: '',
                hsc_school_name: '',
                sslc_end_year: '',
                sslc_percentage: '',
                sslc_school_name: '',
                sslc_start_year: ''
            },
            college_details: {
                college_end_year: '',
                college_name: '',
                college_percentage: '',
                college_start_year: '',
                degree: '',
                department: '',
                education_type: ''
            },
            PG_college_details: {
                pg_college_degree: '',
                pg_college_department: '',
                pg_college_end_year: '',
                pg_college_name: '',
                pg_college_percentage: '',
                pg_college_start_year: '',
                pg_college_education_type: ''
            },
            Diploma_college_details: {
                diploma_college_degree: '',
                diploma_college_department: '',
                diploma_college_end_year: '',
                diploma_college_name: '',
                diploma_college_percentage: '',
                diploma_college_start_year: '',
                diploma_college_education_type: ''
            },
            jobPreference: {
                department: '',
                industry: '',
                key_skills: '',
                prefered_locations: ''
            }
        }
    };

    const jsonResponse = JSON.stringify(response);
    console.log(jsonResponse);

    const handleOnChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            data: {
                ...prev?.data,
                [name]: value
            }
        }));
    }

    // console.log(formData,"name111");


    // submit to response with proper 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Form Data:", formData);

        // Send updated form data to the backend API
        fetch('http://192.168.1.44:8000/update_user_details/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user details');
                }
                // If response is successful, parse the JSON response
                return response.json();
            })
            .then(data => {
                // Handle the data received from the server
                console.log("Response from server:", data);
                // Optionally, perform further actions based on the response
            })
            .catch(error => {
                // Handle error if the request fails
                console.error('Error updating user details:', error);
            });
    };

    if (loading) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BeatLoader color="#36D7B7" css={override} /> {/* Use BeatLoader for the loading animation */}
            <p>Loading profile information...</p> {/* Text indicating that profile information is loading */}
        </div>; // Display loading indicator
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>; // Display error message
    }

    if (!userData || !formData) {
        return null; // Handle case when userData is not available yet
    }

    return (
        <div className='profilebackground-div'>
            {loading1 ? (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <BeatLoader color="#36D7B7" css={override} /> {/* Use BeatLoader for the loading animation */}
                    <p>Loading profile information...</p> {/* Text indicating that profile information is loading */}
                </div>
            ) : (
                <div className="profilebackground-div">
                    <Container style={{ marginTop: '60px' }} >
                        <Typography variant="h4" align="center" gutterBottom>
                            Profile
                        </Typography>


                        <form onSubmit={handleSubmit} >
                            {/* User Details Accordion */}

                            <AccordionSummary >
                                <Typography variant="h6">User Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/* First Column */}
                                        <TextField className='textfield'
                                            label='First Name'
                                            name="first_name"
                                            onChange={handleChange}
                                            value={formData.data.userDetails.first_name}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label='Last Name'
                                            name="last_name"
                                            value={formData.data.userDetails.last_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"



                                        />
                                        <TextField className='textfield'
                                            label='Date-of-birth (month/date/year)'
                                            name="date_of_birth"
                                            type='date'

                                            value={formData.data.userDetails.date_of_birth}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"




                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Second Column */}
                                        <TextField className='textfield'
                                            label='Mobile Number'
                                            name="mobile_number"
                                            value={formData.data.Signup.mobile_number}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"



                                        />
                                        <TextField className='textfield'
                                            label="gender"
                                            name="gender"
                                            value={formData.data.userDetails.gender}
                                            onChange={handleChange}
                                            fullWidth
                                            displayEmpty
                                            margin="dense"
                                        >

                                            {/* <MenuItem value="" disabled>Select Gender</MenuItem>
                                           <MenuItem className='male' value="male">Male</MenuItem>
                                           <MenuItem value="female">Female</MenuItem>
                                           <MenuItem value="other">Other</MenuItem> */}
                                        </TextField>
                                        <label htmlFor="profile-picture-input">Upload Profile Picture:</label>
                                        <br></br>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            margin="dense"
                                            id="profile-picture-input"
                                        />
                                    </Grid>
                                </Grid>

                                {profilePicture && (
                                    <div>
                                        <Avatar
                                            alt="Profile Picture"
                                            src={URL.createObjectURL(profilePicture)}
                                            sx={{ width: 100, height: 100, marginTop: 2 }}
                                        />
                                        <Button color="secondary" onClick={handleRemoveProfilePicture}>
                                            Remove Picture
                                        </Button>
                                    </div>
                                )}
                            </AccordionDetails>

                            {/* Address Accordion */}

                            <AccordionSummary >
                                <Typography variant="h6">Address</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6"> Permanent and current Address:</Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} >
                                        {/* First Column */}
                                        <TextField className='textfield'
                                            label="permanent Street"
                                            name="street"
                                            value={formData.data.address.permanent.street}
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label=" permanent City"
                                            name="city"
                                            value={formData.data.address.permanent.city}

                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="permanent pincode"
                                            name="pincode"
                                            value={formData.data.address.permanent.pincode}

                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />

                                        <TextField className='textfield'
                                            label="permanent Country"
                                            name="country"
                                            value={formData.data.address.permanent.country}

                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="permanent State"
                                            name="state"
                                            value={formData.data.address.permanent.state}

                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        {/* <Typography variant="h6">Current Address</Typography> */}
                                        <TextField className='textfield'
                                            label="Current Street"
                                            name="street"
                                            value={formData.data.address.current.street}
                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="Current City"
                                            name="city"
                                            value={formData.data.address.current.city}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="Current Pincode"
                                            name="pincode"
                                            value={formData.data.address.current.pincode}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />

                                        <TextField className='textfield'
                                            label="Current Country"
                                            name="country"
                                            value={formData.data.address.current.country}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="Current State"
                                            name="state"
                                            value={formData.data.address.current.state}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />

                                    </Grid>
                                </Grid>
                            </AccordionDetails>


                            {/* Educatiom Accordion */}

                            <AccordionSummary > <Typography variant="h6">Education details</Typography></AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>

                                        {/* First Column */}
                                        <TextField className='textfield'
                                            label="SSLC-school-name"
                                            name="sslc_school_name"
                                            value={formData.data.education_details.sslc_school_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="SSLC-start-year"
                                            name="sslc_start_year"
                                            value={formData.data.education_details.sslc_start_year}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="SSLC-end-year"
                                            name="sslc_end_year"
                                            value={formData.data.education_details.sslc_end_year}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="SSLC-percentage"
                                            name="sslc_percentage"
                                            value={formData.data.education_details.sslc_percentage}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        {/* Second Column */}
                                        <TextField className='textfield'
                                            label="HSC-school-name"
                                            name="hsc_school_name"
                                            value={formData.data.education_details.hsc_school_name}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="HSC-start-year"
                                            name="hsc_start_year"
                                            value={formData.data.education_details.hsc_start_year}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="HSC-end-year"
                                            name="hsc_end_year"
                                            value={formData.data.education_details.hsc_end_year}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="HSC-percentage"
                                            name="hsc_percentage"
                                            value={formData.data.education_details.hsc_percentage}

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography sx={{ width: '100%' }} >UG Details:</Typography>
                                        {/* Third Column */}
                                        <TextField className='textfield'
                                            label="College-name"
                                            name="college_name"
                                            value={formData.data.college_details.college_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="College-start-year"
                                            name="college_start_year"
                                            value={formData.data.college_details.college_start_year}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"



                                        />
                                        <TextField className='textfield'
                                            label="College-end-year"
                                            name="college_end_year"
                                            value={formData.data.college_details.college_end_year}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="College-percentage"
                                            name="college_percentage"
                                            value={formData.data.college_details.college_percentage}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} >
                                        <Typography sx={{ color: 'transparent' }}> . </Typography>
                                        {/* Fourth Column */}
                                        <TextField className='textfield'
                                            label="Department"
                                            name="department"
                                            value={formData.data.college_details.department}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="Degree"
                                            name="degree"
                                            value={formData.data.college_details.degree}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                    </Grid>


                                    {/* pg and diplamo */}
                                    <Grid item xs={12}>
                                        {/* Radio Buttons for PG/Diploma */}
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                className='radio_button'
                                                row
                                                aria-label="education-type"
                                                name="education_type"
                                                value={formData.data.PG_college_details}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    className='pg_button1'
                                                    value="pg"
                                                    control={<Radio />}
                                                    label="PG"
                                                />
                                                <FormControlLabel
                                                    className='pg_button2'
                                                    value="diploma"
                                                    control={<Radio />}
                                                    label="Diploma"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    {/* Additional Fields based on Radio Button selection */}
                                    {/* {formData.data.college_details.education_type === 'pg' && ( */}
                                    <>
                                        {/* Additional PG Fields */}
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="PG-College-name"
                                                name="pg_college_name"
                                                value={formData.data.PG_college_details.pg_college_name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="PG-College-start-year"
                                                name="pg_college_start_year"
                                                value={formData.data.PG_college_details.pg_college_start_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="PG-College-end-year"
                                                name="pg_college_end_year"
                                                value={formData.data.PG_college_details.pg_college_end_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"


                                            />
                                            <TextField className='textfield'
                                                label="PG-College-percentage"
                                                name="pg_college_percentage"
                                                value={formData.data.PG_college_details.pg_college_percentage}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"


                                            />
                                            {/* Add other PG fields here */}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="PG-College-department"
                                                name="pg_college_department"
                                                value={formData.data.PG_college_details.pg_college_department}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"


                                            />
                                            <TextField className='textfield'
                                                label="PG-College-degree"
                                                name="pg_college_degree"
                                                value={formData.data.PG_college_details.pg_college_degree}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"


                                            />
                                        </Grid>
                                    </>
                                    {/* )} */}

                                    {/* {formData.data.education_type === 'diploma' && ( */}
                                    <>
                                        {/* Additional Diploma Fields */}
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="Diploma-college-name"
                                                name="diploma_college_name"
                                                value={formData.data.Diploma_college_details.diploma_college_name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-start-year"
                                                name="diploma_college_start_year"
                                                value={formData.data.Diploma_college_details.diploma_college_start_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-end-year"
                                                name="diploma_college_end_year"
                                                value={formData.data.Diploma_college_details.diploma_college_end_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-percentage"
                                                name="diploma_college_percentage"
                                                value={formData.data.Diploma_college_details.diploma_college_percentage}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            {/* Add other Diploma fields here */}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="Diploma-college-department"
                                                name="diploma_college_department"
                                                value={formData.data.Diploma_college_details.diploma_college_department}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-degree"
                                                name="diploma_college_degree"
                                                value={formData.data.Diploma_college_details.diploma_college_degree}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"

                                            />
                                        </Grid>
                                    </>
                                    {/* )} */}
                                </Grid>
                            </AccordionDetails>


                            {/* job preference */}

                            <AccordionSummary > <Typography variant="h6">Job Preference</Typography></AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/* First Column */}
                                        <TextField className='textfield'
                                            label="Key-skills"
                                            name="key_skills"
                                            value={formData.data.jobPreference.key_skills}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="Industry"
                                            name="industry"
                                            value={formData.data.jobPreference.industry}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField className='textfield'
                                            label="Department"
                                            name="department"
                                            value={formData.data.jobPreference.department}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                        <TextField className='textfield'
                                            label="Prefered locations"
                                            name="prefered_locations"
                                            value={formData.data.jobPreference.prefered_locations}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"


                                        />
                                    </Grid>

                                </Grid>

                            </AccordionDetails>

                            <AccordionSummary>
                                <Typography variant="h6">Professional Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {formData?.data?.professionalDetails?.companies?.map((company, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            {/* Display fields for each company */}
                                            {/* <TextField
                                                className='textfield'
                                                label="Company Name"
                                                name={`companies[${index}].company_name`}
                                                value={formData.data?.data?.companies[0].company_name
                                                    }
                                                    defaultValue={company.company_name}
                                                onChange={handleOnChange}                                              
                                                fullWidth
                                                
                                                
                                            /> */}

                                            <TextField
                                                className='textfield'
                                                label="Company Name"
                                                name={`companies[${index}].company_name`}
                                                value={company.company_name || ''}

                                                onChange={handleChange}
                                                fullWidth

                                            />
                                            <TextField
                                                className='textfield'
                                                label="Years of Experience"
                                                name={`companies[${index}].years_of_experience`}
                                                value={company.years_of_experience}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                            />
                                            <TextField
                                                className='textfield'
                                                label="Job Role"
                                                name={`companies[${index}].job_role`}
                                                value={company.job_role}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                            />
                                            <TextField
                                                className='textfield'
                                                label="Skills"
                                                name={`companies[${index}].skills`}
                                                value={company.skills}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <TextField
                                    className='textfield'
                                    label="Number of Companies"
                                    name="numberOfCompanies"
                                    value={formData.data.professionalDetails.numberOfCompanies || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                />
                            </AccordionDetails>


                            {/* resume */}
                            <AccordionSummary >
                                <Typography variant="h6">Resume</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {/* First Column */}
                                        <label htmlFor="resume-input">Upload Resume:</label>
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeChange}
                                            margin="dense"
                                            id="resume-input"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* Second Column */}
                                        {resume && (
                                            <div>
                                                <Typography variant="subtitle1">Uploaded Resume:</Typography>
                                                <Typography>{resume.name}</Typography>
                                                <Button color="secondary" onClick={handleRemoveResume}>
                                                    Remove Resume
                                                </Button>
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                            </AccordionDetails>

                            <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>

                        </form>



                    </Container>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
