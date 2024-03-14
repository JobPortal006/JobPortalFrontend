// import React, { useState,useContext } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import UserContext from '../Sprint 2/contextFilter';

// export const ApplyJob = ({ onClose }) => {
//     const { responseData } = useContext(UserContext);
//     console.log(responseData,"========applyjob")
//     const [formData, setFormData] = useState({
//         email: '',
//         mobileNumber: '',
//         resume: null,
//     });
//     const [error, setError] = useState('');

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setFormData(prevState => ({
//             ...prevState,
//             resume: file,
//         }));
//     };

//     const handleDeleteResume = () => {
//         setFormData(prevState => ({
//             ...prevState,
//             resume: null,
//         }));
//     };

//     const handleSubmit = () => {
//         // Check if all required fields are filled
//         if (!formData.email || !formData.mobileNumber || !formData.resume) {
//             setError('Please fill in all required fields.');
//             return;
//         }

//         // Handle form submission logic here
//         console.log('Form Data:', formData);
//         setError(''); // Clear any previous error
//         // onClose(); // Close the dialog
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 minHeight: '70vh',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 backgroundColor: '#ffffff',
//                 width: '100%',
//                 margin: 'auto',
//                 marginTop:'8%'
//             }}
//         >
//             <Typography variant='h4' marginBottom='10%' >APPLY JOB</Typography>
//             <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 variant="outlined"
//                 style={{ marginBottom: '20px' }}
//             />
//             <TextField
//                 fullWidth
//                 label="Mobile Number"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 variant="outlined"
//                 style={{ marginBottom: '20px' }}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             {formData.resume && (
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                     <Typography variant="body1" sx={{ marginRight: '10px' }}>
//                         Resume:
//                     </Typography>
//                     {formData.resume.type.startsWith('image/') ? (
//                         <img src={URL.createObjectURL(formData.resume)} alt="Resume Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
//                     ) : (
//                         <ImageIcon sx={{ fontSize: 48, marginRight: '10px' }} />
//                     )}
//                     <Typography variant="body2" sx={{ marginRight: '10px' }}>
//                         {formData.resume.name}
//                     </Typography>
//                     <Button variant="outlined" color="secondary" onClick={handleDeleteResume}>
//                         Delete
//                     </Button>
//                 </Box>
//             )}
//             <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,image/*" // Allow image files for preview
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 id="resume-upload"
//             />
//             <label htmlFor="resume-upload">
//                 <Button
//                     variant="contained"
//                     component="span"
//                     color="primary"
//                     style={{ marginBottom: '20px' }}
//                 >
//                     Upload Resume
//                 </Button>
//             </label>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </Button>
//         </Box>
//     );
// };


// import React, { useState, useContext } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import UserContext from '../Sprint 2/contextFilter';

// export const ApplyJob = ({ onClose }) => {
//     const { responseData } = useContext(UserContext);

//     const [formData, setFormData] = useState({
//         email: responseData.email || '',
//         mobileNumber: responseData.mobile_number || '',
//         resumePath: responseData.resume_path || '',
//     });
//     const [error, setError] = useState('');

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setFormData(prevState => ({
//                 ...prevState,
//                 resumePath: file.name, // Set resumePath to the file name
//             }));
//         }
//     };

//     const handleDeleteResume = () => {
//         setFormData(prevState => ({
//             ...prevState,
//             resumePath: '', // Clear the resumePath
//         }));
//     };

//     const handleSubmit = () => {
//         // Check if all required fields are filled
//         if (!formData.email || !formData.mobileNumber || !formData.resumePath) {
//             setError('Please fill in all required fields.');
//             return;
//         }

//         // Handle form submission logic here
//         console.log('Form Data:', formData);
//         setError(''); // Clear any previous error
//         // onClose(); // Close the dialog
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 minHeight: '70vh',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 backgroundColor: '#ffffff',
//                 width: '100%',
//                 margin: 'auto',
//                 marginTop:'8%'
//             }}
//         >
//             <Typography variant='h4' marginBottom='10%' >APPLY JOB</Typography>
//             <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 variant="outlined"
//                 style={{ marginBottom: '20px' }}
//             />
//             <TextField
//                 fullWidth
//                 label="Mobile Number"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 variant="outlined"
//                 style={{ marginBottom: '20px' }}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             {formData.resumePath && (
//                 <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                     <Typography variant="body1" sx={{ marginRight: '10px' }}>
//                         Resume:
//                     </Typography>
//                     <ImageIcon sx={{ marginRight: '10px' }} /> 
//                     <Typography variant="body2" sx={{ marginRight: '10px' }}>
//                         {formData.resumePath}
//                     </Typography>
//                     <Button variant="outlined" color="secondary" onClick={handleDeleteResume}>
//                         Delete
//                     </Button>
//                 </Box>
//             )}

//             <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,image/*" // Allow image files for preview
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 id="resume-upload"
//             />
//             <label htmlFor="resume-upload">
//                 <Button
//                     variant="contained"
//                     component="span"
//                     color="primary"
//                     style={{ marginBottom: '20px' }}
//                 >
//                     Upload Resume
//                 </Button>
//             </label>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </Button>
//         </Box>
//     );
// };


import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import UserContext from '../Sprint 2/contextFilter';
import axios from 'axios';

export const ApplyJob = ({ onClose }) => {
    const { responseData } = useContext(UserContext);
    console.log(responseData,"---------apply")
    const { detailData } = useContext(UserContext);
    console.log(detailData,"-post");

    const [formData, setFormData] = useState({
        userId: detailData.user_id,
        jobId: detailData.job_id,
        email: responseData.email || '',
        mobileNumber: responseData.mobile_number || '',
        resumePath: responseData.resume_path || '',
        additionalQueries: responseData.additional_queries || '',
        lastCTC: '',
        expectedSalary: '',
        totalExperience: '',
        noticePeriod: ''
    });
    const [error, setError] = useState('');
    const [showExtraFields, setShowExtraFields] = useState(formData.additionalQueries);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                resumePath: file, // Set resumePath to the file name
            }));
        }
    };

    const handleDeleteResume = () => {
        setFormData(prevState => ({
            ...prevState,
            resumePath: '', // Clear the resumePath
        }));
    };

    const handleSubmit = () => {
        // Check if all required fields are filled
        if (!formData.email || !formData.mobileNumber || !formData.resumePath) {
            setError('Please fill in all required fields.');
            return;
        }
        
        const token = localStorage.getItem('loginToken');
        // Handle form submission logic here
        console.log('Form Data:', formData);
        setError(''); // Clear any previous error
        // onClose(); // Close the dialog
    
        if (!showExtraFields) {
            const formDataForUpload = new FormData();
            formDataForUpload.append('email', formData.email);
            formDataForUpload.append('mobileNumber', formData.mobileNumber);
            formDataForUpload.append('resumePath', formData.resumePath);
            formDataForUpload.append('token', token);
            formDataForUpload.append('job_id', formData.jobId);
    
            axios.post('http://192.168.1.44:8000/apply_job/', formDataForUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log('API Response:', response.data);
                // Handle response as needed
            }).catch(error => {
                console.error('API Error:', error);
                // Handle error as needed
            });
        }
    };
    

    const handleApply = () => {
        // Make API request if additional_queries is True
        if (showExtraFields) {
            const formDataForUpload = new FormData();
            const token = localStorage.getItem('loginToken');
            
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

            axios.post('http://192.168.1.44:8000/apply_job/', formDataForUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log('API Response:', response.data);
                // Handle response as needed
            }).catch(error => {
                console.error('API Error:', error);
                // Handle error as needed
            });
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                width: '100%',
                margin: 'auto',
                marginTop:'8%'
            }}
        >
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
            {formData.resumePath && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        Resume:
                    </Typography>
                    <ImageIcon sx={{ marginRight: '10px' }} /> 
                    <Typography variant="body2" sx={{ marginRight: '10px' }}>
                        {formData.resumePath.name}
                    </Typography>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteResume}>
                        Delete
                    </Button>
                </Box>
            )}

            <input
                type="file"
                accept=".pdf,.doc,.docx,image/*" // Allow image files for preview
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="resume-upload"
            />
            <label htmlFor="resume-upload">
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    style={{ marginBottom: '20px' }}
                >
                    Upload Resume
                </Button>
            </label>

            {showExtraFields==="Yes" && (
                <>
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

            <Button
                variant="contained"
                color="primary"
                onClick={showExtraFields ? handleApply : handleSubmit}
            >
                {showExtraFields ? 'Apply' : 'Submit'}
            </Button>
        </Box>
    );
};
