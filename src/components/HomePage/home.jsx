import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import SearchBar from '../UserManagement/searchBar';
import '../HomePage/design.css';
import SearchBox from './searchBar'
import UserProfile from '../UserManagement/UserProfile';
import Companylist from './Companylist';
import HomeDesign from './HomeDesign';
import { JobCard } from './JobCard';
import Bottompage from './Bottom';
import BASE_URL from '../CommonAPI';
import LoginExpired from "../Login Image/Login Expired.jpg"
const Home = () => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem('googleToken');
  // const otpToken = localStorage.getItem('otpToken');
  // const loginToken = localStorage.getItem('loginToken');
  // useEffect(() => {
  //   if ((token === null) && (otpToken === null) && (loginToken === null)) {
  //     navigate("/login");

  //   }

  // });

// useEffect(()=>{



  
// },[]);
const register_by = localStorage.getItem("registered_by");
const token = localStorage.getItem("loginToken");
const googleToken = localStorage.getItem("googleSecondToken")

const [user_account_creation, setUserAccountCreation] = useState(false);
  const [login_expired, setLoginExpired] = useState(false);
  const [employeer_account_creation, setEmployeerAccountCreation] = useState(false);
console.log(token,'token----------->');
console.log(googleToken,'googleToken----------->');
var result_token = ''
if (token){
  result_token = token
} else{
  result_token = googleToken
}
// Check if the token exists before making the API call
if (result_token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ result_token }),
  };
  if (register_by === 'User'){
  fetch(`${BASE_URL}/user_account_creation_check/`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data, 'user_account_creation_check-------');
      if (data.statusCode === 400){
        setLoginExpired(true)
      }
      else{
      if (data.status) {
        setUserAccountCreation(true);
      } else {
        setUserAccountCreation(false);
      }
    }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
   if (register_by === 'Recruiter'){
    fetch(`${BASE_URL}/employeer_account_creation_check/`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data, 'employeer_account_creation_check-------');
      if (data.statusCode === 400){
        setLoginExpired(true)
      }
      else{
      if (data.status) {
        setEmployeerAccountCreation(true);
      } else {
        setEmployeerAccountCreation(false);
      }
    }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
} else {
  // Handle the case where the token is missing
  console.error('No token found in local storage');
}
const navigate = useNavigate();
const handleLoginClick = () => {
  localStorage.clear();
  navigate('/login');
};
  return (
    <>    
    {login_expired ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='loginexpiredbackground'>
  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='loginexpiredimge'>
    <h2 className='loginerrorText'>Login has been expired..!</h2>
    <img src={LoginExpired} alt='400' style={{ width: '500px', height: '400px', border: '2px solid #1A237E' }} />
    <button className="loginexpiredbutton" id='Nav_log_btn' onClick={handleLoginClick}
     style={{ marginTop: '10px' }}>
      Login
    </button>
  </div>
</div>
    ) : (
      <div>
      <HomeDesign />
      <div className="background-div" style={{ marginTop: '2px' }}>
      <SearchBox />
     </div>

      <Companylist />
      <JobCard />
      <Bottompage />

    </div>
    )
    }
    </>

  )
}

export default Home
