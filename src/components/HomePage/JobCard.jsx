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
      const response = await axios.post('http://192.168.1.39:8000/job_details_by_employeeType/', {
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
    { employee_type: "Work From Home" }
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ width: '100%', paddingTop: '100%', position: 'relative', border: 'none' }} elevation={3}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Popular Searches
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
            paddingTop: '100%', 
            position: 'relative', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#FF8C00', marginBottom: '10px' }}>TRENDING AT #1</Typography>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Full Time Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Full Time')} sx={{ backgroundColor: '#FF8C00', '&:hover': { backgroundColor: '#FFA500' } }} color="primary">View All</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
            paddingTop: '100%', 
            position: 'relative', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#FF8C00', marginBottom: '10px' }}>TRENDING AT #2</Typography>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Work From Home Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Work From Home')} sx={{ backgroundColor: '#0000FF', '&:hover': { backgroundColor: '#4169E1' } }} color="primary">View All</Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{ 
            width: '100%', 
            paddingTop: '100%', 
            position: 'relative', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            }
          }}
          elevation={3}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#FF8C00', marginBottom: '10px' }}>TRENDING AT #3</Typography>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Part Time Jobs</Typography>
            <Button variant="contained" onClick={() => handleViewAllClick('Part Time')} sx={{ backgroundColor: '#008000', '&:hover': { backgroundColor: '#00FF00' } }} color="primary">View All</Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
