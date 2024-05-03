// actions.js
export const SET_USER_RESULT_REGISTER = 'SET_USER_RESULT_REGISTER';
export const SET_EMPLOYEER_RESULT_REGISTER = 'SET_EMPLOYEER_RESULT_REGISTER';
// export const SET_DEMO_RESULT_REGISTER = 'SET_DEMO_RESULT_REGISTER';

export const setUserResultRegister = (value) => ({
  type: SET_USER_RESULT_REGISTER,
  payload: value,
});

export const setEmployeerResultRegister = (value) => ({
  type: SET_EMPLOYEER_RESULT_REGISTER,
  payload: value,
});

// export const setDemoResultRegister = (value) => ({
//   type: SET_DEMO_RESULT_REGISTER,
//   payload: value,
// });
