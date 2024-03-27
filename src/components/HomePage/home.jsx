import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import SearchBar from '../UserManagement/searchBar';
import '../HomePage/design.css';
import SearchBox from './searchBar'
import UserProfile from '../UserManagement/UserProfile';
import Companylist from './Companylist';
import HomeDesign from './HomeDesign';
import { JobCard } from './JobCard';
import Bottompage from './Bottom';
import Token from '../Sprint 2/Token';


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('googleToken');
  const otpToken = localStorage.getItem('otpToken');
  const loginToken = localStorage.getItem('loginToken');

  console.log(loginToken,"loginToken---><><");
//   useEffect(() => {
//     if (token === null && otpToken === null && loginToken === null) {
//       navigate("/login");
//     }
// }, [token, otpToken, loginToken]);

  



  return (
    <>    
    
      <div>
        <HomeDesign />
        <div className="background-div" style={{ marginTop: '2px' }}>
        <SearchBox />
       </div>

        <Companylist />
        <JobCard />
        <Bottompage />

      </div>
    </>

  )
}

export default Home
