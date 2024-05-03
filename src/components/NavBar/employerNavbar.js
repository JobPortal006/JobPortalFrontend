import React, { useContext, useState, useEffect } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import UserContext from '../Sprint 2/contextFilter';
import BASE_URL from '../CommonAPI';
import '../NavBar/Navbar.css';
import { UpdateEmployerregister } from '../EmployeerManagement/UpdateEmployeer';

import JL from "../Login Image/JL_-_1__1_-removebg-preview.png"


export const EmployerNavbar = () => {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const { setData, setsearchJob, setcompanyList, setJobData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the userType from local storage
    const registeredBy = localStorage.getItem('registered_by');
    if (registeredBy) {
      setUserType(registeredBy);
    }
  }, []);

  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const home = () => {
    setData(false);
    setsearchJob(false);
    setcompanyList(false);
    setJobData(false);
    navigate('/home');
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    // window.location.reload();
  };

  const CreateAccount = () => {
    navigate('/CreateAccount')
  };
  const CreateAccountRecruiter =()=>{
    navigate('/EmployerRegister')
  }

  const profile = async () => {
    setLoading(true);

    const token = localStorage.getItem('loginToken');

    const requestData = {
      token: token,
    };

   

    try {
      const response = await axios.post(`${BASE_URL}/get_user_details/`, requestData);

      if (response.data.status === true) {
        navigate('/UserProfile');
      } 
      else {
        alert("User details not found. Please create an account.");
        navigate('/CreateAccount');
      }
    } catch (error) {
      console.error('Error sending token and data:', error);
    } finally {
      setLoading(false);
    }
  };

  const Employerdetails = () => {
    navigate('/EmployerRegister')
  }

  const EmployerDashboard = () => {
    navigate('/EmployerDashboard')
  }

  const UserDashBoard = () => {
    navigate('/UserDashBoard')
  }

  const PostJob = () => {
    navigate('/PostJob')
  }

  const isLoggedIn = !!localStorage.getItem('googleToken');
  const otpToken = !!localStorage.getItem('otpToken');
  const storedToken = !!localStorage.getItem("loginToken");

  return (
    <div className="Navbar">
      <div className="Navbar__left">
        <img src={JL} alt="Logo" className="Navbar__logo" />
      </div>

      <div className="Navbar__center">
         
      {userType === 'Recruiter' && (isLoggedIn || storedToken || otpToken) && (
          <ul>
            <li className="Navbar__dropdown" onClick={home}>
              Home
              <div className="Navbar__dropdown-content"></div>
            </li>
            <li className="Navbar__dropdown">
            Employer
              <div className="Navbar__dropdown-content">
                <ul>
                  <li onClick={Employerdetails}>Employer details</li>
                  <li onClick={PostJob}>Add job posting</li>
                </ul>
              </div>
            </li>
            <li className="Navbar__dropdown">
            DashBoard
              <div className="Navbar__dropdown-content">
                <ul>
                  <li onClick={EmployerDashboard}>Employer DashBoard</li>
                </ul>
              </div>
            </li>
          </ul>
        )}

        {(!userType || (!isLoggedIn && !otpToken && !storedToken)) && (
          <ul>
             <li className="Navbar__dropdown" onClick={home}>
              Home
              <div className="Navbar__dropdown-content"></div>
            </li>
          </ul>
        )}
      </div>

      <div className="Navbar__right">
  
     
           <>
           <button className="Navbar__button" id='Nav_btn' onClick={logout}>
           Logout
           </button>
           <button className="Navbar__button" type='submit' onClick={CreateAccountRecruiter}>
           Create an account
           </button> 
           {/* <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }} onClick={profile} /> */}
           <FaBell className="Navbar__notification-icon" />
         </>
      </div>

      {loading && <BeatLoader color='#1A237E' style={{ height: '20px' }} />}
    </div>
  //   <>
  //   EmployeerNavbar
  //  </>
  );
};

