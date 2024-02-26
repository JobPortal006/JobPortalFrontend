import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';              

const JobDetails = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get('http://192.168.1.38:8000/get_job_details/');
        if (response.data.status) {
          setJobData(response.data.data[0]);
          console.log('Fetched job data:', response.data.data[0]);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobDetails();
  }, []);

  return (
    <Box sx={{ background: 'rgb(255,255,255)', background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(196,255,236,1) 46%)', minHeight: '100vh', padding: '30px' }}>
      <Grid container spacing={2} justifyContent="center">
        {jobData.map((job, index) => (
          <Grid item key={index} xs={12} md={6}>
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', borderRadius: '8px', maxWidth: '100%', backgroundColor: 'white' }}>
              <Typography variant="h5" gutterBottom>
                {job.job_title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <BusinessIcon /> {job.company_name}
              </Typography>
              <Typography variant="subtitle1" marginTop='20px' gutterBottom style={{ marginTop: '10px' }}>
                <LocationOnIcon /> {`${job.address.street}, ${job.address.city}, ${job.address.state}, ${job.address.country} - ${job.address.pincode}`}
              </Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <WorkIcon />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}>Experience: {job.experience}</Typography>
                </Grid>
                <Grid item>
                  <SchoolOutlinedIcon style={{ marginTop: '10px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}>Qualification: {job.qualification}</Typography>
                </Grid>
                <Grid item>
                  <AttachMoneyIcon style={{ marginTop: '10px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Salary: {job.salary_range}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="primary">Apply</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Typography variant="subtitle2" gutterBottom style={{ marginTop: '10px' }}>
                Posted: {job.created_at}
              </Typography>
            </Box>
            <Box sx={{ p: 3, border: '1px solid #ccc', backgroundColor: 'white', marginLeft: '2%', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Job Description
              </Typography>
              <Typography variant="body1">
                {job.job_description}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Role: {job.job_role}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Industry Type: {job.industry_type}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Education: {job.qualification}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Employment Type: {job.employee_type}
              </Typography>
            </Box>
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', backgroundColor: 'white', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
              <Typography variant="h5" gutterBottom>
                About Company
              </Typography>
              <Typography variant="body1">
                {job.company_description}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Company Description: {job.company_description}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Company Address: {`${job.address.street}, ${job.address.city}, ${job.address.state}, ${job.address.country} - ${job.address.pincode}`}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                No.of Employees: {job.no_of_employees}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                Company Website: {job.company_website_link}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobDetails;

