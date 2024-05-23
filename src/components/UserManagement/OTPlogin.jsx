// import { Button, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "../UserManagement/OTPlogin.css";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth";
// import { auth } from "../Firebase/firebase";
// import { useNavigate } from "react-router";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios"; // Import axios
// import otpnum from "../Json/otp.json";
// import { useMediaQuery } from "@mui/material";
// import BASE_URL from '../CommonAPI';

// const OTPlogin = () => {
//   const [mobile_number, setPhone] = useState("");
//   const [confirmation, setConfirmation] = useState(null);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const isSmallScreen = useMediaQuery("(max-width:600px)");
//   const inputWidth = isSmallScreen ? "100%" : "63%";


//   const [editMode, setEditMode] = useState(false); // State to control edit mode

//   // const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
//   // recaptcha.verify();
//   // Sending the OTP
//   const sendOtp = async () => {
//     if(!mobile_number){
//       toast.error("Enter the Mobile Number")
//       return
//     }
//     try {
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

//       // Call your API to send OTP
//       const headers = {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       };


//       const response = await axios.post(`${BASE_URL}/loginWithOTP/`, { mobile_number }, { headers: headers });
//       const otpverify = response.data.status;
//       const registeredBy = response.data.message.registered_by
//       localStorage.setItem('registered_by' , registeredBy ) ;
//       console.log(registeredBy,"otp");
//       console.log(response, "OTP_Response====>");
//       console.log(otpverify, "otpverify======>");
     
//       // Continue with Firebase OTP verification if the API call was successful
//       if (otpverify) {
//         await recaptcha.verify();
//         const confirmationResult = await signInWithPhoneNumber(
//           auth,
//           mobile_number,
//           recaptcha
//         );
//         setConfirmation(confirmationResult);
//         setEditMode(true);
//         toast.success(otpnum.validation.one);
        
//       } else {
//         toast.error(otpnum.validation.two);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(otpnum.validation.three);
//     }
//   };

//   // Verifying the Otp
//   const verifyOtp = async () => {
//     if(!otp){
//       toast.error("Enter the OTP")
//       return;
//     }
//     try {
//       const confirmationResult = await confirmation.confirm(otp);
//       localStorage.setItem("token", confirmationResult?.user?.accessToken);
//       const getToken = confirmationResult?.user?.accessToken;
//       localStorage.setItem("otpToken", getToken);
//       if (confirmationResult?.user?.accessToken !== undefined) {
//         console.log(
//           "OTP verified successfully:",
//           confirmationResult?.user?.accessToken
//         );
//         toast.success(otpnum.validation.four);
//         navigate("/home");
//         window.location.reload();
//       } else {
//         console.log("Failed to verify OTP");
//       }
//     } catch (err) {
//       toast.error("Invalid OTP");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const otpToken = localStorage.getItem("otpToken");
//     if (otpToken !== null) {
//       navigate("/home");
//     }
//   });

//   return (
//     <div className={otpnum.phone.one}>
//       <Toaster toastOptions={{ duration: 4000 }} />
//       <div className={otpnum.phone.two}>
//         <h3>{otpnum.phone.four}</h3>

//         <PhoneInput
//           style={{ marginTop: "30px", width: inputWidth }}
//           country={"in"}
//           value={mobile_number}
//           onChange={(mobile_number) => setPhone("+" + mobile_number)}
//         />

//         <div style={{ marginTop: "1rem" }} id={otpnum.phone.nine}></div>

//         <Button
//           onClick={sendOtp}          
//           sx={{ mt: 1}}
//           className="send-otp"
//           variant="contained"
//         >
//           {otpnum.button.four}
//         </Button>

//         <br />
//         <TextField
//           disabled={!editMode}
//           onChange={(e) => setOtp(e.target.value)}
//           variant="outlined"
//           size="small"
//           label={otpnum.button.six}
//           className="otp-input"
//           sx={{ mt: 3, width: "79%" }}
//         ></TextField>
//         <br />
//         <Button
//           disabled={!editMode}
//           onClick={verifyOtp}
//           className="verify-otp"
//           variant="contained"
//           color={otpnum.button.three}
//           sx={{ mt: 3 }}
//         >
//           {otpnum.button.five}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OTPlogin;

import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../UserManagement/OTPlogin.css";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../Firebase/firebase";
import { useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import otpnum from "../Json/otp.json";
import { useMediaQuery } from "@mui/material";
import axios from "axios"; // Import axios
import BASE_URL from '../CommonAPI';

const OTPlogin = () => {
  const [mobile_number, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile_number_response, setMobileNumberResponse] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const inputWidth = isSmallScreen ? "100%" : "63%";

  const [editMode, setEditMode] = useState(false); // State to control edit mode


  

  useEffect(() => {
    // if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(window.recaptchaVerifier,'reCAPTCHA resolved');
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired');
        }
      });
    // }
  }, []);
  useEffect(() => {
    let interval;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const sendOtp = async () => {
    if (!mobile_number) {
      toast.error("Enter the Mobile Number");
      return;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };


      const response = await axios.post(`${BASE_URL}/loginWithOTP/`, { mobile_number }, { headers: headers });
      const otpverify = response.data.status;
      const registeredBy = response.data.message.registered_by
      if (otpverify){
        localStorage.setItem('registered_by' , registeredBy ) ;
        setMobileNumberResponse(response.data.message)
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = `+${mobile_number}`;
  
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        console.log(confirmationResult,'confirmationResult');
        setConfirmation(confirmationResult);
        setEditMode(true);
        toast.success(otpnum.validation.one);
        setIsResendDisabled(true); // Disable resend button and start timer
      }
      else{
        toast.error(otpnum.validation.two);
      }
    } catch (err) {
      if (err.code === "auth/too-many-requests") {
        toast.error("Mobile number limit exceeded, please try another mobile number.");
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Server Not Responding");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Enter the OTP");
      return;
    }
    try {
      const confirmationResult = await confirmation.confirm(otp);
      // localStorage.setItem("token", confirmationResult?.user?.accessToken);
      localStorage.setItem("otpToken", mobile_number_response.token);
      // const getToken = confirmationResult?.user?.accessToken;
      // localStorage.setItem("otpToken", getToken);
      if (confirmationResult?.user?.accessToken !== undefined) {
        console.log(
          "OTP verified successfully:",
          confirmationResult?.user?.accessToken
        );
        toast.success(otpnum.validation.four);
        navigate("/home");
        // window.location.reload();
      } else {
        console.log("Failed to verify OTP");
      }
    } catch (err) {
      toast.error("Invalid OTP");
      console.error(err);
    }
  };

  useEffect(() => {
    const otpToken = localStorage.getItem("otpToken");
    if (otpToken !== null) {
      navigate("/home");
    }
  }, [navigate]);

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

        <div style={{ marginTop: "1rem" }} id="recaptcha-container"></div>

        <Button
          onClick={sendOtp}
          sx={{ mt: 1 }}
          className="send-otp"
          variant="contained"
          disabled={isResendDisabled}
        >
          {isResendDisabled ? `Resend OTP in ${timer}s` : otpnum.button.four}
        </Button>

        <br />
        <TextField
          disabled={!editMode}
          onChange={(e) => setOtp(e.target.value)}
          variant="outlined"
          size="small"
          label={otpnum.button.six}
          className="otp-input"
          sx={{ mt: 3, width: "79%" }}
        ></TextField>
        <br />
        <Button
          disabled={!editMode}
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
