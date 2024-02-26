
// import React, { useState, useRef } from 'react';
// import {
//     Button,
//     TextField,
//     Typography,
//     AccordionSummary,
//     AccordionDetails,
//     Container,
//     styled,
//     Input,
//     Avatar,
// } from '@mui/material';
// import { Select, MenuItem } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import { MdModeEditOutline } from "react-icons/md";
// import { InputAdornment } from '@material-ui/core';
// import './UserProfile.css' 

// // Container styling
// const FormContainer = styled(Container)({
//     maxWidth: '600px',
//     margin: 'auto',
//     marginTop: (theme) => theme.spacing(4),
// });



// const UserProfile = () => {
//     // State for user details
//     const [userDetails, setUserDetails] = useState({
//         first_name: '',
//         last_name: '',
//         date_of_birth: '',
//         mobile_number: '',
//         gender: '',
//         profile_picture: null,

//     });

//     // State for address
//     const [address, setAddress] = useState({
//         current: {
//             street: '',
//             city: '',
//             pincode: '',
//             state: '',
//             country: '',
//         },
//         permanent: {
//             street: '',
//             city: '',
//             pincode: '',
//             state: '',
//             country: '',
//         },
//     });
//     // State for education details
//     const [education, setEducation] = useState({
//         sslc_school_name: '',
//         sslc_start_year: '',
//         sslc_end_year: '',
//         sslc_percentage: '',
//         hsc_school_name: '',
//         hsc_start_year: '',
//         hsc_end_year: '',
//         hsc_percentage: '',
//         college_name: '',
//         college_start_year: '',
//         college_end_year: '',
//         college_percentage: '',
//         department: '',
//         degree: '',
//         pg_college_name: '',
//         pg_college_start_year: '',
//         pg_college_end_year: '',
//         pg_college_percentage: '',
//         pg_college_department: '',
//         pg_college_degree: '',
//         diploma_college_name: '',
//         diploma_college_start_year: '',
//         diploma_college_end_year: '',
//         diploma_college_department: '',
//         diploma_college_degree: '',
//         diploma_college_percentage: ''


//     });

//     const [jobPreference, setJobPreference] = useState({
//         key_skills: '',
//         industry: '',
//         department: '',
//         prefered_locations: ''
//     })



//     // State for resume upload
//     const [resume, setResume] = useState(null);





//     // Handle resume upload
//     const handleResumeChange = (event) => {
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



//     // State for profile picture
//     const [profilePicture, setProfilePicture] = useState(null);


//     // State for accordion expansion

//     // for user details validations
//     const [errors, setErrors] = useState({
//         userDetails: {
//             first_name: '',
//             last_name: '',
//             date_of_birth: '',
//             mobile_number: '',
//         },
//         jobPreference: {
//             key_skills: '',
//             industry: '',
//             department: '',
//             prefered_locations: '',
//         },
//         education: {
//             sslc_school_name: '',
//             sslc_start_year: '',
//             sslc_end_year: '',
//             sslc_percentage: '',
//             hsc_school_name: '',
//             hsc_start_year: '',
//             hsc_end_year: '',
//             hsc_percentage: '',
//             college_name: '',
//             college_start_year: '',
//             college_end_year: '',
//             college_percentage: '',
//             department: '',
//             degree: '',
//             pg_college_name: '',
//             pg_college_start_year: '',
//             pg_college_end_year: '',
//             pg_college_percentage: '',
//             pg_college_department: '',
//             pg_college_degree: '',
//             diploma_college_name: '',
//             diploma_college_start_year: '',
//             diploma_college_end_year: '',
//             diploma_college_department: '',
//             diploma_college_degree: '',
//             diploma_college_percentage: ''
//         }
//     });
//     // Handle changes in user details fields
//     const handleUserDetailsChange = (event) => {
//         // Clear previous error messages
//         setErrors({
//             ...errors,
//             [event.target.name]: '',
//         });

//         // Update userDetails only if validation passes
//         let updatedUserDetails = { ...userDetails };

//         // Add validation logic for first_name and last_name
//         if (event.target.name === 'first_name' || event.target.name === 'last_name') {
//             if (/[^A-Za-z]/.test(event.target.value)) {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Only alphabets allowed for first name and last name',
//                 });
//                 return;
//             }
//         }

//         // Add validation logic for date_of_birth (allow only numbers)
//         if (event.target.name === 'date_of_birth') {
//             if (/[^0-9/]/.test(event.target.value)) {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Only numbers and / allowed for date of birth',
//                 });
//                 return;
//             }
//         }

//         // Add validation logic for mobile_number (allow only numbers)
//         if (event.target.name === 'mobile_number') {
//             if (/[^0-9]/.test(event.target.value)) {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Only numbers allowed for mobile number',
//                 });
//                 return;
//             }
//         }

//         // Update userDetails only if validation passes
//         updatedUserDetails = {
//             ...updatedUserDetails,
//             [event.target.name]: event.target.value,
//         };

//         setUserDetails(updatedUserDetails);
//     };

//     // Handle changes in address fields
//     const handleAddressChange = (type, event) => {
//         // Clear previous errors for the specific address type
//         setErrors({
//             ...errors,
//             [type]: {
//                 ...errors[type],
//                 [event.target.name]: '',
//             },
//         });

//         let updatedAddressDetails = { ...address };
//         if (event.target.name === 'street' || event.target.name === 'city' || event.target.name === 'country' || 
//         event.target.name === 'state') {
//             if (/[^A-Za-z\s]/.test(event.target.value)) {
//                 setErrors({
//                     ...errors,
//                     [type]: {
//                         ...errors[type],
//                         [event.target.name]: 'Only alphabets allowed for street and city',
//                     },
//                 });
//                 return;
//             }
//         } else if (event.target.name === 'pincode') {
//             if (/[^0-9]/.test(event.target.value)) {
//                 setErrors({
//                     ...errors,
//                     [type]: {
//                         ...errors[type],
//                         [event.target.name]: 'Invalid pincode (must be 6 digits)',
//                     },
//                 });
//                 return;
//             }
//         }

//         updatedAddressDetails = {
//             ...updatedAddressDetails,
//             [type]: {
//                 ...updatedAddressDetails[type],
//                 [event.target.name]: event.target.value,
//             },
//         };

//         setAddress(updatedAddressDetails);
//     };

//     // Handle changes in education fields
//      const handleEducationChange = (event) => {
//         setErrors({
//             ...errors,
//             [event.target.name]: '',
//         });

//         let updatedEducation = { ...education };

//         if (event.target.name === 'sslc_school_name' || event.target.name === 'hsc_school_name' || event.target.name === 'college_name'
//             || event.target.name === 'department' || event.target.name === 'degree' || event.target.name === 'pg_college_name'
//             || event.target.name === 'pg_college_department' || event.target.name === 'pg_college_degree' || event.target.name === 'diploma_college_name'
//             || event.target.name === 'diploma_college_department' || event.target.name === 'diploma_college_degree') {
//             if (/[^A-Za-z\s]/.test(event.target.value)) {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Only alphabets and spaces allowed',
//                 });
//                 return;
//             }
//         }
//         if (event.target.name === 'sslc_start_year' || event.target.name === 'sslc_end_year' ||
//             event.target.name === 'hsc_start_year' || event.target.name === 'hsc_end_year' ||
//             event.target.name === 'sslc_percentage' || event.target.name === 'hsc_percentage' || event.target.name === 'college_percentage' ||
//             event.target.name === 'pg_college_percentage' || event.target.name === 'diploma_college_percentage' || event.target.name === 'college_start_year'
//             || event.target.name === 'college_end_year' || event.target.name === 'pg_college_start_year' || event.target.name === 'pg_college_end_year'
//             || event.target.name === 'diploma_college_start_year'|| event.target.name === 'diploma_college_end_year') {
//             if (/[^0-9]/.test(event.target.value)) {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Only numbers allowed',
//                 });
//                 return;
//             }
//         }

//         updatedEducation = {
//             ...updatedEducation,
//             [event.target.name]: event.target.value,
//         };

//         setEducation(updatedEducation);
//     };


//     const handlejobPreferenceChange = (event) => {
//         // Clear previous error messages
//         setErrors({
//             ...errors,
//             jobPreference: {
//                 ...errors.jobPreference,
//                 [event.target.name]: '',
//             },
//         });

//         // Update jobPreference only if validation passes
//         let updatedJobPreference = { ...jobPreference };

//         // Add validation logic for key_skills, industry, department, and prefered_locations
//         if (/[0-9!@#$%^&*().?":{}|<>]/.test(event.target.value)) {
//             // Invalid input, set error message
//             setErrors({
//                 ...errors,
//                 jobPreference: {
//                     ...errors.jobPreference,
//                     [event.target.name]: 'Numbers and symbols are not allowed',
//                 },
//             });
//             return;
//         }

//         // Update jobPreference only if validation passes
//         updatedJobPreference = {
//             ...updatedJobPreference,
//             [event.target.name]: event.target.value,
//         };

//         setJobPreference(updatedJobPreference);
//     };
//     // Handle profile picture upload
//     const handleProfilePictureChange = (event) => {
//         const file = event.target.files[0];

//         setProfilePicture(file);

//         // Update userDetails to include profile_picture
//         setUserDetails((prevUserDetails) => ({
//             ...prevUserDetails,
//             profile_picture: file,
//         }));
//     };

//     // Handle removing the profile picture
//     const handleRemoveProfilePicture = () => {
//         setProfilePicture(null);

//         // Clear the file input value
//         const fileInput = document.getElementById('profile-picture-input');
//         if (fileInput) {
//             fileInput.value = '';
//         }
//     };




//     const handleSubmit=()=>{

//       console.log('=====>')
//     }
// // for edit icon to edit the field and to update 
// const edit=()=>{

// }

//     const formRef = useRef(null);
//     return (
//       <div className='profilebackground-div'>
//           <div className="profilebackground-div">
//         <FormContainer style={{marginTop:'60px'}} >
//             <Typography variant="h4" align="center" gutterBottom>
//              Profile
//             </Typography>


//             <form ref={formRef} onSubmit={handleSubmit} >
//                 {/* User Details Accordion */}

//                     <AccordionSummary >
//                         <Typography variant="h6">User Details</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {/* First Column */}
//                                 <TextField className='textfield' 
//                                     label='First Name'
//                                     name="first_name"
//                                     value={userDetails.first_name}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.first_name)}
//                                     helperText={errors.first_name}
//                                     InputProps={{
//                                       endAdornment: (
//                                           <InputAdornment position="end">
//                                              <MdModeEditOutline  onClick={edit} style={{cursor:'pointer'}} /> 
//                                           </InputAdornment>
//                                       ),
//                                   }}

//                                 />
//                                 <TextField className='textfield'
//                                     label='Last Name'
//                                     name="last_name"
//                                     value={userDetails.last_name}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.last_name)}
//                                     helperText={errors.last_name}
//                                     InputProps={{
//                                       endAdornment: (
//                                           <InputAdornment position="end">
//                                              <MdModeEditOutline /> 
//                                           </InputAdornment>
//                                       ),
//                                   }}


//                                 />
//                                 <TextField className='textfield'
//                                     label='Date-of-birth (month/date/year)'
//                                     name="date_of_birth"
//                                     value={userDetails.date_of_birth}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.date_of_birth)}
//                                     helperText={errors.date_of_birth}
//                                     InputProps={{
//                                       endAdornment: (
//                                           <InputAdornment position="end">
//                                              <MdModeEditOutline /> 
//                                           </InputAdornment>
//                                       ),
//                                   }}


//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 {/* Second Column */}
//                                 <TextField className='textfield'
//                                     label='Mobile Number'
//                                     name="mobile_number"
//                                     value={userDetails.mobile_number}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"


//                                     error={Boolean(errors.mobile_number)}
//                                     helperText={errors.mobile_number}
//                                     InputProps={{
//                                       endAdornment: (
//                                           <InputAdornment position="end">
//                                              <MdModeEditOutline /> 
//                                           </InputAdornment>
//                                       ),
//                                   }}


//                                 />
//                                 <Select className='textfield'
//                                     label="gender"
//                                     name="gender"
//                                     value={userDetails.gender}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     displayEmpty
//                                     margin="dense"

//                                     // className='user_details_gender'



//                                 >
//                                     <MenuItem value="" disabled>Select Gender</MenuItem>
//                                     <MenuItem className='male' value="male">Male</MenuItem>
//                                     <MenuItem value="female">Female</MenuItem>
//                                     <MenuItem value="other">Other</MenuItem>
//                                 </Select>
//                                 <label htmlFor="profile-picture-input">Upload Profile Picture:</label>
//                                 <br></br>
//                                 <Input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleProfilePictureChange}
//                                     margin="dense"
//                                     id="profile-picture-input"
//                                 />
//                             </Grid>
//                         </Grid>

//                         {profilePicture && (
//                             <div>
//                                 <Avatar
//                                     alt="Profile Picture"
//                                     src={URL.createObjectURL(profilePicture)}
//                                     sx={{ width: 100, height: 100, marginTop: 2 }}
//                                 />
//                                 <Button color="secondary" onClick={handleRemoveProfilePicture}>
//                                     Remove Picture
//                                 </Button>
//                             </div>
//                         )}
//                     </AccordionDetails>

//                 {/* Address Accordion */}

//                     <AccordionSummary >
//                         <Typography variant="h6">Address</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography variant="h6"> Permanent and current Address:</Typography>

//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6} >
//                                 {/* First Column */}
//                                 <TextField className='textfield' 
//                                     label="Parmanent Street"
//                                     name="street"
//                                     value={address.permanent.street}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.permanent && errors.permanent.street)}
//                                     helperText={errors.permanent && errors.permanent.street}
//                                 />
//                                 <TextField className='textfield'
//                                     label=" Parmanent City"
//                                     name="city"
//                                     value={address.permanent.city}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.permanent && errors.permanent.city)}
//                                     helperText={errors.permanent && errors.permanent.city}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Parmanent pincode"
//                                     name="pincode"
//                                     value={address.permanent.pincode}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.permanent && errors.permanent.pincode)}
//                                     helperText={errors.permanent && errors.permanent.pincode}
//                                 />

//                                 <TextField className='textfield'
//                                     label="Parmanent Country"
//                                     name="country"
//                                     value={address.permanent.country}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.permanent && errors.permanent.country)}
//                                     helperText={errors.permanent && errors.permanent.country}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Parmanent State"
//                                     name="state"
//                                     value={address.permanent.state}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.permanent && errors.permanent.state)}
//                                     helperText={errors.permanent && errors.permanent.state}
//                                 />

//                             </Grid>
//                             <Grid item xs={12} sm={6} >
//                                 {/* <Typography variant="h6">Current Address</Typography> */}
//                                 <TextField className='textfield'
//                                     label="Current Street"
//                                     name="street"
//                                     value={address.current.street}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.street)}
//                                     helperText={errors.current && errors.current.street}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Current City"
//                                     name="city"
//                                     value={address.current.city}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.city)}
//                                     helperText={errors.current && errors.current.city}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Current Pincode"
//                                     name="pincode"
//                                     value={address.current.pincode}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.pincode)}
//                                     helperText={errors.current && errors.current.pincode}
//                                 />

//                                 <TextField className='textfield'
//                                     label="Current Country"
//                                     name="country"
//                                     value={address.current.country}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.country)}
//                                     helperText={errors.current && errors.current.country}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Current State"
//                                     name="state"
//                                     value={address.current.state}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.state)}
//                                     helperText={errors.current && errors.current.state}
//                                 />

//                             </Grid>
//                         </Grid>
//                     </AccordionDetails>


//                 {/* Educatiom Accordion */}

//                     <AccordionSummary > <Typography variant="h6">Education details</Typography></AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>

//                                 {/* First Column */}
//                                 <TextField className='textfield'
//                                     label="SSLC-school-name"
//                                     name="sslc_school_name"
//                                     value={education.sslc_school_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.sslc_school_name)}
//                                     helperText={errors.sslc_school_name}
//                                 />
//                                 <TextField className='textfield'
//                                     label="SSLC-start-year"
//                                     name="sslc_start_year"
//                                     value={education.sslc_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.sslc_start_year)}
//                                     helperText={errors.sslc_start_year}
//                                 />
//                                 <TextField className='textfield'
//                                     label="SSLC-end-year"
//                                     name="sslc_end_year"
//                                     value={education.sslc_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.sslc_end_year)}
//                                     helperText={errors.sslc_end_year}
//                                 />
//                                 <TextField className='textfield'
//                                     label="SSLC-percentage"
//                                     name="sslc_percentage"
//                                     value={education.sslc_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.sslc_percentage)}
//                                     helperText={errors.sslc_percentage}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={6}>
//                                 {/* Second Column */}
//                                 <TextField className='textfield'
//                                     label="HSC-school-name"
//                                     name="hsc_school_name"
//                                     value={education.hsc_school_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.hsc_school_name)}
//                                     helperText={errors.hsc_school_name}
//                                 />
//                                 <TextField className='textfield'
//                                     label="HSC-start-year"
//                                     name="hsc_start_year"
//                                     value={education.hsc_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.hsc_start_year)}
//                                     helperText={errors.hsc_start_year}
//                                 />
//                                 <TextField className='textfield'
//                                     label="HSC-end-year"
//                                     name="hsc_end_year"
//                                     value={education.hsc_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.hsc_end_year)}
//                                     helperText={errors.hsc_end_year}
//                                 />
//                                 <TextField className='textfield'
//                                     label="HSC-percentage"
//                                     name="hsc_percentage"
//                                     value={education.hsc_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.hsc_percentage)}
//                                     helperText={errors.hsc_percentage}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <Typography sx={{ width: '100%' }} >UG Details:</Typography>
//                                 {/* Third Column */}
//                                 <TextField className='textfield'
//                                     label="College-name"
//                                     name="college_name"
//                                     value={education.college_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.college_name)}
//                                     helperText={errors.college_name}
//                                 />
//                                 <TextField className='textfield'
//                                     label="College-start-year"
//                                     name="college_start_year"
//                                     value={education.college_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.college_start_year)}
//                                     helperText={errors.college_start_year}

//                                 />
//                                 <TextField className='textfield'
//                                     label="College-end-year"
//                                     name="college_end_year"
//                                     value={education.college_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.college_end_year)}
//                                     helperText={errors.college_end_year}
//                                 />
//                                 <TextField className='textfield'
//                                     label="College-percentage"
//                                     name="college_percentage"
//                                     value={education.college_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.college_percentage)}
//                                     helperText={errors.college_percentage}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={6} >
//                                 <Typography sx={{ color: 'transparent' }}> . </Typography>
//                                 {/* Fourth Column */}
//                                 <TextField className='textfield'
//                                     label="Department"
//                                     name="department"
//                                     value={education.department}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.department)}
//                                     helperText={errors.department}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Degree"
//                                     name="degree"
//                                     value={education.degree}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.degree)}
//                                     helperText={errors.degree}
//                                 />
//                             </Grid>


//                             {/* pg and diplamo */}
//                             <Grid item xs={12}>
//                                 {/* Radio Buttons for PG/Diploma */}
//                                 <FormControl component="fieldset">
//                                     <RadioGroup
//                                         className='radio_button'
//                                         row
//                                         aria-label="education-type"
//                                         name="education_type"
//                                         value={education.education_type}
//                                         onChange={handleEducationChange}
//                                     >
//                                         <FormControlLabel
//                                             className='pg_button1'
//                                             value="pg"
//                                             control={<Radio />}
//                                             label="PG"
//                                         />
//                                         <FormControlLabel
//                                             className='pg_button2'
//                                             value="diploma"
//                                             control={<Radio />}
//                                             label="Diploma"
//                                         />
//                                     </RadioGroup>
//                                 </FormControl>
//                             </Grid>

//                             {/* Additional Fields based on Radio Button selection */}
//                             {education.education_type === 'pg' && (
//                                 <>
//                                     {/* Additional PG Fields */}
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="PG-College-name"
//                                             name="pg_college_name"
//                                             value={education.pg_college_name}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_name)}
//                                             helperText={errors.pg_college_name}
//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-start-year"
//                                             name="pg_college_start_year"
//                                             value={education.pg_college_start_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_start_year)}
//                                             helperText={errors.pg_college_start_year}
//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-end-year"
//                                             name="pg_college_end_year"
//                                             value={education.pg_college_end_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_end_year)}
//                                             helperText={errors.pg_college_end_year}
//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-percentage"
//                                             name="pg_college_percentage"
//                                             value={education.pg_college_percentage}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_percentage)}
//                                             helperText={errors.pg_college_percentage}
//                                         />
//                                         {/* Add other PG fields here */}
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="PG-College-department"
//                                             name="pg_college_department"
//                                             value={education.pg_college_department}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_department)}
//                                             helperText={errors.pg_college_department}
//                                         />
//                                         <TextField className='textfield'
//                                             label="PG-College-degree"
//                                             name="pg_college_degree"
//                                             value={education.pg_college_degree}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_degree)}
//                                             helperText={errors.pg_college_degree}
//                                         />
//                                     </Grid>
//                                 </>
//                             )}

//                             {education.education_type === 'diploma' && (
//                                 <>
//                                     {/* Additional Diploma Fields */}
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="Diploma-college-name"
//                                             name="diploma_college_name"
//                                             value={education.diploma_college_name}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_name)}
//                                             helperText={errors.diploma_college_name}
//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-start-year"
//                                             name="diploma_college_start_year"
//                                             value={education.diploma_college_start_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_start_year)}
//                                             helperText={errors.diploma_college_start_year}
//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-end-year"
//                                             name="diploma_college_end_year"
//                                             value={education.diploma_college_end_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_end_year)}
//                                             helperText={errors.diploma_college_end_year}
//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-percentage"
//                                             name="diploma_college_percentage"
//                                             value={education.diploma_college_percentage}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_percentage)}
//                                             helperText={errors.diploma_college_percentage}
//                                         />
//                                         {/* Add other Diploma fields here */}
//                                     </Grid>
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField className='textfield'
//                                             label="Diploma-college-department"
//                                             name="diploma_college_department"
//                                             value={education.diploma_college_department}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_department)}
//                                             helperText={errors.diploma_college_department}
//                                         />
//                                         <TextField className='textfield'
//                                             label="Diploma-college-degree"
//                                             name="diploma_college_degree"
//                                             value={education.diploma_college_degree}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_degree)}
//                                             helperText={errors.diploma_college_degree}
//                                         />
//                                     </Grid>
//                                 </>
//                             )}
//                         </Grid>
//                     </AccordionDetails>


//                 {/* job preference */}

//                     <AccordionSummary > <Typography variant="h6">Job Preference</Typography></AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {/* First Column */}
//                                 <TextField className='textfield'
//                                     label="Key-skills"
//                                     name="key_skills"
//                                     value={jobPreference.key_skills}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.jobPreference.key_skills)}
//                                     helperText={errors.jobPreference.key_skills}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Industry"
//                                     name="industry"
//                                     value={jobPreference.industry}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.jobPreference.industry)}
//                                     helperText={errors.jobPreference.industry}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField className='textfield'
//                                     label="Department"
//                                     name="department"
//                                     value={jobPreference.department}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.jobPreference.department)}
//                                     helperText={errors.jobPreference.department}
//                                 />
//                                 <TextField className='textfield'
//                                     label="Prefered locations"
//                                     name="prefered_locations"
//                                     value={jobPreference.prefered_locations}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"

//                                     error={Boolean(errors.jobPreference.prefered_locations)}
//                                     helperText={errors.jobPreference.prefered_locations}
//                                 />
//                             </Grid>

//                         </Grid>

//                     </AccordionDetails>

//                 {/* Resume Accordion */}

//                     <AccordionSummary >
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
//                 {/* Submit Button */}
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                  UPDATE
//                 </Button>
//             </form>



//         </FormContainer>
//         </div>
//         </div>
//     );
// };

// export default UserProfile;





// ======================================================================================================chcking to get the valuue from the api 
import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography, Grid, TextField, Container, Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';


const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                date_of_birth: ''
            },
            address:{
                permanent:{
                    address_type: 'Permanent',
                    city:'',
                    state:'',   
                    country:'',
                    pincode:'',
                    street:''
                },
                }
        }
    });

    useEffect(() => {
        // Fetch data from the API
        fetch('http://192.168.1.39:8000/get_user_details_view/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
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
                            date_of_birth: data.userDetails.date_of_birth
                        },
                        address:{
                            permanent:{
                                address_type:data.address.permanent.address_type,
                                city:data.address.permanent.city,
                                state:data.address.permanent.state,
                                country:data.address.permanent.country,
                                pincode:data.address.permanent.pincode,
                                street:data.address.permanent.street
                            }
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
        const { name, value } = event.target;
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
                address:{
                    permanent:{
                        ...prevData.data.address.permanent,
                        [name]:value
                    }
                }
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Form Data:", formData);

        // Send updated form data to the backend API
        fetch('http://192.168.1.39:8000/update_user_details/', {
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
                
                // Handle success response if needed
                console.log("User details updated successfully");
            })
            .catch(error => {
                // Handle error if the request fails
                console.error('Error updating user details:', error);
            });
    };

    if (loading) {
        return <CircularProgress />; // Display loading indicator
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>; // Display error message
    }

    if (!userData || !formData) {
        return null; // Handle case when userData is not available yet
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px' }}> {/* Container for form */}
            <Typography variant="h4" align="center">User Profile</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={formData.data.Signup.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="mobile_number"
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            value={formData.data.Signup.mobile_number}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            value={formData.data.userDetails.first_name}
                            onChange={handleChange}

                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="last_name"
                            variant="outlined"
                            fullWidth
                            value={formData.data.userDetails.last_name}
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="date_of_birth"
                            type='date'
                            value={formData.data.userDetails.date_of_birth}
                            fullWidth
                            margin="dense"
                            onChange={handleChange}

                        />


<TextField
                            name="street"
                            value={formData.data.address.permanent.street}
                            fullWidth
                            margin="dense"
                            onChange={handleChange}
                            label="street"


                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                    <TextField
                                    label="gender"
                                    name="gender"
                                    value={formData.data.userDetails.gender}
                                    onChange={handleChange}
                                    // fullWidth
                                    margin="dense"
                                  


                                >
                                    {/* <MenuItem value="" disabled>Select Gender</MenuItem>
                                    <MenuItem className='male' value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem> */}
                                </TextField>

                </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button>
            </form>
        </Container>
    );
};

export default UserProfile;
