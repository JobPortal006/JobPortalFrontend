import React,{useState} from 'react';
import '../NavBar/Navbar.css';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavbarData from "../Json/NavBarJsonData.json";
import CircularProgress from '@mui/material/CircularProgress';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const translations = NavbarData.english;
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate('/login');
    };
  
    const handleSignupClick = () => {
      navigate('/login');
    };
  
    const home = () => {
      navigate('/home');
    };
  
    const logout = () => {
      localStorage.clear();
      navigate('/login');
    };

    const CreateAccount=()=>{
        navigate('/CreateAccount')
    };
  
    const profile = () => {
      navigate('/UserProfile');
    };
    const Employerdetails=()=>{
      navigate('/EmployerRegister')
    }
    const EmployerDashboard =()=>{
      navigate('/EmployerDashboard')
    }
    const UserDashBoard=()=>{
      navigate('/UserDashBoard')
    }
    const PostJob=()=>{
      navigate('/PostJob')
    }
    const isLoggedIn = !!localStorage.getItem('googleToken');
    const otpToken = !!localStorage.getItem('otpToken');
    const storedToken = !!localStorage.getItem("loginToken");

    
    console.log(isLoggedIn,"GoogleToke============<");
    return (
      <div className="Navbar" >
        <div className="Navbar__left">
          <img src="your-logo.png" alt="Logo" className="Navbar__logo" />
        </div>
  
        <div className="Navbar__center">
          {(isLoggedIn || otpToken || storedToken ) ? (
            <ul>
              <li className="Navbar__dropdown" onClick={home}>
              {translations.home.one}
                <div className="Navbar__dropdown-content"></div>
              </li>
              <li className="Navbar__dropdown">
              {translations.employer.one}
                <div className="Navbar__dropdown-content">
                  <ul>
                  <li onClick={Employerdetails}>{translations.employerdetails.one}</li>
                    <li onClick={PostJob}>{translations.employerdetails.two}</li>
                  </ul>
                </div>
              </li>
              <li className="Navbar__dropdown">
              {translations.candidatejobs.one}
                <div className="Navbar__dropdown-content">
                  <ul>
                  <li onClick={EmployerDashboard}>{translations.candidatejobsdetails.one}</li>
                    <li onClick={UserDashBoard}>{translations.candidatejobsdetails.two}</li>
                  </ul>
                </div>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="Navbar__dropdown">
              {translations.employer.one}
                <div className="Navbar__dropdown-content">
                  <ul>
                  <li>{translations.employerdetails.one}</li>
                    <li>{translations.employerdetails.two}</li>
                  </ul>
                </div>
              </li>
              <li className="Navbar__dropdown">
              {translations.candidatejobs.one}
                <div className="Navbar__dropdown-content">
                  <ul>
                  <li  >{translations.candidatejobsdetails.one}</li>
                    <li>{translations.candidatejobsdetails.two}</li>
                  </ul>
                </div>
              </li>
            </ul>
          )}
        </div>
  
        <div className="Navbar__right">
          {isLoggedIn || storedToken || otpToken? (
            <>
              <button className="Navbar__button" id='Nav_btn' onClick={logout}>
              {translations.logout.one}
              </button>
              <button className="Navbar__button" type='submit' onClick={CreateAccount}>
              {translations.create_an_account.one}
              </button>
              <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }}   onClick={profile}  />
              <FaBell className="Navbar__notification-icon" />
            </>
          ) : (
            <>
              <button className="Navbar__button" id='Nav_log_btn' onClick={handleLoginClick} disabled={isLoggedIn}>
              {translations.login.one}
              </button>
              <button className="Navbar__button" onClick={handleSignupClick} disabled={isLoggedIn}>
              {translations.requiters_login.one}
              </button>
            </>
          )}
        </div>
        {loading && <CircularProgress />} {/* Display loading bar if loading */}
      </div>
    );
  };
  
  export default Navbar;
  













