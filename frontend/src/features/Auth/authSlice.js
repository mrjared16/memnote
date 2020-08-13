import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem('token')
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      localStorage.removeItem('token');
      state.token = null;
    }
  }
});

const { reducer, actions } = auth;
export const { setToken, removeToken } = actions;
export default reducer;