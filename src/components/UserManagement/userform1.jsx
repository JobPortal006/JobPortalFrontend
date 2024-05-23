import React, { useState, useRef, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    styled,
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
import BASE_URL from '../CommonAPI';
import "../UserManagement/userform.css";
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaFileUpload } from "react-icons/fa";
import { Paper } from '@mui/material'

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

const UserForm1 = () => {
    const navigate = useNavigate();

    // State for user details
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        // email: '',
        gender: '',
        profile_picture: [],

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
        key_skills: [],
        industry: '',
        department: '',
        // prefered_locations: ''
        prefered_locations: []
    })
console.log(jobPreference,'jobPreference---error');
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
    // const handleExperienceFresherChange = (event) => {
    //     const isExperienced = event.target.checked;
    //     setProfessionalDetails({
    //         isExperienced,
    //         numberOfCompanies: '',
    //         companies: isExperienced ? [{ company_name: '', position: '', startDate: '', endDate: '' }] : [],
    //     });
    //     setProfessionalDetailsExpanded(isExperienced);
    // };

    // State for resume upload
    const [resume, setResume] = useState(null);

    // State for resume accordion expansion
    const [resumeExpanded, setResumeExpanded] = useState(true);

    // State for experience checkbox
    const [experienceOption, setExperienceOption] = useState(''); // Default to 'experienced'

    // Handle resume upload
    const handleResumeChange = (event) => {
      setErrors((prevErrors) => ({
          ...prevErrors,
          resume: '', // Clear the resume error
      }));
  
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
    const [locations, setLocations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    // for user details validations
    const [errors, setErrors] = useState({
        userDetails: {
            first_name: '',
            last_name: '',
            date_of_birth: '',
            // email: '',
        },
        profilePicture: '',
        address: {
          permanent: {
            street: '',
            city: '',
            pincode: '',
            state: '',
            country: '',
        }
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
        },
        jobPreference: {
          key_skills: '',
          industry: '',
          department: '',
          prefered_locations: '',
      },
      resume:''
    });
    // Handle changes in user details fields
    const handleUserDetailsChange = (event) => {
        // Clear previous error messages
        const { name, value } = event.target;

        // Clear previous error messages
        setErrors((prevErrors) => ({
            ...prevErrors,
            userDetails: {
                ...prevErrors.userDetails,
                [name]: ''
            }
        }));

        // Validation logic for first_name and last_name
        if ((name === 'first_name' || name === 'last_name') && /[^A-Za-z]/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userDetails: {
                    ...prevErrors.userDetails,
                    [name]: 'Only alphabets allowed for first name and last name'
                }
            }));
            return;
        }

        // Validation logic for email
        // if (name === 'email' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         userDetails: {
        //             ...prevErrors.userDetails,
        //             [name]: 'Invalid email format'
        //         }
        //     }));
        //     return;
        // }

        // Update userDetails with new input value
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [name]: value
        }));   
    };


    const handleAddressChange = (type, event) => {
      const { name, value } = event.target;

      // Clear previous errors for the specific address type
      setErrors((prevErrors) => ({
          ...prevErrors,
          address: {
              ...prevErrors.address,
              [type]: {
                  ...prevErrors.address[type],
                  [name]: ''
              }
          }
      }));

      // Validation logic for address fields
      if (['street', 'city', 'country', 'state'].includes(name) && /[^A-Za-z]/.test(value)) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              address: {
                  ...prevErrors.address,
                  [type]: {
                      ...prevErrors.address[type],
                      [name]: 'Only alphabets allowed for street, city, country, and state'
                  }
              }
          }));
          return;
      }

      // Validation logic for pincode
      // if (name === 'pincode' && /[^0-9]/.test(value)) {
      //     setErrors((prevErrors) => ({
      //         ...prevErrors,
      //         address: {
      //             ...prevErrors.address,
      //             [type]: {
      //                 ...prevErrors.address[type],
      //                 [name]: 'Invalid pincode (must be 6 digits)'
      //             }
      //         }
      //     }));
      //     return;
      // }

      // Update address with new input value
      setAddress((prevAddress) => ({
          ...prevAddress,
          [type]: {
              ...prevAddress[type],
              [name]: value
          }
      }));
  };

console.log(errors,'errors---------');
  const handleEducationChange = (event) => {
    const { name, value } = event.target;

    // Clear previous error messages
    setErrors((prevErrors) => ({
        ...prevErrors,
        education: {
            ...prevErrors.education,
            [name]: '',
        },
    }));

    let updatedEducation = { ...education };

    // Validation for fields that should only contain alphabets and spaces
    if (['sslc_school_name', 'hsc_school_name', 'college_name', 'department', 'degree', 'pg_college_name',
        'pg_college_department', 'pg_college_degree', 'diploma_college_name', 'diploma_college_department', 'diploma_college_degree'].includes(name)) {
        if (/[^A-Za-z]/.test(value)) {
          
            // Invalid input, set error message
            setErrors((prevErrors) => ({
                ...prevErrors,
                education: {
                    ...prevErrors.education,
                    [name]: 'Only alphabets are allowed',
                },
            }));
            return;
        }
    }

    // Validation for fields that should only contain numbers
    if (['sslc_start_year', 'sslc_end_year', 'hsc_start_year', 'hsc_end_year', 'sslc_percentage', 'hsc_percentage',
        'college_percentage', 'pg_college_percentage', 'diploma_college_percentage', 'college_start_year', 'college_end_year',
        'pg_college_start_year', 'pg_college_end_year', 'diploma_college_start_year', 'diploma_college_end_year'].includes(name)) {
        if (/[^0-9]/.test(value)) {
            // Invalid input, set error message
            setErrors((prevErrors) => ({
                ...prevErrors,
                education: {
                    ...prevErrors.education,
                    [name]: 'Only numbers allowed',
                },
            }));
            return;
        }
    }

    // Update education state with new input value
    updatedEducation = {
        ...updatedEducation,
        [name]: value,
    };

    setEducation(updatedEducation);
};
const handleJobPreference= (event) => {
  const { name, value } = event.target;

  // Clear previous error messages
  setErrors((prevErrors) => ({
      ...prevErrors,
      jobPreference: {
          ...prevErrors.jobPreference,
          [name]: '',
      },
  }));

  let updatedJobPreference = { ...jobPreference };

  // Validation for fields that should only contain alphabets and spaces
  if (['industry','department'].includes(name)) {
      if (/[^A-Za-z]/.test(value)) {
        
          // Invalid input, set error message
          setErrors((prevErrors) => ({
              ...prevErrors,
              jobPreference: {
                  ...prevErrors.jobPreference,
                  [name]: 'Only alphabets are allowed',
              },
          }));
          return;
      }
  }

  // Update education state with new input value
  updatedJobPreference = {
      ...updatedJobPreference,
      [name]: value,
  };

  setJobPreference(updatedJobPreference);
};
  


    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/locations/`);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSkills = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/skills/`);
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
        fetchSkills();
    }, []);

    const handleJobPreferenceChange = (field) => (event, value, reason) => {
        setErrors({
            ...errors,
            jobPreference: {
                ...errors.jobPreference,
                [field]: '',
            },
        });

        let updatedJobPreference = { ...jobPreference };

        if (reason === 'clear') {
            // Clearing the selected value
            updatedJobPreference = {
                ...updatedJobPreference,
                [field]: [],
            };
        } else {
            // Updating the selected value based on the field
            if (field === 'prefered_locations') {
                updatedJobPreference = {
                    ...updatedJobPreference,
                    [field]: value.map(item => item.location || item),
                };
            } else if (field === 'key_skills') {
                updatedJobPreference = {
                    ...updatedJobPreference,
                    [field]: value.map(item => item.skill_set || item),
                };
            }
        }

        setJobPreference(updatedJobPreference);
    };

    // Handle profile picture upload
    
  //   const handleJobPreferenceChange = (field) => (event, value, reason) => {
  //     // Clear previous error messages
  //     setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         jobPreference: {
  //             ...prevErrors.jobPreference,
  //             [field]: '',
  //         },
  //     }));
  
  //     let updatedJobPreference = { ...jobPreference };
  
  //     // Check if the value is defined before using it
  //     const sanitizedValue = value ? value.trim() : '';
  
  //     if (reason === 'clear') {
  //         // Clearing the selected value
  //         updatedJobPreference = {
  //             ...updatedJobPreference,
  //             [field]: [],
  //         };
  //     } else {
  //         // Updating the selected value based on the field
  //         if (field === 'prefered_locations') {
  //             updatedJobPreference = {
  //                 ...updatedJobPreference,
  //                 [field]: sanitizedValue.map(item => item.location || item),
  //             };
  //         } else if (field === 'key_skills') {
  //             updatedJobPreference = {
  //                 ...updatedJobPreference,
  //                 [field]: sanitizedValue.map(item => item.skill_set || item),
  //             };
  //         }
  //     }
  
  //     // Add validation for industry and department fields
  //     if (['industry', 'department'].includes(field)) {
  //         if (/[^A-Za-z\s]/.test(sanitizedValue)) {
  //             // Invalid input, set error message
  //             setErrors((prevErrors) => ({
  //                 ...prevErrors,
  //                 jobPreference: {
  //                     ...prevErrors.jobPreference,
  //                     [field]: 'Only alphabets and spaces are allowed',
  //                 },
  //             }));
  //             return;
  //         }
  //     }
  
  //     setJobPreference(updatedJobPreference);
  // };
  
  

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        setProfilePicture(file);
        setErrors({ ...errors, profilePicture: '' });
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
    const [isLoading, setIsLoading] = useState(false);
    const [radioErrors, setRadioErrors] = useState({
      experienceOption: '',
  });


  

console.log(userDetails,'userDetails----');
const validateForm = () =>{
    let valid = true;
    const newErrors = {
        userDetails: { ...errors.userDetails },
        profilePicture: '',
        address: {
          permanent: { ...errors.address.permanent }
      },
        jobPreference: { ...errors.jobPreference },
        education: { ...errors.education },
        resume: ''
    };

    if (!userDetails.first_name) {
        newErrors.userDetails.first_name = 'First name is required';
        valid = false;
    }
    if (!userDetails.last_name) {
        newErrors.userDetails.last_name = 'Last name is required';
        valid = false;
    }
    if (!userDetails.date_of_birth) {
        newErrors.userDetails.date_of_birth = 'Date of birth is required';
        valid = false;
    }
    if (!userDetails.gender) {
        newErrors.userDetails.gender = 'Gender is required';
        valid = false;
    }
    if (!profilePicture) {
        newErrors.profilePicture = 'Profile picture is required';
        valid = false;
    }
    if (!address.permanent.street) {
      newErrors.address.permanent.street = 'Street is required';
      valid = false;
  }
  if (!address.permanent.city) {
      newErrors.address.permanent.city = 'City is required';
      valid = false;
  }
  if (!address.permanent.pincode) {
      newErrors.address.permanent.pincode = 'Pincode is required';
      valid = false;
  } else if (address.permanent.pincode.length !== 6){
    newErrors.address.permanent.pincode = 'Invalid pincode (must be 6 digits)';
    valid = false;
  }
  if (!address.permanent.state) {
      newErrors.address.permanent.state = 'State is required';
      valid = false;
  }
  if (!address.permanent.country) {
      newErrors.address.permanent.country = 'Country is required';
      valid = false;
  }
  if (!education.sslc_school_name) {
    newErrors.education.sslc_school_name = 'SSLC school name is required';
    valid = false;
    }
    if (!education.sslc_start_year) {
        newErrors.education.sslc_start_year = 'SSLC start year is required';
        valid = false;
    }
    if (!education.sslc_end_year) {
      newErrors.education.sslc_end_year = 'SSLC end year is required';
      valid = false;
    }
    if (!education.sslc_percentage) {
      newErrors.education.sslc_percentage = 'SSLC percentage is required';
      valid = false;
    }
    if (!education.hsc_school_name) {
      newErrors.education.hsc_school_name = 'HSC school name is required';
      valid = false;
    }
    if (!education.hsc_start_year) {
      newErrors.education.hsc_start_year = 'HSC start year is required';
      valid = false;
    }
    if (!education.hsc_end_year) {
    newErrors.education.hsc_end_year = 'HSC end year is required';
    valid = false;
    }
    if (!education.hsc_percentage) {
    newErrors.education.hsc_percentage = 'HSC percentage is required';
    valid = false;
    }

    if (!education.college_name) {
      newErrors.education.college_name = 'College name is required';
      valid = false;
    }
    if (!education.college_start_year) {
      newErrors.education.college_start_year = 'College start year is required';
      valid = false;
    }
    if (!education.college_end_year) {
    newErrors.education.college_end_year = 'College end year is required';
    valid = false;
    }
    if (!education.college_percentage) {
    newErrors.education.college_percentage = 'College percentage is required';
    valid = false;
    }
    if (!education.department) {
      newErrors.education.department = 'College department is required';
      valid = false;
      }
      if (!education.degree) {
      newErrors.education.degree = 'College degree is required';
      valid = false;
      }
      if (!experienceOption) {
        setRadioErrors({ experienceOption: 'Please select professional details' });
        valid = false;
    } else {
        setRadioErrors({ experienceOption: '' }); // Clear error message if selection is made
    }

    if (jobPreference.key_skills.length === 0) {
      newErrors.jobPreference.key_skills = 'Key skills are required';
      valid = false;
  }

  // Validation for job preference industry
  if (!jobPreference.industry) {
    newErrors.jobPreference.industry = 'Industry is required';
    valid = false;
}

  // Validation for job preference department
  if (!jobPreference.department) {
      newErrors.jobPreference.department = 'Department is required';
      valid = false;
  }

  // Validation for job preference preferred locations
  if (jobPreference.prefered_locations.length === 0) {
      newErrors.jobPreference.prefered_locations = 'Preferred locations are required';
      valid = false;
  }
  if (!resume) {
    newErrors.resume = 'Resume is not uploaded';
    valid = false;
}

    setErrors(newErrors);
    return valid;
};
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
      
        // Check if profile picture is uploaded
        // if (!profilePicture) {
        //     alert('Please upload a profile picture.');
        //     return;
        // }
   
        // // Check if resume is uploaded
        // if (!resume) {
        //     alert('Please upload a resume.');
        //     return;
        // }
   
        // Set loading state to true when form is submitted
        setIsLoading(true);
   
        try {
            // Your form submission logic here
   
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
   
            // for sending token
            const Token = localStorage.getItem('loginToken');
   
            // Create a FormData object to send to the backend
            const dataToSend = new FormData();
            dataToSend.append('userDetails', JSON.stringify({
                ...userDetails,
                profile_picture: 'Uploaded',
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
            dataToSend.append('token', Token);
   
            // Log the FormData object
            for (const pair of dataToSend.entries()) {
                console.log(pair[0], pair[1]);
            }
   
            // Make API call
            const response = await axios.post(`${BASE_URL}/userRegister/`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
   
            // Handle the response as needed
            console.log('API Response:', response.data);
   
            // Resetting states
            setUserDetailsExpanded(true);
            setAddressExpanded(true);
            setEducationExpanded(true);
            setProfessionalDetailsExpanded(true);
            setResumeExpanded(true);
            setjobPreferenceExpanded(true);
   
            // Show success message
            alert('Account created successfully!');
            if(response.status){
                window.location.reload();
                navigate('/home');
            }
            
        
        } catch (error) {
            console.error('API Error:', error);
            // Handle error as needed
            alert('Failed to create account. Please try again.');
        } finally {
            // Reset loading state to false after API call is complete
            setIsLoading(false);
        }
    } else{
        alert('The necessary field cannot be left blank.');
        // window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <FormContainer style={{ marginTop: '60px' }}>
            <Typography variant="h6"
                color="#1A237E" fontSize="25px"
                fontWeight="bold" textTransform="uppercase" align="center" gutterBottom>
                {/* {UserFormData[language].UserDetail.one} */}
                Register
            </Typography>
            <select
                value={language}
                onChange={handleLanguageChange}
                style={{
                    border: '2px solid #a2beda', // Border color
                    borderRadius: '10px', // Border radius
                    padding: '8px', // Adjust padding as needed
                    cursor: 'pointer', // Show pointer cursor on hover
                    backgroundColor: '#fff', // Background color
                }}
            >
                <option
                    value="en"
                    style={{
                        backgroundColor: '#E8EAF6', // Background color for the option
                        color: '#1A237E', // Text color for the option
                        borderRadius: '2px', // Border radius for the option
                    }}
                >
                    English
                </option>
                <option
                    value="tamil"
                    style={{
                        backgroundColor: '#E8EAF6', // Background color for the option
                        color: '#1A237E', // Text color for the option
                        borderRadius: '2px', // Border radius for the option
                    }}
                >
                    Tamil
                </option>
            </select>
            <form ref={formRef} onSubmit={handleSubmit} >
                {/* User Details Accordion */}
                <div className='user_details1'>
                    <AccordionWrapper expanded={userDetailsExpanded} onChange={handleUserDetailsExpand} style={{ border: "2px solid #a2beda", borderRadius: "10px", marginTop: "5px" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}>
                            <Typography variant="h4"
                                color="#1A237E" fontSize="22px"
                                fontWeight="bold" textTransform="uppercase">{UserFormData[language].UserDetail.one}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    {/* First Column */}
                                    <TextField
                                        // label={UserFormData[language].UserDetail.two}
                                        label={UserFormData[language].UserDetail.two}
                                        name="first_name"
                                        value={userDetails.first_name}
                                        onChange={handleUserDetailsChange}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px', // Set border radius
                                                '& fieldset': {
                                                    borderColor: '#a2beda', // Set border color
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1A237E', // Set border color on hover
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#1A237E', // Set border color on focus
                                                    borderWidth: '2px' // Set border width
                                                },
                                            },
                                            color: "#1A237E" // Text color
                                        }}
                                        margin="dense"
                                        // required
                                        error={Boolean(errors.first_name) || Boolean(errors.userDetails.first_name)}
                                        helperText={errors.first_name || errors.userDetails.first_name}
                                        className='input-box'
                                    />


                                    <TextField
                                        // label={UserFormData[language].UserDetail.four}
                                        label={UserFormData[language].UserDetail.four}
                                        name="last_name"
                                        value={userDetails.last_name}
                                        onChange={handleUserDetailsChange}
                                        fullWidth
                                        margin="dense"
                                        // required
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px', // Set border radius
                                                '& fieldset': {
                                                    borderColor: '#a2beda', // Set border color
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1A237E', // Set border color on hover
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#1A237E', // Set border color on focus
                                                    borderWidth: '2px' // Set border width
                                                },
                                            },
                                            color: "#1A237E" // Text color
                                        }}
                                        error={Boolean(errors.last_name) || Boolean(errors.userDetails.last_name)}
                                        helperText={errors.last_name || errors.userDetails.last_name}
                                        className='input-box'
                                    />
                                    <TextField
                                        // label= {UserFormData[language].UserDetail.six}

                                        name="date_of_birth"
                                        type='date'
                                        value={userDetails.date_of_birth}
                                        onChange={handleUserDetailsChange}
                                        fullWidth
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '10px', // Set border radius
                                                '& fieldset': {
                                                    borderColor: '#a2beda', // Set border color
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#1A237E', // Set border color on hover
                                                    borderWidth: '2px' // Set border width
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#1A237E', // Set border color on focus
                                                    borderWidth: '2px' // Set border width
                                                },
                                            },
                                            color: "#1A237E" // Text color
                                        }}
                                        margin="dense"
                                        // required
                                        error={Boolean(errors.date_of_birth) || Boolean(errors.userDetails.date_of_birth)}
                                        helperText={errors.date_of_birth || errors.userDetails.date_of_birth}
                                        className='input-box'
                                    // style={{border:"2px solid #1A237E"}}


                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        name="gender"
                                        value={userDetails.gender}
                                        onChange={handleUserDetailsChange}
                                        fullWidth
                                        displayEmpty
                                        margin="dense"
                                        // required
                                        className='user_details_gender input-box' // Merged className attributes
                                        error={Boolean(errors.userDetails.gender)}
                                        sx={{
                                            marginTop: '8px',
                                            marginBottom: "5px",
                                            height: "58px",
                                            borderRadius: "10px",
                                            border: `2px solid ${errors.userDetails.gender ? 'rgb(197, 6, 6)' : '#a2beda'}`, // Conditionally set border color
                                            '&amp;:hover': {
                                                borderColor: errors.userDetails.gender ? 'rgb(197, 6, 6)' : '#1A237E', // Change border color on hover
                                            },
                                            '&amp;:active': {
                                                borderColor: errors.userDetails.gender ? 'rgb(197, 6, 6)' : '#1A237E', // Change border color on active
                                            },
                                            '&amp; .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent !important', // Ensure border color is transparent
                                            },
                                            '&amp; .MuiListItem-root': {
                                                backgroundColor: '#E8EAF6', // Background color for MenuItem
                                                border: "1px solid #1A237E", // Border color for MenuItem
                                                '&amp;:hover': {
                                                    backgroundColor: '#BDBDBD', // Change background color on hover
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem className="menu-item11" style={{ border: "2px solid #a2beda", borderRadius: "7px", margin: "5px" }} value="" disabled>{UserFormData[language].UserDetail.twelve}</MenuItem>
                                        <MenuItem className="menu-item11" style={{ border: "2px solid #a2beda", borderRadius: "7px", margin: "5px", backgroundColor: "white" }} value="male">{UserFormData[language].UserDetail.fourteen}</MenuItem>
                                        <MenuItem className="menu-item11" style={{ border: "2px solid #a2beda", borderRadius: "7px", margin: "5px" }} value="female">{UserFormData[language].UserDetail.sixteen}</MenuItem>
                                        <MenuItem className="menu-item11" style={{ border: "2px solid #a2beda", borderRadius: "7px", margin: "5px" }} value="other">{UserFormData[language].UserDetail.eighteen}</MenuItem>
                                    </Select>
                                    {errors.userDetails.gender &&(
                        <p style={{ color: 'rgb(197, 6, 6)',fontSize:'13px',marginLeft:'10px'}}>{errors.userDetails.gender}</p>
                    )}
                                    <label htmlFor="profile-picture-input" style={{ color: '#1A237E', cursor: 'pointer', marginBottom: '10px', display: 'block' }}>
                                        {UserFormData[language].UserDetail.twenty}
                                    </label>
                                    <div style={{ display: 'flex' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            margin="dense"
                                            id="profile-picture-input"
                                            style={{
                                                display: 'none',
                                            }}
                                        />
                                        <label htmlFor="profile-picture-input">
                                            <IconButton
                                                component="span"
                                                size="small"
                                                sx={{
                                                    // border: '2px solid #a2beda',
                                                    border: `2px solid ${errors.profilePicture ? 'rgb(197, 6, 6)' : '#a2beda'}`,
                                                    borderRadius: '10px',
                                                    padding: '10px',
                                                    '&:hover': {
                                                        borderColor: '#1A237E', // Change border color on hover
                                                    },
                                                    '& svg': {
                                                        fontSize: '50px', // Increase icon size
                                                        color: '#1A237E' // Change icon color
                                                    }
                                                }}
                                            >
                                                <CloudUploadIcon />
                                                {profilePicture && profilePicture.name && (
                                                    <span style={{ marginLeft: '5px' }}>{profilePicture.name}</span>
                                                )}
                                            </IconButton>
                                        </label>
                                        {profilePicture && (
                                            <div style={{ marginLeft: '10px' }}>
                                                <Avatar
                                                    alt="Profile Picture"
                                                    src={URL.createObjectURL(profilePicture)}
                                                    sx={{ width: 100, height: 100,marginLeft:'20px' }}
                                                />
                                                <Button color="secondary"  
                                             style={{
                                              marginTop:'5px',
                                              color:'#1A237E',
                                            border: '2px solid #a2beda',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            fontSize:'12px',
                                            cursor: 'pointer', // Change cursor on hover
                                        }} onClick={handleRemoveProfilePicture}>
                                                    Remove Picture
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    {errors.profilePicture&& (
                        <p style={{ color: 'rgb(197, 6, 6)',fontSize:'13px',marginLeft:'10px',marginTop:'2px' }}>{errors.profilePicture}</p>
                    )}

                                </Grid>
                            </Grid>


                        </AccordionDetails>
                    </AccordionWrapper>
                </div>
                {/* Address Accordion */}
                <AccordionWrapper className='user_details1' expanded={addressExpanded} onChange={handleAddressExpand} style={{ border: "2px solid #a2beda", borderRadius: "10px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}>
                        <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase">Address</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase"> Permanent and current Address:</Typography> */}

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                                {/* First Column */}
                                <TextField
                                    label="Permanent Street"
                                    name="street"
                                    value={address.permanent.street}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.address.permanent && errors.address.permanent.street)}
                                    helperText={errors.address.permanent && errors.address.permanent.street}
                                    className='input-box'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#a2beda',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            }
                                        },
                                        color: "#1A237E"
                                    }}
                                />
                                <TextField
                                    label="Permanent City"
                                    name="city"
                                    value={address.permanent.city}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.address.permanent && errors.address.permanent.city)}
                                    helperText={errors.address.permanent && errors.address.permanent.city}
                                    className='input-box'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#a2beda',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            }
                                        },
                                        color: "#1A237E"
                                    }}
                                />
                               <TextField
                                    label="Permanent Pincode"
                                    name="pincode"
                                    value={address.permanent.pincode}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.address.permanent && errors.address.permanent.pincode)}
                                    helperText={errors.address.permanent && errors.address.permanent.pincode}
                                    className='input-box'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#a2beda',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            }
                                        },
                                        color: "#1A237E"
                                    }}
                                />

                                <TextField
                                    label="Permanent State"
                                    name="state"
                                    value={address.permanent.state}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.address.permanent && errors.address.permanent.state)}
                                    helperText={errors.address.permanent && errors.address.permanent.state}
                                    className='input-box'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#a2beda',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            }
                                        },
                                        color: "#1A237E"
                                    }}
                                />
                               <TextField
                                    label="Permanent Country"
                                    name="country"
                                    value={address.permanent.country}
                                    onChange={(e) => handleAddressChange('permanent', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.address.permanent && errors.address.permanent.country)}
                                    helperText={errors.address.permanent && errors.address.permanent.country}
                                    className='input-box'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#a2beda',
                                                borderWidth: '2px'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E',
                                                borderWidth: '2px'
                                            }
                                        },
                                        color: "#1A237E"
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} >
                                {/* <Typography variant="h6"
                                    color="#a2beda" fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase">Current Address</Typography> */}
                                <TextField
                                    label="Current Street"
                                    name="street"
                                    value={address.current.street}
                                    onChange={(e) => handleAddressChange('current', e)}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.current && errors.current.street)}
                                    helperText={errors.current && errors.current.street}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />

                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </AccordionWrapper>

                {/* Educatiom Accordion */}

                <AccordionWrapper expanded={educationExpanded} onChange={handleEducationExpand} className='education' style={{ border: "2px solid #a2beda", borderRadius: "10px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}> <Typography variant="h6"
                        color="#1A237E" fontSize="25px"
                        fontWeight="bold" textTransform="uppercase">Education details</Typography></AccordionSummary>
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
                                    error={Boolean(errors.education.sslc_school_name)}
                                    helperText={errors.education.sslc_school_name}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="SSLC-start-year"
                                    name="sslc_start_year"
                                    value={education.sslc_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(errors.education.sslc_start_year)}
                                    helperText={errors.education.sslc_start_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />

                                <TextField
                                    label="SSLC-end-year"
                                    name="sslc_end_year"
                                    value={education.sslc_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.sslc_end_year)}
                                    helperText={errors.education.sslc_end_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="SSLC-percentage"
                                    name="sslc_percentage"
                                    value={education.sslc_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.sslc_percentage)}
                                    helperText={errors.education.sslc_percentage}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                    // required
                                    error={Boolean(errors.education.hsc_school_name)}
                                    helperText={errors.education.hsc_school_name}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="HSC-start-year"
                                    name="hsc_start_year"
                                    value={education.hsc_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.hsc_start_year)}
                                    helperText={errors.education.hsc_start_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="HSC-end-year"
                                    name="hsc_end_year"
                                    value={education.hsc_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.hsc_end_year)}
                                    helperText={errors.education.hsc_end_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="HSC-percentage"
                                    name="hsc_percentage"
                                    value={education.hsc_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.hsc_percentage)}
                                    helperText={errors.education.hsc_percentage}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                            </Grid>
                            <Typography sx={{ width: '100%' }} variant="h6"
                                color="#1A237E" fontSize="25px" style={{ marginTop: "15px", backgroundColor: "#a2beda", padding: "15px", borderRadius: "10px", margin: "10px 0 10px 17px", marginBottom: "-10px" }}
                                fontWeight="bold" textTransform="uppercase" >UG Details:</Typography>
                            <Grid item xs={12} sm={6}>
                                {/* Third Column */}
                                <TextField
                                    label="College-name"
                                    name="college_name"
                                    value={education.college_name}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.college_name)}
                                    helperText={errors.education.college_name}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="College-start-year"
                                    name="college_start_year"
                                    value={education.college_start_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.college_start_year)}
                                    helperText={errors.education.college_start_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}

                                />
                                <TextField
                                    label="College-end-year"
                                    name="college_end_year"
                                    value={education.college_end_year}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.college_end_year)}
                                    helperText={errors.education.college_end_year}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="College-percentage"
                                    name="college_percentage"
                                    value={education.college_percentage}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.college_percentage)}
                                    helperText={errors.education.college_percentage}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                {/* Fourth Column */}
                                <TextField
                                    label="Department"
                                    name="department"
                                    value={education.department}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.department)}
                                    helperText={errors.education.department}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
                                />
                                <TextField
                                    label="Degree"
                                    name="degree"
                                    value={education.degree}
                                    onChange={handleEducationChange}
                                    fullWidth
                                    margin="dense"
                                    // required
                                    error={Boolean(errors.education.degree)}
                                    helperText={errors.education.degree}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px', // Set border radius
                                            '& fieldset': {
                                                borderColor: '#a2beda', // Set border color
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1A237E', // Set border color on hover
                                                borderWidth: '2px' // Set border width
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1A237E', // Set border color on focus
                                                borderWidth: '2px' // Set border width
                                            },
                                        },
                                        color: "#1A237E" // Text color
                                    }}
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
                                            error={Boolean(errors.education.pg_college_name)}
                                            helperText={errors.education.pg_college_name}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="PG-College-start-year"
                                            name="pg_college_start_year"
                                            value={education.pg_college_start_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.education.pg_college_start_year)}
                                            helperText={errors.education.pg_college_start_year}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="PG-College-end-year"
                                            name="pg_college_end_year"
                                            value={education.pg_college_end_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.education.pg_college_end_year)}
                                            helperText={errors.education.pg_college_end_year}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="PG-College-percentage"
                                            name="pg_college_percentage"
                                            value={education.pg_college_percentage}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.education.pg_college_percentage)}
                                            helperText={errors.education.pg_college_percentage}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
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

                                            error={Boolean(errors.education.pg_college_department)}
                                            helperText={errors.education.pg_college_department}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="PG-College-degree"
                                            name="pg_college_degree"
                                            value={education.pg_college_degree}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"

                                            error={Boolean(errors.education.pg_college_degree)}
                                            helperText={errors.education.pg_college_degree}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
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
                                            error={Boolean(errors.education.diploma_college_name)}
                                            helperText={errors.education.diploma_college_name}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="Diploma-college-start-year"
                                            name="diploma_college_start_year"
                                            value={education.diploma_college_start_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.education.diploma_college_start_year)}
                                            helperText={errors.education.diploma_college_start_year}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="Diploma-college-end-year"
                                            name="diploma_college_end_year"
                                            value={education.diploma_college_end_year}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.education.diploma_college_end_year)}
                                            helperText={errors.education.diploma_college_end_year}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="Diploma-college-percentage"
                                            name="diploma_college_percentage"
                                            value={education.diploma_college_percentage}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.education.diploma_college_percentage)}
                                            helperText={errors.education.diploma_college_percentage}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
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
                                            error={Boolean(errors.education.diploma_college_department)}
                                            helperText={errors.education.diploma_college_department}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                        <TextField
                                            label="Diploma-college-degree"
                                            name="diploma_college_degree"
                                            value={education.diploma_college_degree}
                                            onChange={handleEducationChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(errors.education.diploma_college_degree)}
                                            helperText={errors.education.diploma_college_degree}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
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
                    style={{ border: "2px solid #a2beda", borderRadius: "10px" }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}>
                        <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase">Professional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                                {/* Experience/Fresher Radio Buttons */}
                                <label className="fresher-label">
                                    <input
                                        type="radio"
                                        name="experienceOption"
                                        value="fresher"
                                        checked={experienceOption === 'fresher'}
                                        onChange={() => {
                                            setExperienceOption('fresher');
                                            setRadioErrors({ experienceOption: '' }); // Clear error message when selection changes
                                        }}
                                        className='fresher'
                                    />
                                    &nbsp; Fresher
                                </label> <br />
                                <label className="experience-label">
                                    <input
                                        type="radio"
                                        name="experienceOption"
                                        value="experienced"
                                        checked={experienceOption === 'experienced'}
                                        onChange={() => {
                                            setExperienceOption('experienced');
                                            setRadioErrors({ experienceOption: '' }); // Clear error message when selection changes
                                        }}
                                        className='experienced'
                                    />
                                    &nbsp;  Experienced
                                </label>
                                {radioErrors.experienceOption && (
                                  <div>
                                      <span className="userform-error-message">{radioErrors.experienceOption}</span>
                                  </div>
                              )}
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
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '10px', // Set border radius
                                                    '& fieldset': {
                                                        borderColor: '#a2beda', // Set border color
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#1A237E', // Set border color on hover
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#1A237E', // Set border color on focus
                                                        borderWidth: '2px' // Set border width
                                                    },
                                                },
                                                color: "#1A237E" // Text color
                                            }}
                                        />
                                    </Grid>

                                    {/* Company Details */}
                                    {Array.from({ length: Number(professionalDetails.numberOfCompanies) || 0 }).map(
                                        (_, index) => (
                                            <Grid item xs={12} key={index}>
                                                <Typography variant="subtitle1" style={{ color: "#1A237E", backgroundColor: "#a2beda", padding: "15px", borderRadius: "10px", marginBottom: "10px" }}>Company {index + 1}</Typography>
                                                <TextField
                                                    label="Company Name"
                                                    name="company_name"
                                                    value={professionalDetails.companies[index]?.company_name || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '10px', // Set border radius
                                                            '& fieldset': {
                                                                borderColor: '#a2beda', // Set border color
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#1A237E', // Set border color on hover
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1A237E', // Set border color on focus
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                        },
                                                        color: "#1A237E" // Text color
                                                    }}
                                                />
                                                <TextField
                                                    label="Job Role"
                                                    name="job_role"
                                                    value={professionalDetails.companies[index]?.job_role || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '10px', // Set border radius
                                                            '& fieldset': {
                                                                borderColor: '#a2beda', // Set border color
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#1A237E', // Set border color on hover
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1A237E', // Set border color on focus
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                        },
                                                        color: "#1A237E" // Text color
                                                    }}
                                                />
                                                <TextField
                                                    label="Skills"
                                                    name="skills"
                                                    value={professionalDetails.companies[index]?.skills || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '10px', // Set border radius
                                                            '& fieldset': {
                                                                borderColor: '#a2beda', // Set border color
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#1A237E', // Set border color on hover
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1A237E', // Set border color on focus
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                        },
                                                        color: "#1A237E" // Text color
                                                    }}
                                                />
                                                <TextField
                                                    label="Years of experience"
                                                    name="years_of_experience"
                                                    value={professionalDetails.companies[index]?.years_of_experience || ''}
                                                    onChange={(e) => handleProfessionalDetailsChange(e, index)}
                                                    fullWidth
                                                    margin="dense"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '10px', // Set border radius
                                                            '& fieldset': {
                                                                borderColor: '#a2beda', // Set border color
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#1A237E', // Set border color on hover
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1A237E', // Set border color on focus
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                        },
                                                        color: "#1A237E" // Text color
                                                    }}
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
                <AccordionWrapper expanded={jobPreferenceExpanded} onChange={handlejobPreferenceExpand} className='job_preference' style={{ border: "2px solid #a2beda", borderRadius: "10px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}> <Typography variant="h6"
                        color="#1A237E" fontSize="25px"
                        fontWeight="bold" textTransform="uppercase">Job Preference</Typography></AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                    multiple
                    options={skills}
                    getOptionLabel={(option) => option ? option.skill_set : ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Key Skills"
                            margin="dense"
                            error={Boolean(errors.jobPreference.key_skills)}
                            helperText={errors.jobPreference.key_skills}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px',
                                    '& fieldset': {
                                        borderColor: '#a2beda',
                                        borderWidth: '2px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1A237E',
                                        borderWidth: '2px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1A237E',
                                        borderWidth: '2px'
                                    },
                                },
                                color: "#1A237E"
                            }}
                        />
                    )}
                    value={jobPreference.key_skills.map(skill => ({ skill_set: skill }))}
                    onChange={handleJobPreferenceChange('key_skills')}
                    freeSolo
                    filterOptions={(options, params) => {
                        const filtered = options.filter(
                            (option) =>
                                option.skill_set.toLowerCase().includes(params.inputValue.toLowerCase())
                        );
                        if (params.inputValue !== '' && !filtered.some(option => option.skill_set.toLowerCase() === params.inputValue.toLowerCase())) {
                            filtered.push({ skill_set: params.inputValue });
                        }
                        return filtered;
                    }}
                    PaperComponent={({ children }) => (
                        <Paper
                            sx={{
                                backgroundColor: '#E8EAF6',
                                border: '1px solid #1A237E',
                                borderRadius: '10px',
                            }}
                        >
                            {children}
                        </Paper>
                    )}
                />
           <TextField
    label="Industry"
    name="industry"
    value={jobPreference.industry}
    // onChange={(event) => setJobPreference({ ...jobPreference, industry: event.target.value })}
    onChange={handleJobPreference}
    fullWidth
    margin="dense"
    error={Boolean(errors.jobPreference.industry)} // This line checks if there's an error for the industry field
    helperText={errors.jobPreference.industry} // This line displays the error message if there's an error
    sx={{
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
                borderColor: '#a2beda',
                borderWidth: '2px'
            },
            '&:hover fieldset': {
                borderColor: '#1A237E',
                borderWidth: '2px'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1A237E',
                borderWidth: '2px'
            },
        },
        color: "#1A237E"
    }}
/>

            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Department"
                    name="department"
                    value={jobPreference.department}
                    // onChange={(event) => setJobPreference({ ...jobPreference, department: event.target.value })}
                    onChange={handleJobPreference}
                    fullWidth
                    margin="dense"
                    error={Boolean(errors.jobPreference.department)}
                    helperText={errors.jobPreference.department}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            '& fieldset': {
                                borderColor: '#a2beda',
                                borderWidth: '2px'
                            },
                            '&:hover fieldset': {
                                borderColor: '#1A237E',
                                borderWidth: '2px'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1A237E',
                                borderWidth: '2px'
                            },
                        },
                        color: "#1A237E"
                    }}
                />
                                <div>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <Autocomplete
                                            multiple
                                            options={locations}
                                            getOptionLabel={(option) => option ? option.location : ''}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Preferred Locations"
                                                    margin="dense"
                                                    error={Boolean(errors.jobPreference.prefered_locations)}
                                                    helperText={errors.jobPreference.prefered_locations}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '10px', // Set border radius
                                                            '& fieldset': {
                                                                borderColor: '#a2beda', // Set border color
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: '#1A237E', // Set border color on hover
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1A237E', // Set border color on focus
                                                                borderWidth: '2px' // Set border width
                                                            },
                                                        },
                                                        color: "#1A237E" // Text color
                                                    }}
                                                />
                                            )}
                                            value={jobPreference.prefered_locations.map(location => ({ location }))} // Convert array of location names to array of objects
                                            onChange={handleJobPreferenceChange('prefered_locations')}
                                            freeSolo // Allow typing new values
                                            filterOptions={(options, params) => {
                                                const filtered = options.filter(
                                                    (option) =>
                                                        option.location.toLowerCase().includes(params.inputValue.toLowerCase())
                                                );
                                                if (params.inputValue !== '' && !filtered.some(option => option.location.toLowerCase() === params.inputValue.toLowerCase())) {
                                                    filtered.push({ location: params.inputValue }); // Add typed value if not present in options
                                                }
                                                return filtered;
                                            }}
                                            PaperComponent={({ children }) => (
                                                <Paper
                                                    sx={{
                                                        backgroundColor: '#E8EAF6', // Background color
                                                        border: '1px solid #1A237E', // Border color
                                                        borderRadius: '10px', // Border radius
                                                        // '&:hover': {
                                                        //     backgroundColor: '#BDBDBD', // Mouse-over background color
                                                        // },
                                                    }}
                                                >
                                                    {children}
                                                </Paper>
                                            )}
                                        />
                                    )}
                                </div>
                            </Grid>
                        </Grid>

                    </AccordionDetails>
                </AccordionWrapper>

                {/* Resume Accordion */}
                <ResumeAccordionWrapper expanded={resumeExpanded} onChange={handleResumeExpand} style={{ border: "2px solid #a2beda", borderRadius: "10px" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: "#a2beda" }}>
                        <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase">Resume</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                       
                        <label htmlFor="resume-input" style={{ color: '#1A237E', cursor: 'pointer', display: 'block', marginBottom: "10px" }}>
                            Upload Resume:
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                margin="dense"
                                id="resume-input"
                                style={{
                                    display: 'none',
                                }}
                            />
                            <label htmlFor="resume-input">
                                <IconButton
                                    component="span"
                                    size="small"
                                  
                                    sx={{
                                      padding:'10px',
                                      borderRadius: "10px",
                                      border: `2px solid ${errors.resume ? 'rgb(197, 6, 6)' : '#a2beda'}`, // Conditionally set border color
                                      '&amp;:hover': {
                                          borderColor: errors.resume ? 'rgb(197, 6, 6)' : '#1A237E', // Change border color on hover
                                      },
                                      '&amp;:active': {
                                          borderColor: errors.resume ? 'rgb(197, 6, 6)' : '#1A237E', // Change border color on active
                                      },
                                      '&amp; .MuiOutlinedInput-notchedOutline': {
                                          borderColor: 'transparent !important', // Ensure border color is transparent
                                      },
                                      '&amp; .MuiListItem-root': {
                                          backgroundColor: '#E8EAF6', // Background color for MenuItem
                                          border: "1px solid #1A237E", // Border color for MenuItem
                                          '&amp;:hover': {
                                              backgroundColor: '#BDBDBD', // Change background color on hover
                                          },
                                      },
                                      '& svg': {
                                                fontSize: '50px', // Increase icon size
                                                color: '#1A237E' // Change icon color
                                            }
                                  }}
                                >
                                    <FaFileUpload />
                                    {resume && resume.name && (
                                        <span style={{ marginLeft: '5px' }}>{resume.name}</span>
                                    )}
                                </IconButton>
                            </label>
                            {resume && resume.name && (
                                <div style={{ marginLeft: '10px' }}>
                                    <div
                                        variant="contained"
                                        onClick={handleRemoveResume}
                                        className='resumeButton'
                                        style={{
                                          color:'#1A237E',
                                        border: '2px solid #a2beda',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize:'14px',
                                        cursor: 'pointer', // Change cursor on hover
                                    }}
                                    >
                                        Remove Resume
                                    </div>
                                </div>
                            )}
                        </div>
                        {errors.resume&& (
                        <p style={{ color: 'rgb(197, 6, 6)',fontSize:'13px',marginLeft:'10px',marginTop:'2px' }}>{errors.resume}</p>
                    )}
                        {/* </Grid> */}
                    </AccordionDetails>
                </ResumeAccordionWrapper>
                {/* Submit Button */}
                {/* <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button> */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading} // Disable button while loading
                        sx={{
                            width: "180px",
                            borderRadius: '10px', // Rounded corners
                            padding: '7px 15px', // Padding
                            fontSize: '20px', // Font size
                            fontWeight: 'bold', // Bold font weight
                            textTransform: 'none', // Disable text transformation
                            boxShadow: 'none', // Disable box shadow
                            marginBottom: "20px",
                            '&:hover': {
                                backgroundColor: '#1A237E', // Change background color on hover
                            },
                        }}
                    >
                        {isLoading ? 'Please wait, account is creating...' : 'Submit'}
                    </Button>
                </div>
            </form>

        </FormContainer>
    );
};

export default UserForm1;