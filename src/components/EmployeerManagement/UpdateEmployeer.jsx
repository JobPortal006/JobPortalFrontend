import React, { useContext, useState } from 'react';
import { Grid, TextField, Button, Typography, Box, MenuItem, Divider } from '@mui/material';
import errorMessages from '../Json/Employerregister.json';
import UserContext from '../Sprint 2/contextFilter';
import axios from 'axios'; // Importing Axios for making HTTP requests


export const UpdateEmployerregister = () => {
    // Extracting employerDetails from the UserContext
    const { employerDetails } = useContext(UserContext);

    // Initializing state for holding updated employer details
    const [updatedDetails, setUpdatedDetails] = useState({
        company_details: {
            company_logo_path: employerDetails.company_details.company_logo_path || '',
            company_name: employerDetails.company_details.company_name || '',
            company_description: employerDetails.company_details.company_description || '',
            company_industry: employerDetails.company_details.company_industry || '',
            company_website_link: employerDetails.company_details.company_website_link || '',
            no_of_employees: employerDetails.company_details.no_of_employees || ''
        },
        contact_information: {
            contact_person_name: employerDetails.company_details.contact_person_name || '',
            contact_person_position: employerDetails.company_details.contact_person_position || '',
            email: employerDetails.Signup.email || '',
            mobile_number: employerDetails.Signup.mobile_number || ''
        },
        company_address: {
            address_type: employerDetails.company_address.address_type || '',
            city: employerDetails.company_address.city || '',
            country: employerDetails.company_address.country || '',
            pincode: employerDetails.company_address.pincode || '',
            state: employerDetails.company_address.state || '',
            street: employerDetails.company_address.street || ''
        }
    });

    
    // Constructing the complete URL for the company logo
    const companylogo_link =  updatedDetails.company_details.company_logo_path;
    
    const companyLogo = `https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${companylogo_link}`

    // console.log(companyLogo,"----------logoc")


      // Function to handle changes in input fields
    const handleChange = (event, section) => {
        const { name, value } = event.target;
        setUpdatedDetails(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [name]: value
            }
        }));
    };


     // Function to handle changes in the company logo
    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        setUpdatedDetails(prevState => ({
            ...prevState,
            company_details: {
                ...prevState.company_details,
                company_logo_path: file
            }
        }));
    };

       // Function to clear the selected company logo
    const handleClearLogo = () => {
        setUpdatedDetails(prevState => ({
            ...prevState,
            company_details: {
                ...prevState.company_details,
                company_logo_path: ""
            }
        }));
    };

    // Function to handle updating employer details
    const handleUpdate = () => {
        // Create a new FormData object
        const formData = new FormData();
    
        // Append updated employer details to FormData
        formData.append('contact_person_name', updatedDetails.contact_information.contact_person_name);
        formData.append('contact_person_position', updatedDetails.contact_information.contact_person_position);
        formData.append('email', updatedDetails.contact_information.email);
        formData.append('mobile_number', updatedDetails.contact_information.mobile_number);
        formData.append('address_type', updatedDetails.company_address.address_type);
        formData.append('city', updatedDetails.company_address.city);
        formData.append('country', updatedDetails.company_address.country);
        formData.append('pincode', updatedDetails.company_address.pincode);
        formData.append('state', updatedDetails.company_address.state);
        formData.append('street', updatedDetails.company_address.street);
        formData.append('company_name', updatedDetails.company_details.company_name);
        formData.append('company_industry', updatedDetails.company_details.company_industry);
        formData.append('company_description', updatedDetails.company_details.company_description);
        formData.append('no_of_employees', updatedDetails.company_details.no_of_employees);
        formData.append('company_website_link', updatedDetails.company_details.company_website_link);
        formData.append('company_logo_path', updatedDetails.company_details.company_logo_path);
    
    //     const file = updatedDetails.company_details.company_logo_path;
    // if (file instanceof File) {
    //     formData.append('company_logo_path', file);
    // }
            
        // Send FormData with Axios
        axios.post('http://192.168.1.44:8000/update_employeer_details/', formData)
            .then(response => {
                console.log('Updated Details:', response.data);
            })
            .catch(error => {
                console.error('Error updating details:', error.message);
            });
    };
    

    return (
        <>
            
            <Grid container spacing={5}  backgroundColor= '#5C6BC0'>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        
                            <form>
                                <Grid container spacing={2} justifyContent="center">
                                <Box sx={{ backgroundColor: '#E8EAF6', padding: '25px', marginBottom: '20px', marginTop:'30px' ,width: '100%',marginLeft:'40px',borderRadius:'2px' }}>
                                <Typography variant="h4"
                                        color="#1A237E" 
                                        fontWeight="bold" textTransform="uppercase" textAlign="center" align="center" style={{ padding: '10px' }}>Profile</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Divider sx={{ marginY: 3,bgcolor: '#3F51B5',borderWidth: '1px' }} />
                                        <Typography variant="h6"
                                        color="#1A237E" fontSize="25px"
                                        fontWeight="bold" textTransform="uppercase" textAlign="center">Company details</Typography>
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <label htmlFor="upload-company-logo">
                                            <Button component="span" variant="contained" color="primary">
                                                Upload Logo
                                            </Button>
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-company-logo"
                                            name="company_logo_path"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleLogoChange}
                                        />
                                        {companylogo_link  && updatedDetails.company_details.company_logo_path && (
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px',marginLeft:'90px' }}> 
                                                {/* <div style={{ flex: '1' }}> */}
                                                    <img  src= {companyLogo || companylogo_link}
                                                        alt="Company Logo" 
                                                        style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        borderRadius: '50%',
                                                        border: '1px solid #ccc',
                                                        marginRight:'20px'   
                                                    }} />
                                                    {/* {!companylogo_link && updatedDetails.company_details.company_logo_path &&(
                                                        <div>
                                                            <img src= {updatedDetails.company_details.company_logo_path}
                                                            alt="Profile Picture"/>
                                                            </div>
                                                    )} */}
                                                {/* </div> */}
                                                <div>
                                                    <Button variant="outlined" color="secondary"  onClick={handleClearLogo}>Clear</Button>
                                                </div>
                                            </div>
                                        )}
                                        
                                        

                                    </Grid>

                             

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.companyNameLabel}
                                            name="company_name"
                                            value={updatedDetails.company_details.company_name}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label={errorMessages.mainFileStrings.industryTypeLabel}
                                            name="company_industry"
                                            value={updatedDetails.company_details.company_industry}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                        >
                                            <MenuItem value="">Select Industry Type</MenuItem>
                                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                                            <MenuItem value="Finance">Finance</MenuItem>
                                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                                            <MenuItem value="Education">Education</MenuItem>
                                            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            label={errorMessages.mainFileStrings.companyDescriptionLabel}
                                            name="company_description"
                                            value={updatedDetails.company_details.company_description}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.numberOfEmployeesLabel}
                                            type="number"
                                            name="no_of_employees"
                                            value={updatedDetails.company_details.no_of_employees}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.companyWebsiteLinkLabel}
                                            type="url"
                                            name="company_website_link"
                                            value={updatedDetails.company_details.company_website_link}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                        />
                                    </Grid>
                                    </Grid>
                                    {/* </Box> */}
                                    
                                    {/* <Box sx={{ background: 'rgb(245, 245, 245)', padding: '20px', marginBottom: '20px', width: '100%',marginLeft:'40px',borderRadius:'20px' }}> */}
                                    <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                    <Divider sx={{ marginY: 3,bgcolor: '#3F51B5',borderWidth: '1px' }} />
                                        <Typography variant="h6"
                                        color="#1A237E" fontSize="25px"
                                        fontWeight="bold" textTransform="uppercase" textAlign="center" marginTop="20px">Contact information</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.contactPersonNameLabel}
                                            name="contact_person_name"
                                            value={updatedDetails.contact_information.contact_person_name}
                                            onChange={(event) => handleChange(event, 'contact_information')}
                                            
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.contactPersonPositionLabel}
                                            name="contact_person_position"
                                            value={updatedDetails.contact_information.contact_person_position}
                                            onChange={(event) => handleChange(event, 'contact_information')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.emailLabel}
                                            name="email"
                                            value={updatedDetails.contact_information.email} // Updated value prop
                                            onChange={(event) => handleChange(event, 'contact_information')} // Updated section parameter
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.mobileNumberLabel}
                                            name="mobile_number"
                                            value={updatedDetails.contact_information.mobile_number} // Updated value prop
                                            onChange={(event) => handleChange(event, 'contact_information')} // Updated section parameter
                                        />
                                    </Grid>
                                    </Grid>
                                    {/* </Box> */}
                                    
                                    {/* <Box sx={{ background: 'rgb(245, 245, 245)', padding: '20px', marginBottom: '20px', width: '100%',marginLeft:'40px',borderRadius:'20px'  }}> */}
                                    <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                    <Divider sx={{ marginY: 3, bgcolor: '#3F51B5',borderWidth: '1px' }} />
                                        <Typography variant="h6"
                                        color="#1A237E" fontSize="25px"
                                        fontWeight="bold" textTransform="uppercase" textAlign="center" marginTop="20px">Company Address</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.streetLabel}
                                            name="street"
                                            value={updatedDetails.company_address.street}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.cityLabel}
                                            name="city"
                                            value={updatedDetails.company_address.city}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.stateLabel}
                                            name="state"
                                            value={updatedDetails.company_address.state}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.countryLabel}
                                            name="country"
                                            value={updatedDetails.company_address.country}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.pincodeLabel}
                                            name="pincode"
                                            value={updatedDetails.company_address.pincode}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label={errorMessages.mainFileStrings.addressTypeLabel}
                                            name="address_type"
                                            value={updatedDetails.company_address.address_type}
                                            onChange={(event) => handleChange(event, 'company_address')}
                                        >
                                            <MenuItem value="Permanent">Permanent</MenuItem>
                                            <MenuItem value="Current">Current</MenuItem>
                                        </TextField>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                                    </Grid>
                                    </Grid>
                                    </Box>
                                </Grid>
                            </form>
                        
                    </Grid>
                    {/* Remaining grid item */}
                </Grid>
                </Grid>
        </>
    );
};

