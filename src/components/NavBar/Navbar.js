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
import JL from "../Login Image/JL_-_1__1_-removebg-preview.png"
import { toast } from 'react-toastify';


const Navbar = () => {
  const [loading, setLoading] = useState(false);
  // const [userType, setUserType] = useState('');
  const { setData, setsearchJob, setcompanyList, setJobData ,setHomecontent,setLoginAlert} = useContext(UserContext);
  const navigate = useNavigate();


  const register_by = localStorage.getItem("registered_by");
  // const userResultRegister = useSelector(state => state.userResultRegister);
  // const employeerResultRegister = useSelector(state => state.employeerResultRegister);
  // const demoResultRegister = useSelector(state => state.demoResultRegister);
  // const [user_result_register, setUserResult_register] = useState(false);
  // const [employeer_result_register, setEmployeerResult_register] = useState(false);
  // const [demo_result_register, setDemoResult_register] = useState(true);
  // const [user_register, setUser_register] = useState("");
  // const [employeer_register, setEmployeer_register] = useState("");
  const [navbar_loading, setNavbarLoading] = useState(true);
  // const [login_expired, setLoginExpired] = useState(false);
  // const [Home_content, setLoginExpired] = useState(false);
  const [user_account_creation, setUserAccountCreation] = useState();
  const [user_profile, setUserProfile] = useState();
  const [employeer_account_creation, setEmployeerAccountCreation] = useState();
  const [employeer_profile, setEmployeerProfile] = useState();
  
  console.log(register_by, 'register_by--------- navbar -------->');
// console.log(userResultRegister,'userResultRegister----------->');
// console.log(employeerResultRegister,'employeerResultRegister-------------->');
// console.log(demoResultRegister,'demoResultRegister----------->');
// console.log(user_result_register,'userResultRegister----------->');
// console.log(employeer_result_register,'employeerResultRegister-------------->');
// console.log(demo_result_register,'demoResultRegister----------->');

// useEffect(() => {
//   setUser_register(register_by);
//   setEmployeer_register(register_by);
// }, []); 

// console.log(user_register, 'user_register--------->');
// console.log(employeer_register, 'employeer_register------------->');

  // if (user_register === "User") {
  //   setUserResult_register(true);
  //   setDemoResult_register(false);
  // } else if (employeer_register === "Recruiter") {
  //   setEmployeerResult_register(true);
  //   setDemoResult_register(false);
  // } else {
  //   setUserResult_register(false);
  //   setEmployeerResult_register(false);
  //   setDemoResult_register(true);
  // }

  // useEffect(() => {
    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const token = localStorage.getItem("loginToken");
    const googleToken = localStorage.getItem("googleSecondToken")
    const otpToken = localStorage.getItem("otpToken")
    
    const {  setEmployerDetails,useEmail,usePassword} = useContext(UserContext);
    useEffect(() => {
      console.log(token, 'token----------->');
      console.log(googleToken, 'googleToken----------->');
      console.log(otpToken, 'otpToken----------->');
      let result_token = token || googleToken || otpToken;
      console.log(result_token,'result_token');
      if (register_by === '' || register_by === null || result_token === '' || result_token === null){
        console.log("else----");
        setNavbarLoading(false);
      }

      if (result_token) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ result_token }),
        };
  
        const fetchData = async () => {
          try {
            // await delay(3000); 
            let response;
            if (register_by === 'User') {
              response = await fetch(`${BASE_URL}/user_account_creation_check/`, requestOptions);
              if (!response.ok) {
                // throw new Error('Failed to fetch data');
                setNavbarLoading(false);
                // toast.error("Server Not Responding")
              }
              const data = await response.json();
              setNavbarLoading(false);
    
              console.log(data, 'user_account_creation_check-------');
              if(data.message === 'Token is expired'){
                setLoginAlert(true);
                setHomecontent(true)
              }
              else{
                setHomecontent(false)
                setLoginAlert(false);
              }
              if (data.statusCode === 400) {
                setLoginAlert(true);
              } else {
                if (data.status) {
                  setUserAccountCreation(true);
                  setUserProfile(false);
                } else {
                  setUserAccountCreation(false);
                  setUserProfile(true);
                }
              }
            } else if (register_by === 'Recruiter') {
              response = await fetch(`${BASE_URL}/employeer_account_creation_check/`, requestOptions);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const data = await response.json();
              setNavbarLoading(false);
              console.log(data, 'employeer_account_creation_check-------');
              if(data.message === 'Token is expired'){
                setLoginAlert(true);
                setHomecontent(true)
              }
              else{
                setHomecontent(false)
                setLoginAlert(false);
              }
              if (data.status) {
                setEmployeerAccountCreation(true);
                setEmployeerProfile(false);
              } else {
                setEmployeerAccountCreation(false);
                setEmployeerProfile(true);
              }
            } 
          } catch (error) {
            setNavbarLoading(false);
            console.error('Error:', error);
            // toast.error("Server Not Responding")
            if (error.message === "Failed to fetch") {
                toast.error("Server Not Responding");
              } else {
                toast.error(`An error occurred: ${error.message}`);
              }
          }
        };
  
        fetchData();
      } else {
        // Handle the case where the token is missing
        console.error('No token found in local storage');
      }
    }, [token, googleToken,register_by,otpToken,setHomecontent,setLoginAlert]); // Ensuring this runs once with the initial token values
  
console.log(navbar_loading,'navbar_loading--');
  // useEffect(() => {
  //   // Retrieve the userType from local storage
  //   const registeredBy = localStorage.getItem('registered_by');
  //   if (registeredBy) {
  //     setUserType(registeredBy);
  //   }
  // }, []);

  
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const home = () => {
    if(useEmail !== null && useEmail !== "" || usePassword !== null && usePassword !== "" ){
      toast.error("Remove the Textfield")
      navigate('/login')
      return;
    }
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

  const notification = async () => {
    setLoading(true);

    const token = localStorage.getItem('loginToken');

    const requestData = {
      token: token,
    };

   

    try {
      // const response = await axios.post(`${BASE_URL}/get_job_notifications/`, requestData);

      // if (response.data.status === true) {
        navigate('/Notifications');
      // } 
      // else {
      //   alert("User details not found. Please create an account.");
      //   navigate('/CreateAccount');
      // }
    } catch (error) {
      console.error('Error sending token and data:', error);
    } finally {
      setLoading(false);
    }
  };

  const employeerprofile = async () => {
    setLoading(true);

    const token = localStorage.getItem('loginToken');

    const requestData = {
      token: token,
    };

    try {
      const response = await axios.post(`${BASE_URL}/get_employeer_details/`, requestData);
  console.log(response,'get_employeer_details---------');
      if (response.data.status === true || response.status === 200 ) {
        console.log("if-----------");
        setEmployerDetails(response.data);
        navigate('/UpdateEmployerregister');
        // <UpdateEmployerregister />
      } 
      else {
        alert("User details not found. Please create an account.");
        navigate('/EmployerRegister');
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
console.log(user_account_creation,'user_account_creation');
  const isLoggedIn = !!localStorage.getItem('googleSecondToken');
  const isotpToken = !!localStorage.getItem('otpToken');
  const storedToken = !!localStorage.getItem("loginToken");

  return (
    <div className="Navbar">
      <div className="Navbar__left" style={{ transitionDelay: '2s',
    transition: '2s ease-in',
    animation: 'fadeIn 2s linear'}}>
        <img src={JL} alt="Logo" className="Navbar__logo" />
      </div>

      <div className="Navbar__center" style={{ transitionDelay: '2s',
    transition: '2s ease-in',
    animation: 'fadeIn 2s linear'}}>
        {navbar_loading ? (
          <BeatLoader color="#1A237E" style={{ height: '20px' }} />
        ) : (
          <>
            {register_by === 'User' && (isLoggedIn || isotpToken || storedToken) && (
              <ul>
                <li className="Navbar__dropdown" onClick={home}>
                  Home
                  <div className="Navbar__dropdown-content"></div>
                </li>
                {user_profile && (
                  <li className="Navbar__dropdown">
                    DashBoard
                    <div className="Navbar__dropdown-content">
                      <ul>
                        <li onClick={UserDashBoard}>User DashBoard</li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            )}

            {register_by === 'Recruiter' && (isLoggedIn || storedToken || isotpToken) && (
              <ul>
                <li className="Navbar__dropdown" onClick={home}>
                  Home
                  <div className="Navbar__dropdown-content"></div>
                </li>
                {employeer_profile && (
                  <li className="Navbar__dropdown">
                    {/* Employer
                    <div className="Navbar__dropdown-content"> */}
                      <ul>
                        <li onClick={PostJob}>Post a Job</li>
                      </ul>
                    {/* </div> */}
                  </li>
                )}
                {employeer_profile && (
                  <li className="Navbar__dropdown">
                    DashBoard
                    <div className="Navbar__dropdown-content">
                      <ul>
                        <li onClick={EmployerDashboard}>Employer DashBoard</li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            )}

            {(!register_by || (!isLoggedIn && !isotpToken && !storedToken)) && (
              <ul>
                <li className="Navbar__dropdown" onClick={home}>
                  Home
                  <div className="Navbar__dropdown-content"></div>
                </li>
              </ul>
            )}
          </>
        )}
      </div>

      <div className="Navbar__right" style={{ transitionDelay: '2s',
    transition: '2s ease-in',
    animation: 'fadeIn 2s linear'}}>
      {navbar_loading ? (
          <BeatLoader color="#1A237E" style={{ height: '20px' }} />
        ) : (
        <>
          {(!register_by || (!isLoggedIn && !isotpToken && !storedToken)) && (
            <>
              <button
                className="Navbar__button"
                id="Nav_log_btn"
                onClick={handleLoginClick}
                disabled={isLoggedIn}
              >
                Login
              </button>
              <button
                className="Navbar__button"
                onClick={handleSignupClick}
                disabled={isLoggedIn}
              >
                SignUp
              </button>
            </>
          )}
          {register_by === 'Recruiter' && (isLoggedIn || storedToken || isotpToken) && (
            <>
              <button className="Navbar__button" id="Nav_btn" onClick={logout}>
                Logout
              </button>
              {employeer_account_creation && (
                <button
                  className="Navbar__button"
                  type="submit"
                  onClick={CreateAccountRecruiter}
                >
                  Create an account
                </button>
              )}
              {employeer_profile && (
                <FaUserCircle
                  className="Navbar__user-icon"
                  style={{ fontSize: '20px' }}
                  onClick={employeerprofile}
                />
              )}
            </>
          )}
          {register_by === 'User' && (isLoggedIn || storedToken || isotpToken) && (
            <>
              <button className="Navbar__button" id="Nav_btn" onClick={logout}>
                Logout
              </button>
              {user_account_creation && (
                <button
                  className="Navbar__button"
                  type="submit"
                  onClick={CreateAccount}
                >
                  Create an account
                </button>
              )}
              {user_profile && (
                <>
                  <FaUserCircle
                    className="Navbar__user-icon"
                    style={{ fontSize: '20px' }}
                    onClick={profile}
                  />
                  <FaBell
                    className="Navbar__notification-icon"
                    onClick={notification}
                  />
                </>
              )}
            </>
          )}
        </>  
        )}
      </div>

      {loading && <BeatLoader color="#1A237E" style={{ height: '20px' }} />}
    </div>
   
  );
};

export default Navbar;
