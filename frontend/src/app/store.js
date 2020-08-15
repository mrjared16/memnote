import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import noteReducer from '../features/Note/noteSlice';

const rootReducer = {
  auth: authReducer,
  note: noteReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store;