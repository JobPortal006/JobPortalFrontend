// import { createStore } from 'redux';
// import rootReducer from './reducer';

// const store = createStore(rootReducer);

// export default store;

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './reducer';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Apply middleware
const middleware = []; // No middleware added

const Store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
export default Store;
export const persistor = persistStore(Store);


  