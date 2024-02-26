
// import React, { useState, useRef } from 'react';
// import {
//     Button,
//     TextField,
//     Typography,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
//     Container,
//     styled,
//     Input,
//     Avatar,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Select, MenuItem } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import axios from 'axios';
// import UserFormData from '../Json/UserForm.json';

// // Container styling
// const FormContainer = styled(Container)({
//     maxWidth: '600px',
//     margin: 'auto',
//     marginTop: (theme) => theme.spacing(4),
// });

// // Styled Accordions
// const AccordionWrapper = styled(Accordion)({
//     marginBottom: (theme) => theme.spacing(2),
// });

// const ResumeAccordionWrapper = styled(Accordion)({
//     marginBottom: (theme) => theme.spacing(2),
// });

// const UserForm = () => {
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

//     // State for professional details
//     const [professionalDetails, setProfessionalDetails] = useState({
//         isExperienced: true,
//         numberOfCompanies: '',
//         companies: [{ company_name: '', job_role: '', skills: '', years_of_experience: '' }],
//     });



//     // Handle changes in professional details fields
//     const handleProfessionalDetailsChange = (event, index) => {
//         const { name, value } = event.target;

//         // If the field is for a specific company, update the corresponding company's details
//         if (index !== undefined) {
//             const updatedCompanies = [...professionalDetails.companies];
//             updatedCompanies[index] = {
//                 ...(updatedCompanies[index] || {}), // Ensure the array element exists
//                 [name]: value,
//             };

//             setProfessionalDetails((prevDetails) => ({
//                 ...prevDetails,
//                 companies: updatedCompanies,
//             }));
//         } else {
//             // If the field is for the number of companies, update the state
//             const newNumberOfCompanies = value || 0;
//             const updatedCompanies = professionalDetails.companies.slice(0, newNumberOfCompanies);

//             setProfessionalDetails((prevDetails) => ({
//                 ...prevDetails,
//                 numberOfCompanies: newNumberOfCompanies,
//                 companies: updatedCompanies,
//             }));
//         }
//     };

//     // Handle experience/fresher checkbox change
//     const handleExperienceFresherChange = (event) => {
//         const isExperienced = event.target.checked;
//         setProfessionalDetails({
//             isExperienced,
//             numberOfCompanies: '',
//             companies: isExperienced ? [{ company_name: '', position: '', startDate: '', endDate: '' }] : [],
//         });
//         setProfessionalDetailsExpanded(isExperienced);
//     };

//     // State for resume upload
//     const [resume, setResume] = useState(null);

//     // State for resume accordion expansion
//     const [resumeExpanded, setResumeExpanded] = useState(true);

//     // State for experience checkbox
//     const [experienceOption, setExperienceOption] = useState(''); // Default to 'experienced'

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

//     // Handle resume accordion expansion/collapse
//     const handleResumeExpand = () => {
//         setResumeExpanded(!resumeExpanded);
//     };

//     // State for profile picture
//     const [profilePicture, setProfilePicture] = useState(null);


//     // State for accordion expansion
//     const [userDetailsExpanded, setUserDetailsExpanded] = useState(true);
//     const [addressExpanded, setAddressExpanded] = useState(true);
//     const [educationExpanded, setEducationExpanded] = useState(true);
//     const [jobPreferenceExpanded, setjobPreferenceExpanded] = useState(true);
//     // State for professional details accordion expansion
//     const [professionalDetailsExpanded, setProfessionalDetailsExpanded] = useState(true);
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

      
//         if (event.target.name === 'mobile_number') {
//             // Adjusted regular expression to allow country code prefix
//             if (/^\+?\d+$/.test(event.target.value)) {
//                 // Valid input, clear error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: '',
//                 });
//             } else {
//                 // Invalid input, set error message
//                 setErrors({
//                     ...errors,
//                     [event.target.name]: 'Invalid mobile number format',
//                 });
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

//     // Handle user details accordion expansion/collapse
//     const handleUserDetailsExpand = () => {
//         setUserDetailsExpanded(!userDetailsExpanded);
//     };

//     // Handle address accordion expansion/collapse
//     const handleAddressExpand = () => {
//         setAddressExpanded(!addressExpanded);
//     };

//     // Handle education accordion expansion/collapse
//     const handleEducationExpand = () => {
//         setEducationExpanded(!educationExpanded);
//     };
//     // Handle jobpreference accordion expansion/collapse
//     const handlejobPreferenceExpand = () => {
//         setjobPreferenceExpanded(!jobPreferenceExpanded);
//     };

//     // api submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Address type determination
//         let addressType;

//         if (address.permanent.street && address.current.street) {
//             addressType = 'Both';
//         } else if (address.permanent.street) {
//             addressType = 'Permanent';
//         } else if (address.current.street) {
//             addressType = 'Current';
//         } else {
//             console.log('Please fill at least one address type');
//             return;
//         }

//         // Create a FormData object to send to the backend
//         const dataToSend = new FormData();
//         dataToSend.append('userDetails', JSON.stringify({
//             ...userDetails,
//             profile_picture: profilePicture ? 'Uploaded' : 'Not uploaded',
//         }));
//         dataToSend.append('address', JSON.stringify({
//             type: addressType,
//             permanent: {
//                 ...address.permanent,
//                 address_type: 'Permanent',
//             },
//             current: {
//                 ...address.current,
//                 address_type: 'Current',
//             },
//         }));
//         dataToSend.append('education', JSON.stringify(education));
//         dataToSend.append('professionalDetails', JSON.stringify(experienceOption === 'experienced' ? professionalDetails : 'Fresher'));
//         dataToSend.append('resume', resume); // Assuming resume is a File object
//         dataToSend.append('profilePicture', profilePicture); // Assuming profilePicture is a File object
//         dataToSend.append('jobPreference', JSON.stringify(jobPreference));

//         // Log the FormData object
//         for (const pair of dataToSend.entries()) {
//             console.log(pair[0], pair[1]);
//         }

//         try {
//             // Make API call
//             const response = await axios.post('http://192.168.1.39:8000/userRegister/', dataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     // You may need to add other headers like authentication token if required
//                 },
//             });

//             // Handle the response as needed
//             console.log('API Response:', response.data);

//             // Resetting states
//             // event.target.reset();
//             // setUserDetails({
//             //     first_name: '',
//             //     last_name: '',
//             //     date_of_birth: '',
//             //     mobile_number: '',
//             //     gender: '',
//             // });
//             // setAddress({
//             //     current: {
//             //         street: '',
//             //         city: '',
//             //         pincode: '',
//             //         state: '',
//             //         country: '',
//             //     },
//             //     permanent: {
//             //         street: '',
//             //         city: '',
//             //         pincode: '',
//             //         state: '',
//             //         country: '',
//             //     },
//             // });
//             // setEducation({
//             //     sslc_school_name: '',
//             //     sslc_start_year: '',
//             //     sslc_end_year: '',
//             //     sslc_percentage: '',
//             //     hsc_school_name: '',
//             //     hsc_start_year: '',
//             //     hsc_end_year: '',
//             //     hsc_percentage: '',
//             //     college_name: '',
//             //     college_start_year: '',
//             //     college_end_year: '',
//             //     college_percentage: '',
//             //     department: '',
//             //     degree: '',
//             // });
//             // setProfessionalDetails({
//             //     isExperienced: true,
//             //     numberOfCompanies: '',
//             //     companies: [{ company_name: '', position: '', startDate: '', endDate: '' }],
//             // });
//             // setExperienceOption('');
//             // setResume(null);
//             // setJobPreference({
//             //     key_skills: '',
//             //     industry: '',
//             //     department: '',
//             //     prefered_locations: '',
//             // });
//             // setProfilePicture(null);
//             // // Reset resume state
//             // setResume(null);

//             // Collapse accordion sections
//             setUserDetailsExpanded(true);
//             setAddressExpanded(true);
//             setEducationExpanded(true);
//             setProfessionalDetailsExpanded(true);
//             setResumeExpanded(true);
//             setjobPreferenceExpanded(true);

//         } catch (error) {
//             console.error('API Error:', error);
//             // Handle error as needed
//         }
//     };

//     // for multi languages
//     const [language, setLanguage] = useState('en'); // Default language is English

//     const handleChangeLanguage = (newLanguage) => {
//         setLanguage(newLanguage);
//     };

//     const handleLanguageChange = (event) => {
//         const newLanguage = event.target.value;
//         handleChangeLanguage(newLanguage);
//     };
//     const formRef = useRef(null);
//     return (
//         <FormContainer style={{marginTop:'60px'}}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 {UserFormData[language].UserDetail.one}
//             </Typography>
//             <select value={language} onChange={handleLanguageChange}>
//                 <option value="en">English</option>
//                 <option value="tamil">Tamil</option>
//             </select>

//             <form ref={formRef} onSubmit={handleSubmit} >
//                 {/* User Details Accordion */}
//                 <AccordionWrapper expanded={userDetailsExpanded} onChange={handleUserDetailsExpand} className='user_details'>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="h6">{UserFormData[language].UserDetail.one}</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {/* First Column */}
//                                 <TextField
//                                     label={UserFormData[language].UserDetail.two}
//                                     name="first_name"
//                                     value={userDetails.first_name}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.first_name)}
//                                     helperText={errors.first_name}

//                                 />
//                                 <TextField
//                                     label={UserFormData[language].UserDetail.four}
//                                     name="last_name"
//                                     value={userDetails.last_name}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.last_name)}
//                                     helperText={errors.last_name}


//                                 />
//                                 <TextField
//                                     label={UserFormData[language].UserDetail.six}
//                                     name="date_of_birth"
//                                     value={userDetails.date_of_birth}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.date_of_birth)}
//                                     helperText={errors.date_of_birth}


//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 {/* Second Column */}
//                                 <TextField
//                                     label={UserFormData[language].UserDetail.eight}
//                                     name="mobile_number"
//                                     value={userDetails.mobile_number}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.mobile_number)}
//                                     helperText={errors.mobile_number}


//                                 />
//                                 <Select
//                                     label="gender"
//                                     name="gender"
//                                     value={userDetails.gender}
//                                     onChange={handleUserDetailsChange}
//                                     fullWidth
//                                     displayEmpty
//                                     margin="dense"
//                                     required
//                                     className='user_details_gender'


//                                 >
//                                     <MenuItem value="" disabled>{UserFormData[language].UserDetail.twelve}</MenuItem>
//                                     <MenuItem className='male' value="male">{UserFormData[language].UserDetail.fourteen}</MenuItem>
//                                     <MenuItem value="female">{UserFormData[language].UserDetail.sixteen}</MenuItem>
//                                     <MenuItem value="other">{UserFormData[language].UserDetail.eighteen}</MenuItem>
//                                 </Select>
//                                 <label htmlFor="profile-picture-input">{UserFormData[language].UserDetail.twenty}</label>
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
//                 </AccordionWrapper>

//                 {/* Address Accordion */}
//                 <AccordionWrapper className='address_accordion' expanded={addressExpanded} onChange={handleAddressExpand}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="h6">Address</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography variant="h6"> Permanent and current Address:</Typography>

//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6} >
//                                 {/* First Column */}
//                                 <TextField
//                                     label="Parmanent Street"
//                                     name="street"
//                                     value={address.permanent.street}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.permanent && errors.permanent.street)}
//                                     helperText={errors.permanent && errors.permanent.street}
//                                 />
//                                 <TextField
//                                     label=" Parmanent City"
//                                     name="city"
//                                     value={address.permanent.city}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.permanent && errors.permanent.city)}
//                                     helperText={errors.permanent && errors.permanent.city}
//                                 />
//                                 <TextField
//                                     label="Parmanent pincode"
//                                     name="pincode"
//                                     value={address.permanent.pincode}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.permanent && errors.permanent.pincode)}
//                                     helperText={errors.permanent && errors.permanent.pincode}
//                                 />

//                                 <TextField
//                                     label="Parmanent Country"
//                                     name="country"
//                                     value={address.permanent.country}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.permanent && errors.permanent.country)}
//                                     helperText={errors.permanent && errors.permanent.country}
//                                 />
//                                 <TextField
//                                     label="Parmanent State"
//                                     name="state"
//                                     value={address.permanent.state}
//                                     onChange={(e) => handleAddressChange('permanent', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.permanent && errors.permanent.state)}
//                                     helperText={errors.permanent && errors.permanent.state}
//                                 />

//                             </Grid>
//                             <Grid item xs={12} sm={6} >
//                                 {/* <Typography variant="h6">Current Address</Typography> */}
//                                 <TextField
//                                     label="Current Street"
//                                     name="street"
//                                     value={address.current.street}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.street)}
//                                     helperText={errors.current && errors.current.street}
//                                 />
//                                 <TextField
//                                     label="Current City"
//                                     name="city"
//                                     value={address.current.city}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.city)}
//                                     helperText={errors.current && errors.current.city}
//                                 />
//                                 <TextField
//                                     label="Current Pincode"
//                                     name="pincode"
//                                     value={address.current.pincode}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.pincode)}
//                                     helperText={errors.current && errors.current.pincode}
//                                 />

//                                 <TextField
//                                     label="Current Country"
//                                     name="country"
//                                     value={address.current.country}
//                                     onChange={(e) => handleAddressChange('current', e)}
//                                     fullWidth
//                                     margin="dense"
//                                     error={Boolean(errors.current && errors.current.country)}
//                                     helperText={errors.current && errors.current.country}
//                                 />
//                                 <TextField
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
//                 </AccordionWrapper>

//                 {/* Educatiom Accordion */}

//                 <AccordionWrapper expanded={educationExpanded} onChange={handleEducationExpand} className='education'>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography variant="h6">Education details</Typography></AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>

//                                 {/* First Column */}
//                                 <TextField
//                                     label="SSLC-school-name"
//                                     name="sslc_school_name"
//                                     value={education.sslc_school_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.sslc_school_name)}
//                                     helperText={errors.sslc_school_name}
//                                 />
//                                 <TextField
//                                     label="SSLC-start-year"
//                                     name="sslc_start_year"
//                                     value={education.sslc_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.sslc_start_year)}
//                                     helperText={errors.sslc_start_year}
//                                 />
//                                 <TextField
//                                     label="SSLC-end-year"
//                                     name="sslc_end_year"
//                                     value={education.sslc_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.sslc_end_year)}
//                                     helperText={errors.sslc_end_year}
//                                 />
//                                 <TextField
//                                     label="SSLC-percentage"
//                                     name="sslc_percentage"
//                                     value={education.sslc_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.sslc_percentage)}
//                                     helperText={errors.sslc_percentage}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={6}>
//                                 {/* Second Column */}
//                                 <TextField
//                                     label="HSC-school-name"
//                                     name="hsc_school_name"
//                                     value={education.hsc_school_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.hsc_school_name)}
//                                     helperText={errors.hsc_school_name}
//                                 />
//                                 <TextField
//                                     label="HSC-start-year"
//                                     name="hsc_start_year"
//                                     value={education.hsc_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.hsc_start_year)}
//                                     helperText={errors.hsc_start_year}
//                                 />
//                                 <TextField
//                                     label="HSC-end-year"
//                                     name="hsc_end_year"
//                                     value={education.hsc_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.hsc_end_year)}
//                                     helperText={errors.hsc_end_year}
//                                 />
//                                 <TextField
//                                     label="HSC-percentage"
//                                     name="hsc_percentage"
//                                     value={education.hsc_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.hsc_percentage)}
//                                     helperText={errors.hsc_percentage}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <Typography sx={{ width: '100%' }} >UG Details:</Typography>
//                                 {/* Third Column */}
//                                 <TextField
//                                     label="College-name"
//                                     name="college_name"
//                                     value={education.college_name}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.college_name)}
//                                     helperText={errors.college_name}
//                                 />
//                                 <TextField
//                                     label="College-start-year"
//                                     name="college_start_year"
//                                     value={education.college_start_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.college_start_year)}
//                                     helperText={errors.college_start_year}

//                                 />
//                                 <TextField
//                                     label="College-end-year"
//                                     name="college_end_year"
//                                     value={education.college_end_year}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.college_end_year)}
//                                     helperText={errors.college_end_year}
//                                 />
//                                 <TextField
//                                     label="College-percentage"
//                                     name="college_percentage"
//                                     value={education.college_percentage}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.college_percentage)}
//                                     helperText={errors.college_percentage}
//                                 />
//                             </Grid>

//                             <Grid item xs={12} sm={6} >
//                                 <Typography sx={{ color: 'transparent' }}> . </Typography>
//                                 {/* Fourth Column */}
//                                 <TextField
//                                     label="Department"
//                                     name="department"
//                                     value={education.department}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.department)}
//                                     helperText={errors.department}
//                                 />
//                                 <TextField
//                                     label="Degree"
//                                     name="degree"
//                                     value={education.degree}
//                                     onChange={handleEducationChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
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
//                                         <TextField
//                                             label="PG-College-name"
//                                             name="pg_college_name"
//                                             value={education.pg_college_name}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_name)}
//                                             helperText={errors.pg_college_name}
//                                         />
//                                         <TextField
//                                             label="PG-College-start-year"
//                                             name="pg_college_start_year"
//                                             value={education.pg_college_start_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_start_year)}
//                                             helperText={errors.pg_college_start_year}
//                                         />
//                                         <TextField
//                                             label="PG-College-end-year"
//                                             name="pg_college_end_year"
//                                             value={education.pg_college_end_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_end_year)}
//                                             helperText={errors.pg_college_end_year}
//                                         />
//                                         <TextField
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
//                                         <TextField
//                                             label="PG-College-department"
//                                             name="pg_college_department"
//                                             value={education.pg_college_department}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"

//                                             error={Boolean(errors.pg_college_department)}
//                                             helperText={errors.pg_college_department}
//                                         />
//                                         <TextField
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
//                                         <TextField
//                                             label="Diploma-college-name"
//                                             name="diploma_college_name"
//                                             value={education.diploma_college_name}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_name)}
//                                             helperText={errors.diploma_college_name}
//                                         />
//                                         <TextField
//                                             label="Diploma-college-start-year"
//                                             name="diploma_college_start_year"
//                                             value={education.diploma_college_start_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_start_year)}
//                                             helperText={errors.diploma_college_start_year}
//                                         />
//                                         <TextField
//                                             label="Diploma-college-end-year"
//                                             name="diploma_college_end_year"
//                                             value={education.diploma_college_end_year}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_end_year)}
//                                             helperText={errors.diploma_college_end_year}
//                                         />
//                                         <TextField
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
//                                         <TextField
//                                             label="Diploma-college-department"
//                                             name="diploma_college_department"
//                                             value={education.diploma_college_department}
//                                             onChange={handleEducationChange}
//                                             fullWidth
//                                             margin="dense"
//                                             error={Boolean(errors.diploma_college_department)}
//                                             helperText={errors.diploma_college_department}
//                                         />
//                                         <TextField
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
//                 </AccordionWrapper>

//                 {/* Professional Details Accordion */}
//                 <AccordionWrapper
//                     expanded={professionalDetailsExpanded}
//                     className='professional_details'
//                     onChange={() => setProfessionalDetailsExpanded(!professionalDetailsExpanded)}
//                 >
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography variant="h6">Professional Details</Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 {/* Experience/Fresher Radio Buttons */}
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="experienceOption"
//                                         value="experienced"
//                                         checked={experienceOption === 'experienced'}
//                                         onChange={() => setExperienceOption('experienced')}
//                                         className='exprence'
//                                     />
//                                     {/* non-breaking space  */}
//                                     &nbsp;  Experience
//                                 </label> <br></br>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="experienceOption"
//                                         value="fresher"
//                                         checked={experienceOption === 'fresher'}
//                                         onChange={() => setExperienceOption('fresher')}
//                                     />
//                                     &nbsp; Fresher
//                                 </label>
//                             </Grid>
//                             {experienceOption === 'experienced' && (
//                                 <>
//                                     {/* Number of Companies */}
//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             label="Number of Companies"
//                                             name="numberOfCompanies"
//                                             type="number"
//                                             value={professionalDetails.numberOfCompanies}
//                                             onChange={(e) => handleProfessionalDetailsChange(e)}
//                                             fullWidth
//                                             margin="dense"
//                                         />
//                                     </Grid>

//                                     {/* Company Details */}
//                                     {Array.from({ length: Number(professionalDetails.numberOfCompanies) || 0 }).map(
//                                         (_, index) => (
//                                             <Grid item xs={12} key={index}>
//                                                 <Typography variant="subtitle1">Company {index + 1}</Typography>
//                                                 <TextField
//                                                     label="Company Name"
//                                                     name="company_name"
//                                                     value={professionalDetails.companies[index]?.company_name || ''}
//                                                     onChange={(e) => handleProfessionalDetailsChange(e, index)}
//                                                     fullWidth
//                                                     margin="dense"
//                                                 />
//                                                 <TextField
//                                                     label="Job Role"
//                                                     name="job_role"
//                                                     value={professionalDetails.companies[index]?.job_role || ''}
//                                                     onChange={(e) => handleProfessionalDetailsChange(e, index)}
//                                                     fullWidth
//                                                     margin="dense"
//                                                 />
//                                                 <TextField
//                                                     label="Skills"
//                                                     name="skills"
//                                                     value={professionalDetails.companies[index]?.skills || ''}
//                                                     onChange={(e) => handleProfessionalDetailsChange(e, index)}
//                                                     fullWidth
//                                                     margin="dense"
//                                                 />
//                                                 <TextField
//                                                     label="Years of exprence"
//                                                     name="years_of_experience"
//                                                     value={professionalDetails.companies[index]?.years_of_experience || ''}
//                                                     onChange={(e) => handleProfessionalDetailsChange(e, index)}
//                                                     fullWidth
//                                                     margin="dense"
//                                                 />

//                                             </Grid>
//                                         )
//                                     )}
//                                 </>
//                             )}
//                         </Grid>
//                     </AccordionDetails>
//                 </AccordionWrapper>
//                 {/* job preference */}
//                 <AccordionWrapper expanded={jobPreferenceExpanded} onChange={handlejobPreferenceExpand} className='job_preference'>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography variant="h6">Job Preference</Typography></AccordionSummary>
//                     <AccordionDetails>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {/* First Column */}
//                                 <TextField
//                                     label="Key-skills"
//                                     name="key_skills"
//                                     value={jobPreference.key_skills}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.jobPreference.key_skills)}
//                                     helperText={errors.jobPreference.key_skills}
//                                 />
//                                 <TextField
//                                     label="Industry"
//                                     name="industry"
//                                     value={jobPreference.industry}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.jobPreference.industry)}
//                                     helperText={errors.jobPreference.industry}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     label="Department"
//                                     name="department"
//                                     value={jobPreference.department}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.jobPreference.department)}
//                                     helperText={errors.jobPreference.department}
//                                 />
//                                 <TextField
//                                     label="Prefered locations"
//                                     name="prefered_locations"
//                                     value={jobPreference.prefered_locations}
//                                     onChange={handlejobPreferenceChange}
//                                     fullWidth
//                                     margin="dense"
//                                     required
//                                     error={Boolean(errors.jobPreference.prefered_locations)}
//                                     helperText={errors.jobPreference.prefered_locations}
//                                 />
//                             </Grid>

//                         </Grid>

//                     </AccordionDetails>
//                 </AccordionWrapper>

//                 {/* Resume Accordion */}
//                 <ResumeAccordionWrapper expanded={resumeExpanded} onChange={handleResumeExpand}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
//                 </ResumeAccordionWrapper>
//                 {/* Submit Button */}
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                     Submit
//                 </Button>
//             </form>

//             {/* <button onClick={() => handleChangeLanguage('en')}>Switch to English</button>
//       <button onClick={() => handleChangeLanguage('es')}>Cambiar a Español</button> */}


//         </FormContainer>
//     );
// };

// export default UserForm;






// ================================================================================================================================================================================================

import React, { useState, useRef } from 'react';
import {
    Button,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    styled,
    Input,
    Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import UserFormData from '../Json/UserForm.json';

// Container styling
const FormContainer = styled(Container)({
    maxWidth: '600px',
    margin: 'auto',
    marginTop: (theme) => theme.spacing(4),
});

// Styled Accordions
const AccordionWrapper = styled(Accordion)({
    marginBottom: (theme) => theme.spacing(2),
});

const ResumeAccordionWrapper = styled(Accordion)({
    marginBottom: (theme) => theme.spacing(2),
});

const UserForm = () => {
    // State for user details
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        gender: '',
        profile_picture: null,

    });

    // State for address
    const [address, setAddress] = useState({
        current: {
            street: '',
            city: '',
            pincode: '',
            state: '',
            country: '',
        },
        permanent: {
            street: '',
            city: '',
            pincode: '',
            state: '',
            country: '',
        },
    });
    // State for education details
    const [education, setEducation] = useState({
        sslc_school_name: '',
        sslc_start_year: '',
        sslc_end_year: '',
        sslc_percentage: '',
        hsc_school_name: '',
        hsc_start_year: '',
        hsc_end_year: '',
        hsc_percentage: '',
        college_name: '',
        college_start_year: '',
        college_end_year: '',
        college_percentage: '',
        department: '',
        degree: '',
        pg_college_name: '',
        pg_college_start_year: '',
        pg_college_end_year: '',
        pg_college_percentage: '',
        pg_college_department: '',
        pg_college_degree: '',
        diploma_college_name: '',
        diploma_college_start_year: '',
        diploma_college_end_year: '',
        diploma_college_department: '',
        diploma_college_degree: '',
        diploma_college_percentage: ''


    });

    const [jobPreference, setJobPreference] = useState({
        key_skills: '',
        industry: '',
        department: '',
        prefered_locations: ''
    })

    // State for professional details
    const [professionalDetails, setProfessionalDetails] = useState({
        isExperienced: true,
        numberOfCompanies: '',
        companies: [{ company_name: '', job_role: '', skills: '', years_of_experience: '' }],
    });



    // Handle changes in professional details fields
    const handleProfessionalDetailsChange = (event, index) => {
        const { name, value } = event.target;

        // If the field is for a specific company, update the corresponding company's details
        if (index !== undefined) {
            const updatedCompanies = [...professionalDetails.companies];
            updatedCompanies[index] = {
                ...(updatedCompanies[index] || {}), // Ensure the array element exists
                [name]: value,
            };

            setProfessionalDetails((prevDetails) => ({
                ...prevDetails,
                companies: updatedCompanies,
            }));
        } else {
            // If the field is for the number of companies, update the state
            const newNumberOfCompanies = value || 0;
            const updatedCompanies = professionalDetails.companies.slice(0, newNumberOfCompanies);

            setProfessionalDetails((prevDetails) => ({
                ...prevDetails,
                numberOfCompanies: newNumberOfCompanies,
                companies: updatedCompanies,
            }));
        }
    };

    // Handle experience/fresher checkbox change
    const handleExperienceFresherChange = (event) => {
        const isExperienced = event.target.checked;
        setProfessionalDetails({
            isExperienced,
            numberOfCompanies: '',
            companies: isExperienced ? [{ company_name: '', position: '', startDate: '', endDate: '' }] : [],
        });
        setProfessionalDetailsExpanded(isExperienced);
    };

    // State for resume upload
    const [resume, setResume] = useState(null);

    // State for resume accordion expansion
    const [resumeExpanded, setResumeExpanded] = useState(true);

    // State for experience checkbox
    const [experienceOption, setExperienceOption] = useState(''); // Default to 'experienced'

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

    // Handle resume accordion expansion/collapse
    const handleResumeExpand = () => {
        setResumeExpanded(!resumeExpanded);
    };

    // State for profile picture
    const [profilePicture, setProfilePicture] = useState(null);


    // State for accordion expansion
    const [userDetailsExpanded, setUserDetailsExpanded] = useState(true);
    const [addressExpanded, setAddressExpanded] = useState(true);
    const [educationExpanded, setEducationExpanded] = useState(true);
    const [jobPreferenceExpanded, setjobPreferenceExpanded] = useState(true);
    // State for professional details accordion expansion
    const [professionalDetailsExpanded, setProfessionalDetailsExpanded] = useState(true);
    // for user details validations
    const [errors, setErrors] = useState({
        userDetails: {
            first_name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
        },
        jobPreference: {
            key_skills: '',
            industry: '',
            department: '',
            prefered_locations: '',
        },
        education: {
            sslc_school_name: '',
            sslc_start_year: '',
            sslc_end_year: '',
            sslc_percentage: '',
            hsc_school_name: '',
            hsc_start_year: '',
            hsc_end_year: '',
            hsc_percentage: '',
            college_name: '',
            college_start_year: '',
            college_end_year: '',
            college_percentage: '',
            department: '',
            degree: '',
            pg_college_name: '',
            pg_college_start_year: '',
            pg_college_end_year: '',
            pg_college_percentage: '',
            pg_college_department: '',
            pg_college_degree: '',
            diploma_college_name: '',
            diploma_college_start_year: '',
            diploma_college_end_year: '',
            diploma_college_department: '',
            diploma_college_degree: '',
            diploma_college_percentage: ''
        }
    });
    // Handle changes in user details fields
    const handleUserDetailsChange = (event) => {
        // Clear previous error messages
        setErrors({
            ...errors,
            [event.target.name]: '',
        });

        // Update userDetails only if validation passes
        let updatedUserDetails = { ...userDetails };

        // Add validation logic for first_name and last_name
        if (event.target.name === 'first_name' || event.target.name === 'last_name') {
            if (/[^A-Za-z]/.test(event.target.value)) {
                // Invalid input, set error message
                setErrors({
                    ...errors,
                    [event.target.name]: 'Only alphabets allowed for first name and last name',
                });
                return;
            }
        }

        // Add validation logic for date_of_birth (allow only numbers)
        // if (event.target.name === 'date_of_birth') {
        //     if (/[^0-9/]/.test(event.target.value)) {
        //         // Invalid input, set error message
        //         setErrors({
        //             ...errors,
        //             [event.target.name]: 'Only numbers and / allowed for date of birth',
        //         });
        //         return;
        //     }
        // }

      
        // if (event.target.name === 'email') {
        //     // Adjusted regular expression to allow country code prefix
        //     if (/^\+?\d+$/.test(event.target.value)) {
        //         // Valid input, clear error message
        //         setErrors({
        //             ...errors,
        //             [event.target.name]: '',
        //         });
        //     } else {
        //         // Invalid input, set error message
        //         setErrors({
        //             ...errors,
        //             [event.target.name]: 'Invalid mobile number format',
        //         });
        //     }
        // }
        
        if (event.target.name === 'email') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
                // Valid email format, clear error message
                setErrors({
                    ...errors,
                    [event.target.name]: '',
                });
            } else {
                // Invalid email format, set error message
                setErrors({
                    ...errors,
                    [event.target.name]: 'Invalid email format',
                });
            }
        }
        

        // Update userDetails only if validation passes
        updatedUserDetails = {
            ...updatedUserDetails,
            [event.target.name]: event.target.value,
        };

        setUserDetails(updatedUserDetails);
    };

    // Handle changes in address fields
    const handleAddressChange = (type, event) => {
        // Clear previous errors for the specific address type
        setErrors({
            ...errors,
            [type]: {
                ...errors[type],
                [event.target.name]: '',
            },
        });
    
        let updatedAddressDetails = { ...address };
        if (event.target.name === 'street' || event.target.name === 'city' || event.target.name === 'country' || 
        event.target.name === 'state') {
            if (/[^A-Za-z\s]/.test(event.target.value)) {
                setErrors({
                    ...errors,
                    [type]: {
                        ...errors[type],
                        [event.target.name]: 'Only alphabets allowed for street and city',
                    },
                });
                return;
            }
        } else if (event.target.name === 'pincode') {
            if (/[^0-9]/.test(event.target.value)) {
                setErrors({
                    ...errors,
                    [type]: {
                        ...errors[type],
                        [event.target.name]: 'Invalid pincode (must be 6 digits)',
                    },
                });
                return;
            }
        }
    
        updatedAddressDetails = {
            ...updatedAddressDetails,
            [type]: {
                ...updatedAddressDetails[type],
                [event.target.name]: event.target.value,
            },
        };
    
        setAddress(updatedAddressDetails);
    };
    
    // Handle changes in education fields
     const handleEducationChange = (event) => {
        setErrors({
            ...errors,
            [event.target.name]: '',
        });

        let updatedEducation = { ...education };

        if (event.target.name === 'sslc_school_name' || event.target.name === 'hsc_school_name' || event.target.name === 'college_name'
            || event.target.name === 'department' || event.target.name === 'degree' || event.target.name === 'pg_college_name'
            || event.target.name === 'pg_college_department' || event.target.name === 'pg_college_degree' || event.target.name === 'diploma_college_name'
            || event.target.name === 'diploma_college_department' || event.target.name === 'diploma_college_degree') {
            if (/[^A-Za-z\s]/.test(event.target.value)) {
                // Invalid input, set error message
                setErrors({
                    ...errors,
                    [event.target.name]: 'Only alphabets and spaces allowed',
                });
                return;
            }
        }
        if (event.target.name === 'sslc_start_year' || event.target.name === 'sslc_end_year' ||
            event.target.name === 'hsc_start_year' || event.target.name === 'hsc_end_year' ||
            event.target.name === 'sslc_percentage' || event.target.name === 'hsc_percentage' || event.target.name === 'college_percentage' ||
            event.target.name === 'pg_college_percentage' || event.target.name === 'diploma_college_percentage' || event.target.name === 'college_start_year'
            || event.target.name === 'college_end_year' || event.target.name === 'pg_college_start_year' || event.target.name === 'pg_college_end_year'
            || event.target.name === 'diploma_college_start_year'|| event.target.name === 'diploma_college_end_year') {
            if (/[^0-9]/.test(event.target.value)) {
                // Invalid input, set error message
                setErrors({
                    ...errors,
                    [event.target.name]: 'Only numbers allowed',
                });
                return;
            }
        }

        updatedEducation = {
            ...updatedEducation,
            [event.target.name]: event.target.value,
        };

        setEducation(updatedEducation);
    };


    const handlejobPreferenceChange = (event) => {
        // Clear previous error messages
        setErrors({
            ...errors,
            jobPreference: {
                ...errors.jobPreference,
                [event.target.name]: '',
            },
        });

        // Update jobPreference only if validation passes
        let updatedJobPreference = { ...jobPreference };

        // Add validation logic for key_skills, industry, department, and prefered_locations
        if (/[0-9!@#$%^&*().?":{}|<>]/.test(event.target.value)) {
            // Invalid input, set error message
            setErrors({
                ...errors,
                jobPreference: {
                    ...errors.jobPreference,
                    [event.target.name]: 'Numbers and symbols are not allowed',
                },
            });
            return;
        }

        // Update jobPreference only if validation passes
        updatedJobPreference = {
            ...updatedJobPreference,
            [event.target.name]: event.target.value,
        };

        setJobPreference(updatedJobPreference);
    };
    // Handle profile picture upload
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        setProfilePicture(file);

        // Update userDetails to include profile_picture
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            profile_picture: file,
        }));
    };

    // Handle removing the profile picture
    const handleRemoveProfilePicture = () => {
        setProfilePicture(null);

        // Clear the file input value
        const fileInput = document.getElementById('profile-picture-input');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    // Handle user details accordion expansion/collapse
    const handleUserDetailsExpand = () => {
        setUserDetailsExpanded(!userDetailsExpanded);
    };

    // Handle address accordion expansion/collapse
    const handleAddressExpand = () => {
        setAddressExpanded(!addressExpanded);
    };

    // Handle education accordion expansion/collapse
    const handleEducationExpand = () => {
        setEducationExpanded(!educationExpanded);
    };
    // Handle jobpreference accordion expansion/collapse
    const handlejobPreferenceExpand = () => {
        setjobPreferenceExpanded(!jobPreferenceExpanded);
    };

    // api submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Address type determination
        let addressType;

        if (address.permanent.street && address.current.street) {
            addressType = 'Both';
        } else if (address.permanent.street) {
            addressType = 'Permanent';
        } else if (address.current.street) {
            addressType = 'Current';
        } else {
            console.log('Please fill at least one address type');
            return;
        }

        // Create a FormData object to send to the backend
        const dataToSend = new FormData();
        dataToSend.append('userDetails', JSON.stringify({
            ...userDetails,
            profile_picture: profilePicture ? 'Uploaded' : 'Not uploaded',
        }));
        dataToSend.append('address', JSON.stringify({
            type: addressType,
            permanent: {
                ...address.permanent,
                address_type: 'Permanent',
            },
            current: {
                ...address.current,
                address_type: 'Current',
            },
        }));
        dataToSend.append('education', JSON.stringify(education));
        dataToSend.append('professionalDetails', JSON.stringify(experienceOption === 'experienced' ? professionalDetails : 'Fresher'));
        dataToSend.append('resume', resume); // Assuming resume is a File object
        dataToSend.append('profilePicture', profilePicture); // Assuming profilePicture is a File object
        dataToSend.append('jobPreference', JSON.stringify(jobPreference));

        // Log the FormData object
        for (const pair of dataToSend.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            // Make API call
            const response = await axios.post('http://192.168.1.39:8000/userRegister/', dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // You may need to add other headers like authentication token if required
                },
            });

            // Handle the response as needed
            console.log('API Response:', response.data);

            // Resetting states
            // event.target.reset();
            // setUserDetails({
            //     first_name: '',
            //     last_name: '',
            //     date_of_birth: '',
            //     email: '',
            //     gender: '',
            // });
            // setAddress({
            //     current: {
            //         street: '',
            //         city: '',
            //         pincode: '',
            //         state: '',
            //         country: '',
            //     },
            //     permanent: {
            //         street: '',
            //         city: '',
            //         pincode: '',
            //         state: '',
            //         country: '',
            //     },
            // });
            // setEducation({
            //     sslc_school_name: '',
            //     sslc_start_year: '',
            //     sslc_end_year: '',
            //     sslc_percentage: '',
            //     hsc_school_name: '',
            //     hsc_start_year: '',
            //     hsc_end_year: '',
            //     hsc_percentage: '',
            //     college_name: '',
            //     college_start_year: '',
            //     college_end_year: '',
            //     college_percentage: '',
            //     department: '',
            //     degree: '',
            // });
            // setProfessionalDetails({
            //     isExperienced: true,
            //     numberOfCompanies: '',
            //     companies: [{ company_name: '', position: '', startDate: '', endDate: '' }],
            // });
            // setExperienceOption('');
            // setResume(null);
            // setJobPreference({
            //     key_skills: '',
            //     industry: '',
            //     department: '',
            //     prefered_locations: '',
            // });
            // setProfilePicture(null);
            // // Reset resume state
            // setResume(null);

            // Collapse accordion sections
            setUserDetailsExpanded(true);
            setAddressExpanded(true);
            setEducationExpanded(true);
            setProfessionalDetailsExpanded(true);
            setResumeExpanded(true);
            setjobPreferenceExpanded(true);

        } catch (error) {
            console.error('API Error:', error);
            // Handle error as needed
        }
    };

    // for multi languages
    const [language, setLanguage] = useState('en'); // Default language is English

    const handleChangeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        handleChangeLanguage(newLanguage);
    };
    const formRef = useRef(null);
    return (
        <FormContainer style={{marginTop:'60px'}}>
            <Typography variant="h4" align="center" gutterBottom>
                {UserFormData[language].UserDetail.one}
            </Typography>
            <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="tamil">Tamil</option>
            </select>

            <form ref={formRef} onSubmit={handleSubmit} >
                {/* User Details Accordion */}
                <AccordionWrapper expanded={userDetailsExpanded} onChange={handleUserDetailsExpand} className='user_details'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{UserFormData[language].UserDetail.one}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* First Column */}
                                <TextField
                                    label={UserFormData[language].UserDetail.two}
                                    name="first_name"
                                    value={userDetails.first_name}
                                    onChange={handleUserDetailsChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.first_name)}
                                    helperText={errors.first_name}

                                />
                                <TextField
                                    label={UserFormData[language].UserDetail.four}
                                    name="last_name"
                                    value={userDetails.last_name}
                                    onChange={handleUserDetailsChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.last_name)}
                                    helperText={errors.last_name}


                                />
                                <TextField className='dob'
                                    // label= {UserFormData[language].UserDetail.six}
                                   
                                    name="date_of_birth"
                                    type='date'
                                    value={userDetails.date_of_birth}
                                    onChange={handleUserDetailsChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.date_of_birth)}
                                    helperText={errors.date_of_birth}


                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* Second Column */}
                                <TextField
                                    label={UserFormData[language].UserDetail.eight}
                                    name="email"
                                    value={userDetails.email}
                                    onChange={handleUserDetailsChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}


                                />
                                <Select
                                    label="gender"
                                    name="gender"
                                    value={userDetails.gender}
                                    onChange={handleUserDetailsChange}
                                    fullWidth
                                    displayEmpty
                                    margin="dense"
                                    required
                                    className='user_details_gender'


                                >
                                    <MenuItem value="" disabled>{UserFormData[language].UserDetail.twelve}</MenuItem>
                                    <MenuItem className='male' value="male">{UserFormData[language].UserDetail.fourteen}</MenuItem>
                                    <MenuItem value="female">{UserFormData[language].UserDetail.sixteen}</MenuItem>
                                    <MenuItem value="other">{UserFormData[language].UserDetail.eighteen}</MenuItem>
                                </Select>
                                <label htmlFor="profile-picture-input">{UserFormData[language].UserDetail.twenty}</label>
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
                </AccordionWrapper>

                {/* Address Accordion */}
                <AccordionWrapper className='address_accordion' expanded={addressExpanded} onChange={handleAddressExpand}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Address</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h6"> Permanent and current Address:</Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                                {/* First Column */}
                                <TextField
                                    label="Parmanent Street"
                                    name="street"
                                    value={address.permanent.street}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.permanent && errors.permanent.street)}
                                    helperText={errors.permanent && errors.permanent.street}
                                />
                                <TextField
                                    label=" Parmanent City"
                                    name="city"
                                    value={address.permanent.city}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.permanent && errors.permanent.city)}
                                    helperText={errors.permanent && errors.permanent.city}
                                />
                                <TextField
                                    label="Parmanent pincode"
                                    name="pincode"
                                    value={address.permanent.pincode}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.permanent && errors.permanent.pincode)}
                                    helperText={errors.permanent && errors.permanent.pincode}
                                />

                                <TextField
                                    label="Parmanent Country"
                                    name="country"
                                    value={address.permanent.country}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.permanent && errors.permanent.country)}
                                    helperText={errors.permanent && errors.permanent.country}
                                />
                                <TextField
                                    label="Parmanent State"
                                    name="state"
                                    value={address.permanent.state}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.permanent && errors.permanent.state)}
                                    helperText={errors.permanent && errors.permanent.state}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} >
                                {/* <Typography variant="h6">Current Address</Typography> */}
                                <TextField
                                    label="Current Street"
                                    name="street"
                                    value={address.current.street}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.street)}
                                    helperText={errors.current && errors.current.street}
                                />
                                <TextField
                                    label="Current City"
                                    name="city"
                                    value={address.current.city}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.city)}
                                    helperText={errors.current && errors.current.city}
                                />
                                <TextField
                                    label="Current Pincode"
                                    name="pincode"
                                    value={address.current.pincode}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.pincode)}
                                    helperText={errors.current && errors.current.pincode}
                                />

                                <TextField
                                    label="Current Country"
                                    name="country"
                                    value={address.current.country}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.country)}
                                    helperText={errors.current && errors.current.country}
                                />
                                <TextField
                                    label="Current State"
                                    name="state"
                                    value={address.current.state}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.state)}
                                    helperText={errors.current && errors.current.state}
                                />

                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </AccordionWrapper>

                {/* Educatiom Accordion */}

                <AccordionWrapper expanded={educationExpanded} onChange={handleEducationExpand} className='education'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography variant="h6">Education details</Typography></AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>

                                {/* First Column */}
                                <TextField
                                    label="SSLC-school-name"
                                    name="sslc_school_name"
                                    value={education.sslc_school_name}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.sslc_school_name)}
                                    helperText={errors.sslc_school_name}
                                />
                                <TextField
                                    label="SSLC-start-year"
                                    name="sslc_start_year"
                                    value={education.sslc_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.sslc_start_year)}
                                    helperText={errors.sslc_start_year}
                                />
                                <TextField
                                    label="SSLC-end-year"
                                    name="sslc_end_year"
                                    value={education.sslc_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.sslc_end_year)}
                                    helperText={errors.sslc_end_year}
                                />
                                <TextField
                                    label="SSLC-percentage"
                                    name="sslc_percentage"
                                    value={education.sslc_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.sslc_percentage)}
                                    helperText={errors.sslc_percentage}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                {/* Second Column */}
                                <TextField
                                    label="HSC-school-name"
                                    name="hsc_school_name"
                                    value={education.hsc_school_name}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.hsc_school_name)}
                                    helperText={errors.hsc_school_name}
                                />
                                <TextField
                                    label="HSC-start-year"
                                    name="hsc_start_year"
                                    value={education.hsc_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.hsc_start_year)}
                                    helperText={errors.hsc_start_year}
                                />
                                <TextField
                                    label="HSC-end-year"
                                    name="hsc_end_year"
                                    value={education.hsc_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.hsc_end_year)}
                                    helperText={errors.hsc_end_year}
                                />
                                <TextField
                                    label="HSC-percentage"
                                    name="hsc_percentage"
                                    value={education.hsc_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.hsc_percentage)}
                                    helperText={errors.hsc_percentage}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ width: '100%' }} >UG Details:</Typography>
                                {/* Third Column */}
                                <TextField
                                    label="College-name"
                                    name="college_name"
                                    value={education.college_name}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.college_name)}
                                    helperText={errors.college_name}
                                />
                                <TextField
                                    label="College-start-year"
                                    name="college_start_year"
                                    value={education.college_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.college_start_year)}
                                    helperText={errors.college_start_year}

                                />
                                <TextField
                                    label="College-end-year"
                                    name="college_end_year"
                                    value={education.college_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.college_end_year)}
                                    helperText={errors.college_end_year}
                                />
                                <TextField
                                    label="College-percentage"
                                    name="college_percentage"
                                    value={education.college_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.college_percentage)}
                                    helperText={errors.college_percentage}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ color: 'transparent' }}> . </Typography>
                                {/* Fourth Column */}
                                <TextField
                                    label="Department"
                                    name="department"
                                    value={education.department}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.department)}
                                    helperText={errors.department}
                                />
                                <TextField
                                    label="Degree"
                                    name="degree"
                                    value={education.degree}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.degree)}
                                    helperText={errors.degree}
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
                                        value={education.education_type}
                                        onChange={handleEducationChange}
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
                            {education.education_type === 'pg' && (
                                <>
                                    {/* Additional PG Fields */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="PG-College-name"
                                            name="pg_college_name"
                                            value={education.pg_college_name}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_name)}
                                            helperText={errors.pg_college_name}
                                        />
                                        <TextField
                                            label="PG-College-start-year"
                                            name="pg_college_start_year"
                                            value={education.pg_college_start_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_start_year)}
                                            helperText={errors.pg_college_start_year}
                                        />
                                        <TextField
                                            label="PG-College-end-year"
                                            name="pg_college_end_year"
                                            value={education.pg_college_end_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_end_year)}
                                            helperText={errors.pg_college_end_year}
                                        />
                                        <TextField
                                            label="PG-College-percentage"
                                            name="pg_college_percentage"
                                            value={education.pg_college_percentage}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_percentage)}
                                            helperText={errors.pg_college_percentage}
                                        />
                                        {/* Add other PG fields here */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="PG-College-department"
                                            name="pg_college_department"
                                            value={education.pg_college_department}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_department)}
                                            helperText={errors.pg_college_department}
                                        />
                                        <TextField
                                            label="PG-College-degree"
                                            name="pg_college_degree"
                                            value={education.pg_college_degree}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.pg_college_degree)}
                                            helperText={errors.pg_college_degree}
                                        />
                                    </Grid>
                                </>
                            )}

                            {education.education_type === 'diploma' && (
                                <>
                                    {/* Additional Diploma Fields */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Diploma-college-name"
                                            name="diploma_college_name"
                                            value={education.diploma_college_name}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_name)}
                                            helperText={errors.diploma_college_name}
                                        />
                                        <TextField
                                            label="Diploma-college-start-year"
                                            name="diploma_college_start_year"
                                            value={education.diploma_college_start_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_start_year)}
                                            helperText={errors.diploma_college_start_year}
                                        />
                                        <TextField
                                            label="Diploma-college-end-year"
                                            name="diploma_college_end_year"
                                            value={education.diploma_college_end_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_end_year)}
                                            helperText={errors.diploma_college_end_year}
                                        />
                                        <TextField
                                            label="Diploma-college-percentage"
                                            name="diploma_college_percentage"
                                            value={education.diploma_college_percentage}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_percentage)}
                                            helperText={errors.diploma_college_percentage}
                                        />
                                        {/* Add other Diploma fields here */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Diploma-college-department"
                                            name="diploma_college_department"
                                            value={education.diploma_college_department}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_department)}
                                            helperText={errors.diploma_college_department}
                                        />
                                        <TextField
                                            label="Diploma-college-degree"
                                            name="diploma_college_degree"
                                            value={education.diploma_college_degree}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.diploma_college_degree)}
                                            helperText={errors.diploma_college_degree}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </AccordionDetails>
                </AccordionWrapper>

                {/* Professional Details Accordion */}
                <AccordionWrapper
                    expanded={professionalDetailsExpanded}
                    className='professional_details'
                    onChange={() => setProfessionalDetailsExpanded(!professionalDetailsExpanded)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Professional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/* Experience/Fresher Radio Buttons */}
                                <label>
                                    <input
                                        type="radio"
                                        name="experienceOption"
                                        value="experienced"
                                        checked={experienceOption === 'experienced'}
                                        onChange={() => setExperienceOption('experienced')}
                                        className='exprence'
                                    />
                                    {/* non-breaking space  */}
                                    &nbsp;  Experience
                                </label> <br></br>
                                <label>
                                    <input
                                        type="radio"
                                        name="experienceOption"
                                        value="fresher"
                                        checked={experienceOption === 'fresher'}
                                        onChange={() => setExperienceOption('fresher')}
                                    />
                                    &nbsp; Fresher
                                </label>
                            </Grid>
                            {experienceOption === 'experienced' && (
                                <>
                                    {/* Number of Companies */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Number of Companies"
                                            name="numberOfCompanies"
                                            type="number"
                                            value={professionalDetails.numberOfCompanies}
                                            onChange={(e) => handleProfessionalDetailsChange(e)}
                                            fullWidth
                                            margin="dense"
                                        />
                                    </Grid>

                                    {/* Company Details */}
                                    {Array.from({ length: Number(professionalDetails.numberOfCompanies) || 0 }).map(
                                        (_, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Typography variant="subtitle1">Company {index + 1}</Typography>
                                                <TextField
                                                    label="Company Name"
                                                    name="company_name"
                                                    value={professionalDetails.companies[index]?.company_name || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                                <TextField
                                                    label="Job Role"
                                                    name="job_role"
                                                    value={professionalDetails.companies[index]?.job_role || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                                <TextField
                                                    label="Skills"
                                                    name="skills"
                                                    value={professionalDetails.companies[index]?.skills || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                />
                                                <TextField
                                                    label="Years of exprence"
                                                    name="years_of_experience"
                                                    value={professionalDetails.companies[index]?.years_of_experience || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                />

                                            </Grid>
                                        )
                                    )}
                                </>
                            )}
                        </Grid>
                    </AccordionDetails>
                </AccordionWrapper>
                {/* job preference */}
                <AccordionWrapper expanded={jobPreferenceExpanded} onChange={handlejobPreferenceExpand} className='job_preference'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}> <Typography variant="h6">Job Preference</Typography></AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* First Column */}
                                <TextField
                                    label="Key-skills"
                                    name="key_skills"
                                    value={jobPreference.key_skills}
                                    onChange={handlejobPreferenceChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.jobPreference.key_skills)}
                                    helperText={errors.jobPreference.key_skills}
                                />
                                <TextField
                                    label="Industry"
                                    name="industry"
                                    value={jobPreference.industry}
                                    onChange={handlejobPreferenceChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.jobPreference.industry)}
                                    helperText={errors.jobPreference.industry}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Department"
                                    name="department"
                                    value={jobPreference.department}
                                    onChange={handlejobPreferenceChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.jobPreference.department)}
                                    helperText={errors.jobPreference.department}
                                />
                                <TextField
                                    label="Prefered locations"
                                    name="prefered_locations"
                                    value={jobPreference.prefered_locations}
                                    onChange={handlejobPreferenceChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    error={Boolean(errors.jobPreference.prefered_locations)}
                                    helperText={errors.jobPreference.prefered_locations}
                                />
                            </Grid>

                        </Grid>

                    </AccordionDetails>
                </AccordionWrapper>

                {/* Resume Accordion */}
                <ResumeAccordionWrapper expanded={resumeExpanded} onChange={handleResumeExpand}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                </ResumeAccordionWrapper>
                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>

            {/* <button onClick={() => handleChangeLanguage('en')}>Switch to English</button>
      <button onClick={() => handleChangeLanguage('es')}>Cambiar a Español</button> */}


        </FormContainer>
    );
};

export default UserForm;







