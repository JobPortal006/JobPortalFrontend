import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

export const ApplyJob = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        mobileNumber: '',
        resume: null,
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            resume: file,
        }));
    };

    const handleDeleteResume = () => {
        setFormData(prevState => ({
            ...prevState,
            resume: null,
        }));
    };

    const handleSubmit = () => {
        // Check if all required fields are filled
        if (!formData.email || !formData.mobileNumber || !formData.resume) {
            setError('Please fill in all required fields.');
            return;
        }

        // Handle form submission logic here
        console.log('Form Data:', formData);
        setError(''); // Clear any previous error
        // onClose(); // Close the dialog
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
            {formData.resume && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="body1" sx={{ marginRight: '10px' }}>
                        Resume:
                    </Typography>
                    {formData.resume.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(formData.resume)} alt="Resume Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                    ) : (
                        <ImageIcon sx={{ fontSize: 48, marginRight: '10px' }} />
                    )}
                    <Typography variant="body2" sx={{ marginRight: '10px' }}>
                        {formData.resume.name}
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
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Box>
    );
};