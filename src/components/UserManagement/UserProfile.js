import React, { useEffect, useState } from 'react';
import {HashLoader} from "react-spinners";
import {  Typography, Grid, TextField, Container, Button, Input, Avatar, Divider, Autocomplete } from '@mui/material';
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
import axios from 'axios';


import BASE_URL from '../CommonAPI';

const override = css`
  display: block;
  margin: 0 auto;
`;


const UserProfile = (props) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null);
    // const [resume, setResume] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [postData] = useState(null);
    console.log(postData, '=====postdata=====')
    const [resumeFile, setResumeFile] = useState(null);
    const navigate = useNavigate();
    /// for validation
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


    // useEffect(() => {
    //     // Fetch user data from the API
    //     const token=localStorage.getItem('loginToken')
    //     const requestData = {
    //         token: token,
    //         // Add other data you need to send here
    //     };
    //     fetch(`${BASE_URL}/get_user_details/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         // body: JSON.stringify({
    //         //     user_id: userId 

    //         // }),
    //         body: JSON.stringify(requestData)

    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch user details');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setPostdata(data); // Set fetched user data
    //             setLoading1(false); // Set loading to false when data fetching is complete
    //         })
    //         .catch(error => {
    //             console.error('Error fetching user details:', error);
    //             setLoading1(false); // Set loading to false in case of error
    //         });
    // }, []);
    // useEffect(() => {
        console.log(props.message,'props.data---');
        if (props.message) {
          const token = localStorage.getItem('loginToken');
          const requestData = {
            token: token,
          };
    
          axios.post(`${BASE_URL}/get_user_details/`, requestData)
            .then(response => {
              console.log(response.data); // Log response data
              // Do something with the response data, such as updating state
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
              // Handle errors
            });
        }
    //   }, [props.data]);
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        setProfilePicture(file);
        // Update formData to include profile_picture_path
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                userDetails: {
                    ...prevData.data.userDetails,
                    profile_picture_path: URL.createObjectURL(file) // Set profile_picture_path with the URL of the uploaded file
                }
            }
        }));
    };

    const handleRemoveProfilePicture = () => {
        setProfilePicture(null);
        // Update formData to remove profile_picture_path
        setFormData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                userDetails: {
                    ...prevData.data.userDetails,
                    profile_picture_path: '' // Set profile_picture_path to empty string
                }
            }
        }));
    };




const [values , setValues] = useState();
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
                key_skills: [],
                prefered_locations: []
            },
            resume: {
                resume_path: ''
            }

        }
    });
 


    // Handle resume upload
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
    useEffect(() => {
console.log(formData,'ckekckckckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk') 


        
        // Fetch data from the API
        fetch(`${BASE_URL}/get_user_details_view/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                return response.json();
            })
           
            .then(data => {
                console.log(data,'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'); 
                console.log(data.Signup.email,'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'); 
                setUserData(data);
                setLoading1(false); // Set loading to false when data fetching is complete

                // Set resume data
                // setResume(data.resume);
                console.log(data.userDetails.first_name,"today123");
                setValues(data);
                setFormData({
                    ...formData,
                    data: {
                        Signup: {
                            email: data.Signup.email,
                            mobile_number: data.Signup.mobile_number
                        },
                        userDetails: {
                            first_name: data?.userDetails?.first_name,
                            last_name: data.userDetails.last_name,
                            gender: data.userDetails.gender,
                            date_of_birth: data.userDetails.date_of_birth,
                            profile_picture_path: data.userDetails.profile_picture_path
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
                            // key_skills: data.jobPreference.key_skills.join(', '), // Assuming key_skills is an array
                            // prefered_locations: data.jobPreference.prefered_locations.join(', ') 
                        },
                        professionalDetails: {
                            companies: data.professionalDetails.companies,
                            numberOfCompanies: data.professionalDetails.numberOfCompanies
                        },
                        resume: {
                            resume_path: data.resume.resume_path
                        }
                    }
                }); // Set initial form data
                setLoading(false);
                setResumeFile(data.resume.resume_path || null);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [formData]);

    console.log(formData,"today123456");
    const handleChange = (event) => {

        // const { name, value } = event.target;
        const { name, value } = event.target;
        setError1({
            ...error1,
            [name]: '',
        });
        console.log(value, 'companyname')
        // const [field, index, subfield] = name.split('.');
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
            jobPreference: {
                department: '',
                industry: '',
                key_skills: '',
                prefered_locations: ''
            },
            professionalDetails: {
                companies: [
                    {
                        company_name: '',
                        years_of_experience: '',
                        job_role: '',
                        skills: ''
                    },
                    {
                        company_name: '',
                        years_of_experience: '',
                        job_role: '',
                        skills: ''
                    }
                ],
                numberOfCompanies: ''
            },
            resume: {
                resume_path: ''
            }
        }
    };

    const jsonResponse = JSON.stringify(response);
    console.log(jsonResponse);
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



    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     const formDataToSend = new FormData();

    //     // Append profile picture and resume if available
    //     if (profilePicture) {
    //         formDataToSend.append('profilePicture', profilePicture);
    //     }

    //     if (resumeFile) {
    //         formDataToSend.append('resume', resumeFile);
    //     }

    //     const Token = localStorage.getItem('loginToken')

    //     // Convert relevant form data fields to arrays before appending to formDataToSend
    //     const jobPreference = formData.data.jobPreference;

    //     // Process key skills
    //     let keySkillsArray = [];
    //     if (typeof jobPreference.key_skills === 'string') {
    //         // Split the string by commas and trim each skill
    //         keySkillsArray = jobPreference.key_skills.split(',').map(skill => skill.trim());
    //     } else if (Array.isArray(jobPreference.key_skills)) {
    //         // If key_skills is already an array, use it as is
    //         keySkillsArray = jobPreference.key_skills;
    //     }

    //     // Process preferred locations
    //     let preferedLocationsArray = [];
    //     if (typeof jobPreference.prefered_locations === 'string') {
    //         // Split the string by commas and trim each location
    //         preferedLocationsArray = jobPreference.prefered_locations.split(',').map(location => location.trim());
    //     } else if (Array.isArray(jobPreference.prefered_locations)) {
    //         // If prefered_locations is already an array, use it as is
    //         preferedLocationsArray = jobPreference.prefered_locations;
    //     }

    //     // Update jobPreference object with arrays
    //     formData.data.jobPreference.key_skills = keySkillsArray;
    //     formData.data.jobPreference.prefered_locations = preferedLocationsArray;

    //     // Append form data to formDataToSend
    //     formDataToSend.append('userDetails', JSON.stringify(formData.data.userDetails));
    //     formDataToSend.append('Signup', JSON.stringify(formData.data.Signup));
    //     formDataToSend.append('address', JSON.stringify(formData.data.address));
    //     formDataToSend.append('education_details', JSON.stringify(formData.data.education_details));
    //     formDataToSend.append('college_details', JSON.stringify(formData.data.college_details));
    //     formDataToSend.append('PG_college_details', JSON.stringify(formData.data.PG_college_details));
    //     formDataToSend.append('Diploma_college_details', JSON.stringify(formData.data.Diploma_college_details));
    //     formDataToSend.append('jobPreference', JSON.stringify(formData.data.jobPreference));
    //     formDataToSend.append('professionalDetails', JSON.stringify(formData.data.professionalDetails));
    //     formDataToSend.append('token', Token);

    //     // Logging formDataToSend for debugging
    //     for (let pair of formDataToSend.entries()) {
    //         console.log(pair[0] + ': ' + pair[1]);
    //     }

    //     // Sending formDataToSend to the backend
    //     fetch(`${BASE_URL}/update_user_details/`, {
    //         method: 'POST',
    //         body: formDataToSend,
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to update user details');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log("Response from server:", data);
    //             alert('Profile Updated successful!');
    //         })
    //         .then(() => {
    //             navigate('/home');
    //         })
    //         .catch(error => {
    //             console.error('Error updating user details:', error);
    //             toast.error('Submission failed. Please try again.', { position: toast.POSITION.TOP_CENTER });
    //         });
    // };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set isSubmitting to true when form is submitted
        setIsSubmitting(true);
        const formDataToSend = new FormData();
console.log(formDataToSend,'date to payload')


        // Append profile picture and resume if available
        // (Assuming profilePicture and resumeFile are defined somewhere in your component)
        if (profilePicture) {
            formDataToSend.append('profilePicture', profilePicture);
        }

        if (resumeFile) {
            formDataToSend.append('resume', resumeFile);
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
                navigate('/home');
            });
    };




    if (loading) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <BeatLoader color="#36D7B7" css={override} /> {/* Use BeatLoader for the loading animation */}
            <p>Loading profile information...</p> {/* Text indicating that profile information is loading */}
        </div>; // Display loading indicator
    }

    // if (error) {
    //     return <Typography style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
    //     >
    //         {/* Error: Server Not Responding */}
    //         {error.message}
    //     </Typography>; // Display error message
    // }

    if (!userData || !formData) {
        return null; // Handle case when userData is not available yet
    }


    // for geting images

    console.log(values?.userDetails?.first_name,"today12345");
  
    
    return (
        <div className='profilebackground-div'>
            {loading1 ? (
                // <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                //     <BeatLoader color="#36D7B7" css={override} />
                //     <p>Loading profile information...</p>
                // </div>
                <div className="loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ul>         
                 <li style={{color:"red"}}>
        
                  <HashLoader  height={100}
                      width={100}
                      color="#1A237E"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass="grid-wrapper" />
                  </li>
                  {/* <li>Loading...!</li> */}
                 
                  </ul>
        
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

                            <AccordionSummary >
                                <Typography variant="h6"
                                    color="#1A237E" fontSize="25px"
                                    fontWeight="bold" textTransform="uppercase" >User Details</Typography>
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
                                            value={formData.data.userDetails.first_name || values?.userDetails?.first_name} 
                                            // defaultValue={values?.userDetails?.first_name}
                                            fullWidth
                                            margin="dense"
                                            // error={Boolean(formData.data.userDetails.first_name_error)}
                                            // helperText={formData.data.userDetails.first_name_error}
                                            error={Boolean(error1.first_name)}
                                            helperText={error1.first_name}
                                            required

                                        />
                                        <TextField className='textfield' 
                                            label='Last Name'
                                            name="last_name"
                                            value={formData.data.userDetails.last_name || values?.userDetails?.last_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.last_name)}
                                            helperText={error1.last_name}
                                            required



                                        />
                                        <TextField className='textfield'
                                            label='Date-of-birth (month/date/year)'
                                            name="date_of_birth"
                                            type='date'

                                            value={formData.data.userDetails.date_of_birth || values?.userDetails?.date_of_birth}
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
                                            value={formData.data.Signup.mobile_number || values?.Signup?.mobile_number}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            required
                                           


                                        />
                                        <TextField className='textfield'
                                            label="gender"
                                            name="gender"
                                            value={formData.data.userDetails.gender || values?.userDetails?.gender}
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
                                        <br />
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

                                {/* Display profile picture from the backend if available */}
                                {((!profilePicture && formData?.data?.userDetails?.profile_picture_path)  || values?.userDetails?.profile_picture_path) && (
                                    <div>
                                        <Avatar
                                            alt="Profile Picture"
                                            src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.userDetails.profile_picture_path}` || `https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.userDetails.profile_picture_path}`}
                                            sx={{ width: 100, height: 100, marginTop: 2 }}
                                        />
                                        <Button color="secondary" onClick={handleRemoveProfilePicture}>
                                            Remove Picture
                                        </Button>
                                    </div>
                                )}
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
                                            value={formData.data.address.permanent.street || values?.address?.permanent?.street}
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            required
                                        />
                                        <TextField className='textfield'
                                            label=" permanent City"
                                            name="city"
                                            value={formData.data.address.permanent.city || values?.address?.permanent?.city}
                                            required
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.city)}
                                            helperText={error1.city}
                                        />
                                        <TextField className='textfield'
                                            label="permanent pincode"
                                            name="pincode"
                                            value={formData.data.address.permanent.pincode || values?.address?.permanent?.pincode}
                                            required
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"


                                        />

                                        <TextField className='textfield'
                                            label="permanent Country"
                                            name="country"
                                            value={formData.data.address.permanent.country || values?.address?.permanent?.country}
                                            required
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.country)}
                                            helperText={error1.country}


                                        />
                                        <TextField className='textfield'
                                            label="permanent State"
                                            name="state"
                                            value={formData.data.address.permanent.state || values?.address?.permanent?.state}
                                            required
                                            onChange={handlePermanentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.state)}
                                            helperText={error1.state}

                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        {/* <Typography variant="h6"
                                        color="#1A237E" fontSize="25px"
                                        fontWeight="bold" textTransform="uppercase">Current Address</Typography> */}
                                        <TextField className='textfield'
                                            label="Current Street"
                                            name="street"
                                            value={formData.data.address.current.street || values?.address?.current?.street}
                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />
                                        <TextField className='textfield'
                                            label="Current City"
                                            name="city"
                                            value={formData.data.address.current.city || values?.address?.current?.city}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.city)}
                                            helperText={error1.city}

                                        />
                                        <TextField className='textfield'
                                            label="Current Pincode"
                                            name="pincode"
                                            value={formData.data.address.current.pincode || values?.address?.current?.pincode}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"

                                        />

                                        <TextField className='textfield'
                                            label="Current Country"
                                            name="country"
                                            value={formData.data.address.current.country || values?.address?.current?.country}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.country)}
                                            helperText={error1.country}

                                        />
                                        <TextField className='textfield'
                                            label="Current State"
                                            name="state"
                                            value={formData.data.address.current.state || values?.address?.current?.state}

                                            onChange={handleCurrentAddressChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.state)}
                                            helperText={error1.state}

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
                                            value={formData.data.education_details.sslc_school_name || values?.education_details?.sslc_school_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.sslc_school_name)}
                                            helperText={error1.sslc_school_name}
                                            required


                                        />
                                        <TextField className='textfield'
                                            label="SSLC-start-year"
                                            name="sslc_start_year"
                                            value={formData.data.education_details.sslc_start_year || values?.education_details?.sslc_start_year}
                                            required

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.sslc_start_year)}
                                            helperText={error1.sslc_start_year}

                                        />
                                        <TextField className='textfield'
                                            label="SSLC-end-year"
                                            name="sslc_end_year"
                                            value={formData.data.education_details.sslc_end_year || values?.education_details?.sslc_end_year}
                                            required

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.sslc_end_year)}
                                            helperText={error1.sslc_end_year}


                                        />
                                        <TextField className='textfield'
                                            label="SSLC-percentage"
                                            name="sslc_percentage"
                                            value={formData.data.education_details.sslc_percentage || values?.education_details?.sslc_percentage}
                                            required

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
                                            value={formData.data.education_details.hsc_school_name || values?.education_details?.hsc_school_name}
                                            required

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.hsc_school_name)}
                                            helperText={error1.hsc_school_name}


                                        />
                                        <TextField className='textfield'
                                            label="HSC-start-year"
                                            name="hsc_start_year"
                                            value={formData.data.education_details.hsc_start_year || values?.education_details?.hsc_start_year}
                                            required

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.hsc_start_year)}
                                            helperText={error1.hsc_start_year}

                                        />
                                        <TextField className='textfield'
                                            label="HSC-end-year"
                                            name="hsc_end_year"
                                            value={formData.data.education_details.hsc_end_year || values?.education_details?.hsc_end_year} 
                                            required

                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.hsc_end_year)}
                                            helperText={error1.hsc_end_year}

                                        />
                                        <TextField className='textfield'
                                            label="HSC-percentage"
                                            name="hsc_percentage"
                                            value={formData.data.education_details.hsc_percentage || values?.education_details?.hsc_percentage}
                                            required

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
                                            value={formData.data.college_details.college_name || values?.college_details?.college_name}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.college_name)}
                                            helperText={error1.college_name}
                                            required

                                        />
                                        <TextField className='textfield'
                                            label="College-start-year"
                                            name="college_start_year"
                                            value={formData.data.college_details.college_start_year || values?.college_details?.college_start_year}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.college_start_year)}
                                            helperText={error1.college_start_year}
                                            required



                                        />
                                        <TextField className='textfield'
                                            label="College-end-year"
                                            name="college_end_year"
                                            value={formData.data.college_details.college_end_year || values?.college_details?.college_end_year}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.college_end_year)}
                                            helperText={error1.college_end_year}
                                            required


                                        />
                                        <TextField className='textfield'
                                            label="College-percentage"
                                            name="college_percentage"
                                            value={formData.data.college_details.college_percentage || values?.college_details?.college_percentage}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.college_percentage)}
                                            helperText={error1.college_percentage}
                                            required

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
                                            value={formData.data.college_details.department || values?.college_details?.department}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.department)}
                                            helperText={error1.department}
                                            required

                                        />
                                        <TextField className='textfield'
                                            label="Degree"
                                            name="degree"
                                            value={formData.data.college_details.degree || values?.college_details?.degree}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.degree)}
                                            helperText={error1.degree}
                                            required


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
                                    {/* {formData.data.college_details.education_type === 'pg' && ( */}

                                    <>
                                        {/* Additional PG Fields */}

                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="PG-College-name"
                                                name="pg_college_name"
                                                value={formData.data.PG_college_details.pg_college_name || values?.PG_college_details?.pg_college_name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_name)}
                                                helperText={error1.pg_college_name}

                                            />
                                            <TextField className='textfield'
                                                label="PG-College-start-year"
                                                name="pg_college_start_year"
                                                value={formData.data.PG_college_details.pg_college_start_year || values?.PG_college_details?.pg_college_start_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_start_year)}
                                                helperText={error1.pg_college_start_year}

                                            />
                                            <TextField className='textfield'
                                                label="PG-College-end-year"
                                                name="pg_college_end_year"
                                                value={formData.data.PG_college_details.pg_college_end_year || values?.PG_college_details?.pg_college_end_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_end_year)}
                                                helperText={error1.pg_college_end_year}


                                            />
                                            <TextField className='textfield'
                                                label="PG-College-percentage"
                                                name="pg_college_percentage"
                                                value={formData.data.PG_college_details.pg_college_percentage || values?.PG_college_details?.pg_college_percentage}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_percentage)}
                                                helperText={error1.pg_college_percentage}


                                            />
                                            {/* Add other PG fields here */}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="PG-College-department"
                                                name="pg_college_department"
                                                value={formData.data.PG_college_details.pg_college_department || values?.PG_college_details?.pg_college_department}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_department)}
                                                helperText={error1.pg_college_department}


                                            />
                                            <TextField className='textfield'
                                                label="PG-College-degree"
                                                name="pg_college_degree"
                                                value={formData.data.PG_college_details.pg_college_degree || values?.PG_college_details?.pg_college_degree}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.pg_college_degree)}
                                                helperText={error1.pg_college_degree}


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
                                                value={formData.data.Diploma_college_details.diploma_college_name || values?.Diploma_college_details?.diploma_college_name}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_name)}
                                                helperText={error1.diploma_college_name}

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-start-year"
                                                name="diploma_college_start_year"
                                                value={formData.data.Diploma_college_details.diploma_college_start_year || values?.Diploma_college_details?.diploma_college_start_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_start_year)}
                                                helperText={error1.diploma_college_start_year}

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-end-year"
                                                name="diploma_college_end_year"
                                                value={formData.data.Diploma_college_details.diploma_college_end_year || values?.Diploma_college_details?.diploma_college_end_year}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_end_year)}
                                                helperText={error1.diploma_college_end_year}

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-percentage"
                                                name="diploma_college_percentage"
                                                value={formData.data.Diploma_college_details.diploma_college_percentage || values?.Diploma_college_details?.diploma_college_percentage}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_percentage)}
                                                helperText={error1.diploma_college_percentage}

                                            />
                                            {/* Add other Diploma fields here */}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField className='textfield'
                                                label="Diploma-college-department"
                                                name="diploma_college_department"
                                                value={formData.data.Diploma_college_details.diploma_college_department || values?.Diploma_college_details?.diploma_college_department}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_department)}
                                                helperText={error1.diploma_college_department}

                                            />
                                            <TextField className='textfield'
                                                label="Diploma-college-degree"
                                                name="diploma_college_degree"
                                                value={formData.data.Diploma_college_details.diploma_college_degree || values?.Diploma_college_details?.diploma_college_degree}
                                                onChange={handleChange}
                                                fullWidth
                                                margin="dense"
                                                error={Boolean(error1.diploma_college_degree)}
                                                helperText={error1.diploma_college_degree}

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
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Key-skills"
                                                    fullWidth
                                                    margin="dense"
                                                    style={{backgroundColor:'white'}}

                                                />
                                            )}
                                            value={Array.isArray(formData.data.jobPreference.key_skills) ? formData.data.jobPreference.key_skills : []}
                                            onChange={(event, newValues) => handleAutoCompleteChange(event, newValues, 'key_skills')}
                                        />

                                        <TextField className='textfield'
                                            label="Industry"
                                            name="industry"
                                            value={formData.data.jobPreference.industry || values?.jobPreference?.industry}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.industry)}
                                            helperText={error1.industry}


                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField className='textfield'
                                            label="Department"
                                            name="department"
                                            value={formData.data.jobPreference.department || values?.jobPreference?.department}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="dense"
                                            error={Boolean(error1.department)}
                                            helperText={error1.department}



                                        />
                                        {/* <TextField className='textfield'
                                            label="Prefered locations"
                                            name="prefered_locations"
                                            value={formData.data.jobPreference.prefered_locations}
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
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Preferred Locations"
                                                    fullWidth
                                                    margin="dense"
                                                    style={{backgroundColor:'white'}}
                                                />
                                            )}
                                            value={Array.isArray((formData.data.jobPreference.prefered_locations) || (values?.jobPreference?.prefered_locations)) ? formData.data.jobPreference.prefered_locations : [] }
                                      
                                            
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
                                    {formData.data.professionalDetails.companies.map ((company, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <TextField
                                                className='textfield'

                                                label={`Company ${index + 1}`}
                                                value={company.company_name}
                                                onChange={(event) => handleCompanyChange(event, index, 'company_name')}
                                                fullWidth
                                            />
                                            <TextField
                                                className='textfield'
                                                label={`Years of Experience`}
                                                value={company.years_of_experience}
                                                onChange={(event) => handleCompanyChange(event, index, 'years_of_experience')}
                                                fullWidth
                                                margin="dense"
                                            />
                                            <TextField
                                                className='textfield'
                                                label={`Job Role`}
                                                value={company.job_role}
                                                onChange={(event) => handleCompanyChange(event, index, 'job_role')}
                                                fullWidth
                                                margin="dense"
                                            />
                                            <TextField
                                                className='textfield'
                                                label={`Skills`}
                                                value={company.skills}
                                                onChange={(event) => handleCompanyChange(event, index, 'skills')}
                                                fullWidth
                                                margin="dense"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <TextField
                                    className='textfield'
                                    label="Number of Companies"
                                    type="number"
                                    name="numberOfCompanies"

                                    value={formData.data.professionalDetails.numberOfCompanies}
                                    onChange={handleNumberOfCompaniesChange}
                                    fullWidth
                                    margin="dense"

                                />
                                <Divider sx={{ marginY: 2, bgcolor: '#5C6BC0', borderWidth: '1px' }} />

                            </AccordionDetails>
                            {/* resume */}
                            <AccordionSummary >
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
                                        {/* <p>Resume URL: <a href={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.resume.resume_path}`} target="_blank">{formData.data.resume.resume_path}</a></p> */}
                                        <iframe
                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData.data.resume.resume_path}`)}&embedded=true&rm=minimal`}
                                            width="250" height="150" style={{ border: 'none' }}
                                            title="Resume"
                                        />
                                    </div>
                                )}
                            </AccordionDetails>
                            {/* <Button type="submit" variant="contained" color="primary" fullWidth>Update</Button> */}
                            {/* <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                {isSubmitting ? 'Updating... Please wait': 'Update'}
                            </Button> */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                style={{ position: 'relative' }} // Add this style to enable absolute positioning for the loader
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


                        </form>



                    </Container>
                    <ToastContainer />
                </div>
            )}

        </div>
    );
};

export default UserProfile;