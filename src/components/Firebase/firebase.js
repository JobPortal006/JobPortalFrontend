// <----Jeeva---->

// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';

// const Config = {
//   apiKey: "AIzaSyDUVNdbpq4ICRTw3-YuEoMcflp-KrPbPKU",
//   authDomain: "login-otp-jobportal.firebaseapp.com",
//   projectId: "login-otp-jobportal",
//   storageBucket: "login-otp-jobportal.appspot.com",
//   messagingSenderId: "176618231785",
//   appId: "1:176618231785:web:fb3e7321e521d64bed9d78",
//   measurementId: "G-XWHRVZ630K"
// };

// const app = initializeApp(Config);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export { auth, provider };

// <<-------------------------------------------------------------------------------->>

// <---Prathap--->

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Config = {
  apiKey: "AIzaSyAEMF4GZhvfO0ASM7moJgFkkv3tL_15TAA",
  authDomain: "otp-otp-4a574.firebaseapp.com",
  projectId: "otp-otp-4a574",
  storageBucket: "otp-otp-4a574.appspot.com",
  messagingSenderId: "745831201499",
  appId: "1:745831201499:web:fd9f61f4082dde0f16aafe",
  measurementId: "G-HRMKLG3XCK",
};

const app = initializeApp(Config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
