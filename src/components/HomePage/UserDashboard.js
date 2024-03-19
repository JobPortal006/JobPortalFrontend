// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography } from '@material-ui/core';
// import '../HomePage/UserDahboard.css';
// import { useNavigate } from 'react-router-dom';
// import BASE_URL from '../CommonAPI';
// import { BeatLoader } from 'react-spinners';
// import { css } from '@emotion/react';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;

// const UserDashboard = () => {
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [loadin1, setLoading1] = useState(true);


//   useEffect(() => {
//     // Fetch applied jobs
//     fetch(`${BASE_URL}/view_apply_jobs/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user_id: 7 }), 
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.status && data.data) {
//           // Update state with fetched data
//           setAppliedJobs(data.data);
//           setLoading(false);
//         } else {
//           setError(data.message || 'Failed to fetch data');
//           setLoading(false);
//         }
//       })
//       .catch(error => {
//         setError(error.message || 'Failed to fetch data');
//         setLoading(false);
//       });
//   }, []);

//   const handleCardClick = async (job) => {
//     try {
//         setLoading1(true);
//         const response = await fetch(`${BASE_URL}/job_details/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: job.job_post_id }),
//         });
//         if (!response.ok) {
//          throw new Error('Failed to send selected job data to the backend');


//         } else {
//             navigate('/JobDetails');
//         }
//         console.log('Selected job data sent successfully:', job);
//     } catch (error) {
//         console.error('Error sending selected job data to the backend:', error);
//     } finally {
//         setLoading1(false);
//     }
// };

//   if (loading) {
//     return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
//     <BeatLoader color="#1A237E" css={override} /> {/* Use BeatLoader for the loading animation */}
//     <p>Applied Job Information...</p> {/* Text indicating that profile information is loading */}
// </div>; 
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="dashboard-container">
//       {appliedJobs.map((jobGroup, index) => (
//         jobGroup.map((job, subIndex) => (
//           <Card key={subIndex} className="applied-job" onClick={() => handleCardClick(job)}>
//             <CardContent className='cardcontent'>
//               <Typography variant="h5" component="h2" style={{ color: '#1A237E', fontWeight: 'bold' }}>
//                 {job.job_title}
//               </Typography>
//               <Typography color="textSecondary">
//                 Company: {job.company_name}
//               </Typography>
//               <Typography variant="body2" component="p">
//                 Role: {job.job_role}
//               </Typography>
//               {/* Render other job details as needed */}
//             </CardContent>
//           </Card>
//         ))
//       ))}
//     </div>
//   );

// };

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import '../HomePage/UserDahboard.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../CommonAPI';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
`;

const UserDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loadin1, setLoading1] = useState(true);
  const jobsPerPage = 9;

  useEffect(() => {
    const token=localStorage.getItem('loginToken')
    const requestData = {
      token: token,
      // Add other data you need to send here
  };

    // Fetch applied jobs
    fetch(`${BASE_URL}/view_apply_jobs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ user_id: 7 }),
      body: JSON.stringify(requestData)

    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        if (data.status && data.data) {
          // Update state with fetched data
          setAppliedJobs(data.data);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch data');
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const handleCardClick = async (selectedJob) => {
    const Token= localStorage.getItem('loginToken')
    const Token1={
      selectedJob, 
        token:Token
    }
      try {
          setLoading1(true);
          const response = await fetch(`${BASE_URL}/job_details/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(Token1),
          });
          if (!response.ok) {
           throw new Error('Failed to send selected job data to the backend');
    
    
          } else {
              navigate('/JobDetails');
          }
          console.log('Selected job data sent successfully:', selectedJob);
      } catch (error) {
          console.error('Error sending selected job data to the backend:', error);
      } finally {
          setLoading1(false);
      }
    };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <BeatLoader color="#1A237E" css={override} />
        <p>Applied Job Information...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Flatten the nested array
  const flattenedJobs = appliedJobs.flat();
  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const displayedJobs = flattenedJobs.slice(startIndex, endIndex);

  return (
    <div>
    <div className="dashboard-container">
      {displayedJobs.map((job, index) => (
        <Card key={index} className="applied-job" onClick={() => handleCardClick(job)}>
          <CardContent className='cardcontent'>
            <Typography variant="h5" component="h2" style={{ color: '#1A237E', fontWeight: 'bold' }}>
              {job.job_title}
            </Typography>
            <Typography color="textSecondary">
              Company: {job.company_name}
            </Typography>
            <Typography variant="body2" component="p">
              Role: {job.job_role}
            </Typography>
          </CardContent>
        </Card>
      ))}
    
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {page > 1 && (
          <Button variant="contained"  className="pagination-button" style={{marginLeft:"100px", marginBottom:"20px"}} onClick={handlePrevPage}>
            Previous
          </Button>
        )}
        {flattenedJobs.length > endIndex && (
          <Button variant="contained"  className="pagination-button" style={{marginLeft:"100px", marginBottom:"20px"}} onClick={handleNextPage}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
