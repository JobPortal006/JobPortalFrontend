
// Import necessary dependencies and configurations
import validationMessages from '../Json/signup.json';
import regexPatterns from '../Json/signupRegularexpression.json';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

export const handleInputChange = (formData, setFormData, errors, setErrors, e) => {
  // Function to handle input changes in the form
  const { name, value, type, checked } = e.target;
  let errorMessage = '';
  // Check if the input value contains spaces
  const containsSpace = /\s/.test(value);

  // If the value contains spaces, set an error message and return
  if (containsSpace) {
    setErrors({ ...errors, [name]: validationMessages.fields[name].containsSpace });
    return;
  }

  // Process mobile number separately to keep only numeric values
  if (name === 'mobile_number') {
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, [name]: numericValue });
  } else {

    //For other fields, updates the form data with the new value.
    setFormData({ ...formData, [name]: value });
  }

  //Additional checks for email and mobile number regarding spaces.
  if (['email', 'mobile_number'].includes(name) && /\s/.test(value)) {
    errorMessage = validationMessages.fields[name].containsSpace;
  }

  // Validate mobile number length

  if (name === 'mobile_number') {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length !== 10) {
      errorMessage = validationMessages.fields.mobile_number.invalid;
    }
  }

   // Special case for 'signup_by' to update its value in the form data and clear any errors
  if (name === 'signup_by') {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
    return;
  }

  // For checkboxes, update the form data and clear any errors
  if (type === 'checkbox') {
    setFormData({
      ...formData,
      [name]: checked,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
    return;
  }

  // For other input types, update the form data and set any error messages
  // setFormData({
  //   ...formData,
  //   [name]: value,
  // });

  // setErrors({
  //   ...errors,
  //   [name]: errorMessage,
  // });
};

export const handleTogglePasswordVisibility = (field, showPassword, setShowPassword, showconfirm_password, setShowconfirm_password) => {
  // Toggle the visibility of password and confirm_password fields based on the specified 'field'
  if (field === 'password') {
    setShowPassword(!showPassword);
  } else if (field === 'confirm_password') {
    setShowconfirm_password(!showconfirm_password);
  }
};


export const handleSubmit = async (formData, setErrors, setShowPassword, setShowconfirm_password, e,navigate) => {
  // Prevent the default form submission behavior
  e.preventDefault();
   // Regular expressions for form field validation
  const emailRegex = new RegExp(regexPatterns.emailRegex);
  const mobile_numberRegex = new RegExp(regexPatterns.mobile_numberRegex);
  const passwordRegex = new RegExp(regexPatterns.passwordRegex);

  // Object to store form validation errors
  const newErrors = {
    signup_by: '',
    email: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
    agreeTerms: '',
  };

    // Validate form fields and update errors object
  // ... (various conditions to validate form fields)

  // Set errors state based on form validation
 

  // Email Validation
  if (!emailRegex.test(formData.email)) {
    // If email doesn't match the pattern, set an error message
    newErrors.email = validationMessages.fields.email.invalid;
  }

  // Mobile Number Validation
  if (!mobile_numberRegex.test(formData.mobile_number)) {
    // If mobile number doesn't match the pattern, set an error message
    newErrors.mobile_number = validationMessages.fields.mobile_number.invalid;
  }

  // Password Validation
  if (!passwordRegex.test(formData.password)) {
    // If password doesn't match the pattern, set an error message
    newErrors.password = validationMessages.fields.password.invalid;
  }

  // Confirm Password Matching
  if (formData.password !== formData.confirm_password) {
    // If password and confirm password don't match, set an error message
    newErrors.confirm_password = validationMessages.fields.confirm_password.mismatch;
  }

  // Agree Terms Checkbox Validation
  if (!formData.agreeTerms) {
    // If the "Agree Terms" checkbox is not checked, set an error message
    newErrors.agreeTerms = validationMessages.fields.agreeTerms.required;
  }

  // Signup_by Selection Validation
  if (!formData.signup_by) {  
    // If signup_by field is not selected, set an error message
    newErrors.signup_by = validationMessages.fields.role.required1;
  }

  setErrors(newErrors);

  // If no validation errors, submit the form data
  // If no errors, proceed with form submission
  if (!Object.values(newErrors).some(error => error !== '')) {
    
   
    // Remove sensitive info from the form data
    // Prepare form data for submission
    const formDataWithoutSensitiveInfo = { ...formData };
    delete formDataWithoutSensitiveInfo.confirm_password;
    delete formDataWithoutSensitiveInfo.agreeTerms;

    // Update mobile number format if present
    if (formData.mobile_number) {
      formData.mobile_number = `+91${formData.mobile_number}`;
    }

    // Display form data (without sensitive info) in the console
    console.log('Form submitted:', formDataWithoutSensitiveInfo);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://192.168.1.38:8000/signup/');
    // Define API URL
    const apiUrl = 'http://192.168.1.38:8000/signup/';
    
    try {
      // Make a POST request to the API
      const response = await axios.post(apiUrl, formData, headers);

      // Log the response and navigate based on API response
      console.log(response, "post data response===>");
      console.log(response.data.status, "SignUp======>");
      if (response.data.status === true) {
        // If API response is true, navigate to login page
        navigate('/login');
      } else {
        // If API response is false, show the error message
       alert('Account already exists');
        // You may want to display this error message to the user.
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const handleGoogleSignIn = (auth, provider, setValue, navigate) => {
  // Function to handle Google sign-in
  signInWithPopup(auth, provider)
    .then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('googleToken', data._tokenResponse.oauthAccessToken);
    })
    .catch((error) => {
      console.error('Google Sign-In Error:', error.message);
    });
};
