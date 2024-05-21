// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import authSlice from 'reducers/authSlice';


// const reducer = combineReducers({
//     auth: authSlice,
// });

// let initialState = {};

// const middlware = [thunk];
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)));

// export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authSlice from 'reducers/authSlice';

const rootReducer = combineReducers({
  auth: authSlice
});

let initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);

export default store;