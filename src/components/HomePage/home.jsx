import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import SearchBar from '../UserManagement/searchBar';
import '../HomePage/design.css';
import SearchBox from './searchBar'
import Companylist from './Companylist';
import { JobCard } from './JobCard';
import Bottompage from './Bottom';
import LoginExpired from "../Login Image/Login Expired.jpg"
import { useContext } from 'react';
import UserContext from '../Sprint 2/contextFilter';
const Home = () => {


  // const logintoken = localStorage.getItem('loginToken');
  // const googleToken = localStorage.getItem("googleSecondToken")
  // const otpToken = localStorage.getItem("otpToken")
    // useEffect(() => {
    //   if (googleToken === null || googleToken === undefined) {
    //     navigate("/login");
  
    //   }
  
    // },[googleToken]);
  
// const register_by = localStorage.getItem("registered_by");
// const token = localStorage.getItem("loginToken");

// const googleToken = localStorage.getItem("googleSecondToken")
// const otpToken = localStorage.getItem("otpToken")
// const [user_account_creation, setUserAccountCreation] = useState(false);
//   const [login_expired, setLoginExpired] = useState(false);
//   const [employeer_account_creation, setEmployeerAccountCreation] = useState(false);
const {setUseEmail,setUsePassword, setLoginAlert,homecontent} = useContext(UserContext)

const [isVisible, setIsVisible] = useState({
  company: false,
  job: false,
  footer: false
});


const navigate = useNavigate();
const handleLoginClick = () => {
  localStorage.clear();
  navigate('/login');
};
useEffect(() => {
  window.scrollTo(0, 0);
}, []);


useEffect(() => {
  const handleScroll = () => {
    const bottomOfElement = window.pageYOffset + window.innerHeight;
    const topOfElementCompany = document.querySelector('.scroll-animation-company').getBoundingClientRect().top + window.pageYOffset;
    const topOfElementJob = document.querySelector('.scroll-animation-job').getBoundingClientRect().top + window.pageYOffset;
    const topOfElementFooter = document.querySelector('.scroll-animation-footer').getBoundingClientRect().top + window.pageYOffset;

    if (!isVisible.company && (bottomOfElement > topOfElementCompany)) {
      setIsVisible(prevState => ({ ...prevState, company: true }));
    }

    if (!isVisible.job && (bottomOfElement > topOfElementJob)) {
      setIsVisible(prevState => ({ ...prevState, job: true }));
    }

    if (!isVisible.footer && (bottomOfElement > topOfElementFooter)) {
      setIsVisible(prevState => ({ ...prevState, footer: true }));
    }

    // Remove the scroll event listener if both elements are visible
    if (isVisible.company && isVisible.job && isVisible.footer) {
      window.removeEventListener('scroll', handleScroll);
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup the event listener on component unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [isVisible]);

 


useEffect(()=>{
  setUseEmail(null)
  setUsePassword(null)
  setLoginAlert(false)
},[setUseEmail,setUsePassword,setLoginAlert]);


  return (
    <>    
    {homecontent ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='loginexpiredbackground'>
  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='loginexpiredimge'>
    <h2 className='loginerrorText'>Login has been expired..!</h2>
    <img src={LoginExpired} alt='400' style={{ width: '400px', height: '350px', border: '2px solid #1A237E' }} />
    <button className="loginexpiredbutton" id='Nav_log_btn' onClick={handleLoginClick}
     style={{ marginTop: '10px' }}>
      Login
    </button>
  </div>
</div>
    ) : (
      <div>
      {/* <HomeDesign /> */}
      <div className="background-div" style={{ marginTop: '50px' }}>
      <SearchBox />
     </div>
      {/* <div style={{ transitionDelay: '2s',
    transition: '2s ease-in',
    animation: 'fadeIn 2s linear'}}>
      <Companylist />
      </div> */}
      <div className={`scroll-animation-company ${isVisible.company ? 'fade-in' : ''}`}>
          <Companylist />
        </div>
        <div className={`scroll-animation-job ${isVisible.job ? 'fade-in' : ''}`}>
          <JobCard />
        </div>
        <div className={`scroll-animation-footer ${isVisible.footer ? 'fade-in' : ''}`}>
      <Bottompage />
      </div>

    </div>
    )
    }
    </>

  )
}

export default Home
