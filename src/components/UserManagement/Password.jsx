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


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: 'linear-gradient(45deg, #8b51ff, #7a37ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#ffffff',
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

  const handleTogglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };


  const navigate = useNavigate();

  const reDirect = () =>{
    navigate('/LogIn');
  }

  const Notifi = () => (
    
      <Button
        variant="contained"
        color="info"
        onClick={reDirect}
        style={{marginTop:'100px'}}
      >
        {cnfmPass.context.one}
      </Button>
   
  );


  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === '') {
      setMessage(cnfmPass.validation.one);
    } else if (password.length < 8) {
      setMessage(cnfmPass.validation.two);
    }else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
      setMessage(cnfmPass.validation.three);
    } else if (!/\d/.test(password)) {
      setMessage(cnfmPass.validation.four);
    } else if (password !== confirmPassword) {
      setMessage(cnfmPass.validation.five);
    } else {
      console.log('Password:', password, confirmPassword);
      toast.success(cnfmPass.validation.six, {
         
        icon: (
          <div style={{marginLeft:'100px',marginTop:'-30px'}}>
            <Notifi/>
          </div>
        ),
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        
      
        
     
          
        })
      setMessage('');
      
      
    }
  };


  const handlePassword = async () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://192.168.1.36:8000/updatepassword/');
    const apiUrl = 'http://192.168.1.36:8000/updatepassword/';
  
    let data;
    try {
      const response = await axios.post(apiUrl, { password, confirmPassword }, headers);
      data = response.data;
      console.log(data, 'post data response===>');
    } catch (error) {
      console.log('Server error:', error);
    }
  };
  

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2>{cnfmPass.context.two}</h2>

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
        <Button type="submit" className={classes.submitButton} style={{ backgroundColor: '#ccb4fb' }} onClick={handlePassword}>
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