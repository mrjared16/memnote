import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Login/loginSlice';

const rootReducer = {
  login: loginReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store;