// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button, Typography, Paper, Grid, TextField, FormControlLabel, Checkbox, FormGroup, Radio,
//     RadioGroup } from '@material-ui/core';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';



// const RegistrationForm = () => {
//     const [activeStep, setActiveStep] = useState(0);

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const steps = ['Step 1', 'Step 2', 'Step 3'];

//     const getStepContent = (step) => {
//         switch (step) {
//             case 0:
//                 return <Step1 />;
//             case 1:
//                 return <Step2 />;
//             case 2:
//                 return <Step3 />;
//             default:
//                 return 'Unknown step';
//         }
//     };

// //form 1
//     const [selectedDate, handleDateChange] = useState(new Date());

// //form 2

// const [fresher, setFresher] = useState(Boolean);
// const [experienced, setExperienced] = useState(Boolean);
// const [twelfthChecked, setTwelfthChecked] = useState(false);

// const handleCheckFresher = (e) => {
//     if (fresher === true) {
//         setExperienced(false)
//     } else {
//         setFresher(true)
//     }
// }
// const handleCheckExperienced = (e) => {
//     if (experienced === true) {
//         setFresher(false)
//     } else {
//         setExperienced(true)
//     }

// }

// //form 3

// const [willingToRelocate, setWillingToRelocate] = useState('');
// const [formData, setFormData] = useState({
//     relocate: "",
//     notRelocate: ""
// });


// const handleFormData = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// }
// const handleRelocateChange = (event) => {
//     setWillingToRelocate(event.target.value);
// };

//     const Step1 = () => (
//         <div>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="First Name" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Last Name" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Email" type="email" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Gender" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Address" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField fullWidth label="Mobile Number" type="tel" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Typography>Profile Picture Upload:</Typography>
//                     {/* File input for profile picture upload */}
//                     <input type="file" accept="image/*" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                         <TextField
//                             fullWidth
//                             label="Date of Birth"
//                             type="date"
//                             defaultValue={selectedDate.toISOString().split('T')[0]}
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                             onChange={(e) => handleDateChange(new Date(e.target.value))}
//                         />
//                     </MuiPickersUtilsProvider>
//                 </Grid>
//             </Grid>
//         </div>

//     );

//     const Step2 = () => (
//         <div>
//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//                 <FormGroup>
//                     <FormControlLabel
//                         checked={fresher}
//                         control={<Checkbox />}
//                         label="Fresher"
//                         onChange={handleCheckFresher}
//                     />
//                 </FormGroup>

//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <FormControlLabel
//                     checked={experienced}
//                     control={<Checkbox />}
//                     label="Experienced"
//                     onChange={handleCheckExperienced}
//                 />
//             </Grid>
//             {fresher === true ? (
//                 <>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="10th Percentage" type="number" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <FormControlLabel
//                             control={<Checkbox onChange={(e) => setTwelfthChecked(e.target.checked)} />}
//                             label="12th"
//                             checked={twelfthChecked}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         {twelfthChecked ? (
//                             <TextField fullWidth label="12th Percentage" type="number" />
//                         ) : (
//                             <TextField fullWidth label="Diploma Percentage" type="number" />
//                         )}
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="College Name" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="Department" />
//                     </Grid>
//                 </>
//             ) : ""}
//             {experienced && (
//                 <>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="Years of Experience" type="number" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="Previous Company Name" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="Previous Role" />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField fullWidth label="Department" />
//                     </Grid>
//                 </>
//             )}
//         </Grid>
//     </div>
//     );

//     const Step3 = () => (
//         <div>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     <form>
//                         <RadioGroup
//                             aria-label="willingToRelocate"
//                             name="willingToRelocate"
//                             value={willingToRelocate}
//                             onChange={handleRelocateChange}
//                         >

//                             <FormControlLabel
//                                 value="yes"
//                                 control={<Radio />}
//                                 label="Willing to relocate (Yes)"
//                             />
//                             <FormControlLabel
//                                 value="no"
//                                 control={<Radio />}
//                                 label="Not willing to relocate (No)"
//                             />

//                         </RadioGroup>
//                     </form>

//                 </Grid>



//                 <Grid item xs={12} sm={6}>
//                     <Typography>Resume upload:</Typography>
//                     <input type="file" accept="pdf/*" />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                                 <TextField fullWidth label="Desired job title" name="relocate" value={formData.relocate} onChange={handleFormData} />

//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <TextField fullWidth label="Location Preference" name="notRelocate" value={formData.locationPreference} onChange={handleFormData} />
//                             </Grid>
//             </Grid>

//         </div>

//     );

//     return (
//         <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>

//             <Stepper activeStep={activeStep} alternativeLabel>
//                 {steps.map((label) => (
//                     <Step key={label}>
//                         <StepLabel>{label}</StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>
//             <div>
//                 {activeStep === steps.length ? (
//                     <div>
//                         <Typography>All steps completed - you're finished</Typography>
//                     </div>
//                 ) : (
//                     <div>
//                         {getStepContent(activeStep)}
//                         <div style={{ marginTop: '20px' }}>
//                             <Button disabled={activeStep === 0} onClick={handleBack}>
//                                 Back
//                             </Button>
//                             <Button variant="contained" color="primary" onClick={handleNext}>
//                                 {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </Paper>
//     );
// };

// export default RegistrationForm;

// reviewed form
// import React, { useState } from 'react';
// import { styled } from '@mui/system';
// import axios from 'axios';


// import {
//     Container,
//     Grid,
//     Paper,
//     TextField,
//     Button,
//     Radio,
//     RadioGroup,
//     FormControlLabel,
//     FormControl,
//     FormLabel,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormHelperText,
//     Typography,
//     IconButton,
// } from '@mui/material';
// import { PhotoCamera, Delete } from '@mui/icons-material';
// import { FaFileAlt } from "react-icons/fa";

// const RegistrationContainer = styled(Container)({
//     marginTop: '20px',
// });

// const RegistrationPaper = styled(Paper)({
//     padding: '20px',
// });

// const RegistrationButton = styled(Button)({
//     marginTop: '20px',
// });

// const gradient = {
//     //     backgroundColor: '#D9AFD9',
//     //   backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
//     // backgroundColor: '#85FFBD',
//     // backgroundImage: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
//     marginTop: '25px',
//     height: '100vh',
//     backgroundColor: '#F9F7C9',
//     // background: 'linear-gradient( white,black)'
// }
// const JobApplicationForm = () => {
//     const initialFormData = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         address: '',
//         mobileNumber: '',
//         gender: '',
//         experience: '',
//         percentage10: '',
//         percentage12: '',
//         diplomaPercentage: '',
//         educationType: '12th',
//         department: '',
//         collegeName: '',
//         batchYear: '',
//         companyName: '',
//         role: '',
//         position: '',
//         relocate: '',
//         profilePicture: null,
//         resume: null,

//     };
//     const [formData, setFormData] = useState(initialFormData);

//     const [errors, setErrors] = useState({});


//     const validateForm = () => {
//         let valid = true;
//         const newErrors = {};

//         // Validation for Column 1
//         if (!/^[A-Za-z]+$/.test(formData.firstName.trim())) {
//             newErrors.firstName = 'Invalid characters. Please enter only letters.';
//             valid = false;
//         }


//         if (!/^[A-Za-z]+$/.test(formData.lastName.trim())) {
//             newErrors.lastName = 'Invalid characters. Please enter only letters.';
//             valid = false;
//         }

//         if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Invalid email address';
//             valid = false;
//         }

//         if (!formData.address.trim()) {
//             newErrors.address = 'Address is required';
//             valid = false;
//         }

//         if (!formData.mobileNumber.trim() || !/^\d{10}$/.test(formData.mobileNumber)) {
//             newErrors.mobileNumber = 'Invalid mobile number (10 digits)';
//             valid = false;
//         }

//         // Validation for Column 2
//         if (formData.experience === 'fresher') {
//             if (isNaN(formData.percentage10) || formData.percentage10 < 0 || formData.percentage10 > 100) {
//                 newErrors.percentage10 = "Invalid 10th percentage Enter only number don't use %";
//                 valid = false;
//             }

//             if (formData.educationType === '12th') {
//                 if (isNaN(formData.percentage12) || formData.percentage12 < 0 || formData.percentage12 > 100) {
//                     newErrors.percentage12 = "Invalid 10th percentage Enter only number don't use %";
//                     valid = false;
//                 }
//             }
//         }

//         if (!formData.department.trim()) {
//             newErrors.department = 'Department is required';
//             valid = false;
//         }
//         if (!formData.collegeName.trim()) {
//             newErrors.collegeName = 'collegeName is required';
//             valid = false;
//         }
//         if (!formData.batchYear.trim() || !/^\d+$/.test(formData.batchYear.trim())) {
//             newErrors.batchYear = 'Invalid batch year. Please enter only numeric values.';
//             valid = false;
//         }

//         // Validation for Column 3
//         if (formData.experience === 'experience') {
//             if (!formData.companyName.trim()) {
//                 newErrors.companyName = 'Company Name is required';
//                 valid = false;
//             }

//             if (!formData.role.trim()) {
//                 newErrors.role = 'Role is required';
//                 valid = false;
//             }

//             if (!formData.position.trim()) {
//                 newErrors.position = 'Position is required';
//                 valid = false;
//             }
//         }

//         setErrors(newErrors);
//         return valid;
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (event) => {
//         const { name, files } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: files[0],
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if (validateForm()) {
//             // Handle form submission logic here
//             console.log(formData);
//             let headers = new Headers();

//             headers.append('Content-Type', 'application/json');
//             headers.append('Accept', 'application/json');
//             headers.append('Origin', 'http://192.168.1.41:8000/user_register/');


//             const apiUrl = 'http://192.168.1.41:8000/user_register/';


//             axios.post(apiUrl, formData, headers).then(response => console.log(response, "post data response===>")).catch(e => console.log(e));
//         } else {
//             console.error('Form validation failed. Please check the error messages.');
//         }

//     };
//     const handleReset = () => {
//         setFormData(initialFormData);
//         setErrors({});
//     };
//     const handleDelete = (fieldName) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [fieldName]: null,
//         }));
//     };
//     return (<div style={gradient}  >
//         <Container>
//             <form onSubmit={handleSubmit} onReset={handleReset} >
//                 <Grid container spacing={3}>
//                     {/* Column 1 */}
//                     <Grid item xs={12} sm={4}>
//                         <RegistrationPaper elevation={3} sx={{ padding: 2 }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Personal Information
//                             </Typography>
//                             <TextField
//                                 label="First Name"
//                                 fullWidth
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}

//                                 error={!!errors.firstName}
//                                 helperText={errors.firstName}
//                                 sx={{
//                                     padding: 1,
//                                     borderColor: errors.firstName ? 'red' : 'initial',
//                                 }}
//                             />
//                             <TextField
//                                 label="Last Name"
//                                 fullWidth
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}

//                                 error={!!errors.lastName}
//                                 helperText={errors.lastName}
//                                 sx={{ padding: 1 }}
//                             />
//                             <TextField
//                                 label="Email"
//                                 fullWidth
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}

//                                 error={!!errors.email}
//                                 helperText={errors.email}
//                                 sx={{
//                                     padding: 1,
//                                     borderColor: errors.email ? 'red' : 'initial',
//                                 }}
//                             />
//                             <TextField
//                                 label="Address"
//                                 fullWidth
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}

//                                 error={!!errors.address}
//                                 helperText={errors.address}
//                                 sx={{ padding: 1 }}
//                             />
//                             <TextField
//                                 label="Mobile Number"
//                                 fullWidth
//                                 type="tel"
//                                 name="mobileNumber"
//                                 value={formData.mobileNumber}
//                                 onChange={handleChange}

//                                 error={!!errors.mobileNumber}
//                                 helperText={errors.mobileNumber}
//                                 sx={{ padding: 1 }}
//                             />
//                         </RegistrationPaper>
//                     </Grid>

//                     {/* Column 2 */}
//                     <Grid item xs={12} sm={4}>
//                         <RegistrationPaper elevation={3} sx={{ padding: 2 }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Educational Information
//                             </Typography>
//                             <FormControl component="fieldset" required>
//                                 <FormLabel component="legend" >Gender</FormLabel>
//                                 <RadioGroup
//                                     name="gender"
//                                     value={formData.gender}
//                                     onChange={handleChange}
//                                     sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
//                                 >
//                                     <FormControlLabel value="male" control={<Radio />} label="Male" />
//                                     <FormControlLabel value="female" control={<Radio />} label="Female" />
//                                     <FormControlLabel value="other" control={<Radio />} label="Other" />
//                                 </RadioGroup>
//                             </FormControl>

//                             <FormControl fullWidth sx={{ padding: 1 }}>

//                                 <InputLabel>Select Experinece/Fresher</InputLabel>

//                                 <Select name="experience" value={formData.experience} onChange={handleChange}>
//                                     <MenuItem value="fresher">Fresher</MenuItem>
//                                     <MenuItem value="experience">Experience</MenuItem>
//                                 </Select>

//                             </FormControl>


//                             <TextField
//                                 label="Department"
//                                 fullWidth
//                                 name="department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 error={!!errors.department}
//                                 helperText={errors.department}
//                                 sx={{ padding: 1 }}
//                             />
//                             <TextField
//                                 label="College Name"
//                                 fullWidth
//                                 name="collegeName"
//                                 value={formData.collegeName}
//                                 onChange={handleChange}
//                                 error={!!errors.collegeName}
//                                 helperText={errors.collegeName}
//                                 sx={{ padding: 1 }}
//                             />
//                             <TextField
//                                 label="Batch"
//                                 fullWidth
//                                 name="batchYear"
//                                 value={formData.batchYear}
//                                 onChange={handleChange}
//                                 error={!!errors.batchYear}
//                                 helperText={errors.batchYear}
//                                 sx={{ padding: 1 }}
//                             />
//                         </RegistrationPaper>
//                     </Grid>

//                     {/* Column 3 */}
//                     <Grid item xs={12} sm={4}>
//                         <RegistrationPaper elevation={3} sx={{ padding: 2 }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Professional Information
//                             </Typography>
//                             {formData.experience === 'experience' && (
//                                 <>
//                                     <TextField
//                                         label="Company Name"
//                                         fullWidth
//                                         name="companyName"
//                                         value={formData.companyName}
//                                         onChange={handleChange}

//                                         error={!!errors.companyName}
//                                         helperText={errors.companyName}
//                                         sx={{ padding: 1 }}
//                                     />
//                                     <TextField
//                                         label="Role"
//                                         fullWidth
//                                         name="role"
//                                         value={formData.role}
//                                         onChange={handleChange}

//                                         error={!!errors.role}
//                                         helperText={errors.role}
//                                         sx={{ padding: 1 }}
//                                     />
//                                     <TextField
//                                         label="Position"
//                                         fullWidth
//                                         name="position"
//                                         value={formData.position}
//                                         onChange={handleChange}

//                                         error={!!errors.position}
//                                         helperText={errors.position}
//                                         sx={{ padding: 1 }}
//                                     />
//                                 </>
//                             )}
//                             {formData.experience === 'fresher' && (
//                                 <>
//                                     <TextField
//                                         label="10th Percentage"
//                                         fullWidth
//                                         name="percentage10"
//                                         value={formData.percentage10}
//                                         onChange={handleChange}
//                                         type="number"

//                                         error={!!errors.percentage10}
//                                         helperText={errors.percentage10}
//                                         sx={{ padding: 1 }}
//                                     />

//                                     <FormControl fullWidth sx={{ padding: 1, marginTop: '-15px' }}>
//                                         <FormHelperText>Select education type</FormHelperText>
//                                         <Select name="educationType" value={formData.educationType} onChange={handleChange}>
//                                             <MenuItem value="12th">12th</MenuItem>
//                                             <MenuItem value="diploma">Diploma</MenuItem>
//                                         </Select>
//                                     </FormControl>

//                                     {formData.educationType === '12th' && (
//                                         <TextField
//                                             label="12th Percentage"
//                                             fullWidth
//                                             name="percentage12"
//                                             value={formData.percentage12}
//                                             onChange={handleChange}

//                                             error={!!errors.percentage12}
//                                             helperText={errors.percentage12}
//                                             sx={{ padding: 1 }}
//                                         />
//                                     )}
//                                     {formData.educationType === 'diploma' && (
//                                         <TextField
//                                             label="Diploma Percentage"
//                                             fullWidth
//                                             name="diplomaPercentage"
//                                             value={formData.diplomaPercentage}
//                                             onChange={handleChange}
//                                             type="number"


//                                             error={!!errors.diplomaPercentage}
//                                             helperText={errors.diplomaPercentage}
//                                             sx={{ padding: 1 }}
//                                         />
//                                     )}

//                                 </>
//                             )}

//                             <FormControl fullWidth sx={{ padding: 1 }}>
//                                 <InputLabel>Willing to Relocate</InputLabel>
//                                 <Select name="relocate" value={formData.relocate} onChange={handleChange}>
//                                     <MenuItem value="yes">Yes</MenuItem>
//                                     <MenuItem value="no">No</MenuItem>
//                                 </Select>
//                             </FormControl>

//                             <Paper elevation={3} sx={{ padding: 2 }}>
//                                 {/* Profile Picture Upload */}
//                                 <input
//                                     accept="image/*"
//                                     style={{ display: 'none' }}
//                                     id="profile-picture-input"
//                                     type="file"
//                                     name="profilePicture"
//                                     onChange={handleFileChange}
//                                 />
//                                 <label htmlFor="profile-picture-input">
//                                     <IconButton color="primary" aria-label="upload picture" component="span">
//                                         <PhotoCamera />
//                                     </IconButton>
//                                 </label>
//                                 <Typography variant="body2" color="textSecondary" component="span">
//                                     Upload Profile
//                                 </Typography>
//                                 {formData.profilePicture && (
//                                     <div>
//                                         <Typography variant="body2" color="textPrimary" component="span">
//                                             {formData.profilePicture.name}
//                                         </Typography>
//                                         <IconButton
//                                             color="secondary"
//                                             aria-label="delete picture"
//                                             onClick={() => handleDelete('profilePicture')}
//                                         >
//                                             <Delete />
//                                         </IconButton>
//                                     </div>
//                                 )}

//                                 {/* Resume Upload */}
//                                 <input
//                                     accept=".pdf, .doc, .docx"
//                                     style={{ display: 'none' }}
//                                     id="resume-input"
//                                     type="file"
//                                     name="resume"
//                                     onChange={handleFileChange}
//                                 />
//                                 <label htmlFor="resume-input">
//                                     <IconButton color="primary" aria-label="upload resume" component="span">
//                                         <FaFileAlt />
//                                     </IconButton>
//                                 </label>
//                                 <Typography variant="body2" color="textSecondary" component="span">
//                                     Upload Resume
//                                 </Typography>
//                                 {formData.resume && (
//                                     <div>
//                                         <Typography variant="body2" color="textPrimary" component="span">
//                                             {formData.resume.name}
//                                         </Typography>
//                                         <IconButton
//                                             color="secondary"
//                                             aria-label="delete resume"
//                                             onClick={() => handleDelete('resume')}
//                                         >
//                                             <Delete />
//                                         </IconButton>
//                                     </div>
//                                 )}
//                             </Paper>

//                         </RegistrationPaper>
//                     </Grid>

//                     {/* Submit Button */}
//                     <Grid item xs={12}>
//                         <RegistrationButton type="submit" variant="outlined" color="primary">
//                             Submit
//                         </RegistrationButton>
//                         <RegistrationButton type="reset" variant="outlined" color="secondary">
//                             Reset
//                         </RegistrationButton>
//                     </Grid>
//                 </Grid>

//             </form>
//         </Container>
//     </div>
//     );
// };

// export default JobApplicationForm;
