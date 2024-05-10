import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { CircularProgress, Typography, Grid, TextField, Container, InputLabel, InputAdornment, IconButton, Divider, Autocomplete } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import Radio from '@mui/material/Radio';
import {
    AccordionSummary,
    AccordionDetails,

} from '@mui/material';
import { BeatLoader } from 'react-spinners';
//  import FormContainer from './FormContainer';
// import './UserProfile.css'
import { css } from '@emotion/react';
import './UserProfile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import {HashLoader} from "react-spinners";
import { FadeLoader } from 'react-spinners';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FaFileUpload } from "react-icons/fa";
import { Paper } from '@mui/material'
import BASE_URL from '../CommonAPI';
import NotRegister from "../HomePage/homeimages/Not Register.jpg"
const override = css`

  display: block;
  margin: 0 auto;
`;

function UserAccount(props) {
    const [useAccountError, setUseAccountError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState({
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
            profile_picture_path: ''
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
                    years_of_experience: '',
                    job_role: '',
                    skills: ''
                },
                // {
                //     company_name: '',
                //     years_of_experience: '',
                //     job_role: '',
                //     skills: ''
                // }
            ],
            numberOfCompanies: ''
        },
        jobPreference: {
            department: '',
            industry: '',
            key_skills: '',
            prefered_locations: ''
        },
        resume: {
            resume_path: ''
        }
    }
})


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
                profile_picture_path: ''
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
            PG_college_details: {}, // Default to empty object
            Diploma_college_details: {}, // Default to empty object
            professionalDetails: {
                companies: [],
                numberOfCompanies: ''
            },
            jobPreference: {
                department: '',
                industry: '',
                key_skills: [],
                prefered_locations: []
            },
            resume: {
                resume_path: ''
            }
        }
    });
    // console.log(props.message,'props.data---');
    // if (props.message) {
    //   const token = localStorage.getItem('loginToken');
    //   const requestData = {
    //     token: token,
    //   };

    //   axios.post(`${BASE_URL}/get_user_details/`, requestData)
    //     .then(response => {
    //       console.log(response.data,'get_user_details----------'); // Log response data
    //       // Do something with the response data, such as updating
    //       if (response.data.status){
    //         console.log("if-get----------");
    //         setUseAccountError(false)
    //       } else{
    //         console.log("else-get----------");
    //         setUseAccountError(true)
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error fetching user details:', error);
    //       // Handle errors
    //     });
    // }
   
    // const jsonResponse = JSON.stringify(response);
    // console.log(jsonResponse);
    const handleCompanyChange = (event, index, field) => {
        const updatedCompanies = [...formData.data.professionalDetails.companies];
        updatedCompanies[index][field] = event.target.value;

        setFormData(prevState => ({
            ...prevState,
            data: {
                ...prevState.data,
                professionalDetails: {
                    ...prevState.data.professionalDetails,
                    companies: updatedCompanies
                }
            }
        }));
    };

    const handleNumberOfCompaniesChange = (event) => {
        const { value } = event.target;
        const companies = [...formData.data.professionalDetails.companies];

        // If the length of the companies array is different from the new value,
        // update the companies array to match the new value
        if (companies.length !== value) {
            let updatedCompanies;

            if (value > companies.length) {
                // If increasing the number of companies, copy existing data and add new empty companies
                updatedCompanies = [...companies];

                for (let i = companies.length; i < value; i++) {
                    updatedCompanies.push({
                        company_name: '',
                        years_of_experience: '',
                        job_role: '',
                        skills: ''
                    });
                }
            } else {
                // If decreasing the number of companies, trim the array to the new length
                updatedCompanies = companies.slice(0, value);
            }

            setFormData(prevState => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    professionalDetails: {
                        ...prevState.data.professionalDetails,
                        numberOfCompanies: value,
                        companies: updatedCompanies
                    }
                }
            }));
        }
    };
    const [locations, setLocations] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchLocationsAndSkills = async () => {
            try {
                const locationsResponse = await axios.get(`${BASE_URL}/locations/`);
                setLocations(locationsResponse.data);

                const skillsResponse = await axios.get(`${BASE_URL}/skills/`);
                setSkills(skillsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // setLoading(false);
            }
        };

        fetchLocationsAndSkills();
    }, []);

    const handleAutoCompleteChange = (event, newValue, field) => {
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                jobPreference: {
                    ...prevData.data.jobPreference,
                    [field]: newValue
                }
            }
        }));
    };

    const [profilePicture, setProfilePicture] = useState(null);
    useEffect(() => {
     
        axios.get(`${BASE_URL}/get_user_details_view/`)
       
            .then(response => {
                // setLoading1(false);
                console.log(response,'get_user_details_view----------');
                setLoading(false);
                // const userDetails = response.data.data.userDetails;
                // const signup = response.data.data.Signup;
                // const address = response.data.data.address;
                // const education_details = response.data.data.education_details;
                // const college_details = response.data.data.college_details;
                // const jobPreference = response.data.data.jobPreference;
                // const professionalDetails = response.data.data.professionalDetails;
                // const resume = response.data.data.resume;
                const userDetails = response.data.userDetails;
                const signup = response.data.Signup;
                const address = response.data.address;
                const education_details = response.data.education_details;
                const college_details = response.data.college_details;
                const jobPreference = response.data.jobPreference;
                const professionalDetails = response.data.professionalDetails;
                const resume = response.data.resume;

                setFormData(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        userDetails,
                        Signup: signup,
                        address: address,
                        education_details: education_details,
                        college_details: college_details,
                        PG_college_details: response.data.PG_college_details || {}, // Default to empty object
                        Diploma_college_details: response.data.Diploma_college_details || {}, // Default to empty object
                        jobPreference: jobPreference,
                        professionalDetails: professionalDetails,
                        resume: resume
                    }
                }));
                if (response.data.status){
                    console.log("if-view----------");
                    setUseAccountError(false)
                  }
                  else if(response.data!== null){
                    console.log("esle-if-view----------");
                    setUseAccountError(false)
                  }
                  else{
                  console.log("else-view----------");
                    setUseAccountError(true)
                  }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                // setLoading1(false);
                // setLoading(false);
            });
    }, []);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const Token = localStorage.getItem('loginToken');

    //     const formDataToSend = new FormData();
    //     formDataToSend.append('token', Token);
    //     formDataToSend.append('userDetails', JSON.stringify(formData.data.userDetails));
    //     formDataToSend.append('Signup', JSON.stringify(formData.data.Signup));
    //     formDataToSend.append('address', JSON.stringify(formData.data.address));
    //     formDataToSend.append('education_details', JSON.stringify(formData.data.education_details));
    //     formDataToSend.append('college_details', JSON.stringify(formData.data.college_details));
    //     formDataToSend.append('PG_college_details', JSON.stringify(formData.data.PG_college_details));
    //     formDataToSend.append('Diploma_college_details', JSON.stringify(formData.data.Diploma_college_details));
    //     formDataToSend.append('jobPreference', JSON.stringify(formData.data.jobPreference));
    //     formDataToSend.append('professionalDetails', JSON.stringify(formData.data.professionalDetails));

    //     axios.post('http://192.168.1.44:8000/update_user_details/', formDataToSend)
    //         .then(response => {
    //             console.log('Data updated successfully:', response);
    //             alert('Profile Updated successful!');
    //         })
    //         .catch(error => {
    //             console.error('Error updating data:', error);
    //             alert('Submission failed. Please try again.');
    //         });
    // };
     // Handle resume upload
     const [resumeFile, setResumeFile] = useState(null);
     
     const handleResumeChange = (event) => {
      const file = event.target.files[0];
      setResumeFile(file);
      setFormData(prevData => ({
          ...prevData,
          data: {
              ...prevData.data,
              resume: {
                  resume_path: file.name
              }
          }
      }));
  };
  const handleRemoveResume = () => {
    setResumeFile(null);
    setFormData(prevData => ({
        ...prevData,
        data: {
            ...prevData.data,
            resume: {
                resume_path: ''
            }
        }
    }));
};
    const handlePermanentAddressChange = (event) => {
      const { name, value } = event.target;
      setError1({
          ...error1,
          [name]: '',
      });
      let errorMessage = '';
      if (name === 'country' || name === 'city' || name === 'country' || name === 'state') {
          if (/[^A-Za-z\s]/.test(value)) {
              // Invalid input, set error message
              setError1({
                  ...error1,
                  [name]: 'Only alphabets and spaces allowed',
              });
              return;
          }

      }

      setFormData(prevData => ({
          ...prevData,
          data: {
              ...prevData.data,
              address: {
                  ...prevData.data.address,
                  permanent: {
                      ...prevData.data.address.permanent,
                      [name]: value,
                      [`${name}_error`]: errorMessage

                  }
              }
          }
      }));
  };




  const handleCurrentAddressChange = (event) => {
      const { name, value } = event.target;
      setError1({
          ...error1,
          [name]: '',
      });
      let errorMessage = '';
      if (name === 'country' || name === 'city' || name === 'country' || name === 'state') {
          if (/[^A-Za-z\s]/.test(value)) {
              // Invalid input, set error message
              setError1({
                  ...error1,
                  [name]: 'Only alphabets and spaces allowed',
              });
              return;
          }

      }

      setFormData(prevData => ({
          ...prevData,
          data: {
              ...prevData.data,
              address: {
                  ...prevData.data.address,
                  current: {
                      ...prevData.data.address.current,
                      [name]: value,
                      [`${name}_error`]: errorMessage

                  }
              }
          }
      }));
  };
  const [editMode, setEditMode] = useState(false); // State to control edit mode
  // console.log(formData.data.resume.resume_path,'resume1---------');
  // console.log(resumeFile,'resume2--------');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set isSubmitting to true when form is submitted
        setIsSubmitting(true);
        const formDataToSend = new FormData();
console.log(formDataToSend,'date to payload')


        // Append profile picture and resume if available
        // (Assuming profilePicture and resumeFile are defined somewhere in your component)
        if (profilePicture || formData.data.userDetails.profile_picture_path) {
          var profile = ''
          if (profilePicture){
            profile = profilePicture
          }
          else{
            profile = formData.data.userDetails.profile_picture_path
          }
            formDataToSend.append('profilePicture', profile);
        }
        setResumeFile(formData.data.resume.resume_path || null);
       
        if (resumeFile || formData.data.resume.resume_path) {
          var resume = ''
          if (resumeFile){
            resume = resumeFile
          }
          else{
            resume = formData.data.resume.resume_path
          }
            formDataToSend.append('resume', resume);
        }

        const Token = localStorage.getItem('loginToken')

        // Convert relevant form data fields to arrays before appending to formDataToSend
        const jobPreference = formData.data.jobPreference;

        // Process key skills
        let keySkillsArray = [];
        if (typeof jobPreference.key_skills === 'string') {
            keySkillsArray = jobPreference.key_skills.split(',').map(skill => skill.trim());
        } else if (Array.isArray(jobPreference.key_skills)) {
            keySkillsArray = jobPreference.key_skills;
        }

        // Process preferred locations
        let preferedLocationsArray = [];
        if (typeof jobPreference.prefered_locations === 'string') {
            preferedLocationsArray = jobPreference.prefered_locations.split(',').map(location => location.trim());
        } else if (Array.isArray(jobPreference.prefered_locations)) {
            preferedLocationsArray = jobPreference.prefered_locations;
        }

        console.log(formData?.data?.userDetails,"updating123");
       


        // Update jobPreference object with arrays
        formData.data.jobPreference.key_skills = keySkillsArray;
        formData.data.jobPreference.prefered_locations = preferedLocationsArray;

        // Append form data to formDataToSend
        formDataToSend.append('userDetails', JSON.stringify(formData.data.userDetails));
        formDataToSend.append('Signup', JSON.stringify(formData.data.Signup));
        formDataToSend.append('address', JSON.stringify(formData.data.address));
        formDataToSend.append('education_details', JSON.stringify(formData.data.education_details));
        formDataToSend.append('college_details', JSON.stringify(formData.data.college_details));
        formDataToSend.append('PG_college_details', JSON.stringify(formData.data.PG_college_details));
        formDataToSend.append('Diploma_college_details', JSON.stringify(formData.data.Diploma_college_details));
        formDataToSend.append('jobPreference', JSON.stringify(formData.data.jobPreference));
        formDataToSend.append('professionalDetails', JSON.stringify(formData.data.professionalDetails));
        formDataToSend.append('token', Token);

        // Logging formDataToSend for debugging
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        // Sending formDataToSend to the backend
        fetch(`${BASE_URL}/update_user_details/`, {
            method: 'POST',
            body: formDataToSend,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user details');
                }
                return response.json();
            })
            .then(data => {
                console.log("Response from server:", data);
            })
            .catch(error => {
                console.error('Error updating user details:', error);
                toast.error('Submission failed. Please try again.', { position: toast.POSITION.TOP_CENTER });
            })
            .finally(() => {
                // Set isSubmitting back to false after submission is completed
                setIsSubmitting(false);

                // After loading finished, show alert and navigate
                alert('Profile Updated successful!');
                // navigate('/home');
            });
    };



    // if (loading) {
    //     return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100vh' }}>
    //     {/* //  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //     //     <BeatLoader color="#36D7B7" css={override} />
    //     //     <p>Loading profile information...</p>
    //     // </div>;  */}
    //     {/* <BeatLoader color="#1A237E" css={override} />  */}
    //     <HashLoader  height={100}
    //        width={100}
    //        color="#1A237E"
    //        ariaLabel="grid-loading"
    //        radius="12.5"
    //        wrapperStyle={{}}
    //        wrapperClass="grid-wrapper" />
    //  </div>
    // }
    const handleChange = (event) => {

      // const { name, value } = event.target;
      const { name, value } = event.target;
      setError1({
          ...error1,
          [name]: '',
      });
      console.log(value, 'companyname')
      const [field, index, subfield] = name.split('.');
      let errorMessage = '';

      if (name === 'sslc_school_name' || name === 'hsc_school_name' || name === 'college_name'
          || name === 'department' || name === 'degree' || name === 'pg_college_name'
          || name === 'pg_college_department' || name === 'pg_college_degree' || name === 'diploma_college_name'
          || name === 'diploma_college_department' || name === 'diploma_college_degree') {
          if (/[^A-Za-z\s]/.test(value)) {
              // Invalid input, set error message
              setError1({
                  ...error1,
                  [name]: 'Only alphabets and spaces allowed',
              });
              return;
          }
      }
      if (name === 'sslc_start_year' || name === 'sslc_end_year' ||
          name === 'hsc_start_year' || name === 'hsc_end_year' ||
          name === 'sslc_percentage' || name === 'hsc_percentage' || name === 'college_percentage' ||
          name === 'pg_college_percentage' || name === 'diploma_college_percentage' || name === 'college_start_year'
          || name === 'college_end_year' || name === 'pg_college_start_year' || name === 'pg_college_end_year'
          || name === 'diploma_college_start_year' || name === 'diploma_college_end_year') {
          if (/[^0-9]/.test(value)) {
              // Invalid input, set error message
              setError1({
                  ...error1,
                  [name]: 'Only numbers allowed',
              });
              return;
          }
      }

      // if (name === 'key_skills' || name === 'industry' || name === 'department' || name === 'prefered_locations') {
      //     if (/[^A-Za-z]/.test(value)) {
      //         // Invalid input, set error message
      //         setError1({
      //             ...error1,
      //             [name]: 'Numbers and symbols are not allowed',
      //         });
      //         return;
      //     }

      // }

      if (name === 'first_name' || name === 'last_name') {
          if (/[^A-Za-z]/.test(value)) {
              // Invalid input, set error message
              setError1({
                  ...error1,
                  [name]: 'Only alphabets allowed for first name and last name',
              });
              return;
          }

      }


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
                  [name]: value,
                  [`${name}_error`]: errorMessage

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
                  [name]: value,
                  [`${name}_error`]: errorMessage

              },
              jobPreference: {
                  ...prevData.data.jobPreference,
                  [name]: value,
                  // [name]: value,
                  [`${name}_error`]: errorMessage
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

    // const handleChange = event => {
    //     const { name, value } = event.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         data: {
    //             ...prevState.data,
    //             userDetails: {
    //                 ...prevState.data.userDetails,
    //                 [name]: value
    //             }
    //         }
    //     }));
    // };
 
    const handleProfilePictureChange = event => {
        const file = event.target.files[0];
        setProfilePicture(file);
    };
    const handleRemoveProfilePicture = () => {
        setProfilePicture(null);
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                userDetails: {
                    ...prevData.data.userDetails,
                    profile_picture_path: ''
                }
            }
        }));
    };

    // return (
    //     <div style={{ marginTop: '40px' }}>
    //         <h2>User Profile</h2>
    //         <form onSubmit={handleSubmit}>
    //             <label htmlFor="firstName">First Name:</label>
    //             <input
    //                 type="text"
    //                 id="firstName"
    //                 name="first_name"
    //                 value={formData.data.userDetails.first_name}
    //                 onChange={handleChange}
    //             />
    //             {/* Add similar input fields for other details */}
    //             <input type="submit" value="Submit" />

    //             <label htmlFor="profile-picture-input">Upload Profile Picture:</label>
    //             <br />
    //             <Input
    //                 type="file"
    //                 accept="image/*"
    //                 onChange={handleProfilePictureChange}
    //                 margin="dense"
    //                 id="profile-picture-input"
    //             />

    //             {profilePicture && (
    //                 <div>
    //                     <Avatar
    //                         alt="Profile Picture"
    //                         src={URL.createObjectURL(profilePicture)}
    //                         sx={{ width: 100, height: 100, marginTop: 2 }}
    //                     />
    //                     <Button color="secondary" onClick={handleRemoveProfilePicture}>
    //                         Remove Picture
    //                     </Button>
    //                 </div>
    //             )}

    //             {(formData?.data?.userDetails?.profile_picture_path) && (
    //                 <div>
    //                     <Avatar
    //                         alt="Profile Picture"
    //                         src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.userDetails.profile_picture_path}`}
    //                         sx={{ width: 100, height: 100, marginTop: 2 }}
    //                     />
    //                     <Button color="secondary" onClick={handleRemoveProfilePicture}>
    //                         Remove Picture
    //                     </Button>
    //                 </div>
    //             )}
    //         </form>
    //     </div>
    // );
    const textFieldStyles = {
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
      color: '#1A237E' // Text color
  };
  if (loading){
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100vh',marginTop:'-50px',marginLeft:'-50px' }}>
        {/* <BeatLoader color="#1A237E" css={override} />  */}
        <HashLoader  height={100}
           width={100}
           color="#1A237E"
           ariaLabel="grid-loading"
           radius="12.5"
           wrapperStyle={{}}
           wrapperClass="grid-wrapper" />
     </div>
    )
  }
  console.log(loading,"loading-----------------");
  console.log(useAccountError,'useAccountError------------');

  const openResume = () => {
    window.open(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.data?.resume?.resume_path}`, '_blank');
};
//   const FormHelperTextProps={
//     backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"
//   }
    return (
        // <div>
        // {loading ? (
        //   <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        //     {/* <BeatLoader color="#1A237E" css={override} /> */}
        //     <HashLoader
        //       height={100}
        //       width={100}
        //       color="#1A237E"
        //       ariaLabel="grid-loading"
        //       radius="12.5"
        //       wrapperStyle={{}}
        //       wrapperClass="grid-wrapper"
        //     />
        //   </div>
        // ) : (
          <div>
            {useAccountError ? (
              <div className='userAccount-background'>
                <img src={NotRegister} alt='404' className='NotRegister' /><br></br>
                <h5 className='errorText'>You haven't registered an account with us yet..!</h5>
              </div>
            ) : (
              <div className="profilebackground-div">              
               <Container style={{ marginTop: '60px' }} >
                <Typography variant="h6"
                    color="#1A237E" fontSize="25px"
                    fontWeight="bold" textTransform="uppercase" textAlign="center" gutterBottom>
                    Profile
                    <Divider sx={{ marginY: 2 }} ></Divider>
                </Typography>


                <form onSubmit={handleSubmit} >
                    {/* User Details Accordion */}

                    <AccordionSummary sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="#1A237E" fontSize="25px" fontWeight="bold" textTransform="uppercase">User Details</Typography>
                        <div style={{ marginLeft: 'auto' }}>
                            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>Edit</Button>
                        </div>
                        </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* First Column */}
                                {console.log(formData?.data?.userDetails,"today1234")}
                                <TextField className='textfield'
                                    label='First Name'
                                    name="first_name"
                                    onChange={handleChange}
                                    // value={formData.data.userDetails.first_name || values?.userDetails?.first_name}
                                    value ={formData.data?.userDetails?.first_name}
                                    // defaultValue={values?.userDetails?.first_name}
                                    fullWidth
                                    margin="dense"
                                    // error={Boolean(formData.data.userDetails.first_name_error)}
                                    // helperText={formData.data.userDetails.first_name_error}
                                    error={Boolean(error1.first_name)}
                                    helperText={error1.first_name}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                FormHelperTextProps={{
                                    sx: { backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                                <TextField className='textfield'
                                    label= "Last Name"
                                    name="last_name"
                                    value={formData.data?.userDetails?.last_name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.last_name)}
                                    helperText={error1.last_name}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: {
                                            color: "#1A237E"
                                        }
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField
                                    className='textfield'
                                    label= 'Date-of-birth (month/date/year)'
                                    name="date_of_birth"
                                    type='date'
                                    value={formData.data?.userDetails?.date_of_birth}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: {
                                            color: "#1A237E"// Change label color
                                        }
                                    }}
                                    sx={{ ...textFieldStyles }}
                                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                                    FormHelperTextProps={{
                                        sx: { backgroundColor: '#E8EAF6', marginTop: "-2px", marginLeft: "-5px", marginRight: "-5px", padding: "5px" } // Set background color for error message
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* Second Column */}
                                {/* {console.log(values,'rarararaar')} */}
                                {/* <TextField className='textfield'
                                    label='Mobile Number'
                                    name="mobile_number"
                                    value={formData.data?.Signup?.mobile_number}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    disabled={true}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" ,width:"300px"} // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px",width:"550px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                /> */}
                                <TextField className='textfield'
                                    label="Gender"
                                    name="gender"
                                    value={formData.data?.userDetails?.gender}
                                    onChange={handleChange}
                                    fullWidth
                                    displayEmpty
                                    margin="dense"
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                   
                                >

                                    <MenuItem value="" disabled>Select Gender</MenuItem>
                                    <MenuItem className='male' value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                                <label htmlFor="profile-picture-input">Upload Profile Picture:</label>
                                <div style={{ display: 'flex' }}>
                                <br />
                                <Input
                                    disabled={!editMode}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        margin="dense"
                                        id="profile-picture-input"
                                        style={{
                                            display: 'none',
                                        }}
                                />
                                {!profilePicture && !formData?.data?.userDetails?.profile_picture_path && (
                                    <label htmlFor="profile-picture-input">
                                        <IconButton
                                            component="span"
                                            size="small"
                                            sx={{  
                                                marginTop: 1,
                                                border: '2px solid #1A237E',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                backgroundColor:'#fff',
                                                '&:hover': {
                                                    borderColor: '#a2beda', // Change border color on hover
                                                    backgroundColor:'#fff'
                                                },
                                                '& svg': {
                                                    fontSize: '50px', // Increase icon size
                                                    color: '#1A237E' // Change icon color
                                                }
                                            }}
                                        >
                                            <CloudUploadIcon />
                                            {/* {profilePicture && profilePicture.name && (
                                                <span style={{ marginLeft: '5px' }}>{profilePicture.name}</span>
                                            )} */}
                                        </IconButton>
                                        </label>
                                )}

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

                                {/* Display profile picture from the backend if available */}
                                {formData?.data?.userDetails?.profile_picture_path && (
                                    <div>
                                        <Avatar
                                            alt="Profile Picture"
                                            src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.data?.userDetails?.profile_picture_path}`}
                                            sx={{ width: 100, height: 100, marginTop: 1 }}
                                        />
                                        <Button disabled={!editMode} color="secondary" onClick={handleRemoveProfilePicture}>
                                            Remove Picture
                                        </Button>
                                    </div>
                                )}

                                {/* Display CloudUploadIcon if no profile picture */}
                           

                           
                        </div>
                        </Grid>
                            </Grid>
                       
                        <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />
                    </AccordionDetails>

                    {/* Address Accordion */}

                    <AccordionSummary >
                        <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase">Address</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                       


                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} >
                                {/* First Column */}
                                <TextField className='textfield'
                                    label="permanent Street"
                                    name="street"
                                    value={formData.data?.address?.permanent?.street}
                                    onChange={handlePermanentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField className='textfield'
                                    label=" permanent City"
                                    name="city"
                                    value={formData.data?.address?.permanent?.city}
                                    required
                                    onChange={handlePermanentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.city)}
                                    helperText={error1.city}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField className='textfield'
                                    label="permanent pincode"
                                    name="pincode"
                                    value={formData.data?.address?.permanent?.pincode}
                                    required
                                    onChange={handlePermanentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />

                                <TextField className='textfield'
                                    label="permanent Country"
                                    name="country"
                                    value={formData.data?.address?.permanent?.country}
                                    required
                                    onChange={handlePermanentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.country)}
                                    helperText={error1.country}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                                <TextField className='textfield'
                                    label="permanent State"
                                    name="state"
                                    value={formData.data?.address?.permanent?.state}
                                    required
                                    onChange={handlePermanentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.state)}
                                    helperText={error1.state}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6} >
                                {/* <Typography variant="h6"
                                color="#1A237E" fontSize="25px"
                                fontWeight="bold" textTransform="uppercase">Current Address</Typography> */}
                                <TextField className='textfield'
                                    label="Current Street"
                                    name="street"
                                    value={formData.data?.address?.current?.street}
                                    onChange={handleCurrentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField className='textfield'
                                    label="Current City"
                                    name="city"
                                    value={formData.data?.address?.current?.city}

                                    onChange={handleCurrentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.city)}
                                    helperText={error1.city}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField className='textfield'
                                    label="Current Pincode"
                                    name="pincode"
                                    value={formData.data?.address?.current?.pincode}

                                    onChange={handleCurrentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />

                                <TextField className='textfield'
                                    label="Current Country"
                                    name="country"
                                    value={formData.data?.address?.current?.country}

                                    onChange={handleCurrentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.country)}
                                    helperText={error1.country}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />
                                <TextField className='textfield'
                                    label="Current State"
                                    name="state"
                                    value={formData.data?.address?.current?.state}

                                    onChange={handleCurrentAddressChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.state)}
                                    helperText={error1.state}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}
                                />

                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />

                    </AccordionDetails>


                    {/* Educatiom Accordion */}

                    <AccordionSummary > <Typography variant="h6"
                        color="#1A237E" fontSize="25px"
                        fontWeight="bold" textTransform="uppercase">Education details</Typography></AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>

                                {/* First Column */}
                                <TextField className='textfield'
                                    label="SSLC-school-name"
                                    name="sslc_school_name"
                                    value={formData.data?.education_details?.sslc_school_name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.sslc_school_name)}
                                    helperText={error1.sslc_school_name}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                                <TextField className='textfield'
                                    label="SSLC-start-year"
                                    name="sslc_start_year"
                                    value={formData.data?.education_details?.sslc_start_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.sslc_start_year)}
                                    helperText={error1.sslc_start_year}

                                />
                                <TextField className='textfield'
                                    label="SSLC-end-year"
                                    name="sslc_end_year"
                                    value={formData.data?.education_details?.sslc_end_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.sslc_end_year)}
                                    helperText={error1.sslc_end_year}


                                />
                                <TextField className='textfield'
                                    label="SSLC-percentage"
                                    name="sslc_percentage"
                                    value={formData.data?.education_details?.sslc_percentage}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.sslc_percentage)}
                                    helperText={error1.sslc_percentage}



                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                {/* Second Column */}
                                <TextField className='textfield'
                                    label="HSC-school-name"
                                    name="hsc_school_name"
                                    value={formData.data?.education_details?.hsc_school_name}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.hsc_school_name)}
                                    helperText={error1.hsc_school_name}


                                />
                                <TextField className='textfield'
                                    label="HSC-start-year"
                                    name="hsc_start_year"
                                    value={formData.data?.education_details?.hsc_start_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.hsc_start_year)}
                                    helperText={error1.hsc_start_year}

                                />
                                <TextField className='textfield'
                                    label="HSC-end-year"
                                    name="hsc_end_year"
                                    value={formData.data?.education_details?.hsc_end_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.hsc_end_year)}
                                    helperText={error1.hsc_end_year}

                                />
                                <TextField className='textfield'
                                    label="HSC-percentage"
                                    name="hsc_percentage"
                                    value={formData.data?.education_details?.hsc_percentage}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.hsc_percentage)}
                                    helperText={error1.hsc_percentage}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ width: '100%' }} variant="h6"
                                    color="#1A237E" fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase">UG Details:</Typography>
                                {/* Third Column */}
                                <TextField className='textfield'
                                    label="College-name"
                                    name="college_name"
                                    value={formData.data?.college_details?.college_name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.college_name)}
                                    helperText={error1.college_name}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                                <TextField className='textfield'
                                    label="College-start-year"
                                    name="college_start_year"
                                    value={formData.data?.college_details?.college_start_year}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.college_start_year)}
                                    helperText={error1.college_start_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}



                                />
                                <TextField className='textfield'
                                    label="College-end-year"
                                    name="college_end_year"
                                    value={formData.data?.college_details?.college_end_year}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.college_end_year)}
                                    helperText={error1.college_end_year}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}


                                />
                                <TextField className='textfield'
                                    label="College-percentage"
                                    name="college_percentage"
                                    value={formData.data?.college_details?.college_percentage}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.college_percentage)}
                                    helperText={error1.college_percentage}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ color: 'transparent' }} variant="h6"
                                    fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase"> . </Typography>
                                {/* Fourth Column */}
                                <TextField className='textfield'
                                    label="Department"
                                    name="department"
                                    value={formData.data?.college_details?.department}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.department)}
                                    helperText={error1.department}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                                <TextField className='textfield'
                                    label="Degree"
                                    name="degree"
                                    value={formData.data?.college_details?.degree}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.degree)}
                                    helperText={error1.degree}
                                    required
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}


                                />
                            </Grid>


                            {/* pg and diplamo */}
                            <Grid item xs={12}>
                                <Typography variant="h6"
                                    color="#1A237E" fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase">PG details</Typography>
                                {/* Radio Buttons for PG/Diploma */}
                                {/* <FormControl component="fieldset">
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
                                </FormControl> */}
                            </Grid>

                            {/* Additional Fields based on Radio Button selection */}
                            {/* {formData.data?.college_details?.education_type === 'pg' && ( */}

                            <>
                                {/* Additional PG Fields */}

                                <Grid item xs={12} sm={6}>
                                    <TextField className='textfield'
                                        label="PG-College-name"
                                        name="pg_college_name"
                                        value={formData.data?.PG_college_details?.pg_college_name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_name)}
                                        helperText={error1.pg_college_name}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}

                                    />
                                    <TextField className='textfield'
                                        label="PG-College-start-year"
                                        name="pg_college_start_year"
                                        value={formData.data?.PG_college_details?.pg_college_start_year}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_start_year)}
                                        helperText={error1.pg_college_start_year}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField className='textfield'
                                        label="PG-College-end-year"
                                        name="pg_college_end_year"
                                        value={formData.data?.PG_college_details?.pg_college_end_year}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_end_year)}
                                        helperText={error1.pg_college_end_year}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}

                                    />
                                    <TextField className='textfield'
                                        label="PG-College-percentage"
                                        name="pg_college_percentage"
                                        value={formData.data?.PG_college_details?.pg_college_percentage}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_percentage)}
                                        helperText={error1.pg_college_percentage}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}

                                    />
                                    {/* Add other PG fields here */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='textfield'
                                        label="PG-College-department"
                                        name="pg_college_department"
                                        value={formData.data?.PG_college_details?.pg_college_department}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_department)}
                                        helperText={error1.pg_college_department}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}

                                    />
                                    <TextField className='textfield'
                                        label="PG-College-degree"
                                        name="pg_college_degree"
                                        value={formData.data?.PG_college_details?.pg_college_degree}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.pg_college_degree)}
                                        helperText={error1.pg_college_degree}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}

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
                                        value={formData.data?.Diploma_college_details?.diploma_college_name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_name)}
                                        helperText={error1.diploma_college_name}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField className='textfield'
                                        label="Diploma-college-start-year"
                                        name="diploma_college_start_year"
                                        value={formData.data?.Diploma_college_details?.diploma_college_start_year}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_start_year)}
                                        helperText={error1.diploma_college_start_year}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField className='textfield'
                                        label="Diploma-college-end-year"
                                        name="diploma_college_end_year"
                                        value={formData.data?.Diploma_college_details?.diploma_college_end_year}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_end_year)}
                                        helperText={error1.diploma_college_end_year}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField className='textfield'
                                        label="Diploma-college-percentage"
                                        name="diploma_college_percentage"
                                        value={formData.data?.Diploma_college_details?.diploma_college_percentage}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_percentage)}
                                        helperText={error1.diploma_college_percentage}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    {/* Add other Diploma fields here */}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField className='textfield'
                                        label="Diploma-college-department"
                                        name="diploma_college_department"
                                        value={formData.data?.Diploma_college_details?.diploma_college_department}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_department)}
                                        helperText={error1.diploma_college_department}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField className='textfield'
                                        label="Diploma-college-degree"
                                        name="diploma_college_degree"
                                        value={formData.data?.Diploma_college_details?.diploma_college_degree}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="dense"
                                        error={Boolean(error1.diploma_college_degree)}
                                        helperText={error1.diploma_college_degree}
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                </Grid>
                            </>
                            {/* )} */}
                        </Grid>
                        <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />

                    </AccordionDetails>


                    {/* job preference */}

                    <AccordionSummary > <Typography variant="h6"
                        color="#1A237E" fontSize="25px"
                        fontWeight="bold" textTransform="uppercase">Job Preference</Typography></AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                {/* First Column */}
                                {/* <TextField className='textfield'
                                    label="Key-skills"
                                    name="key_skills"
                                    value={formData.data.jobPreference.key_skills}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.key_skills)}
                                    helperText={error1.key_skills}


                                /> */}
                                <Autocomplete
                                    multiple
                                    options={skills.map(skill => skill.skill_set)}
                                    freeSolo
                                    disabled={!editMode}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Key-skills"
                                            fullWidth
                                            margin="dense"
                                            InputLabelProps={{
                                                style: { color: "#1A237E" } // Change label color
                                            }}
                                            sx={{...textFieldStyles}}
                                            style={{backgroundColor:"white",borderRadius:"10px"}}
                                            FormHelperTextProps={{
                                            sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                        }}
                                        />
                                    )}
                                    value={Array.isArray(formData.data?.jobPreference?.key_skills) ? formData.data?.jobPreference?.key_skills : []}
                                    onChange={(event, newValues) => handleAutoCompleteChange(event, newValues, 'key_skills')}
                                />

                                <TextField className='textfield'
                                    label="Industry"
                                    name="industry"
                                    value={formData.data?.jobPreference?.industry}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.industry)}
                                    helperText={error1.industry}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField className='textfield'
                                    label="Department"
                                    name="department"
                                    value={formData.data?.jobPreference?.department}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.department)}
                                    helperText={error1.department}
                                    disabled={!editMode}
                                    InputLabelProps={{
                                        style: { color: "#1A237E" } // Change label color
                                    }}
                                    sx={{...textFieldStyles}}
                                    style={{backgroundColor:"white",borderRadius:"10px"}}
                                    FormHelperTextProps={{
                                    sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                }}


                                />
                                {/* <TextField className='textfield'
                                    label="Prefered locations"
                                    name="prefered_locations"
                                    value={formData.data?.jobPreference?.prefered_locations}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    error={Boolean(error1.prefered_locations)}
                                    helperText={error1.prefered_locations}



                                /> */}
                                <Autocomplete
                                    multiple
                                    options={locations.filter(location => typeof location.location === 'string').map(location => location.location)}
                                    freeSolo
                                    disabled={!editMode}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Preferred Locations"
                                            fullWidth
                                            margin="dense"
                                            InputLabelProps={{
                                                style: { color: "#1A237E" } // Change label color
                                            }}
                                            sx={{...textFieldStyles}}
                                            style={{backgroundColor:"white",borderRadius:"10px"}}
                                            FormHelperTextProps={{
                                            sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                        }}
                                        />
                                    )}
                                    value={Array.isArray((formData.data?.jobPreference?.prefered_locations)) ? formData.data?.jobPreference?.prefered_locations : [] }
                                    // onChange={(event, newValues) => handleAutoCompleteChange(event, newValues, 'prefered_locations')}
                                    onChange={(event, newValues) => {
                                        handleAutoCompleteChange(event, newValues, 'prefered_locations');
                                        console.log(newValues ,'hhhhh');
                                    }}
                                />

                            </Grid>

                        </Grid>
                        <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />

                    </AccordionDetails>

                    <AccordionSummary>
                        <Typography variant="h6"
                            color="#1A237E" fontSize="25px"
                            fontWeight="bold" textTransform="uppercase">Professional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {formData.data?.professionalDetails?.companies.map ((company, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <TextField
                                        className='textfield'

                                        label={`Company ${index + 1}`}
                                        value={company.company_name}
                                        onChange={(event) => handleCompanyChange(event, index, 'company_name')}
                                        fullWidth
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField
                                        className='textfield'
                                        label={`Years of Experience`}
                                        value={company.years_of_experience}
                                        onChange={(event) => handleCompanyChange(event, index, 'years_of_experience')}
                                        fullWidth
                                        margin="dense"
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField
                                        className='textfield'
                                        label={`Job Role`}
                                        value={company.job_role}
                                        onChange={(event) => handleCompanyChange(event, index, 'job_role')}
                                        fullWidth
                                        margin="dense"
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                    <TextField
                                        className='textfield'
                                        label={`Skills`}
                                        value={company.skills}
                                        onChange={(event) => handleCompanyChange(event, index, 'skills')}
                                        fullWidth
                                        margin="dense"
                                        disabled={!editMode}
                                        InputLabelProps={{
                                            style: { color: "#1A237E" } // Change label color
                                        }}
                                        sx={{...textFieldStyles}}
                                        style={{backgroundColor:"white",borderRadius:"10px"}}
                                        FormHelperTextProps={{
                                        sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                                    }}
                                    />
                                   
                                </Grid>
                               
                            ))}
                        </Grid>
                        {/* <TextField
                className='textfield'
                label="Number of Companies"
                type="number"
                name="numberOfCompanies"
                value={formData.data?.professionalDetails?.numberOfCompanies}
                onChange={handleNumberOfCompaniesChange}
                fullWidth
                margin="dense"
                disabled={!editMode}
                InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
                }}
                sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "50%", // Set width to half of the container
                marginLeft: "25%",
                }}
                FormHelperTextProps={{
                sx: {
                backgroundColor: '#E8EAF6',
                marginTop: "-2px",
                marginLeft: "-5px",
                marginRight: "-5px",
                padding: "5px"
                }
                }}
                /> */}
                        <TextField
                            className='textfield'
                            label="Number of Companies"
                            type="number"
                            name="numberOfCompanies"

                            value={formData.data?.professionalDetails?.numberOfCompanies}
                            onChange={handleNumberOfCompaniesChange}
                            fullWidth
                            margin="dense"
                            disabled={!editMode}
                            InputLabelProps={{
                                style: { color: "#1A237E" ,width:"300px"} // Change label color
                            }}
                            //   sx={{...textFieldStyles}}
                       
                            style={{backgroundColor:"white",borderRadius:"10px",width:"550px"}}
                            FormHelperTextProps={{
                            sx: {backgroundColor: '#E8EAF6',marginTop:"-2px",marginLeft:"-5px",marginRight:"-5px" ,padding:"5px"} // Set background color for error message
                        }}
                        />
                        <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />

                    </AccordionDetails>
                    {/* resume */}
                    {/* <AccordionSummary >
                            <Typography variant="h6"
                                color="#1A237E" fontSize="25px"
                                fontWeight="bold" textTransform="uppercase">Resume</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <label htmlFor="resume-input">Upload Resume:</label>
                            <br />
                            <Input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={handleResumeChange}
                                margin="dense"
                                id="resume-input"
                                style={{ display: "none" }}
                                disabled={!editMode}
                            />

                       
                            {!resumeFile && formData?.data?.resume?.resume_path && (
                                <div>
                                    <iframe
                                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.data?.resume?.resume_path}`)}&embedded=true&rm=minimal`}
                                        width="250" height="150" style={{ border: 'none' }}
                                        title="Resume"
                                        disabled={!editMode}
                                    />
                                    <div>
                                        <p>Resume File: <a href={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.data?.resume?.resume_path}`} download>{formData?.data?.resume?.resume_path}</a></p>
                                        <Button disabled={!editMode} color="secondary" onClick={handleRemoveResume}>
                                            Remove Resume
                                        </Button>
                                    </div>
                                </div>
                            )}

                       
                            {resumeFile && (
                                <div>
                                    <p>Resume File: <a href={URL.createObjectURL(resumeFile)} download>{resumeFile.name}</a></p>
                                    <Button disabled={!editMode} color="secondary" onClick={handleRemoveResume}>
                                        Remove Resume
                                    </Button>
                                </div>
                            )}

                            {!resumeFile && !formData?.data?.resume?.resume_path && (
                                <div>
                                    <label htmlFor="resume-input">
                                        <IconButton
                                            component="span"
                                            size="small"
                                            disabled={!editMode}
                                            sx={{
                                                marginTop: 1,
                                                border: '2px solid #1A237E',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                backgroundColor: '#fff',
                                                '&:hover': {
                                                    borderColor: '#a2beda',
                                                    backgroundColor: '#fff'
                                                },
                                                '& svg': {
                                                    fontSize: '50px',
                                                    color: '#1A237E'
                                                }
                                            }}
                                        >
                                            <FaFileUpload />
                                        </IconButton>
                                    </label>
                                </div>
                            )}


                        </AccordionDetails> */}

<AccordionSummary >
                                <Typography variant="h6"
                                    color="#1A237E" fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase">Resume</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <label htmlFor="resume-input">Upload Resume:</label>
                                <br />
                                <Input
                                disabled={!editMode}
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={handleResumeChange}
                                    margin="dense"
                                    id="resume-input"
                                />
                                {resumeFile && (
                                    <div>
                                        <p>Resume File: {resumeFile.name}</p>
                                        <Button color="secondary" onClick={handleRemoveResume}>
                                            Remove Resume
                                        </Button>
                                    </div>
                                )}

                                {formData?.data?.resume?.resume_path && (
                                    <div>
                                        <p>Resume URL: <a href={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.resume.resume_path}`} target="_blank">{formData.data.resume.resume_path}</a></p>
                                        {/* <iframe
                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.resume.resume_path}`)}&embedded=true&rm=minimal`}
                                            width="250" height="150" style={{ border: 'none' }}
                                            title="Resume"
                                        /> */}
                                    </div>
                                )}
                            </AccordionDetails>
                    {/* <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button> */}
                    {/* <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Updating... Please wait': 'Update'}
                    </Button> */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!editMode}
                        style={{ position: 'relative' }} // Add this style to enable absolute positioning for the loader
                        sx={{
                            width: "180px",
                            borderRadius: '10px', // Rounded corners
                            padding: '7px 15px', // Padding
                            fontSize: '20px', // Font size
                            fontWeight: 'bold', // Bold font weight
                            textTransform: 'none', // Disable text transformation
                            boxShadow: 'none', // Disable box shadow
                            marginBottom: "50px",
                            '&:hover': {
                                backgroundColor: '#1A237E', // Change background color on hover
                            },
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span style={{ visibility: 'hidden' }}>Update</span> {/* Hide the text when loading */}
                                <BeatLoader
                                    color="#1A237E"
                                    size={12}
                                    css={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                />
                            </>
                        ) : (
                            'Update'
                        )}
                    </Button>
                    </div>


                </form>



                </Container>
                </div>
                  )
              }
               
                  <ToastContainer />
                  </div>
        //      )}

        // </div>
    );
};

export default UserAccount;