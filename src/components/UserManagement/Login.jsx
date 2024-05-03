
import React, { useEffect, useContext,useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import glogo from "../Login Image/google-icon.svg";
import jllogo from "../Login Image/JL_-_1__1_-removebg-preview.png";
import "../UserManagement/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../Firebase/firebase.js";
import { signInWithPopup } from "@firebase/auth";
import { toast, Toaster } from 'react-hot-toast';
import {
  emailBlur,
  handlePasswordBlur,
  handleSubmit,
} from "../UserManagement/ValidtionLogin.jsx";
import validation from "../Json/login.json";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserContext from "../Sprint 2/contextFilter.jsx";
import BASE_URL from '../CommonAPI';
import { FaWindows } from "react-icons/fa";
import { height } from "@mui/system";
import { useDispatch } from 'react-redux';
import { setUserResultRegister, setEmployeerResultRegister } from '../actions.js';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to SighUp page
  const handleSignupClick = () => {
    navigate("/signup");
  };

  // Navigatio ot OPT page
  const handleOTP = () => {
    navigate("/OTPlogin");
  };

  const defaultTheme = createTheme();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [outputData, setOutputData] = React.useState("");

  // const handleRememberMe = (event) => {
  //   setRememberMe(event.target.checked);
  // };


  const [value, setValue] = React.useState("");
  console.log(value,"<=====valueGoogle");

  const googleClick = async () => {

    const data = await signInWithPopup(auth, provider);
    const googlemail = data.user.email
    setValue(googlemail);
    
    try {
      const response = await fetch( `${BASE_URL}/google_email_checks/`,{
        method:"POST",
        headers :{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({email:googlemail})
      })

      const googleData = await response.json()
      console.log(googleData,"<====googleData");

      localStorage.setItem("googleSecondToken", googleData.message.token)
      console.log(googleData.message.token,"<====GoogleSecondToken");
     
      
  
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("googleToken", data._tokenResponse.oauthAccessToken);
      localStorage.setItem("registered_by",googleData?.message?.registered_by);
      // localStorage.setItem()
  
      const googleToken = localStorage.getItem("googleToken");
      // const googlemail = localStorage.getItem("email");
     
      console.log(googleToken, "Google_Token=========>");
      console.log(googlemail, "<====E-mail");

     

      if (googleData.status !== false && data._tokenResponse.oauthAccessToken !== undefined) {
        
        navigate("/home");
        // window.location.reload()
        
      } else {
        toast.error("Register your Email")
        localStorage.clear();
      }
        // if (data._tokenResponse.oauthAccessToken !== undefined) {
        //         navigate("/home");
        //       }
    } catch (error) {
      console.error(validation.Console.one, error.message);
    }
  };
  
  

  // const googleClick = () => {
  //   signInWithPopup(auth, provider)
  //     .then((data) => {
  //       setValue(data.user.email);

  //       localStorage.setItem("email", data.user.email);
  //       localStorage.setItem( "googleToken",data._tokenResponse.oauthAccessToken);

  //       const googleToken =  localStorage.getItem("googleToken");
  //       const googlemail = localStorage.getItem( "email" );
  //       setLogGoogle(googlemail); 
  //       console.log(googleToken, "Google_Token=========>");
  //       console.log(googlemail,"<====E-mail");

  //       if (data._tokenResponse.oauthAccessToken !== undefined) {
  //         navigate("/home");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(validation.Console.one, error.message);
  //     });
  // };
  
// Navigate to forget password
const register_by = localStorage.getItem("registered_by");
const [user_result_register, setUserResult_register] = useState(false);
const [employeer_result_register, setEmployeerResult_register] = useState(false);
const [demo_result_register, setDemoResult_register] = useState(true);
const [user_register, setUser_register] = useState("");
const [employeer_register, setEmployeer_register] = useState("");

const [user_account_creation, setUserAccountCreation] = useState(false);
const [employeer_account_creation, setEmployeerAccountCreation] = useState(false);

useEffect(() => {
  // Define the data to be sent in the request body
 
  const token = localStorage.getItem("loginToken")
  // Define the options for the fetch request
  const requestOptions = {
    method: 'POST', // Set the request method to POST
    headers: {
      'Content-Type': 'application/json', // Set the content type of the request
      // Add any additional headers here if needed
    },
    body: JSON.stringify({token:token}), // Convert requestData to JSON format and set it as the request body
  };

  // Fetch data from the API using the POST method
  fetch(`${BASE_URL}/user_account_creation_check/`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data, 'user_account_creation_check-------');
      // Handle the response data here
       if (data.status){
        setUserAccountCreation(true)
        setEmployeerAccountCreation(true)
       }
       else{
        setUserAccountCreation(false)
        setEmployeerAccountCreation(false)
       }
    })
    .catch(error => {
      // Handle errors here
      console.error('Error:', error);
    });
}, []);

console.log(register_by, 'register_by--------- login -------->');
useEffect(() => {
  setUser_register(register_by);
  setEmployeer_register(register_by);
}, []); 

console.log(user_register, 'user_register--------->');
console.log(employeer_register, 'employeer_register------------->');

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


  // Your component code

  const navbarCondition = () => {
    if (user_register === 'User') {
      console.log("user------------->");
      dispatch(setUserResultRegister(true));
      dispatch(setEmployeerResultRegister(false));
      // dispatch(setDemoResultRegister(false));
    } else if (employeer_register === 'Recruiter') {
      console.log("Employeer------------->");
      dispatch(setEmployeerResultRegister(true));
      dispatch(setUserResultRegister(false));
      // dispatch(setDemoResultRegister(false));
    } else {
      console.log("Demo------------->");
      dispatch(setUserResultRegister(false));
      dispatch(setEmployeerResultRegister(false));
      // dispatch(setDemoResultRegister(true));
    }
  };


  const handleForget = () => {
    navigate("/ForgetPassword");
  };

  const token = localStorage.getItem("googleToken");
  const otpToken = localStorage.getItem("otpToken");

  useEffect(() => {
    if (token !== null || otpToken !== null) {
      navigate("/home");
    }
  });

  // Validations
  const handleLoginSubmit = async (event) => {
    await handleSubmit(
      event,
      email,
      password,
      setEmailError,
      setPasswordError,
      navigate
    );

    let headers = new Headers();
    const dataOne = { email, password };

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin",  `${BASE_URL}/login/`);
    const apiUrl =  `${BASE_URL}/login/`;

    try {
      const response = await axios.post(apiUrl, dataOne, headers);
      localStorage.setItem("loginToken", response?.data?.message?.token);
      localStorage.setItem("registered_by",response?.data?.message?.registered_by);
      console.log("LoginToken========>", response.data.message.token);

      const outPut = response.data.status;
      const storedToken = localStorage.getItem("loginToken");
      setOutputData(outPut);
      console.log(outPut, "post data response===>");
      console.log(dataOne);
      console.log(response.data);

      // 
      if(outPut === false){
        localStorage.clear();
      }

      if (storedToken !== null && outPut === true) {
        navigate("/home");
        // window.location.reload();
        console.log("====================================");
        console.log(outPut, "navigation=====>");
        console.log("====================================");
      } else {
        console.log(outPut, "navigation=====>");
       toast.error('Enter the Valid Email or Password')
      }
    } catch (error) {
      console.log(error);
      if(error.code === "ERR_NETWORK"){
        toast.error("Server Not Responding")
      }
    }
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const [showPassword, setShowPassword] = React.useState(false);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-background">
    <ThemeProvider theme={defaultTheme}>
    <Toaster toastOptions={{ duration: 4000 }} /> 
      <Container component="main" maxWidth="xs" className="main-login">
        <CssBaseline />
        <Box
          sx={{
           
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",    
          }}
        >  
          {/* <Avatar
            src={jllogo}
            sx={{
              m: 1,
              mt: 1,
              bgcolor: "secondary.main",
              width: 56,
              height: 65,
            }}
          >
            <LockOutlinedIcon />
          </Avatar> */}
          {/* <img src={jllogo} alt="Login" height="70px" width="140px" style={{marginLeft:"20px"}} /> */}
          <p component="h1" variant="h5" className="h1-login" >
            {validation.Context.one}
          </p>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id={validation.style.elevn}
              label={validation.style.twelve}
              name={validation.style.elevn}
              autoComplete={validation.style.elevn}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
                setEmailError(""); 
              }}
              onBlur={() => emailBlur(email, setEmailError, setPasswordError)}
              error={!!emailError}
              helperText={emailError}
              InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Set border radius
                    '& fieldset': {
                        borderColor: '#1A237E', // Set border color
                        borderWidth: '2px' // Set border width
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda', // Set border color on hover
                        borderWidth: '2px' // Set border width
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E', // Set border color on focus
                        borderWidth: '2px' // Set border width
                    },
                },
                color: "#1A237E", // Text color
                // backgroundColor: errors.job_title ? '#E8EAF6' : 'white', // Background color based on error
                // borderRadius: "10px", // Border radius
            }}
            style={{backgroundColor:"white",borderRadius:"10px"}}
            FormHelperTextProps={{
              sx: { backgroundColor: '#E8EAF6' ,marginLeft:'0px',paddingLeft:'5px',marginTop:'-3px',paddingTop:'4px',marginRight:'-10px'} // Set background color for error message
          }}
            />
            {/*
            <TextField
              margin="normal"
              fullWidth
              name={validation.style.thirteen}
              label={validation.style.fourteen}
              type={validation.style.thirteen}
              id={validation.style.thirteen}
              autoComplete={validation.style.fifteen}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onBlur={() => handlePasswordBlur(email, setEmailError)}
              error={!!passwordError}
              helperText={passwordError}
            />
             */}

             <TextField
              margin="normal"
              fullWidth
              name={validation.style.thirteen}
              label={validation.style.fourteen}
              type={showPassword ? "text" : "password"}
              id={validation.style.thirteen}
              autoComplete={validation.style.fifteen}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onBlur={() => handlePasswordBlur(email, setEmailError)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ?<Visibility /> :  <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                style: { color: "#1A237E" } // Change label color
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Set border radius
                    '& fieldset': {
                        borderColor: '#1A237E', // Set border color
                        borderWidth: '2px' // Set border width
                    },
                    '&:hover fieldset': {
                        borderColor: '#a2beda', // Set border color on hover
                        borderWidth: '2px' // Set border width
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1A237E', // Set border color on focus
                        borderWidth: '2px' // Set border width
                    },
                },
                color: "#1A237E", // Text color
                // backgroundColor: errors.job_title ? '#E8EAF6' : 'white', // Background color based on error
                // borderRadius: "10px", // Border radius
            }}
            style={{backgroundColor:"white",borderRadius:"10px"}}
            FormHelperTextProps={{
              sx: { backgroundColor: '#E8EAF6',marginLeft:'0px',paddingLeft:'5px',marginTop:'-3px',paddingTop:'4px',marginRight:'-10px' } // Set background color for error message
          }}
            />

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    value="remember"
                    color={validation.grid.two}
                    id={validation.grid.elevn}
                    sx={{color:'#1A237E'}}
                  />
                }
                label={validation.Context.eight}
                sx={{color:'#1A237E'}}
              />

              <Link
                variant="body2"
                style={{ marginLeft: "100px", cursor: "pointer",color:'#1A237E' }}
                onClick={handleForget}
              >
                {validation.Context.two}
                
              </Link>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={navbarCondition}
              sx={{
                mt: 1, mb: 2,
                borderRadius: '10px', // Rounded corners
                padding: '7px 15px', // Padding
                fontSize: '16px', // Font size
                fontWeight: 'bold', // Bold font weight
                textTransform: 'none', // Disable text transformation
                boxShadow: 'none', // Disable box shadow
                marginBottom:"20px",
                color: 'white', // Set text color
                backgroundColor: '#1A237E', // Set background color
                '&:hover': {
                    backgroundColor: '#7986CB', // Change background color on hover
                    color: '#1A237E'
                },
            }}
            >
              {validation.Context.one}
            </Button>
            <Divider style={{ textAlign: "center", color: "#1A237E", borderColor: "#1A237E !important" }}>
              {validation.Context.five}
            </Divider>
            <Button
              fullWidth
              id={validation.grid.twelve}
              variant="contained"
              sx={{
                mt: 2, mb: 2,
                borderRadius: '10px', // Rounded corners
                padding: '7px 15px', // Padding
                fontSize: '16px', // Font size
                fontWeight: 'bold', // Bold font weight
                textTransform: 'none', // Disable text transformation
                boxShadow: 'none', // Disable box shadow
                marginBottom:"20px",
                color: 'white', // Set text color
                backgroundColor: '#1A237E', // Set background color
                '&:hover': {
                    backgroundColor: '#7986CB', // Change background color on hover
                    color: '#1A237E'
                },
            }}
              onClick={handleOTP}
            >
              {validation.Context.three}
            </Button>
          </Box>
        </Box>
        <Button
          variant="outlined"
          color={validation.grid.two}
          onClick={googleClick}
          sx={{
            backgroundColor:'white',
            borderRadius: '10px',
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            color: '#1A237E',
            borderColor: '#1A237E',
            '&:hover': {
              backgroundColor: '#C5CAE9', // Change background color on hover
              borderColor: '#1A237E',
              color: '#1A237E'
            },
          }}
          
        >
          <img src={glogo} alt={validation.last.one} className={validation.last.two} />
          {validation.Context.four}
        </Button>
        {/* <Grid container className={validation.last.three}>
          <Grid item>
            <p href="#" variant="body2" style={{ marginLeft: "-2.5rem" }}>
              {validation.Context.six}{" "}
              <span id="signup_btn" style={{ cursor: "pointer" }} onClick={handleSignupClick}>
                {validation.Context.seven}
              </span>
            </p>
          </Grid>
        </Grid> */}
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default LogIn;
