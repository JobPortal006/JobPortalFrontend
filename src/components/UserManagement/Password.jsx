// import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from "react-toastify";
// import cnfmPass from "../Json/password.json";
// import BASE_URL from '../CommonAPI';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//     background: '#80CBC4',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   form: {
//     backgroundColor: '#FFF8E1',
//     width: 400,
//     padding: '50px 40px',
//     borderRadius: 8,
//     textAlign: 'center',
//     boxShadow: '20px 20px 30px rgba(0,0,0,0.15)',
//   },
//   label: {
//     fontWeight: 500,
//     fontSize: 18,
//     color: '#101030',
//     marginBottom: 10,
//   },
//   passwordContainer: {
//     position: 'relative',
//     marginBottom: 20,
//   },
//   submitButton: {
//     border: 'none',
//     fontWeight: 500,
//     fontSize: 18,
//     letterSpacing: 1,
//     cursor: 'pointer',
//     marginTop: '20px',
//     '&:hover': {
//       backgroundColor: '#6b2fa3',
//     },
//   },
//   error: {
//     fontSize: 14,
//     color: '#ff4d4d',
//   },
//   hint: {
//     fontSize: 12,
//     color: '#555',
//   },
// }));




// const Password = () => {
//   const classes = useStyles();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleTogglePasswordVisibility = (field) => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };


//   const navigate = useNavigate();

//   const reDirect = () =>{
//     navigate('/LogIn');
//   }

//   const Notifi = () => (
    
//       <Button
//         variant="contained"
//         color="info"
//         onClick={reDirect}
//         style={{marginTop:'100px'}}
//       >
//         {cnfmPass.context.one}
//       </Button>
   
//   );


//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     if (password === '') {
//       setMessage(cnfmPass.validation.one);
//     } else if (password.length < 8) {
//       setMessage(cnfmPass.validation.two);
//     } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
//       setMessage(cnfmPass.validation.three);
//     } else if (!/\d/.test(password)) {
//       setMessage(cnfmPass.validation.four);
//     } else if (password !== confirmPassword) {
//       setMessage(cnfmPass.validation.five);
//     } else {
//       console.log('Password:', password, confirmPassword);
//       toast.success(cnfmPass.validation.six, {
//         icon: <Notifi />,
//         position: "top-center",
//         autoClose: false,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//       setMessage('');
//       handlePassword(); // Move the data submission logic here
//     }
//   };

//   const handlePassword = async () => {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     headers.append('Accept', 'application/json');
//     headers.append('Origin', `${BASE_URL}/updatepassword/`);
//     const apiUrl = `${BASE_URL}/updatepassword/`;
  
//     let data;
//     try {
//       const response = await axios.post(apiUrl, { password, confirmPassword }, headers);
//       data = response.data;
//       console.log(data, 'post data response===>');
//     } catch (error) {
//       console.log('Server error:', error);
//     }
//   };
  
  

//   return (
//     <div className={classes.root}>
//       <form className={classes.form} onSubmit={handleSubmit}>
//         <h2 style={{color : "#3F51B5"}}>{cnfmPass.context.two}</h2>

//         <label className={classes.label} htmlFor="password">{cnfmPass.context.three}</label>
//         <div className={classes.passwordContainer}>
//           <TextField
//             type={showPassword ? 'text' : 'password'}
//             id={cnfmPass.label.one}
//             name={cnfmPass.label.one}
//             placeholder={cnfmPass.label.two}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => handleTogglePasswordVisibility('password')} edge="end">
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>

//         <label className={classes.label} htmlFor="cnfrm-password">{cnfmPass.context.four}</label>
//         <div className={classes.passwordContainer}>
//           <TextField
//             type={showConfirmPassword ? 'text' : 'password'}
//             id={cnfmPass.label.four}
//             name={cnfmPass.label.five}
//             placeholder={cnfmPass.label.six}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => handleTogglePasswordVisibility('confirmPassword')} edge="end">
//                     {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>

//         {message && <p className={classes.error}>{message}</p>}
//         <Button type="submit" variant='contained' style={{backgroundColor:"#3F51B5"}} className={classes.submitButton}  onClick={handlePassword}>
//           {cnfmPass.btn.two}
//         </Button>

//          <ToastContainer
//             position="top-center"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />

//       </form>
//     </div>
//   );
// };

// export default Password;

import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import cnfmPass from "../Json/password.json";
import BASE_URL from '../CommonAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: '#80CBC4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#FFF8E1',
    width: 400,
    padding: '50px 40px',
    borderRadius: 8,
    textAlign: 'center',
    boxShadow: '20px 20px 30px rgba(0,0,0,0.15)',
  },
  label: {
    fontWeight: 500,
    fontSize: 18,
    color: '#101030',
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  submitButton: {
    border: 'none',
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: 1,
    cursor: 'pointer',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#6b2fa3',
    },
  },
  error: {
    fontSize: 14,
    color: '#ff4d4d',
  },
  hint: {
    fontSize: 12,
    color: '#555',
  },
}));

const Password = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  
  const handleTogglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handlePassword = async (event) => {
    event.preventDefault();
  
    // Password validation checks
    if (password === '') {
      toast.error(cnfmPass.validation.one);
      return;
    } else if (password.length < 8) {
      toast.error(cnfmPass.validation.two);
      return;
    } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
      toast.error(cnfmPass.validation.three);
      return;
    } else if (!/\d/.test(password)) {
      toast.error(cnfmPass.validation.four);
      return;
    }
  
    // Confirm password validation checks
    if (confirmPassword === '') {
      toast.error("Please confirm your password");
      return;
    } else if (password !== confirmPassword) {
      toast.error(cnfmPass.validation.five);
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/updatepassword/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, confirmPassword })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success("Password updated successfully");
        // navigate('/LogIn');
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating password");
    }
  };
  

  return (
    <div className={classes.root}>
      <form className={classes.form} >
        <h2 style={{color : "#3F51B5"}}>{cnfmPass.context.two}</h2>

        <label className={classes.label} htmlFor="password">{cnfmPass.context.three}</label>
        <div className={classes.passwordContainer}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            id={cnfmPass.label.one}
            name={cnfmPass.label.one}
            placeholder={cnfmPass.label.two}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleTogglePasswordVisibility('password')} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <label className={classes.label} htmlFor="cnfrm-password">{cnfmPass.context.four}</label>
        <div className={classes.passwordContainer}>
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            id={cnfmPass.label.four}
            name={cnfmPass.label.five}
            placeholder={cnfmPass.label.six}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleTogglePasswordVisibility('confirmPassword')} edge="end">
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {message && <p className={classes.error}>{message}</p>}
        <Button type="submit" variant='contained' style={{backgroundColor:"#3F51B5"}} className={classes.submitButton}  onClick={handlePassword}>
          {cnfmPass.btn.two}
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
            theme="light"
          />

      </form>
    </div>
  );
};

export default Password;
