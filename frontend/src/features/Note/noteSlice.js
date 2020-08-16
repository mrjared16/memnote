import { createSlice } from '@reduxjs/toolkit';

const getNote = (id) => {
  return {
    title: 'Title',
    content: '# abc',
    isFavorite: true,
    lastEdited: Date.now(),
    tags: ['tag', 'tag2'],
    children: ['id1', 'id2']
  }
}

const note = createSlice({
  name: "note",
  initialState: {
    visibleSearchForm: false,
    left: null,
    right: null,
    
  },
  reducers: {
    setVisibleSearchForm: (state, action) => {
      state.visibleSearchForm = action.payload;
    },
    setNote: (state, { id, side }) => {
      state[side] = getNote(id);
    },
  }
});

const { reducer, actions } = note;
export const { setVisibleSearchForm, setNote } = actions;
export default reducer;