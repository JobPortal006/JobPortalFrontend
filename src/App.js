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


import {useState} from  'react';
import { Employerregister } from "./components/EmployeerManagement/Employerregister.jsx";
import SideNavbar from "./components/Dashboard/Sidebar.js";
import UserDash from "./components/Dashboard/UserDash.js";
import { Newpost } from "./components/HomePage/Newpost.js";
import { ApplyJob } from "./components/JobPostSample/ApplyJob.jsx";
import UserJobList from "../src/components/Sprint 2/UserJobList";
import { ListProfile } from "./components/Sprint 2/ListProfile";



function App() {
  const [oneData, setData] = useState("");
  const [employerDetails, setEmployerDetails] = useState(null);
  const[searchJob,setsearchJob]=useState("")
  const[companyList,setcompanyList]=useState("")
  const [jobData,setJobData ]  = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [detailData,setDetailData ]  = useState(null);
  return (
    <UserContext.Provider value={{oneData, setData,employerDetails, 
    setEmployerDetails,searchJob,setsearchJob,companyList,setcompanyList,jobData,setJobData,responseData, setResponseData,detailData,setDetailData  }}>
    <div>
      <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route index path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp1 />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/OTPlogin" element={<OTPlogin />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Password" element={<Password />} />   
          <Route path="/JobSearch" element={<JobPostSample />} />
          <Route path="/JobDetails" element={<JobDetails />} />
          <Route path="/UserProfile" element={<UserProfile />}/>
          <Route path="/Companydisplay" element={<Companydisplay />}/>
          <Route path="/Filter" element={<Filter/>} />
          <Route path="/MyJob" element={<MyJob/>} />
          <Route path="/PostJob" element={<PostJob />} />
          <Route path="/EditMyJob" element={<EditMyJob />} />
          <Route path="/FilteredResults" element={<FilteredResults />} />
          <Route path="/JobDetails" element={<JobDetails />} />
          <Route path="/EmployerRegister" element={<Employerregister />} />
          <Route path="/EmployerDashboard" element={<SideNavbar />} />
          <Route path="/UserDashBoard" element={<UserDash />} />
          <Route path="/newpost" element={<Newpost />} />
          <Route path="/applyJob" element={<ApplyJob />} />
          <Route path="/UserJobList" element={<UserJobList />} />
          <Route path="/Listprofile" element={<ListProfile />} />




        </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}
export default App;
