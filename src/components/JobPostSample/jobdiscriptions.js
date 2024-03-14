// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Grid, Typography, Button } from '@mui/material';
// import BusinessIcon from '@mui/icons-material/Business';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import WorkIcon from '@mui/icons-material/Work';
// import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';             
// import ApplyJobDialog from './ApplyJobDialog';
// import BASE_URL from '../CommonAPI';

// const JobDetails = () => {
//   const [jobData, setJobData] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/get_job_details/`);
//         if (response.data.status) {
//           setJobData(response.data.data[0]);
//           console.log('Fetched job data:', response.data.data[0]);
//         } else {
//           console.error('Error:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchJobDetails();
//   }, []);

//   const handleApplyClick = () => {
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   return (
//     <Box sx={{backgroundColor:'#1A237E', minHeight: '100vh', padding: '30px' ,marginTop:'50px'}}>
//       <Grid container spacing={2} justifyContent="center">
//         {jobData.map((job, index) => (
//           <Grid item key={index} xs={12}  md={6} lg={8}>
//             <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', borderRadius: '8px', maxWidth: '100%', backgroundColor: '#E8EAF6' }}>
//             {job.company_logo && job.company_logo.includes('data:image') ? (
//               <img src={job.company_logo} alt="Company Logo" />
//                 ) : (
//               <img src={`data:image/jpeg;base64,${job.company_logo}`} alt="Company Logo" style={{
//                 position: 'absolute',
//                 width: '60px', // Adjust the size of the logo as needed
//                 height: 'auto',
//                 borderRadius: '50%', // Make the logo rounded
//                 border: '1px solid #ccc', // Add a border to the logo
//               }}  />
//                 )}
//               <Typography variant="h5" gutterBottom style={{marginLeft:'70px',marginTop:'10px'}}>
//                 {job.job_title}
//               </Typography>
//               <Typography variant="subtitle1" gutterBottom>
//                 <BusinessIcon /> {job.company_name}
//               </Typography>
//               <Typography variant="subtitle1"  gutterBottom style={{ marginTop: '10px' }}>
//                 <LocationOnIcon style={{marginBottom:'5px'}}/> {job.location}
//               </Typography>
//               <Grid container spacing={1} alignItems="center">
//                 <Grid item>
//                   <WorkIcon />  
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}><span style={{fontWeight:'bold'}}>Experience: </span> {job.experience}</Typography>
//                 </Grid>
//                 <Grid item>
//                   <SchoolOutlinedIcon />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}><span style={{fontWeight:'bold'}}>Qualification:</span> {job.qualification}</Typography>
//                 </Grid>
//                 <Grid item>
//                   <CurrencyRupeeIcon style={{ marginTop: '10px' }} />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="subtitle1" style={{ marginTop: '10px' }}> <span style={{fontWeight:'bold'}}>Salary:</span> {job.salary_range}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Grid container justifyContent="flex-end">
//                     <Button variant="contained" color="primary" onClick={handleApplyClick}>Apply</Button>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Typography variant="subtitle2" gutterBottom style={{ marginTop: '10px' }}>
//                 Posted: {job.created_at}
//               </Typography>
//             </Box>
//             <ApplyJobDialog open={dialogOpen} onClose={handleCloseDialog} />
//             <Box sx={{ p: 3, border: '1px solid #ccc', backgroundColor: '#E8EAF6', marginLeft: '2%', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
//               <Typography variant="h5" gutterBottom>
//                 Job Description
//               </Typography>
//               <Typography variant="body1">
//                 {job.job_description}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Role: {job.job_role}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Industry Type: {job.industry_type}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Education: {job.qualification}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Employment Type: {job.employee_type}
//               </Typography>
//             </Box>
//             <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', backgroundColor: '#E8EAF6', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
//               <Typography variant="h5" gutterBottom>
//                 About Company
//               </Typography>
//               <Typography variant="body1">
//                 {job.company_description}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Company Description: {job.company_description}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Company Address: {`${job.address.street}, ${job.address.city}, ${job.address.state}, ${job.address.country} - ${job.address.pincode}`}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 No.of Employees: {job.no_of_employees}
//               </Typography>
//               <Typography variant="h6" marginTop='20px' gutterBottom>
//                 Company Website: {job.company_website_link}
//               </Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default JobDetails;



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

const JobDetails = () => {
  const [jobData, setJobData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { responseData,setResponseData } = useContext(UserContext);
  console.log(responseData,"resssssssssssss==up")
  const { detailData,setDetailData } = useContext(UserContext);
  console.log(detailData,"detailData=======up")
  

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_job_details/`);
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
  
  const token = localStorage.getItem('loginToken');
  const [postdata, setPostData] = useState({
    token,
    job_id: 45
  });
  const handleApplyClick = async () => {
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post('http://192.168.1.44:8000/get_apply_job/', {
        postdata
      });

      console.log(response,'responsessss');
      console.log('Apply job response:', response.data);
      setDialogOpen(true);
      
      setResponseData(response.data); 
      setDetailData(postdata);
      console.log(responseData,"----------");
      
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{backgroundColor:'#1A237E', minHeight: '100vh', padding: '30px' ,marginTop:'50px'}}>
      <Grid container spacing={2} justifyContent="center">
        {jobData.map((job, index) => (
          <Grid item key={index} xs={12}  md={6} lg={8}>
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', borderRadius: '8px', maxWidth: '100%', backgroundColor: '#E8EAF6' }}>
            {job.company_logo && job.company_logo.includes('data:image') ? (
              <img src={job.company_logo} alt="Company Logo" />
                ) : (
              <img src={`data:image/jpeg;base64,${job.company_logo}`} alt="Company Logo" style={{
                position: 'absolute',
                width: '60px', // Adjust the size of the logo as needed
                height: 'auto',
                borderRadius: '50%', // Make the logo rounded
                border: '1px solid #ccc', // Add a border to the logo
              }}  />
                )}
              <Typography variant="h5" gutterBottom style={{marginLeft:'70px',marginTop:'10px'}}>
                {job.job_title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <BusinessIcon /> {job.company_name}
              </Typography>
              <Typography variant="subtitle1"  gutterBottom style={{ marginTop: '10px' }}>
                <LocationOnIcon style={{marginBottom:'5px'}}/> {job.location}
              </Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <WorkIcon />  
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}><span style={{fontWeight:'bold'}}>Experience: </span> {job.experience}</Typography>
                </Grid>
                <Grid item>
                  <SchoolOutlinedIcon />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" marginTop='20px' style={{ marginTop: '10px' }}><span style={{fontWeight:'bold'}}>Qualification:</span> {job.qualification}</Typography>
                </Grid>
                <Grid item>
                  <CurrencyRupeeIcon style={{ marginTop: '10px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" style={{ marginTop: '10px' }}> <span style={{fontWeight:'bold'}}>Salary:</span> {job.salary_range}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleApplyClick}>Apply</Button>
                  </Grid>
                </Grid>
              </Grid>
              <Typography variant="subtitle2" gutterBottom style={{ marginTop: '10px' }}>
                Posted: {job.created_at}
              </Typography>
            </Box>
            <ApplyJobDialog open={dialogOpen} onClose={handleCloseDialog} />
            <Box sx={{ p: 3, border: '1px solid #ccc', backgroundColor: '#E8EAF6', marginLeft: '2%', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
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
            <Box sx={{ p: 3, border: '1px solid #ccc', marginLeft: '2%', backgroundColor: '#E8EAF6', marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }}>
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