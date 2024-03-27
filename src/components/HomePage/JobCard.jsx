import React, { useContext, useState } from 'react';
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
  const jobTypes = ['Hybrid', 'Full Time', 'Temporary', 'Part Time', 'Internship'];
  const itemsPerPage = { xs: 1, sm: 2, md: 3, lg: 4 }; 
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

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
      const message = response.data.message; 
      navigate('/Filter');
      setTimeout(() => {
        alert(message);
      }, 1000); // Delay alert by 1 second
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const itemsPerPageForScreen = itemsPerPage.md;

  const startIndex = currentPage * itemsPerPageForScreen;
  const endIndex = startIndex + itemsPerPageForScreen;

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight: 'bold', padding: '20px', marginTop: '40px' }}>Employee Types</Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center" padding='20px' width='100%'>
        {jobTypes.slice(startIndex, endIndex).map((type, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <Paper style={{ width: '100%', height: '200px', padding: '20px', backgroundColor: '#E8EAF6', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>{type} Jobs</Typography>
              <Button variant="contained" onClick={() => handleViewAllClick(type)} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
          <Button variant="contained" sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }} disabled={currentPage === 0} onClick={handlePrevPage}>Previous</Button>
          <Button variant="contained" sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }} disabled={endIndex >= jobTypes.length} onClick={handleNextPage}>Next</Button>
        </Grid>
      </Grid>
    </>
  );
};