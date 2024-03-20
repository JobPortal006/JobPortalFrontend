import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../CommonAPI';
import UserContext from '../Sprint 2/contextFilter';

export const JobCard = () => {
  const navigate = useNavigate();
  const { jobData, setJobData, setsearchJob, setData, setcompanyList } = useContext(UserContext);

  const handleViewAllClick = async (employeeType) => {
    try {
      const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
        employee_type: employeeType
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setJobData(response.data);
      if (jobData !== null) {
        setJobData(response.data)
        setsearchJob(null);
        setData(null);
        setcompanyList(null)
      }
      navigate('/Filter');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Grid container justifyContent="center" padding='20px'>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight: 'bold', padding: '20px' }}>Employee Types</Typography>

        <Grid item sx={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex' }}>
            <Paper
              sx={{
                flex: '0 0 auto',
                width: '300px',
                margin: '0 10px',
                padding: '20px',
                backgroundColor: '#E8EAF6',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9FA8DA',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }
              }}
              elevation={3}
            >
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Hybrid Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick('Hybrid')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>
            <Paper
              sx={{
                flex: '0 0 auto',
                width: '300px',
                margin: '0 10px',
                padding: '20px',
                backgroundColor: '#E8EAF6',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9FA8DA',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }
              }}
              elevation={3}
            >
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Full Time Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick('Full Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>
            <Paper
              sx={{
                flex: '0 0 auto',
                width: '300px',
                margin: '0 10px',
                padding: '20px',
                backgroundColor: '#E8EAF6',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9FA8DA',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }
              }}
              elevation={3}
            >
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Temporary Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick('Temporary')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>
            <Paper
              sx={{
                flex: '0 0 auto',
                width: '300px',
                margin: '0 10px',
                padding: '20px',
                backgroundColor: '#E8EAF6',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9FA8DA',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }
              }}
              elevation={3}
            >
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Part Time Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick('Part Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>
            <Paper
              sx={{
                flex: '0 0 auto',
                width: '300px',
                margin: '0 10px',
                padding: '20px',
                backgroundColor: '#E8EAF6',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#9FA8DA',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer'
                }
              }}
              elevation={3}
            >
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Internship Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick('Internship')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>

          </div>
        </Grid>
      </Grid>
    </>
  );
};

