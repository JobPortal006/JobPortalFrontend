import { SET_SEARCH_RESPONSE, SET_COMPANY_RESPONSE } from './actions';

const initialState = {
  searchResponse: null,
  companyResponse: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESPONSE:
      return {
        ...state,
        searchResponse: action.payload,
      };
    case SET_COMPANY_RESPONSE:
      return {
        ...state,
        companyResponse: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
