// LogIn.jsx

import React, { useEffect } from "react";
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Divider } from "@mui/material";
import glogo from "../Login Image/google-icon.svg";
import jllogo from "../Login Image/JL logo design.jpg";
import "../UserManagement/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../Firebase/firebase.js";
import { signInWithPopup } from "@firebase/auth";
// import { toast, Toaster } from 'react-hot-toast';
import {
  emailBlur,
  handlePasswordBlur,
  handleSubmit,
} from "../UserManagement/ValidtionLogin.jsx";
import validation from "../Json/login.json";



const LogIn = () => {
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

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };


  const [value, setValue] = React.useState("");
  

  const googleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);

        localStorage.setItem("email", data.user.email);
        localStorage.setItem( "googleToken",data._tokenResponse.oauthAccessToken);

        const googleToken = localStorage.getItem("googleToken");
        console.log(googleToken, "Google_Token=========>");

        if (data._tokenResponse.oauthAccessToken !== undefined) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(validation.Console.one, error.message);
      });
  };
  
  // Navigate to forget password
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
    headers.append("Origin", "http://192.168.1.38:8000/login/");
    const apiUrl = "http://192.168.1.38:8000/login/";

    try {
      const response = await axios.post(apiUrl, dataOne, headers);
      localStorage.setItem("loginToken", response?.data?.message?.token);
      console.log("LoginToken========>", response.data.message.token);

      const outPut = response.data.status;
      const storedToken = localStorage.getItem("loginToken");
      setOutputData(outPut);
      console.log(outPut, "post data response===>");
      console.log(dataOne);
      console.log(response.data);

      if (storedToken !== null && outPut === true) {
        navigate("/home");

        console.log("====================================");
        console.log(outPut, "navigation=====>");
        console.log("====================================");
      } else {
        console.log(outPut, "navigation=====>");
        alert('Enter the Valid Email or Password')
      }
    } catch (error) {
      console.log(error);
    }
  };

  //     const storedToken = localStorage.getItem("loginToken");

  // if (storedToken !== null && outputData === true) {
  //   navigate("/home");

  //   console.log('====================================');
  //   console.log(outputData, "navigation=====>");
  //   console.log('====================================');
  // }

  // }, [outputData, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
    {/*<Toaster toastOptions={{ duration: 4000 }} /> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
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
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: -1 }}>
            {validation.Context.one}
          </Typography>
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
                setEmail(e.target.value);
                setEmailError(""); 
              }}
              onBlur={() => emailBlur(email, setEmailError, setPasswordError)}
              error={!!emailError}
              helperText={emailError}
            />
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

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    value="remember"
                    color={validation.grid.two}
                    id={validation.grid.elevn}
                  />
                }
                label={validation.Context.eight}
              />

              <Link
                variant="body2"
                style={{ marginLeft: "100px", cursor: "pointer" }}
                onClick={handleForget}
              >
                {validation.Context.two}
              </Link>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              {validation.Context.one}
            </Button>
            <Divider style={{ textAlign: "center" }}>
              {validation.Context.five}
            </Divider>
            <Button
              fullWidth
              id={validation.grid.twelve}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <img src={glogo} alt={validation.last.one} className={validation.last.two} />
          {validation.Context.four}
        </Button>
        <Grid container className={validation.last.three}>
          <Grid item>
            <p href="#" variant="body2" style={{ marginLeft: "-2.5rem" }}>
              {validation.Context.six}{" "}
              <span id="signup_btn" style={{ cursor: "pointer" }} onClick={handleSignupClick}>
                {validation.Context.seven}
              </span>
            </p>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LogIn;
