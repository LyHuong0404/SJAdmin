import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authSlice from 'reducers/authSlice';

const rootReducer = combineReducers({
  auth: authSlice
});

let initialState = {};
const middlware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;