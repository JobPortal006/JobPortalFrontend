import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import SearchBar from '../UserManagement/searchBar';
import '../HomePage/design.css';
import SearchBox from './searchBar'
import UserProfile from '../UserManagement/UserProfile';
import Companylist from './Companylist';

const Home = () => {
const navigate = useNavigate();
    const token = localStorage.getItem('googleToken');
    const otpToken = localStorage.getItem('otpToken');
    const loginToken = localStorage.getItem('loginToken');
    useEffect(()=>{
        if((token === null ) && (otpToken === null) && (loginToken === null)){
          navigate("/login");
          
        }
        
    });
  return (
    <div className="background-div" style={{marginTop:'50px'}}>
      <SearchBox />
      <Companylist />
    </div>
  )
}

export default Home
