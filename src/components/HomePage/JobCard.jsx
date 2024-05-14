import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../CommonAPI';
import UserContext from '../Sprint 2/contextFilter';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import HybridImage from './JobcardImages/image.png'; // Import the image file
import FullTimeImage from './JobcardImages/image.png';
import TemporaryImage from './JobcardImages/image.png';
import PartTimeImage from './JobcardImages/image.png';
import InternshipImage from './JobcardImages/image.png';
import WorkFromHomeImage from './JobcardImages/image.png';

export const JobCard = () => {
  const navigate = useNavigate();
  const { jobData, setJobData, setsearchJob, setData, setcompanyList } = useContext(UserContext);
  const jobTypes = ['Hybrid', 'Full Time', 'Temporary', 'Part Time', 'Internship','Work From Home'];
  const itemsPerPage = { xs: 1, sm: 2, md: 3, lg: 4 }; 
  const [currentPage, setCurrentPage] = useState(0);
  const jobTypeImages = {
    Hybrid: { imageUrl: HybridImage }, // Use the imported image
    'Full Time': { imageUrl: FullTimeImage  },
    Temporary: { imageUrl: TemporaryImage  },
    'Part Time': { imageUrl: PartTimeImage },
    Internship: { imageUrl: InternshipImage },
    'Work From Home': { imageUrl: WorkFromHomeImage},
  };
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleViewAllClick = async (employeeType) => {
    try {
      const token = localStorage.getItem('loginToken');
      const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
        employee_type: employeeType,
        token
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setJobData(response.data);

      const employee_type_response_result = response.data
      localStorage.setItem("Employee_type_result", JSON.stringify(employee_type_response_result));
      const storedDataToUse = JSON.parse(localStorage.getItem("Employee_type_result"));
      console.log(storedDataToUse, 'storedDataToUse------->');
      // Check if storedDataToUse is equal to dataToUse
      if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(employee_type_response_result)) {
        // If equal, set resultdataToUse to storedDataToUse
        localStorage.setItem("Employee_type_result", JSON.stringify(employee_type_response_result));
        localStorage.removeItem("Search_result");
          localStorage.removeItem("Filter_result");
          localStorage.removeItem("Company_result");
      } else {
        // If not equal, remove the previous dataToUse from localStorage
        localStorage.removeItem("Employee_type_result");
        localStorage.removeItem("Search_result");
          localStorage.removeItem("Filter_result");
          localStorage.removeItem("Company_result");
        // Update localStorage with the new dataToUse
        localStorage.setItem("Employee_type_result", JSON.stringify(employee_type_response_result));
      }

      if (jobData !== null) {
        setJobData(response.data)
        setsearchJob(null);
        setData(null);
        setcompanyList(null)
      }
      const message = response.data.message; 
      navigate('/Filter');
      // setTimeout(() => {
      //   alert(message);
      // }, 1000); // Delay alert by 1 second
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
      
      <div style={{ overflowX: 'scroll', width: '100%', padding: '20px' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" width='fit-content'>
        <Button  disabled={currentPage === 0} onClick={handlePrevPage}><ArrowCircleLeftIcon /></Button>

          {jobTypes.slice(startIndex, endIndex).map((type, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
              <Paper style={{ width: '100%', height: 'auto', padding: '20px', backgroundColor: '#E8EAF6', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={jobTypeImages[type].imageUrl}  alt={type} style={{ marginBottom: '10px', width: '100%', height: '100%',borderRadius:'10px' }} />
                <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>{type} Jobs</Typography>
                <Button variant="contained" onClick={() => handleViewAllClick(type)} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
              </Paper>

            </Grid>
          ))}
          <Button  disabled={endIndex >= jobTypes.length} onClick={handleNextPage}><ArrowCircleRightIcon /></Button>

          {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
            
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};