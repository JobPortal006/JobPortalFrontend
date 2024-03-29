// import React, { useContext, useState } from 'react';
// import '../NavBar/Navbar.css';
// import { FaUserCircle, FaBell } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import NavbarData from "../Json/NavBarJsonData.json";
// import axios from 'axios';
// import BASE_URL from '../CommonAPI';
// import { BeatLoader } from 'react-spinners';
// import UserContext from '../Sprint 2/contextFilter';

// const Navbar = () => {
//   const [loading, setLoading] = useState(false);
//   const translations = NavbarData.english;
//   const {setData,setsearchJob,setcompanyList,setJobData}=useContext(UserContext)
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/login');
//   };

//   const home = () => {
//     setData(false);
//     setsearchJob(false);
//     setcompanyList(false);
//     setJobData(false);
//     navigate('/home');
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   const CreateAccount = () => {
//     navigate('/CreateAccount')
//   };



//   const profile = async () => {
//     setLoading(true); // Start loading

//     const token = localStorage.getItem('loginToken');

//     const requestData = {
//         token: token,
//     };

//     try {
//         const response = await axios.post(`${BASE_URL}/get_user_details/`, requestData);

//         // Check if the status is true
//         if (response.data.status === true) {
//             navigate('/UserProfile');
//         } else {
//             // Status is false, show alert and navigate to CreateAccount
//             alert("User details not found. Please create an account.");
//             navigate('/CreateAccount');
//         }
//     } catch (error) {
//         console.error('Error sending token and data:', error);
//         // Handle error as needed
//     } finally {
//         setLoading(false); // Stop loading
//     }
// };


//   const Employerdetails = () => {
//     navigate('/EmployerRegister')
//   }
//   const EmployerDashboard = () => {
//     navigate('/EmployerDashboard')
//   }
//   const UserDashBoard = () => {
//     navigate('/UserDashBoard')
//   }
//   const PostJob = () => {
//     navigate('/PostJob')
//   }
//   const isLoggedIn = !!localStorage.getItem('googleToken');
//   const otpToken = !!localStorage.getItem('otpToken');
//   const storedToken = !!localStorage.getItem("loginToken");

//   console.log(isLoggedIn, "GoogleToken============<");

//   return (
//     <div className="Navbar" >
//       <div className="Navbar__left">
//         <img src="your-logo.png" alt="Logo" className="Navbar__logo" />
//       </div>

//       <div className="Navbar__center">
//         {(isLoggedIn || otpToken || storedToken) ? (
//           <ul>
//             <li className="Navbar__dropdown" onClick={home}>
//               {translations.home.one}
//               <div className="Navbar__dropdown-content"></div>
//             </li>
//             <li className="Navbar__dropdown">
//               {translations.employer.one}
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li onClick={Employerdetails}>{translations.employerdetails.one}</li>
//                   <li onClick={PostJob}>{translations.employerdetails.two}</li>
//                 </ul>
//               </div>
//             </li>
//             <li className="Navbar__dropdown">
//               {translations.candidatejobs.one}
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li onClick={EmployerDashboard}>{translations.candidatejobsdetails.one}</li>
//                   <li onClick={UserDashBoard}>{translations.candidatejobsdetails.two}</li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         ) : (
//           <ul>
//             <li className="Navbar__dropdown">
//               {translations.employer.one}
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li>{translations.employerdetails.one}</li>
//                   <li>{translations.employerdetails.two}</li>
//                 </ul>
//               </div>
//             </li>
//             <li className="Navbar__dropdown">
//               {translations.candidatejobs.one}
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li  >{translations.candidatejobsdetails.one}</li>
//                   <li>{translations.candidatejobsdetails.two}</li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         )}
//       </div>

//       <div className="Navbar__right">
//         {isLoggedIn || storedToken || otpToken ? (
//           <>
//             <button className="Navbar__button" id='Nav_btn' onClick={logout}>
//               {translations.logout.one}
//             </button>
//             <button className="Navbar__button" type='submit' onClick={CreateAccount}>
//               {translations.create_an_account.one}
//             </button>
//             <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }} onClick={profile} />
//             <FaBell className="Navbar__notification-icon" />
//           </>
//         ) : (
//           <>
//             <button className="Navbar__button" id='Nav_log_btn' onClick={handleLoginClick} disabled={isLoggedIn}>
//               {translations.login.one}
//             </button>
//             <button className="Navbar__button" onClick={handleSignupClick} disabled={isLoggedIn}>
//               {translations.requiters_login.one}
//             </button>
//           </>
//         )}
//       </div>
//       {loading && <BeatLoader  color='#1A237E' style={{height:'20px'}}/>} {/* Display loading bar if loading */}
//     </div>
//   );
// };

// export default Navbar;









// import React, { useContext, useState, useEffect } from 'react';
// import { FaUserCircle, FaBell } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BeatLoader } from 'react-spinners';
// import UserContext from '../Sprint 2/contextFilter';
// import BASE_URL from '../CommonAPI';
// import '../NavBar/Navbar.css';
// import { UpdateEmployerregister } from '../EmployeerManagement/UpdateEmployeer';

// const Navbar = () => {
//   const [loading, setLoading] = useState(false);
//   const [userType, setUserType] = useState('');
//   const { setData, setsearchJob, setcompanyList, setJobData } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve the userType from local storage
//     const registeredBy = localStorage.getItem('registered_by');
//     if (registeredBy) {
//       setUserType(registeredBy);
//     }
//   }, []);

  
//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   const handleSignupClick = () => {
//     navigate('/signup');
//   };

//   const home = () => {
//     setData(false);
//     setsearchJob(false);
//     setcompanyList(false);
//     setJobData(false);
//     navigate('/home');
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate('/login');
//     window.location.reload();
//   };

//   const CreateAccount = () => {
//     navigate('/CreateAccount')
//   };
//   const CreateAccountRecruiter =()=>{
//     navigate('/EmployerRegister')
//   }

//   const profile = async () => {
//     setLoading(true);

//     const token = localStorage.getItem('loginToken');

//     const requestData = {
//       token: token,
//     };

   

//     try {
//       const response = await axios.post(`${BASE_URL}/get_user_details/`, requestData);

//       if (response.data.status === true) {
//         navigate('/UserProfile');
//       } else {
//         alert("User details not found. Please create an account.");
//         navigate('/CreateAccount');
//       }
//     } catch (error) {
//       console.error('Error sending token and data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Employerdetails = () => {
//     navigate('/EmployerRegister')
//   }

//   const EmployerDashboard = () => {
//     navigate('/EmployerDashboard')
//   }

//   const UserDashBoard = () => {
//     navigate('/UserDashBoard')
//   }

//   const PostJob = () => {
//     navigate('/PostJob')
//   }

//   const isLoggedIn = !!localStorage.getItem('googleToken');
//   const otpToken = !!localStorage.getItem('otpToken');
//   const storedToken = !!localStorage.getItem("loginToken");

//   return (
//     <div className="Navbar">
//       <div className="Navbar__left">
//         <img src="https://backendcompanylogo.s3.eu-north-1.amazonaws.com/company_logo/job_portal_logo.png" alt="Logo" className="Navbar__logo" />
//       </div>

//       <div className="Navbar__center">
//         {userType === 'User' && (isLoggedIn || otpToken || storedToken) && (
//           <ul>
//             <li className="Navbar__dropdown" onClick={home}>
//               Home
//               <div className="Navbar__dropdown-content"></div>
//             </li>
//             <li className="Navbar__dropdown">
//             DashBoard
//               <div className="Navbar__dropdown-content">
//                 <ul>
                 
//                   <li onClick={UserDashBoard}>User DashBoard</li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         )}

//         {userType === 'Recruiter' && (isLoggedIn || storedToken || otpToken) && (
//           <ul>
//             <li className="Navbar__dropdown" onClick={home}>
//               Home
//               <div className="Navbar__dropdown-content"></div>
//             </li>
//             <li className="Navbar__dropdown">
//             Employer
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li onClick={Employerdetails}>Employer details</li>
//                   <li onClick={PostJob}>Add job posting</li>
//                 </ul>
//               </div>
//             </li>
//             <li className="Navbar__dropdown">
//             DashBoard
//               <div className="Navbar__dropdown-content">
//                 <ul>
//                   <li onClick={EmployerDashboard}>Employer DashBoard</li>
//                 </ul>
//               </div>
//             </li>
//           </ul>
//         )}

//         {(!userType || (!isLoggedIn && !otpToken && !storedToken)) && (
//           <ul>
//              <li className="Navbar__dropdown" onClick={home}>
//               Home
//               <div className="Navbar__dropdown-content"></div>
//             </li>
//           </ul>
//         )}
//       </div>

//       <div className="Navbar__right">
//       {(!userType || (!isLoggedIn && !otpToken && !storedToken)) && (
//           <>
//           <button className="Navbar__button" id='Nav_log_btn' onClick={handleLoginClick} disabled={isLoggedIn}>
//           Login
//           </button>
//           <button className="Navbar__button" onClick={handleSignupClick} disabled={isLoggedIn}>
//           SignUp
//           </button>
//         </>
//         )}
     
//      {userType === 'Recruiter' && (isLoggedIn || storedToken || otpToken) && (
//            <>
//            <button className="Navbar__button" id='Nav_btn' onClick={logout}>
//            Logout
//            </button>
//            <button className="Navbar__button" type='submit' onClick={CreateAccountRecruiter}>
//            Create an account
//            </button>
//            {/* <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }} onClick={profile} /> */}
//            <FaBell className="Navbar__notification-icon" />
//          </>
//         )}
//          {userType === 'User' && (isLoggedIn || storedToken || otpToken) && (
//            <>
//            <button className="Navbar__button" id='Nav_btn' onClick={logout}>
//            Logout
//            </button>
//            <button className="Navbar__button" type='submit' onClick={CreateAccount}>
//            Create an account
//            </button>
//            <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }} onClick={profile} />
//            <FaBell className="Navbar__notification-icon" />
//          </>
//         )}
//       </div>

//       {loading && <BeatLoader color='#1A237E' style={{ height: '20px' }} />}
//     </div>
//   );
// };

// export default Navbar;

















import React, { useContext, useState, useEffect } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import UserContext from '../Sprint 2/contextFilter';
import BASE_URL from '../CommonAPI';
import '../NavBar/Navbar.css';
import { UpdateEmployerregister } from '../EmployeerManagement/UpdateEmployeer';
import logo1 from '../HomePage/homeimages/logo1.png'
const Navbar = () => {
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
    window.location.reload();
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
      } else {
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
        {/* <img src="https://backendcompanylogo.s3.eu-north-1.amazonaws.com/company_logo/job_portal_logo.png" alt="Logo" className="Navbar__logo" /> */}
        <img src={logo1} alt="Logo" className="Navbar__logo" />

      </div>

      <div className="Navbar__center">
        {userType === 'User' && (isLoggedIn || otpToken || storedToken) && (
          <ul>
            <li className="Navbar__dropdown" onClick={home}>
              Home
              <div className="Navbar__dropdown-content"></div>
            </li>
            <li className="Navbar__dropdown">
            DashBoard
              <div className="Navbar__dropdown-content">
                <ul>
                 
                  <li onClick={UserDashBoard}>User DashBoard</li>
                </ul>
              </div>
            </li>
          </ul>
        )}

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
      {(!userType || (!isLoggedIn && !otpToken && !storedToken)) && (
          <>
          <button className="Navbar__button" id='Nav_log_btn' onClick={handleLoginClick} disabled={isLoggedIn}>
          Login
          </button>
          <button className="Navbar__button" onClick={handleSignupClick} disabled={isLoggedIn}>
          SignUp
          </button>
        </>
        )}
     
     {userType === 'Recruiter' && (isLoggedIn || storedToken || otpToken) && (
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
        )}
         {userType === 'User' && (isLoggedIn || storedToken || otpToken) && (
           <>
           <button className="Navbar__button" id='Nav_btn' onClick={logout}>
           Logout
           </button>
           <button className="Navbar__button" type='submit' onClick={CreateAccount}>
           Create an account
           </button>
           <FaUserCircle className="Navbar__user-icon" style={{ fontSize: '20px' }} onClick={profile} />
           <FaBell className="Navbar__notification-icon" />
         </>
        )}
      </div>

      {loading && <BeatLoader color='#1A237E' style={{ height: '20px' }} />}
    </div>
  );
};

export default Navbar;
