import "./App.css";
import Navbar from "./components/NavBar/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./components/UserManagement/Login.jsx";
import SignUp1 from "./components/UserManagement/Signup1.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/HomePage/home.jsx";
import CreateAccount from "./components/UserManagement/CreateAccount.jsx";
import OTPlogin from "./components/UserManagement/OTPlogin.jsx";
import ForgetPassword from "./components/UserManagement/ForgetPassword.jsx";
import Password from "./components/UserManagement/Password.jsx";
import JobPostSample from "./components/JobPostSample/JobPostSample.js";
import JobDetails from "./components/JobPostSample/jobdiscriptions.js";
import UserProfile from "./components/UserManagement/UserProfile.js";
import Companydisplay from "./components/HomePage/Companydisplay.jsx";
import PostJob from "./components/Sprint 2/PostJob.jsx";
import Filter from "./components/Sprint 2/Filter.jsx";
import MyJob from "./components/Sprint 2/MyJob.jsx";
import EditMyJob from "./components/Sprint 2/EditMyJob.jsx";
import FilteredResults from "./components/Sprint 2/FilteredResults.jsx";
// import JobDetails from "./components/Sprint 2/jobdiscriptions.js";
import UserContext from "./components/Sprint 2/contextFilter.jsx";


import React, { useEffect, useState } from 'react';
import { Employerregister } from "./components/EmployeerManagement/Employerregister.jsx";
import SideNavbar from "./components/Dashboard/Sidebar.js";
import UserDash from "./components/Dashboard/UserDash.js";
import { Newpost } from "./components/HomePage/Newpost.js";
import { ApplyJob } from "./components/JobPostSample/ApplyJob.jsx";
import UserJobList from "../src/components/Sprint 2/UserJobList";
import { ListProfile } from "./components/Sprint 2/ListProfile";
import UserAccount from "./components/UserManagement/UserAccount.jsx";
import { UserNavbar } from "./components/NavBar/userNavbar.js";
import { EmployerNavbar } from "./components/NavBar/employerNavbar.js";
import { DemoNavbar } from "./components/NavBar/demoNavbar.js";
import { UpdateEmployerregister } from "./components/EmployeerManagement/UpdateEmployeer.jsx";
import { SavedJobs } from "./components/HomePage/SavedJobs.jsx";
import { Notifications } from "./components/UserManagement/Notifications.jsx";
import { DashBoardEmployeerProfile } from "./components/EmployeerManagement/DashboardEmployeerProfile.js";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/components/store.js';
import Filter1 from "./components/Sprint 2/Filter1.jsx";

function App() {
  const [oneData, setData] = useState("");
  const [employerDetails, setEmployerDetails] = useState(null);
  const[searchJob,setsearchJob]=useState("")
  const[companyList,setcompanyList]=useState("")
  const [jobData,setJobData ]  = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [detailData,setDetailData ]  = useState(null);
  const [useEmail,setUseEmail] = useState("");

  // const register_by = localStorage.getItem("registered_by");
  // const [user_result_register, setUserResult_register] = useState(false);
  // const [employeer_result_register, setEmployeerResult_register] = useState(false);
  // const [demo_result_register, setDemoResult_register] = useState(true);
  // const [user_register, setUser_register] = useState("");
  // const [employeer_register, setEmployeer_register] = useState("");

  // useEffect(() => {
  //   setUser_register(register_by);
  //   setEmployeer_register(register_by);
  // }, []); // Empty dependency array ensures this effect runs only once on component mount
  // console.log(user_register,'user_register--------->');
  // console.log((employeer_register,'employeer_register------------->'));
  // useEffect(() => {
  //   if (user_register === "User") {
  //     setUserResult_register(true);
  //     setDemoResult_register(false)
  //   }else if (employeer_register === "Recruiter"){
  //     setEmployeerResult_register(true);
  //     setDemoResult_register(false)
  //   }else {
  //     setUserResult_register(false)
  //     setEmployeerResult_register(false);
  //     setDemoResult_register(true)
  //   }
  // }, [user_register, employeer_register]); // This effect depends on user_register and employeer_register

  return (
    <UserContext.Provider value={{oneData, setData,employerDetails, 
    setEmployerDetails,searchJob,setsearchJob,companyList,setcompanyList,jobData,setJobData,responseData, setResponseData,detailData,setDetailData,useEmail,setUseEmail  }}>
    <div>
      <BrowserRouter>
         <Navbar /> 
         {/* {user_result_register && <UserNavbar />}
      {employeer_result_register && <EmployerNavbar />}
      {demo_result_register && <DemoNavbar /> } */}
         <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp1 />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/OTPlogin" element={<OTPlogin />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Password" element={<Password />} />   
          <Route path="/JobSearch" element={<JobPostSample />} />
          <Route path="/JobDetails" element={<JobDetails />} />
          <Route path="/UserProfile" element={<UserAccount/>} />
          <Route path="/Companydisplay" element={<Companydisplay />}/>
          {/* <Route path="/Filter" element={<Filter/>} /> */}
          <Route path="/Filter" element={<Filter1/>} />
          <Route path="/MyJob" element={<MyJob/>} />  
          <Route path="/PostJob" element={<PostJob />} />     
          <Route path="/EditMyJob" element={<EditMyJob />} />                   
          <Route path="/FilteredResults" element={<FilteredResults />} />
          <Route path="/JobDetails" element={<JobDetails />} />                   
          <Route path="/EmployerRegister" element={<Employerregister />} />
          <Route path="/EmployeerProfile" element={<DashBoardEmployeerProfile />} />
          <Route path="/EmployerDashboard" element={<SideNavbar />} />  
          <Route path="/UserDashBoard" element={<UserDash />} />
          <Route path="/newpost" element={<Newpost />} />     
          <Route path="/applyJob" element={<ApplyJob />} />
          <Route path="/UserJobList" element={<UserJobList />} />
          <Route path="/Listprofile" element={<ListProfile />} />
          <Route path="/UpdateEmployerregister" element={<UpdateEmployerregister />} />
          <Route path="/Savedjob" element={<SavedJobs />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes> 
       </BrowserRouter>
    </div>
    </UserContext.Provider> 
  );
}
export default App;
