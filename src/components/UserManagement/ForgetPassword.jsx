import React, { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import "../UserManagement/forgetpassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import forget from "../Json/forgetPassword.json";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (!validateEmail(inputEmail)) {
      setEmailError(forget.validation.one);
    } else {
      setEmailError("");
    }
  };

  const navigate = useNavigate();

  const handlePassword = () => {
    navigate("/SignUp");
  };

  const Notify = () => (
    <div>
      <Button variant="contained" color={forget.function.two} id={forget.function.five} onClick={handlePassword}>
        {forget.function.three}
      </Button>
    </div>
  );

  const handleSubmit = async () => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://192.168.1.38:8000/forgetpassword/");
    const apiUrl = "http://192.168.1.38:8000/forgetpassword/";

    let data;
    try {
      const response = await axios.post(apiUrl, { email }, headers);
      data = response.data.status;
      console.log(data, "post data response===>");
    } catch (error) {
      console.log(error);
    }

    console.log(data);
    if (!validateEmail(email)) {
      setEmailError(forget.validation.one);
      return;
    } else if (data) {
      toast.success(forget.validation.two, {
        style: {
          border: "2px solid #4caf50",
          padding: "16px",
          color: "#4caf50",
          backgroundColor: "#f0f0f0",
        },
        iconTheme: {
          primary: "#4caf50",
          secondary: "#f0f0f0",
        },
      });
    } else {
      toast.error(forget.validation.three, {
        icon: (
          <div style={{ marginLeft: "150px" }}>
            <Notify />
          </div>
        ),
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setEmailError(forget.validation.four);
    }
    console.log(forget.validation.four, email);
  };

  return (
    <div className={forget.box.one}>
      <div className={forget.box.two}>
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{forget.box.six}</h2>
          <Box width="17rem" component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Box>
          <br />
          <Button variant="contained" color={forget.function.two} onClick={handleSubmit}>
            {forget.btn.three}
          </Button>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Box>
      </div>
    </div>
  );
};

export default ForgetPassword;
