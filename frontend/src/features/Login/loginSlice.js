import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
  name: "login",
  initialState: {
    authenticated: false
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    }
  }
});

const { reducer, actions } = login;
export const { setAuthenticated } = actions;
export default reducer;