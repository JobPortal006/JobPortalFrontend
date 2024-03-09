import React, { useState} from 'react';
import { Grid, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { validateCompanyDetails, validateCompanyAddress, validateContactInformation } from '../validation/Employervalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Importing error messages from JSON file
import errorMessages from '../Json/Employerregister.json'; 
import BASE_URL from '../CommonAPI';

// import UserContext from '../Sprint 2/contextFilter';
// import { UpdateEmployerregister } from './UpdateEmployeer';

// Defining a functional component named Employerregister
export const Employerregister = () => {
 
  // const { employeeForm, setEmployeeForm } = useContext(UserContext);
  // State variables for company details, address, contact information, and errors
  const [company_details, setcompany_details] = useState({
    company_logo: null,
    company_name: '',
    company_industry: '',
    company_description: '',
    no_of_employees: '',
    company_website_link: ''
  });

  const [company_address, setcompany_address] = useState({       
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    address_type: ''
  });

  const [contact_information, setcontact_information] = useState({
    contact_person_name: '',
    contact_person_position: '',
    email: '',
    mobile_number: ''
  });

  const [errors, setErrors] = useState({
    company_details: {},
    company_address: {},
    contact_information: {}
  });

  

    // Event handler for input changes in company details section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcompany_details({
      ...company_details,
      [name]: value
    });
    // Clear error message when input changes
    setErrors({
      ...errors,
      company_details: {
        ...errors.company_details,
        [name]: ''
      }
    });
  };
  
    // Event handler for changing company logo
  const handleLogoChange = (e) => {
  const logo = e.target.files[0];
  if (logo && logo.size <= 2 * 1024 * 1024) { // 2MB limit
    setcompany_details({
      ...company_details,
      company_logo: logo
    });
    // Clear error message when logo changes
    setErrors({
      ...errors,
      company_details: {
        ...errors.company_details,
        company_logo: ''
      }
    });
  } else {
    setErrors({
      ...errors,
      company_details: {
        ...errors.company_details,
        company_logo: errorMessages.errorMessages.companyDetails.company_logo.sizeLimit
      }
    });
  }
};


    // Event handler for removing company logo
  const handleRemoveLogo = () => {
    setcompany_details({
      ...company_details,
      company_logo: null
    });
  };

  // Event handler for address changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setcompany_address({
      ...company_address,
      [name]: value
    });
    // Clear error message when input changes
    setErrors({
      ...errors,
      company_address: {
        ...errors.company_address,
        [name]: ''
      }
    });
  };

  // Event handler for contact information changes
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setcontact_information({
      ...contact_information,
      [name]: value
    });
    // Clear error message when input changes
    setErrors({
      ...errors,
      contact_information: {
        ...errors.contact_information,
        [name]: ''
      }
    });
  };
  
  // const {employeeForm,setEmployeeForm} = useContext(UserContext);

  // console.log(employeeForm,"<======employeeForm");
   // Function to handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate company details, company address, and contact information using validation functions
  //   const companyDetailsErrors = validateCompanyDetails(company_details);
  //   const companyAddressErrors = validateCompanyAddress(company_address);
  //   const contactInfoErrors = validateContactInformation(contact_information);

  //   // Set errors state with the validation results for each section
  //   setErrors({
  //     company_details: companyDetailsErrors,
  //     company_address: companyAddressErrors,
  //     contact_information: contactInfoErrors
  //   });

  //   // If there are no validation errors in any section, proceed with form submission
  //   if (Object.keys(companyDetailsErrors).length === 0 && 
  //     Object.keys(companyAddressErrors).length === 0 && 
  //     Object.keys(contactInfoErrors).length === 0) {

  //   try {
  //     const formData = new FormData(); // Create a new FormData object to store form data
      
  //     // 
     

  //     // Append company details to formData, excluding the company_logo field
  //     Object.keys(company_details).forEach((key) => {
  //       if (key !== 'company_logo') {
  //         formData.append(key, company_details[key]);
  //       }
  //     });

  //       // Append company address
  //     Object.keys(company_address).forEach((key) => {
  //       formData.append(key, company_address[key]);
  //     });

  //     // Append contact information to formData, prefixing mobile_number with '+91'
  //     Object.keys(contact_information).forEach((key) => {
  //       if (key === 'mobile_number') {
  //         formData.append(key, '+91' + contact_information[key]);
  //       } else {
  //         formData.append(key, contact_information[key]);
  //       }
  //     });

  //     // Append company logo as binary data to formData
  //     formData.append('company_logo', company_details.company_logo);
      

  //     // Define headers
  //     const headers = {
  //       'Content-Type': 'multipart/form-data',
  //       'Accept': 'application/json',
  //       'Origin': 'http://192.168.1.39:8000/employerRegister/'
  //     };

  //     // Define API URL
  //     const apiUrl = 'http://192.168.1.39:8000/employerRegister/';

  //     // Send a POST request to the API endpoint with form data and headers
  //     const response = await axios.post(apiUrl, formData, { headers });

  //     // Check if response data contains a message, otherwise set a default message
  //     const message = response.data.message || 'Registration successful';
  //     if (response.data.alreadyRegistered) {
  //       toast.error('You have already registered.', { position: toast.POSITION.TOP_CENTER });
  //     } else {
  //       // If not already registered, show a success toast
  //       toast.success(message, { position: toast.POSITION.TOP_CENTER });
  //     }
  //     // Display an alert with the response message
  //     // alert(message);

  //     const FormdataAll =  {
  //       company_details,
  //       company_address,
  //       contact_information
  //     }
  //     setEmployeeForm(FormdataAll);

  //     console.log(response.data); // Log response data
  //     console.log('Form Data:', FormdataAll);
  //   } catch (error) {
  //     console.error('Error:', error); // Log any errors
  //     // Display error message
  //     // alert('An error occurred while processing your request. Please try again later.');
  //     if (error.response && error.response.status === 500) {
  //       // Display error message for internal server error
  //       toast.error('Internal server error. Please try again later.', { position: toast.POSITION.TOP_CENTER });
  //     } else {
  //       // Display generic error message for other errors
  //       toast.error('An error occurred while processing your request. Please try again later.', { position: toast.POSITION.TOP_CENTER });
  //     }
  //   }}

  //   // return <UpdateEmployerregister form={employeeForm} />
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyDetailsErrors = validateCompanyDetails(company_details);
    const companyAddressErrors = validateCompanyAddress(company_address);
    const contactInfoErrors = validateContactInformation(contact_information);

    setErrors({
      company_details: companyDetailsErrors,
      company_address: companyAddressErrors,
      contact_information: contactInfoErrors
    });

    if (Object.keys(companyDetailsErrors).length === 0 && 
      Object.keys(companyAddressErrors).length === 0 && 
      Object.keys(contactInfoErrors).length === 0) {

      try {
        const formData = new FormData();

        Object.keys(company_details).forEach((key) => {
          if (key !== 'company_logo') {
            formData.append(key, company_details[key]);
          }
        });

        Object.keys(company_address).forEach((key) => {
          formData.append(key, company_address[key]);
        });

        Object.keys(contact_information).forEach((key) => {
          if (key === 'mobile_number') {
            formData.append(key, '+91' + contact_information[key]);
          } else {
            formData.append(key, contact_information[key]);
          }
        });

        formData.append('company_logo', company_details.company_logo);

        const headers = {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Origin': `${BASE_URL}/employerRegister/`
        };

        const apiUrl = `${BASE_URL}/employerRegister/`;

        const response = await axios.post(apiUrl, formData, { headers });

        const message = response.data.message || 'Registration successful';
        if (response.data.alreadyRegistered) {
          toast.error('You have already registered.', { position: toast.POSITION.TOP_CENTER });
        } else {
          toast.success(message, { position: toast.POSITION.TOP_CENTER });
        }

        const FormdataAll =  {
          company_details,
          company_address,
          contact_information
        }
        // setEmployeeForm(FormdataAll);
        console.log(FormdataAll,"--------------hh");
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 500) {
          toast.error('Internal server error. Please try again later.', { position: toast.POSITION.TOP_CENTER });
        } else {
          toast.error('An error occurred while processing your request. Please try again later.', { position: toast.POSITION.TOP_CENTER });
        }
      }
    }

    //  return <UpdateEmployerregister form={employeeForm} />
  };
  
  // // Return UpdateEmployerregister component with form data passed as props
  // return <UpdateEmployerregister form={employeeForm} />;
  

  

  return (
    <>
      <Box sx={{
        // background: 'rgb(9,91,255)',
        // background: 'radial-gradient(circle, rgba(9,91,255,1) 0%, rgba(255,174,103,1) 100%)',
        minHeight: '100vh',
        padding: '30px',
        backgroundColor: '#7986CB', // Add indigo color background
      }}>
        <ToastContainer />
      <Grid item xs={12}>
         <Typography variant="h3" align="center"  style={{padding:'50px',marginTop:'30px',color:'#E8EAF6'}}
         >{errorMessages.mainFileStrings.employerRegistrationTitle}</Typography>
      </Grid>

      <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6}>
      <Box
        sx={{
          boxShadow: 6,
          p: 3,
          borderRadius: 4,
          maxWidth: 700,
          backgroundColor: 'white',
          marginBottom: 4,
          minHeight: '600px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            
            <Grid item xs={12}>
              <Typography variant="h6"
               color="#1A237E" fontSize="25px"
               fontWeight="bold" textTransform="uppercase" textAlign="center">Company Information</Typography>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="upload-company-logo">
                <Button component="span" variant="contained" color="primary">
                {errorMessages.mainFileStrings.uploadCompanyLogoLabel}
                </Button>
              </label>
              <input
                type="file"
                id="upload-company-logo"
                name="company_logo"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleLogoChange}
              />
              {company_details.company_logo && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={URL.createObjectURL(company_details.company_logo)}
                    alt="Company Logo"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%' ,marginTop:'20px',marginRight:'10px'}}
                  />
                  <Button variant="contained" color="error" onClick={handleRemoveLogo} style={{ width: '100px', height: '40px',marginTop:'40px' }}>{errorMessages.mainFileStrings.removeButtonLabel}</Button>
                </div>
              )}
                {errors.company_details.company_logo && (
                  <Typography variant="body2" color="error">
                    {errors.company_details.company_logo}
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.companyNameLabel}
                name="company_name"
                value={company_details.company_name}
                onChange={handleInputChange}
                error={Boolean(errors.company_details.company_name)}
                helperText={errors.company_details.company_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={errorMessages.mainFileStrings.industryTypeLabel}
                name="company_industry"
                value={company_details.company_industry}
                onChange={handleInputChange}
                error={Boolean(errors.company_details.company_industry)}
                helperText={errors.company_details.company_industry}
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
                value={company_details.company_description}
                onChange={handleInputChange}
                error={Boolean(errors.company_details.company_description)}
                helperText={errors.company_details.company_description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.numberOfEmployeesLabel}
                name="no_of_employees"
                type="number"
                value={company_details.no_of_employees}
                onChange={handleInputChange}
                error={Boolean(errors.company_details.no_of_employees)}
                helperText={errors.company_details.no_of_employees}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField  
                fullWidth
                label={errorMessages.mainFileStrings.companyWebsiteLinkLabel}
                name="company_website_link"
                type="url"
                value={company_details.company_website_link}
                onChange={handleInputChange}
                error={Boolean(errors.company_details.company_website_link)}
                helperText={errors.company_details.company_website_link}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Box
        sx={{
          boxShadow: 6,
          p: 3,
          borderRadius: 4,
          maxWidth: 700,
          margin: '0 auto',
          backgroundColor: 'white',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h6"
               color="#1A237E" fontSize="25px"
               fontWeight="bold" textTransform="uppercase" textAlign="center">{errorMessages.mainFileStrings.contactInformationTitle}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.contactPersonNameLabel}
                name="contact_person_name"
                value={contact_information.contact_person_name}
                onChange={handleContactChange}
                error={Boolean(errors.contact_information.contact_person_name)}
                helperText={errors.contact_information.contact_person_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.contactPersonPositionLabel}
                name="contact_person_position"
                value={contact_information.contact_person_position}
                onChange={handleContactChange}
                error={Boolean(errors.contact_information.contact_person_position)}
                helperText={errors.contact_information.contact_person_position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.emailLabel}
                name="email"
                value={contact_information.email}
                onChange={handleContactChange}
                error={Boolean(errors.contact_information.email)}
                helperText={errors.contact_information.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.mobileNumberLabel}
                name="mobile_number"
                value={contact_information.mobile_number}
                onChange={handleContactChange}
                error={Boolean(errors.contact_information.mobile_number)}
                helperText={errors.contact_information.mobile_number}
              />
            </Grid>
            
          </Grid>
        </form>
      </Box>
      <Box
        sx={{
          boxShadow: 6,
          p: 3,
          borderRadius: 4,
          maxWidth: 700,
          margin: '0 auto',
          backgroundColor: 'white',
          marginBottom: 2.5,
          marginTop:'20px'
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h6"
               color="#1A237E" fontSize="25px"
               fontWeight="bold" textTransform="uppercase" textAlign="center">Company Address</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.streetLabel}
                name="street"
                value={company_address.street}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.street)}
                helperText={errors.company_address.street}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.cityLabel}
                name="city"
                value={company_address.city}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.city)}
                helperText={errors.company_address.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.stateLabel}
                name="state"
                value={company_address.state}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.state)}
                helperText={errors.company_address.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.countryLabel}
                name="country"
                value={company_address.country}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.country)}
                helperText={errors.company_address.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={errorMessages.mainFileStrings.pincodeLabel}
                name="pincode"
                value={company_address.pincode}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.pincode)}
                helperText={errors.company_address.pincode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={errorMessages.mainFileStrings.addressTypeLabel}
                name="address_type"
                value={company_address.address_type}
                onChange={handleAddressChange}
                error={Boolean(errors.company_address.address_type)}
                helperText={errors.company_address.address_type}
              >
                <MenuItem value="Permanent">Permanent</MenuItem>
                <MenuItem value="Current">Current</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">{errorMessages.mainFileStrings.submitButtonLabel}</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      
      </Grid>
      </Grid>
      </Box>
      {/* {employeeForm && <UpdateEmployerregister form={employeeForm} />} */}

    </>
  );
};