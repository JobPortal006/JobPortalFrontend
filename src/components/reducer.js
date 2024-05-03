// reducers.js
import { combineReducers } from 'redux';
import {
  SET_USER_RESULT_REGISTER,
  SET_EMPLOYEER_RESULT_REGISTER,
  // SET_DEMO_RESULT_REGISTER,
} from './actions';

const userResultRegisterReducer = (state = false, action) => {
  switch (action.type) {
    case SET_USER_RESULT_REGISTER:
      return action.payload;
    default:
      return state;
  }
};

const employeerResultRegisterReducer = (state = false, action) => {
  switch (action.type) {
    case SET_EMPLOYEER_RESULT_REGISTER:
      return action.payload;
    default:
      return state;
  }
};

// const demoResultRegisterReducer = (state = true, action) => {
//   switch (action.type) {
//     case SET_DEMO_RESULT_REGISTER:
//       return action.payload;
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  userResultRegister: userResultRegisterReducer,
  employeerResultRegister: employeerResultRegisterReducer,
  // demoResultRegister: demoResultRegisterReducer,
});

export default rootReducer;
