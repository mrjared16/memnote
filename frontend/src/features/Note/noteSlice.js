import { createSlice } from '@reduxjs/toolkit';

const note = createSlice({
  name: "note",
  initialState: {
    visibleSearchForm: false
  },
  reducers: {
    setVisibleSearchForm: (state, action) => {
      state.visibleSearchForm = action.payload;
    }
  }
});

const { reducer, actions } = note;
export const { setVisibleSearchForm } = actions;
export default reducer;