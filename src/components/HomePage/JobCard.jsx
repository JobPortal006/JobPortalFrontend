import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const JobCard = () => {
  const navigate = useNavigate();

  const handleViewAllClick = async (employeeType) => {
    try {
      const response = await axios.post('http://192.168.1.44:8000/job_details_by_employeeType/', {
        employee_type: employeeType
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Log the response data to the console
      navigate('/newpost');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const requestData = [
    { employee_type: "Full time" },
    { employee_type: "Part time" },
    { employee_type: "Work From Home" },
    { employee_type: "Part time" }
  ];

  return (
    <>
    <Grid padding='20px'  >
    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight:'bold',padding:'20px' }}>Employee Types</Typography>
    <Grid container spacing={2} justifyContent="center" padding='20px'>
      <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ 
              width: '100%', 
              paddingTop: '100%', 
              position: 'relative', 
              backgroundColor: '#E8EAF6',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#9FA8DA', // Updated background color on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }
            }}
            elevation={3}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             
            <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Hybrid Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Hybrid')}sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
              paddingTop: '100%', 
              position: 'relative', 
              backgroundColor: '#E8EAF6',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#9FA8DA', // Updated background color on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           
            <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Full Time Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Full Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }} >View All</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
              paddingTop: '100%', 
              position: 'relative', 
              backgroundColor: '#E8EAF6',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#9FA8DA', // Updated background color on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
            <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Work From Home Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Work From Home')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
              paddingTop: '100%', 
              position: 'relative', 
              backgroundColor: '#E8EAF6',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#9FA8DA', // Updated background color on hover
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
            <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Part Time Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Part Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
          </div>
        </Paper>
      </Grid>
      
    </Grid>
    </Grid>
    </>
  );
};