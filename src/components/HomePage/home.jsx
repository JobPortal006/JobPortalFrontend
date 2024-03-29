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

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('googleToken');
  const otpToken = localStorage.getItem('otpToken');
  const loginToken = localStorage.getItem('loginToken');
  useEffect(() => {
    console.log(loginToken,"token--->3");

    if(loginToken !== undefined){
      
    }else{
      // navigate("/login");
    }
  },[]);
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
