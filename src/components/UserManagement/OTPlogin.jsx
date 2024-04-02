import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../UserManagement/OTPlogin.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios"; // Import axios
import otpnum from "../Json/otp.json";
import { useMediaQuery } from "@mui/material";
import BASE_URL from '../CommonAPI';

const OTPlogin = () => {
  const [mobile_number, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const inputWidth = isSmallScreen ? "100%" : "63%";

  // Sending the OTP
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      // Call your API to send OTP
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };


      const response = await axios.post(`${BASE_URL}/loginWithOTP/`, { mobile_number }, { headers: headers });
      const otpverify = response.data.status;
      const registeredBy = response.data.message.registered_by
      localStorage.setItem('registered_by' , registeredBy ) ;
      console.log(registeredBy,"otp");
      console.log(response, "OTP_Response====>");
      console.log(otpverify, "otpverify======>");

      // Continue with Firebase OTP verification if the API call was successful
      if (otpverify) {
        await recaptcha.verify();
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          mobile_number,
          recaptcha
        );
        setConfirmation(confirmationResult);
        toast.success(otpnum.validation.one);
      } else {
        toast.error(otpnum.validation.two);
      }
    } catch (err) {
      console.error(err);
      toast.error(otpnum.validation.three);
    }
  };

  // Verifying the Otp
  const verifyOtp = async () => {
    try {
      const confirmationResult = await confirmation.confirm(otp);
      localStorage.setItem("token", confirmationResult?.user?.accessToken);
      const getToken = confirmationResult?.user?.accessToken;
      localStorage.setItem("otpToken", getToken);
      if (confirmationResult?.user?.accessToken !== undefined) {
        console.log(
          "OTP verified successfully:",
          confirmationResult?.user?.accessToken
        );
        toast.success(otpnum.validation.four);
        navigate("/home");
        window.location.reload();
      } else {
        console.log("Failed to verify OTP");
      }
    } catch (err) {
      toast.error(otpnum.validation.five);
      console.error(err);
    }
  };

  useEffect(() => {
    const otpToken = localStorage.getItem("otpToken");
    if (otpToken !== null) {
      navigate("/home");
    }
  });

  return (
    <div className={otpnum.phone.one}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className={otpnum.phone.two}>
        <h3>{otpnum.phone.four}</h3>

        <PhoneInput
          style={{ marginTop: "30px", width: inputWidth }}
          country={"in"}
          value={mobile_number}
          onChange={(mobile_number) => setPhone("+" + mobile_number)}
        />

        <div style={{ marginTop: "1rem" }} id={otpnum.phone.nine}></div>

        <Button
          onClick={sendOtp}
          sx={{ mt: 1}}
          className="send-otp"
          variant="contained"
        >
          {otpnum.button.four}
        </Button>

        <br />
        <TextField
          onChange={(e) => setOtp(e.target.value)}
          variant="outlined"
          size="small"
          label={otpnum.button.six}
          className="otp-input"
          sx={{ mt: 3, width: "79%" }}
        ></TextField>
        <br />
        <Button
          onClick={verifyOtp}
          className="verify-otp"
          variant="contained"
          color={otpnum.button.three}
          sx={{ mt: 3 }}
        >
          {otpnum.button.five}
        </Button>
      </div>
    </div>
  );
};

export default OTPlogin;

