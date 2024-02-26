// Import necessary dependencies and configurations
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import GoogleLogo from '../signup-image/google-icon.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import mainimage from "../signup-image/img.png";
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../components/Firebase/firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Recruiter from './Recruiter';
// import Jobposting from './Jobposting';
import formLabels from '../Json/signupformlabel.json';

// ... (import the necessary functions from signupvalidation.js)
import {
  handleInputChange,
  handleTogglePasswordVisibility,
  handleSubmit,
  handleGoogleSignIn
} from '../validation/signupvalidation';

export default function FixedContainer() {

// Initialize state variables using React hooks
//   The code defines a functional component named FixedContainer using the export default syntax.
// React hooks (useNavigate, useState) are used to manage the component's state, including form data (formData) and validation errors (errors).

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    signup_by: '',
    email: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = React.useState({
    email: '',
    mobile_number: '',              
    password: '',
    confirm_password: '',
    agreeTerms: '',
  });

  // Additional state variables (showPassword and showconfirm_password) are used to manage the visibility of password fields.

  const [showPassword, setShowPassword] = React.useState(false);
  const [showconfirm_password, setShowconfirm_password] = React.useState(false);

  // Define wrapper functions for event handling
  // A wrapper function handleInputChangeWrapper is defined to handle input changes in the form, using the handleInputChange function from signupvalidation.js

  const handleInputChangeWrapper = (e) => {
    handleInputChange(formData, setFormData, errors, setErrors, e);
  };

  // Another wrapper function handleTogglePasswordVisibilityWrapper is defined to toggle the visibility of password fields using the handleTogglePasswordVisibility function.

  const handleTogglePasswordVisibilityWrapper = (field) => {
    handleTogglePasswordVisibility(field, showPassword, setShowPassword, showconfirm_password, setShowconfirm_password);
  };

  // A wrapper function handleSubmitWrapper is defined to handle form submission using the handleSubmit function from signupvalidation.js.
  
  const handleSubmitWrapper = (e) => {
    handleSubmit(formData, setErrors, setShowPassword, setShowconfirm_password, e,navigate);
  };

  // A wrapper function handleSubmitWrapper is defined to handle form submission using the handleSubmit function from signupvalidation.js.
  const handleGoogleSignInWrapper = () => {
    handleGoogleSignIn(auth, provider, setValue, navigate);
  };

  const [value,setValue] = React.useState('');


// Check if a Google token is present in local storage and navigate to the login page
// The component uses the useEffect hook to check if a Google token is present in local storage (localStorage.getItem('googleToken')).
// If a token is found, it navigates to the login page.

  const token = localStorage.getItem('googleToken');

  useEffect(() => {
    if (token) {
      navigate('/login');
    }
  }, [token, navigate]);


  // JSX structure for the component
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, padding: '15px', borderRadius: '1px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', }}>
          <Grid item xs={12} sm={6} sx={{ bgcolor: '#7f3fff' }} >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center', position: 'relative' }}>
              <Typography variant="h4" component="div">
                <img src={mainimage} style={{ width: '50%', height: 'auto' }} alt={formLabels.mainImage.altText} />
                <Typography variant='h4'>
                  {formLabels.mainImage.headerText}
                </Typography>
                <Typography variant='h6'>
                  {formLabels.mainImage.subHeaderText}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2%' }}>
              <Typography variant="h4" component="div" mb={3}>
                {formLabels.formLabels.createAccount}
              </Typography>
              <form onSubmit={handleSubmitWrapper}>
                <RadioGroup
                  row
                  aria-label="signup_by"
                  name="signup_by"
                  value={formData.signup_by}
                  onChange={handleInputChangeWrapper}
                  error={Boolean(errors.signup_by)}
                >
                  <FormControlLabel value="User" control={<Radio />} label={formLabels.formLabels.usersignup_by} />
                  <FormControlLabel value="Recruiter" control={<Radio />} label={formLabels.formLabels.recruitersignup_by} />
                </RadioGroup>
                {errors.signup_by && (
                  <Typography variant="body2" color="error">
                    {errors.signup_by}
                  </Typography>
                )}
                <TextField
                  label={formLabels.formLabels.email}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChangeWrapper}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  label={formLabels.formLabels.mobile_number}
                  type="tel"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChangeWrapper}
                  error={Boolean(errors.mobile_number)}
                  helperText={errors.mobile_number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        +91
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} style={{ marginTop: '15px' }}>
                    <TextField
                      label={formLabels.formLabels.password}
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      name="password"
                      value={formData.password}
                      onChange={handleInputChangeWrapper}
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleTogglePasswordVisibilityWrapper('password')} edge="end">
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ marginTop: '15px' }}>
                    <TextField
                      label={formLabels.formLabels.confirmPassword}
                      type={showconfirm_password ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChangeWrapper}
                      error={Boolean(errors.confirm_password)}
                      helperText={errors.confirm_password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleTogglePasswordVisibilityWrapper('confirm_password')} edge="end">
                              {showconfirm_password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.agreeTerms}
                      onChange={handleInputChangeWrapper}
                      name="agreeTerms"
                      color="primary"
                    />
                  }
                  label={formLabels.formLabels.termsLabel}
                  style={{ marginTop: '10px' }}
                />
                {errors.agreeTerms && (
                  <Typography variant="body2" color="error">
                    {errors.agreeTerms}
                  </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '2%' }}>
                  {formLabels.formLabels.submitButton}
                </Button>
                <Divider variant="middle" sx={{ my: 3 }}>
                  {formLabels.formLabels.dividerText}
                </Divider>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleGoogleSignInWrapper}
                  fullWidth
                  sx={{ marginTop: '8px' }}
                >
                  <img src={GoogleLogo} alt="Google Logo" style={{ width: '5%', marginRight: '2%' }} />
                  {formLabels.formLabels.googleButton}
                </Button>
                <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
                  {formLabels.formLabels.haveAccountText} <Link to="/login">{formLabels.formLabels.signInLink}</Link>
                </Typography>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
