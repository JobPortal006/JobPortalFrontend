// import React, { useContext } from 'react';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BASE_URL from '../CommonAPI';
// import UserContext from '../Sprint 2/contextFilter';


// export const JobCard = () => {
//   const navigate = useNavigate();
//   const { jobData,setJobData ,setsearchJob,setData,setcompanyList} = useContext(UserContext);

//   const handleViewAllClick = async (employeeType) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
//         employee_type: employeeType
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data); // Log the response data to the console
//       setJobData(response.data);
//       console.log(jobData,"=========jobcard" );
//       if(jobData!==null){
//         setJobData(response.data)
//         setsearchJob(null);
//         setData(null);
//         setcompanyList(null)
//       }
//       // navigate('/newpost');
//       // alert(response.data.message || 'Response received successfully');
//       navigate('/Filter')

//     // Display the response message in an alert box after a short delay
//     setTimeout(() => {
//       // alert(response.data.message || 'Response received successfully');
//     }, 500); // Adjust the delay as needed
//     } catch (error) {
//       console.error('Error:', error);
//       // alert('An error occurred while processing your request. Please try again later.');
//     }
//   };

//   // const requestData = [
//   //   { employee_type: "Full time" },
//   //   { employee_type: "Part time" },
//   //   { employee_type: "Hybrid" },
//   //   { employee_type: "Temporary" },
//   //   { employee_type: "InternShip" }
//   // ];

//   return (
//     <>
//     <Grid padding='20px'  >
//     <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight:'bold',padding:'20px' }}>Employee Types</Typography>
//     <Grid container spacing={2} justifyContent="center" padding='20px'>
//       <Grid item xs={12} sm={6} md={3}>
//           <Paper
//             sx={{ 
//               width: '100%', 
//               paddingTop: '100%', 
//               position: 'relative', 
//               backgroundColor: '#E8EAF6',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 backgroundColor: '#9FA8DA', // Updated background color on hover
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 cursor: 'pointer'
//               }
//             }}
//             elevation={3}
//           >
//             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Hybrid Jobs</Typography>
//             <Button variant="contained" onClick={() => handleViewAllClick('Hybrid')}sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//           </div>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper
//           sx={{ 
//             width: '100%', 
//               paddingTop: '100%', 
//               position: 'relative', 
//               backgroundColor: '#E8EAF6',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 backgroundColor: '#9FA8DA', // Updated background color on hover
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 cursor: 'pointer'
//               }
//           }}
//           elevation={3}
//         >
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Full Time Jobs</Typography>
//             <Button variant="contained" onClick={() => handleViewAllClick('Full Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }} >View All</Button>
//           </div>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper
//           sx={{ 
//             width: '100%', 
//               paddingTop: '100%', 
//               position: 'relative', 
//               backgroundColor: '#E8EAF6',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 backgroundColor: '#9FA8DA', // Updated background color on hover
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 cursor: 'pointer'
//               }
//           }}
//           elevation={3}
//         >
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Temporary Jobs</Typography>
//             <Button variant="contained" onClick={() => handleViewAllClick('Temporary')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//           </div>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper
//           sx={{ 
//             width: '100%', 
//               paddingTop: '100%', 
//               position: 'relative', 
//               backgroundColor: '#E8EAF6',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 backgroundColor: '#9FA8DA', // Updated background color on hover
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 cursor: 'pointer'
//               }
//           }}
//           elevation={3}
//         >
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Part Time Jobs</Typography>
//             <Button variant="contained" onClick={() => handleViewAllClick('Part Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//           </div>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6} md={3}>
//         <Paper
//           sx={{ 
//             width: '100%', 
//               paddingTop: '100%', 
//               position: 'relative', 
//               backgroundColor: '#E8EAF6',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               '&:hover': {
//                 backgroundColor: '#9FA8DA', // Updated background color on hover
//                 boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//                 cursor: 'pointer'
//               }
//           }}
//           elevation={3}
//         >
//           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px',fontWeight:'bold' }}>Internship Jobs</Typography>
//             <Button variant="contained" onClick={() => handleViewAllClick('InternShip')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//           </div>
//         </Paper>
//       </Grid>
//     </Grid>
//     </Grid>
//     </>
//   );
// };



// import React, { useContext } from 'react';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BASE_URL from '../CommonAPI';
// import UserContext from '../Sprint 2/contextFilter';

// export const JobCard = () => {
//   const navigate = useNavigate();
//   const { jobData, setJobData, setsearchJob, setData, setcompanyList } = useContext(UserContext);

//   const handleViewAllClick = async (employeeType) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
//         employee_type: employeeType
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data);
//       setJobData(response.data);
//       if (jobData !== null) {
//         setJobData(response.data)
//         setsearchJob(null);
//         setData(null);
//         setcompanyList(null)
//       }
//       navigate('/Filter');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//      <style>
//         {`
//         .scroll-container {
//           display: flex;
//           overflow-x: auto;
//           max-width:100%;
//         }

//         .scroll-container::-webkit-scrollbar {
//           display: none;
//         }

//         .scroll-container > div {
//           margin: 0 10px;
//           flex: 0 0 auto;
//           padding: 20px;
//           background-color: #E8EAF6;
//           box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//           width: 230px;
//           height: 200px;
//         }

//         .scroll-container > div:hover {
//           background-color: #9FA8DA;
//           box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//           cursor: pointer;
//         }
//         .job-paper:hover {
//           background-color: #9FA8DA;
//           box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//           cursor: pointer;
//         }
//         `}
//       </style>
//       <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight: 'bold', padding: '20px',marginTop:'40px' }}>Employee Types</Typography>

//       <Grid container justifyContent="center" alignItems="flex-start" padding='20px' width='100%'>
//       <Grid item xs={12} sm={6} md={10}>
//           <div className="scroll-container">        
//           <Paper className="job-paper">
//               <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Hybrid Jobs</Typography>
//               <Button variant="contained" onClick={() => handleViewAllClick('Hybrid')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//             </Paper>
//           <Paper className="job-paper">
//             <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Full Time Jobs</Typography>
//               <Button variant="contained" onClick={() => handleViewAllClick('Full Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//             </Paper>
//             <Paper className="job-paper">
//               <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Temporary Jobs</Typography>
//               <Button variant="contained" onClick={() => handleViewAllClick('Temporary')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//               </Paper>
//               <Paper className="job-paper">
//                 <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Part Time Jobs</Typography>
//               <Button variant="contained" onClick={() => handleViewAllClick('Part Time')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//             </Paper>
//             <Paper className="job-paper">
//               <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>Internship Jobs</Typography>
//               <Button variant="contained" onClick={() => handleViewAllClick('Internship')} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//             </Paper>

//           </div>
//         </Grid>
//       </Grid>
//     </>
//   );
// };


// import React, { useContext, useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BASE_URL from '../CommonAPI';
// import UserContext from '../Sprint 2/contextFilter';

// export const JobCard = () => {
//   const navigate = useNavigate();
//   const { jobData, setJobData, setsearchJob, setData, setcompanyList } = useContext(UserContext);
//   const jobTypes = ['Hybrid', 'Full Time', 'Temporary', 'Part Time', 'Internship'];
//   const itemsPerPage = 4;
//   const [currentPage, setCurrentPage] = useState(0);

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage(prevPage => prevPage - 1);
//   };

//   const handleViewAllClick = async (employeeType) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
//         employee_type: employeeType
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data);
//       setJobData(response.data);
//       if (jobData !== null) {
//         setJobData(response.data)
//         setsearchJob(null);
//         setData(null);
//         setcompanyList(null)
//       }
//       navigate('/Filter');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   return (
//     <>
//       <style>
//         {`
//         .scroll-container {
//           display: flex;
//           overflow-x: auto;
//           max-width: 100%;
//           justify-content: center;
//         }

//         .scroll-container::-webkit-scrollbar {
//           display: none;
//         }

//         .job-paper {
//           flex: 0 0 auto;
//           display: flex;
//           flex-direction: column;
//           justify-content: center; /* Align content vertically */
//           align-items: center; /* Align content horizontally */
//           padding: 25px;
//           background-color: #E8EAF6;
//           box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//           width: 250px;
//           height: 205px;
//           margin-right: 20px; /* Add space between papers */
//         }

//         .job-paper:last-child {
//           margin-right: 0; /* Remove margin from last paper */
//         }

//         .job-paper:hover {
//           background-color: #9FA8DA;
//           box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//           cursor: pointer;
//         }
//         `}
//       </style>
//       <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight: 'bold', padding: '20px', marginTop: '40px' }}>Employee Types</Typography>

//       <Grid container justifyContent="center" alignItems="flex-start" padding='20px' width='100%'>
//         <Grid item xs={12} sm={6} md={10}>
//           <div className="scroll-container">
//             {jobTypes.slice(startIndex, endIndex).map((type, index) => (
//               <Paper key={index} className="job-paper">
//                 <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold' }}>{type} Jobs</Typography>
//                 <Button variant="contained" onClick={() => handleViewAllClick(type)} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//               </Paper>
//             ))}
//           </div>
//           <Grid container justifyContent="center" alignItems="center" marginTop="20px">
//             <Grid item>
//               <Button variant="contained" disabled={currentPage === 0} onClick={handlePrevPage}>Previous</Button>
//             </Grid>
//             <Grid item marginLeft="10px">
//               <Button variant="contained" disabled={endIndex >= jobTypes.length} onClick={handleNextPage}>Next</Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// };


// import React, { useContext, useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import BASE_URL from '../CommonAPI';
// import UserContext from '../Sprint 2/contextFilter';

// export const JobCard = () => {
//   const navigate = useNavigate();
//   const { jobData, setJobData, setsearchJob, setData, setcompanyList } = useContext(UserContext);
//   const jobTypes = ['Hybrid', 'Full Time', 'Temporary', 'Part Time', 'Internship'];
//   const itemsPerPage = { xs: 1, sm: 2, md: 5 }; // Adjust items per page for different screen sizes
//   const [currentPage, setCurrentPage] = useState(0);

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage(prevPage => prevPage - 1);
//   };

//   const handleViewAllClick = async (employeeType) => {
//     try {
//       const response = await axios.post(`${BASE_URL}/job_details_by_employeeType/`, {
//         employee_type: employeeType
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(response.data);
//       setJobData(response.data);
//       if (jobData !== null) {
//         setJobData(response.data)
//         setsearchJob(null);
//         setData(null);
//         setcompanyList(null)
//       }
//       navigate('/Filter');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const itemsPerPageForScreen = itemsPerPage.xs; // Get items per page for xs screen size
  

//   const startIndex = currentPage * itemsPerPageForScreen;
//   const endIndex = startIndex + itemsPerPageForScreen;

//   return (
//     <>
//       <style>
//         {`
//         .scroll-container {
//           display: flex;
//           overflow-x: auto;
//           max-width: 100%;
//           justify-content: center;
//         }

//         .scroll-container::-webkit-scrollbar {
//           display: none;
//         }

//         .job-paper {
//           flex: 0 0 auto;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//           background-color: #E8EAF6;
//           box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//           width: 250px;
//           height: 200px;
//           margin-right: 20px;
//         }

//         .job-paper:last-child {
//           margin-right: 0;
//         }

//         .job-paper:hover {
//           background-color: #9FA8DA;
//           box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
//           cursor: pointer;
//         }
//         `}
//       </style>
//       <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1A237E', fontWeight: 'bold', padding: '20px', marginTop: '40px' }}>Employee Types</Typography>

//       <Grid container justifyContent="center" alignItems="flex-start" padding='20px' width='100%'>
//         <Grid item xs={12} sm={6} md={10}>
//           <div className="scroll-container">
//             {jobTypes.slice(startIndex, endIndex).map((type, index) => (
//               <Paper key={index} className="job-paper">
//                 <Typography variant="h6" style={{ color: '#1A237E', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>{type} Jobs</Typography>
//                 <Button variant="contained" onClick={() => handleViewAllClick(type)} sx={{ backgroundColor: '#1A237E', '&:hover': { backgroundColor: '#3F51B5' } }}>View All</Button>
//               </Paper>
//             ))}
//           </div>
//           <Grid container justifyContent="center" alignItems="center" marginTop="20px">
//             <Grid item>
//               <Button variant="contained" disabled={currentPage === 0} onClick={handlePrevPage}>Previous</Button>
//             </Grid>
//             <Grid item marginLeft="10px">
//               <Button variant="contained" disabled={endIndex >= jobTypes.length} onClick={handleNextPage}>Next</Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// };




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
