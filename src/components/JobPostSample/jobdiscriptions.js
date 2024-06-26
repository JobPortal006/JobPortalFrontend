import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ApplyJobDialog from './ApplyJobDialog';
import BASE_URL from '../CommonAPI';
import UserContext from '../Sprint 2/contextFilter';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const [jobData, setJobData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { responseData, setResponseData } = useContext(UserContext);
  console.log(responseData, "resssssssssssss==up")
  const { detailData, setDetailData } = useContext(UserContext);
  // console.log(detailData, "detailData=======up")
  const [alreadyApplied, setAlreadyApplied] = useState(false); // New state for application status

  const navigate = useNavigate();



  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_job_details/`);
        if (response.data.status) {
          setJobData(response.data.data[0]);
          console.log('Fetched job data:', response.data.data[0]);
          const jobId = response.data.data[0][0].job_post_id; // Assuming job_post_id is the job_id
          setPostData({ token, job_id: jobId });
        } else {
          console.error('Error:', response.data.message);
        }
        // Check if the user has already applied for the job
        if (response.data.status && response.data.message === false) {
          setAlreadyApplied(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobDetails();
  }, []);


  const logintoken = localStorage.getItem('loginToken');
  const googleToken = localStorage.getItem("googleSecondToken")
  const otpToken = localStorage.getItem("otpToken")
  let token = logintoken || googleToken || otpToken;
  const [postdata, setPostData] = useState({
    token,
    job_id: null
  });

  console.log(postdata, 'token====');
  const handleApplyClick = async () => {
    try {
      if (!token) {
        // If token is null, display alert and navigate to login page
        alert('Please create an account and login to apply for the job.');
        navigate('/login'); // Navigate to the login page
        return;
      }else{

      const response = await axios.post(`${BASE_URL}/get_apply_job/`, {
        postdata
      });

      if (response.data.message === 'You have not completed the registration process') {
        alert('Please complete the registration process.');
        navigate('/CreateAccount'); // Navigate to the user profile page
        return;
      }

      
      
      setResponseData(response.data);
      console.log(response,'get_apply_job')
      const applyjobResponse = response.data;
      setDetailData(postdata);
      if(response.data !== null){
        setDialogOpen(true);
        localStorage.setItem("apply_job_result", JSON.stringify(applyjobResponse));
        const storedDataToUse = JSON.parse(localStorage.getItem("apply_job_result"));
        console.log(storedDataToUse, 'storedDataToUse------->');
        if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(applyjobResponse)) {
          // If equal, set resultdataToUse to storedDataToUse
          localStorage.setItem("apply_job_result", JSON.stringify(applyjobResponse));
         
        } else {
          localStorage.setItem("apply_job_result", JSON.stringify(applyjobResponse));
        }
      }
    }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const registeredBy = localStorage.getItem('registered_by');

  return (
    <Box sx={{ backgroundColor: '#1A237E', minHeight: '100vh', padding: '30px', marginTop: '50px' }}>
      <Grid container spacing={2} justifyContent="center">
        {jobData.map((job, index) => (
          <Grid item key={index} xs={12} md={6} lg={8}>
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', borderRadius: '8px', maxWidth: '100%', backgroundColor: '#E8EAF6' }}>
              {job.company_logo_path && job.company_logo_path.includes('data:image') ? (
                <img src={job.company_logo_path} alt="Company Logo" />
              ) : (
                <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.company_logo_path}`} alt="Company Logo" style={{
                  position: 'relative',
                  width: '50px', // Adjust the size of the logo as needed
                  height: '50px',
                  borderRadius: '25px', // Make the logo rounded
                  border: '1px solid #ccc', // Add a border to the logo
                }} />
              )}
              <Typography variant="h5" color="#1A237E" gutterBottom style={{ marginTop: '10px', fontWeight: 'bold' }}>
                {job.job_title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <BusinessIcon style={{ color: '#1A237E', marginBottom: '5px' }} /> {job.company_name}
              </Typography>
              <Typography variant="h6" gutterBottom style={{ marginTop: '10px' }}>
                <LocationOnIcon style={{ marginBottom: '5px', color: '#1A237E' }} /> {job.location.map((location, index) => (
                  <span key={index}>{location}{index !== job.location.length - 1 && ','}</span>
                ))}
              </Typography>
              <Grid container spacing={0.5} alignItems="center">
                <Grid item>
                  <WorkIcon style={{ marginTop: '8px', color: '#1A237E' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Experience: </span> {job.experience}</Typography>
                </Grid>
                <Grid item>
                  <SchoolOutlinedIcon style={{ marginTop: '8px', color: '#1A237E' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}><span style={{ fontWeight: 'bold' }}>Qualification:</span> {job.qualification.map((qualification, index) => (
                    <span key={index}>
                      {qualification}
                      {index !== job.qualification.length - 1 && ', '} {/* Add comma between qualifications except for the last one */}
                    </span>
                  ))}</Typography>
                </Grid>
                <Grid item>
                  <CurrencyRupeeIcon style={{ marginTop: '10px', color: '#1A237E' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginTop: '10px' }}> <span style={{ fontWeight: 'bold' }}>Salary:</span> {job.salary_range}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    {/* {!alreadyApplied ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyClick}
                    
                >
                  Apply
                </Button>
            ) : (
                <Button variant="contained" color="secondary">
                    Already Applied 
                </Button>
            )} */}

                    {registeredBy !== 'Recruiter' && !alreadyApplied && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyClick}
                      >
                        Apply
                      </Button>
                    )}
                    {registeredBy !== 'Recruiter' && alreadyApplied && (
                      <Button variant="contained" color="secondary">
                        Already Applied
                      </Button>
                    )}



                  </Grid>
                </Grid>
              </Grid>
              <Typography variant="subtitle2" gutterBottom style={{ marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Posted:</span> {job.created_at}
              </Typography>
            </Box>
           {dialogOpen && <><ApplyJobDialog open={dialogOpen} onClose={handleCloseDialog} /> </>}
            <Box sx={{ p: 3, border: '1px solid #ccc', backgroundColor: '#E8EAF6', marginLeft: '2%', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
              <Typography variant="h4" color="#1A237E" textAlign="center" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Job Description</span>
              </Typography>
              <Typography variant="h6">
                {job.job_description}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Role:</span> {job.job_role}
              </Typography>
              <Typography variant="h6" style={{ marginTop: '20px' }}>
                <span style={{ fontWeight: 'bold' }}>Skills:</span>
                {job.skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                    {index !== job.skills.length - 1 && ', '}
                  </span>
                ))}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Industry Type:</span>  {job.industry_type}
              </Typography>
              {/* <Typography variant="h6" marginTop='20px' gutterBottom>
              <span style={{fontWeight:'bold'}}>Education:</span> {job.qualification}
              </Typography> */}
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Employment Type:</span>  {job.employee_type}
              </Typography>
            </Box>
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', backgroundColor: '#E8EAF6', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
              <Typography variant="h4" color="#1A237E" textAlign="center" fontWeight="bold" gutterBottom>
                About Company
              </Typography>
              {/* <Typography variant="body1">
                {job.company_description}
              </Typography> */}
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Company Description:</span> {job.company_description}
              </Typography>
              {/* <Typography variant="h6" marginTop='20px' gutterBottom>
                Company Address: {`${job.address.street}, ${job.address.city}, ${job.address.state}, ${job.address.country} - ${job.address.pincode}`}
              </Typography> */}
              <Typography variant="h6" marginTop='20px' gutterBottom>
                {job.address.map((address, index) => (
                  <span key={index}>
                    <span style={{ fontWeight: 'bold' }}>{`Company Address ${index + 1}: `}</span>
                    {`${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}
                    {index !== job.address.length - 1 && <br />} {/* Add line break except for the last address */}
                  </span>
                ))}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>No.of Employees:</span> {job.no_of_employees}
              </Typography>
              <Typography variant="h6" marginTop='20px' gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Company Website:</span> {job.company_website_link}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobDetails;
