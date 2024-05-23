import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './Companylist.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Sprint 2/contextFilter';
import BASE_URL from '../CommonAPI';
// import { useDispatch } from 'react-redux';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import companysearch from './homeimages/giphy (1).gif'

const Companylist = () => {
  const [companies, setCompanies] = useState([]);
  const [nocompanies, setNoCompanies] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCard, setLoadingCard] = useState(null); // State to track loading for individual cards
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0); // State to track the index of the first item to display
  const navigate = useNavigate();
  const { companyList, setcompanyList, setsearchJob, setData } = useContext(UserContext);
  // const dispatch = useDispatch();

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
        if(data.length === 0){
          console.log(companies,'companies--');
          setNoCompanies(true)
        }else{
          setNoCompanies(false)
        }
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [companies]); // Empty dependency array ensures useEffect runs only once on component mount
 const token = localStorage.getItem('loginToken');
  const handleCardClick = async companyName => {
    try {
      setLoadingCard(companyName); 
      const response = await fetch(`${BASE_URL}/job_details_by_companyName/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: companyName,token
        })
      });
      // console.log(response,"response-company-data");
      const companydata = await response.json();
      console.log(companydata, 'companydata---------->123');
      console.log(companydata.status,"company status ");
      const company_response_result = companydata.data;
     
      if (companydata.status === false) {
          // alert('Failed to send data to the server');
          localStorage.setItem("No_result", JSON.stringify(true));
          navigate('/Filter');  // Move navigate here
          localStorage.removeItem("Company_result");
          localStorage.removeItem("Search_result");
          localStorage.removeItem("Filter_result");
          localStorage.removeItem("Employee_type_result");
      } else { 
        localStorage.setItem("Company_result", JSON.stringify(company_response_result));
      const storedDataToUse = JSON.parse(localStorage.getItem("Company_result"));
      console.log(storedDataToUse, 'storedDataToUse------->');
          if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(company_response_result)) {
              // If equal, set resultdataToUse to storedDataToUse
              localStorage.setItem("Company_result", JSON.stringify(company_response_result));
              localStorage.removeItem("Search_result");
              localStorage.removeItem("Filter_result");
              localStorage.removeItem("Employee_type_result");
          } else {
              // If not equal, remove the previous dataToUse from localStorage
              localStorage.removeItem("Company_result");
              localStorage.removeItem("Search_result");
              localStorage.removeItem("Filter_result");
              localStorage.removeItem("Employee_type_result");
              // Update localStorage with the new dataToUse
              localStorage.setItem("Company_result", JSON.stringify(company_response_result));
          }
          localStorage.setItem("No_result", JSON.stringify(false));
          navigate('/Filter');  // And here
      }
            
      if (companyList !== null) {
        setcompanyList(companydata);
        setsearchJob(false);
        setData(false);
        // dispatch(setCompanyResponse(companydata.data));
    } 
      // setcompanyList(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingCard(null); // Reset loading state for the clicked card
    }
  };

  const handleNext = () => {
    if (startIndex + 1 < companies.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <div className="containerr" style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
        <Typography
          variant="h6"
          style={{ padding: '10px',marginTop:'10px' }}
          color="#1A237E"
          fontSize="30px"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          gutterBottom
        >
          Job Openings in Top Companies
        </Typography>
        <div className="company-list" >
        {nocompanies ? (
        // <div><img src={companysearch} alt='companysearchImage'></img>
        // <h1>No Companies</h1></div>
        <div className="dashboardemployeerAccount" style={{marginBottom:'10px'}}>
        <div className='dashboardemployeerAccount-background'>
          <img 
            src={companysearch} 
            alt='404' 
            className='dashboardemployeerNotRegister' 
            style={{ borderRadius: "10px" }} 
          />
          <br />
          <h5 className='dashboardemployeererrorText'>No Companies Post Jobs So far..!</h5>
        </div>
        </div>
        ):(
          <>
 <Button style={{background:'none'}}  disabled={startIndex === 0} onClick={handlePrevious}>
 <ArrowCircleLeftIcon /> 
</Button>
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
 companies.slice(startIndex, startIndex + 4).map((company, index) => (
   
   <Card 
     id="card1"
     key={index}
     className="company-item"
     onClick={() => handleCardClick(company.company_name)} style={{width:'260px'}}
   >
     <CardContent>
       <div className="icon-container" style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
         {/* <BusinessIcon style={{ color: '#1A237E' }} className="business-icon" />{' '} */}
         <img width='50px' height='50px' style={{borderRadius:'25px'}} src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${company.company_logo_path}`}  alt="Company Logo" className="company-logo" />
         <h4 variant="h5" component="h2" fontSize="25px" style={{fontWeight:'bolder',padding:'15px',color:'#1A237E'}}>
           {company.company_name}
         </h4>
         <div style={{boxShadow:'4px 4px 20px 2px #A0A0A040', borderRadius:'10px' ,padding:'10px',backgroundColor:'#fff',marginBottom:'10px',width:'100%'}}>
         <h6 variant="h6" component="h2" fontSize="25px" style={{marginBottom:'20px',fontWeight:'bolder'}}>
           {company.company_industry}
         </h6>
         <p  fontSize="15px" style={{whiteSpace: 'nowrap', overflow: 'hidden',maxWidth:'650px', textOverflow: 'ellipsis'}} >
           <DescriptionIcon width='25px' height='25px' /> {company.company_description}
         </p>
         </div>
         {loadingCard === company.company_name ? ( 
           <Typography>Loading...</Typography>
         ) : (
           <DoubleArrowIcon style={{color:'#1A237E'}} fontSize="small" className="arrow-icon" />
         )}
         {/* Arrow icon */}
       </div>
     </CardContent>
   </Card>
   
 ))
)}
<Button  disabled={startIndex + 3 >= companies.length} onClick={handleNext}>
  <ArrowCircleRightIcon   />
</Button>
</>
        ) }
       
        </div>
        
      </div>
      {/* <JobCard /> */}
    </>
  );
};

export default Companylist;

