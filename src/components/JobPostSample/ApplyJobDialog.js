// import React from 'react';
// import { Dialog, DialogContent } from '@mui/material';
// import { ApplyJob } from './ApplyJob';



// const ApplyJobDialog = ({ open, onClose }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogContent>
//         <ApplyJob />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ApplyJobDialog;


import React, { useState, useContext,useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import UserContext from '../Sprint 2/contextFilter';
import axios from 'axios';
import BASE_URL from '../CommonAPI';
import { useNavigate } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";
import { Close } from '@mui/icons-material'; 

const ApplyJobDialog = ({ open, onClose }) => {
    const { detailData } = useContext(UserContext);
    let responseData = JSON.parse(localStorage.getItem("apply_job_result"));
    if (!responseData) {
        responseData = {};
    }
    const navigate = useNavigate();
console.log(detailData,'detailData-----formData');
// console.log(responseData,'responseData-----formData');
    const [formData, setFormData] = useState({
        jobId: detailData?.job_id || '',
        email: responseData.email,
        mobileNumber: responseData.mobile_number,
        resumePath: responseData.resume_path || null,
        additionalQueries: responseData.additional_queries,
        lastCTC: '',
        expectedSalary: '',
        totalExperience: '',
        noticePeriod: ''
    });
    useEffect(() => {
        if (responseData.additional_queries === "Yes") {
            setShowExtraFields(true);
        } else {
            setShowExtraFields(false);
        }

        if (detailData?.job_id) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                jobId: detailData.job_id
            }));
        }
    }, [JSON.stringify(detailData), JSON.stringify(responseData),detailData.job_id,responseData.additional_queries]);


    // console.log(formData, 'formData--------');
    // console.log(formData?.email, 'formData-----');
    const [error, setError] = useState('');
    const [errorOne, setErrorOne] = useState('');
    const [showExtraFields, setShowExtraFields] = useState(false);
    const [alreadyApplied, setAlreadyApplied] = useState(false);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [resumeFile, setResumeFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setResumeFile(file);
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                resumePath: file,
            }));
        }
    };

    const handleDeleteResume = () => {
        setResumeFile(null);
        setFormData(prevState => ({
            ...prevState,
            resumePath: null, // Reset to null when deleting
        }));
    };

    const handleApply = () => {
        if (!formData.email || !formData.mobileNumber || !formData.resumePath) {
            setError('Please fill in all required fields.');
            return;
        }

        const token = localStorage.getItem('loginToken');

        setError('');

        const formDataForUpload = new FormData();
        formDataForUpload.append('email', formData.email);
        formDataForUpload.append('mobile_number', formData.mobileNumber);
        formDataForUpload.append('resume_path', formData.resumePath);
        formDataForUpload.append('token', token);
        formDataForUpload.append('job_id', formData.jobId);

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.post(`${BASE_URL}/apply_job/`, formDataForUpload, { headers })
            .then(response => {
                if (response.data.status === true) {
                    alert(response.data.message);
                    navigate('/UserDashBoard');
                } else {
                    setAlreadyApplied(true);
                }
            })
            .catch(error => {
                console.error('API Error:', error);
                // Handle error, e.g., show error message to the user
            });
    };

    const handleSubmit = () => {
        if (showExtraFields && (!formData.email || !formData.mobileNumber || !formData.resumePath || !formData.lastCTC || !formData.expectedSalary || !formData.totalExperience || !formData.noticePeriod)) {
            setErrorOne('Please fill in all required fields.');
            return;
        }
        if (showExtraFields) {
            const token = localStorage.getItem('loginToken');
            setErrorOne(''); // Reset error before making API call

            const formDataForUpload = new FormData();
            formDataForUpload.append('email', formData.email);
            formDataForUpload.append('mobile_number', formData.mobileNumber);
            formDataForUpload.append('additional_queries', formData.additionalQueries);
            formDataForUpload.append('current_ctc', formData.lastCTC);
            formDataForUpload.append('expected_ctc', formData.expectedSalary);
            formDataForUpload.append('total_experience', formData.totalExperience);
            formDataForUpload.append('notice_period', formData.noticePeriod);
            formDataForUpload.append('resume_path', formData.resumePath);
            formDataForUpload.append('token', token);
            formDataForUpload.append('job_id', formData.jobId);

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            axios.post(`${BASE_URL}/apply_job/`, formDataForUpload, { headers })
                .then(response => {
                    if (response.data.status === true) {
                        alert(response.data.message);
                        navigate('/UserDashBoard');
                    } else {
                        setAlreadyApplied(true);
                    }
                })
                .catch(error => {
                    console.error('API Error:', error);
                    // Handle error, e.g., show error message to the user
                    setErrorOne('An error occurred while processing your request. Please try again.');
                });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Box
                    sx={{
                        position: 'relative', // Add position relative to allow positioning of close button
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '70vh',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        width: '500px',
                        margin: 'auto',
                        marginTop: '8%'
                    }}
                >
                    {/* Close button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px'
                        }}
                        onClick={onClose} // Call the onClose function when the close button is clicked
                    >
                        <Close />
                    </IconButton>

            <Typography variant='h4' marginBottom='10%' >APPLY JOB</Typography>
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                style={{ marginBottom: '20px' }}
            />
            <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                variant="outlined"
                style={{ marginBottom: '20px' }}
            />
            {error && <Typography color="error">{error}</Typography>}
                                  <label htmlFor="resume-input">Upload Resume:</label>
                            <br />
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={handleFileChange}
                                margin="dense"
                                id="resume-input"
                                style={{ display: "none" }}
                                
                            />

                       
                            {!resumeFile && formData?.resumePath && (
                                <div>
                                    {/* <iframe
                                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.resumePath}`)}&embedded=true&rm=minimal`}
                                        width="250" height="150" style={{ border: 'none' }}
                                        title="Resume"
                                        
                                    /> */}
                                    <div>
                                        <p>Resume File: <a href={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${formData?.resumePath}`} download>{formData?.resumePath}</a></p>
                                        <Button  color="secondary" onClick={handleDeleteResume}>
                                            Remove Resume
                                        </Button>
                                    </div>
                                </div>
                            )}

                       
                            {resumeFile && (
                                <div>
                                    <p>Resume File: <a href={URL.createObjectURL(resumeFile)} download>{resumeFile.name}</a></p>
                                    <Button  color="secondary" onClick={handleDeleteResume}>
                                        Remove Resume
                                    </Button>
                                </div>
                            )}

                            {!resumeFile && !formData?.resumePath && (
                                <div>
                                    <label htmlFor="resume-input">
                                        <IconButton
                                            component="span"
                                            size="small"
                                            
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

            {showExtraFields && (
                <>
                    {errorOne && <Typography color="error">{errorOne}</Typography>}
                    <TextField
                        fullWidth
                        label="What is your last CTC?"
                        name="lastCTC"
                        value={formData.lastCTC}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        fullWidth
                        label="What is your expected salary?"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        fullWidth
                        label="How much total experience do you have?"
                        name="totalExperience"
                        value={formData.totalExperience}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        fullWidth
                        label="What is the notice period in your current organization?"
                        name="noticePeriod"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ marginBottom: '20px' }}
                    />
                </>
            )}

            {!alreadyApplied ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={showExtraFields ? handleSubmit : handleApply}
                >
                    {showExtraFields ? 'Submit' : 'Apply'}
                </Button>
            ) : (
                <Button variant="contained" color="secondary">
                    Already Applied
                </Button>
            )}
        </Box>
      </DialogContent>
    </Dialog>
  );



};

export default ApplyJobDialog;