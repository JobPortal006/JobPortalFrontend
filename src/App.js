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

function App() {
  return (
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



        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
