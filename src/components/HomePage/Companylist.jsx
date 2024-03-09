
// // ------------------------------------>
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Button } from '@mui/material';
// import './Companylist.css';
// import { useNavigate } from 'react-router-dom';
// import BusinessIcon from '@mui/icons-material/Business';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { JobCard } from './JobCard';
// import UserContext from '../Sprint 2/contextFilter';


// const Companylist = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [startIndex, setStartIndex] = useState(0); // State to track the index of the first item to display
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     fetch('http://192.168.1.44:8000/company_name/')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setCompanies(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []); // Empty dependency array ensures useEffect runs only once on component mount

//   const handleCardClick = (companyName) => {
//     // Send request to the backend API
//     fetch('http://192.168.1.44:8000/job_details_by_companyName/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         company_name: companyName
//       })
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to send data to the server');
//       }
//       // Navigate after response is sent
//       navigate("/Companydisplay");
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle error here
//     });
//   };

//   const handleNext = () => {
//     if (startIndex + 3 < companies.length) {
//       setStartIndex(startIndex + 3);
//     }
//   };

//   const handlePrevious = () => {
//     if (startIndex - 3 >= 0) {
//       setStartIndex(startIndex - 3);
//     }
//   };

//   return (<>
//     <div className="container">
//       <Typography variant="h4" gutterBottom>
//         Job Openings in Top Companies
//       </Typography>
//       <div className="company-list">
//         {loading ? (
//           <Card className="company-item">
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 Loading...
//               </Typography>
//             </CardContent>
//           </Card>
//         ) : error ? (
//           <Card className="company-item">
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 {error}
//               </Typography>
//             </CardContent>
//           </Card>
//         ) : (
//           companies.slice(startIndex, startIndex + 3).map((company, index) => (
//             <Card
//               key={index}
//               className="company-item"
//               onClick={() => handleCardClick(company.company_name)}
//             >
//               <CardContent>
//                 <div className="icon-container">
//                   <BusinessIcon className="business-icon" /> {/* React office icon */}
//                   <Typography variant="h5" component="h2">
//                     {company.company_name}
//                   </Typography>
//                   <ArrowForwardIcon className="arrow-icon" /> {/* Arrow icon */}
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//       <div className="pagination-buttons">
//         <Button variant="outlined" disabled={startIndex === 0} onClick={handlePrevious}><ArrowBackIcon /> Previous</Button>
//         <Button variant="outlined" disabled={startIndex + 3 >= companies.length} onClick={handleNext}>Next <ArrowForwardIcon /></Button>
//       </div>
//     </div>
//     <JobCard />
//     </>
//   );
// };

// export default Companylist;


//=====================>use context

// ------------------------------------>
import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './Companylist.css';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { JobCard } from './JobCard';
import UserContext from '../Sprint 2/contextFilter';
import { Divider } from '@material-ui/core';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BASE_URL from '../CommonAPI';
const Companylist = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0); // State to track the index of the first item to display
  const navigate = useNavigate();
  const { companyList, setcompanyList } = useContext(UserContext)

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch(`${BASE_URL}/company_name/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setCompanies(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleCardClick = async (companyName) => {
    try {
      console.log(companyName, "companyName------->");
      // Send request to the backend API
      const response = await fetch(`${BASE_URL}/job_details_by_companyName/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: companyName
        })
      });
      const data = await response.json();
      console.log(data, "data---------->123");

      // if (!response.ok) {
      //     throw new Error('Failed to send data to the server');
      // }
      if (data.status !== true) {
        alert('Failed to send data to the server');
      }
      else {
        navigate("/Filter");

      }
      setcompanyList(data)
      console.log(companyList, "companyData---->1");

      // Navigate after response is sent
      // navigate("/Filter");
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    }
  };


  const handleNext = () => {
    if (startIndex + 3 < companies.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    }
  };
  companies.slice(startIndex, startIndex + 3).map((company, index) => (
    console.log(company.company_name, 'company_name------------')
  ))

  return (<>
    <div className="container">
      <Typography variant="h6" style={{padding:'10px'}}
        color="#1A237E" fontSize="30px"
        fontWeight="bold" textTransform="uppercase" textAlign="center" gutterBottom>
        Job Openings in Top Companies

      </Typography>
      <div className="company-list">
        {loading ? (
          <Card className="company-item">
            <CardContent>
              <h4 variant="h5" component="h2">
                Loading...
              </h4>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="company-item">
            <CardContent>
              <h4 variant="h5" component="h2">
                {error}
              </h4>
            </CardContent>
          </Card>
        ) : (
          companies.slice(startIndex, startIndex + 3).map((company, index) => (
            <Card id="card1"
              key={index}
              className="company-item"
              onClick={() => handleCardClick(company.company_name)}
            >
              <CardContent>
                <div className="icon-container">
                  <BusinessIcon  style={{color:'#1A237E'}} className="business-icon" /> {/* React office icon */}
                  <h4 variant="h5" component="h2" fontSize='25px'>
                    {company.company_name}
                  </h4>
                  < KeyboardArrowRightIcon  className="arrow-icon" /> {/* Arrow icon */}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <div className="pagination-buttons">
        <Button variant="outlined" disabled={startIndex === 0} onClick={handlePrevious}><ArrowBackIcon /> Previous</Button>
        <Button variant="outlined" disabled={startIndex + 3 >= companies.length} onClick={handleNext}>Next <ArrowForwardIcon /></Button>
      </div>
    </div>
    <JobCard />
  </>
  );
};

export default Companylist;

