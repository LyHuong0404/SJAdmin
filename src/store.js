import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authSlice from 'reducers/authSlice';
import thunk from 'redux-thunk';

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