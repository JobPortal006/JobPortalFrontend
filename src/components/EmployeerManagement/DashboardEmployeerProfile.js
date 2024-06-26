import React, { useContext, useState,useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box, MenuItem, Divider } from '@mui/material';
import errorMessages from '../Json/Employerregister.json';
import UserContext from '../Sprint 2/contextFilter';
import axios from 'axios'; // Importing Axios for making HTTP requests
import BASE_URL from '../CommonAPI';

export const DashBoardEmployeerProfile = () => {
    // Extracting employerDetails from the UserContext
    const { employerDetails } = useContext(UserContext);
    console.log(employerDetails, 'employerDetails------->');
    
    // State to store employer details fetched from the server
    const [employerDetailsResult, setEmployeerDetailsResult] = useState('');

    // useEffect to fetch employer details when the component mounts
    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('loginToken');
        console.log(token, "=========token"); // Debugging statement to check token
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          };
        fetch(`${BASE_URL}/get_employeer_details/`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then(data => {
          console.log(data, 'get_employeer_details-------');
          setEmployeerDetailsResult(data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
        // Make HTTP POST request to fetch employer details
        // axios.post(`${BASE_URL}/get_employeer_details/`, {
        //     token
        // })
        // .then(response => {
        //     // Set fetched employer details to state
        //     setEmployeerDetailsResult(response.data);
        //     console.log(response.data, 'response.data------->'); // Debugging statement to check response data
        // })
        // .catch(error => {
        //     console.error('Error fetching employer details:', error); // Log error if request fails
        // });
    }, []);

      
  const [updatedDetails, setUpdatedDetails] = useState({
    company_details: {
      company_logo_path: employerDetails?.company_details?.company_logo_path || '',
      company_name: employerDetails?.company_details?.company_name,
      company_description: employerDetails?.company_details?.company_description || '',
      company_industry: employerDetails?.company_details?.company_industry || '',
      company_website_link: employerDetails?.company_details?.company_website_link || '',
      no_of_employees: employerDetails?.company_details?.no_of_employees || ''
    },
    contact_information: {
      contact_person_name: employerDetails?.company_details?.contact_person_name || '',
      contact_person_position: employerDetails?.company_details?.contact_person_position || '',
      email: employerDetails?.Signup?.email || '',
      mobile_number: employerDetails?.Signup?.mobile_number || ''
    },
    company_address: employerDetails?.company_address || []
  });
//   console.log(employerDetailsResult,'employerDetailsResult------');
//   console.log(employerDetailsResult?.company_details.company_name,'employerDetailsResult?.company_details?.company_name');
//   console.log(updatedDetails?.company_details.company_name,'updatedDetails?.company_details?.company_name');
  
    const [isEditing, setIsEditing] = useState(false);

    const [companyDetailsErrors, setCompanyDetailsErrors] = useState({
        company_logo_pathError: '',
        company_nameError: '',
        company_descriptionError: '',
        company_industryError: '',
        company_website_linkError: '',
        no_of_employeesError: ''
    });

    const [contactInformationErrors, setContactInformationErrors] = useState({
        contact_person_nameError: '',
        contact_person_positionError: '',
        emailError: '',
        mobile_numberError: ''
    });

    // Constructing the complete URL for the company logo
    const companylogo_link =  updatedDetails?.company_details?.company_logo_path;
    
    // const companyLogo = `https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${companylogo_link}`

    let logoUrl;
    if (typeof companylogo_link === 'object') {
        // If company_logo_path is a file object (representing a newly uploaded logo)
        logoUrl = URL.createObjectURL(companylogo_link);
    } else {
        // If company_logo_path is a string path (representing an existing logo)
        logoUrl = `https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${companylogo_link}`;
    }

    // console.log(companyLogo,"----------logoc")


    const addAddress = () => {
        setUpdatedDetails(prevState => ({
            ...prevState,
            company_address: [...prevState.company_address, {}]
        }));
    };

    const removeAddress = (index) => {
        setUpdatedDetails(prevState => ({
            ...prevState,
            company_address: prevState.company_address.filter((_, i) => i !== index)
        }));
    };

    const handleChange = (event, section) => {
        const { name, value } = event.target;
        let errorMessage = '';

        // Validate input based on the field name
        if (section === 'company_details') {
            if (name === 'company_logo_path') {
                if (!value) {
                    errorMessage = 'Please upload a company logo.';
                }
            }else if (name === 'company_name') {
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    errorMessage = 'Only alphabets and spaces are allowed.';
                }
            }else if (name === 'company_description') {
                if (!value.trim()) {
                    errorMessage = 'Company description cannot be empty.';
                }
            } else if (name === 'company_website_link') {
                if (!/^https?:\/\/\S+$/.test(value)) {
                    errorMessage = 'Please provide a valid website link.';
                }
            } else if (name === 'no_of_employees') {
                if (!value.trim()) {
                    errorMessage = 'Number of employees cannot be empty.';
                }
            }else if (name === 'company_industry') {
                if (!value) {
                    errorMessage = 'Please select the industry type.';
                }
            }
            setCompanyDetailsErrors(prevErrors => ({
                ...prevErrors,
                [`${name}Error`]: errorMessage
            }));
        } else if (section === 'contact_information') {
            if (name === 'contact_person_name' || name === 'contact_person_position') {
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    errorMessage = 'Only alphabets and spaces are allowed.';
                }
            } else if (name === 'email') {
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    errorMessage = 'Please provide a valid email address.';
                }
            } else if (name === 'mobile_number') {
                if (!/^\+?\d{10,14}$/.test(value)) {
                    errorMessage = 'Please provide a valid mobile number.';
                }
            }
            setContactInformationErrors(prevErrors => ({
                ...prevErrors,
                [`${name}Error`]: errorMessage
            }));
        }

        // Update state with the new value
        setUpdatedDetails(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [name]: value
            }
        }));
    };

    // Function to toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(prevMode => !prevMode);
    };

    
    const handleAddressChange = (event, index, section) => {
        const { name, value } = event.target;
        setUpdatedDetails(prevState => {
            const updatedAddress = [...prevState.company_address]; // Create a copy of the company_address array
            const updatedAddressAtIndex = { ...updatedAddress[index] }; // Create a copy of the address object at the specified index
            updatedAddressAtIndex[name] = value; // Update the specific field in the address object
            updatedAddress[index] = updatedAddressAtIndex; // Update the address object at the specified index in the copied array
            return {
                ...prevState,
                company_address: updatedAddress // Update the company_address array in the state
            };
        });
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

        const companyDetailsValidation = Object.values(companyDetailsErrors).every(error => !error);
        const contactInformationValidation = Object.values(contactInformationErrors).every(error => !error);

        if (companyDetailsValidation && contactInformationValidation) {
        // Create a new FormData object
        const formData = new FormData();
    
       

        formData.append('contact_person_name', updatedDetails.contact_information.contact_person_name);
        formData.append('contact_person_position', updatedDetails.contact_information.contact_person_position);
        formData.append('email', updatedDetails.contact_information.email);
        formData.append('mobile_number', updatedDetails.contact_information.mobile_number);
        formData.append('company_name', updatedDetails.company_details.company_name);
        formData.append('company_industry', updatedDetails.company_details.company_industry);
        formData.append('company_description', updatedDetails.company_details.company_description);
        formData.append('no_of_employees', updatedDetails.company_details.no_of_employees);
        formData.append('company_website_link', updatedDetails.company_details.company_website_link);
        formData.append('company_logo_path', updatedDetails.company_details.company_logo_path);
        formData.append('company_address', JSON.stringify(updatedDetails.company_address));

        const token = localStorage.getItem('loginToken');
        console.log(token,"=========token");

        formData.append('token', token);

            
        // Send FormData with Axios
        axios.post(`${BASE_URL}/update_employeer_details/`, formData)
            .then(response => {
                console.log('Updated Details:', response.data);
                const successMessage = response.data.message;
                // Display alert with success message
                alert(successMessage);
            })
            .catch(error => {
                console.error('Error updating details:', error.message);
            });
        }
    };
    

    return (
        <div>
            <div style={{margin:"0px 50px 50px 250px"}}>
            <Grid spacing={5}  backgroundColor= '#5C6BC0'>
                <Grid  spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        
                            <form>
                                <Grid container spacing={2} justifyContent="center">
                                <Box sx={{ backgroundColor: '#E8EAF6', padding: '25px',borderRadius:'2px' }}>
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
                                                <Button component="span" variant="contained" color="primary"
                                                sx={{
                                                  width:"150px",
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
                                                disabled={!isEditing}>Upload Logo</Button>
                                            </label>
                                            <input type="file" id="upload-company-logo" name="company_logo_path" accept="image/*" style={{ display: 'none' }}  onChange={handleLogoChange} />
                                            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 30px'}}>
                                            <img src={logoUrl} alt="Company Logo" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid #ccc', marginRight: '20px' }} />
                                            </div>
                                            {companyDetailsErrors.company_logo_pathError && (
                                                <Typography variant="body2" color="error" style={{ marginLeft: '30px', marginTop: '10px' }}>{companyDetailsErrors.company_logo_pathError}</Typography>
                                            )}
                                            <div>
                                                <Button variant="outlined" color="secondary" onClick={handleClearLogo}>Clear</Button>
                                            </div>
                                        </Grid>
                             

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.companyNameLabel}
                                            name="company_name"
                                            value={updatedDetails?.company_details?.company_name}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                            error={Boolean(companyDetailsErrors.company_nameError)}
                                            helperText={companyDetailsErrors.company_nameError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            select
                                            fullWidth
                                            label={errorMessages.mainFileStrings.industryTypeLabel}
                                            name="company_industry"
                                            value={updatedDetails?.company_details?.company_industry}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                            error={Boolean(companyDetailsErrors.company_industryError)}
                                            helperText={companyDetailsErrors.company_industryError}
                                            disabled={!isEditing}
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
                                            value={updatedDetails?.company_details?.company_description}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                            error={Boolean(companyDetailsErrors.company_descriptionError)}
                                            helperText={companyDetailsErrors.company_descriptionError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.numberOfEmployeesLabel}
                                            type="number"
                                            name="no_of_employees"
                                            value={updatedDetails?.company_details?.no_of_employees}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                            error={Boolean(companyDetailsErrors.no_of_employeesError)}
                                            helperText={companyDetailsErrors.no_of_employeesError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.companyWebsiteLinkLabel}
                                            type="url"
                                            name="company_website_link"
                                            value={updatedDetails?.company_details?.company_website_link}
                                            onChange={(event) => handleChange(event, 'company_details')}
                                            error={Boolean(companyDetailsErrors.company_website_linkError)}
                                            helperText={companyDetailsErrors.company_website_linkError}
                                            disabled={!isEditing}
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
                                            error={Boolean(contactInformationErrors.contact_person_nameError)}
                                            helperText={contactInformationErrors.contact_person_nameError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.contactPersonPositionLabel}
                                            name="contact_person_position"
                                            value={updatedDetails.contact_information.contact_person_position}
                                            onChange={(event) => handleChange(event, 'contact_information')}
                                            error={Boolean(contactInformationErrors.contact_person_positionError)}
                                            helperText={contactInformationErrors.contact_person_positionError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.emailLabel}
                                            name="email"
                                            value={updatedDetails.contact_information.email} // Updated value prop
                                            onChange={(event) => handleChange(event, 'contact_information')} // Updated section parameter
                                            error={Boolean(contactInformationErrors.emailError)}
                                            helperText={contactInformationErrors.emailError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={errorMessages.mainFileStrings.mobileNumberLabel}
                                            name="mobile_number"
                                            value={updatedDetails.contact_information.mobile_number} // Updated value prop
                                            onChange={(event) => handleChange(event, 'contact_information')} // Updated section parameter
                                            error={Boolean(contactInformationErrors.mobile_numberError)}
                                            helperText={contactInformationErrors.mobile_numberError}
                                            disabled={!isEditing}
                                        />
                                    </Grid>
                                    </Grid>
                                    
                                    {updatedDetails.company_address && updatedDetails.company_address.map((address, index) => (
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={12} >
                                                <Divider sx={{ marginY: 3, bgcolor: '#3F51B5',borderWidth: '1px' }} />
                                                </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h6" color="#1A237E" fontSize="25px" fontWeight="bold" textTransform="uppercase" textAlign="center">Company Address {index > 0 ? index : ''}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.streetLabel}
                                                    name="street"
                                                    value={address.street || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.cityLabel}
                                                    name="city"
                                                    value={address.city || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.stateLabel}
                                                    name="state"
                                                    value={address.state || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.countryLabel}
                                                    name="country"
                                                    value={address.country || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.pincodeLabel}
                                                    name="pincode"
                                                    value={address.pincode || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    select
                                                    fullWidth
                                                    label={errorMessages.mainFileStrings.addressTypeLabel}
                                                    name="address_type"
                                                    value={address.address_type || ''}
                                                    onChange={(event) => handleAddressChange(event, index, 'company_address')}
                                                    disabled={!isEditing}
                                                >
                                                    <MenuItem value="Permanent">Permanent</MenuItem>
                                                    <MenuItem value="Current">Current</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {index > 0 && (
                                                <Grid item xs={12} sm={6}>
                                                    <Button variant="contained" color="secondary" disabled={!isEditing}
                                                    sx={{
                                                      width:"200px",
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
                                                    onClick={() => removeAddress(index)}>Remove Address</Button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    ))}

                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary" disabled={!isEditing} 
                                        sx={{
                                          width:"200px",
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
                                        onClick={addAddress}>Add Address</Button>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary"
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
                                        onClick={toggleEditMode}>
                                            {isEditing ? 'Cancel' : 'Edit'}
                                        </Button>
                                    </Grid>
                                    
                                    {/* Update button */}
                                    {/* <Grid item xs={12} sm={6}>
                                        <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                                    </Grid> */}
                                    {isEditing && (
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                                            </Grid>
                                        )}
                                    </Box>
                                </Grid>
                            </form>
                        
                    </Grid>
                    {/* Remaining grid item */}
                </Grid>
                </Grid>
            </div>
        </div>
    );
};
