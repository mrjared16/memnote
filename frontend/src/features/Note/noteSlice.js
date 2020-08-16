import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteAPI from '../../api/noteAPI';

const initialState = {
  visibleSearchForm: false,
  favoriteNotes: [],
  rootNotes: [],
  notesInView: [{
    loading: false,
    data: {},
    error: {}
  }, {
    loading: false,
    data: {},
    error: {}
  }],
  activeNoteIndex: 0
};

export const fetchNote = createAsyncThunk('note/noteLoading', (id) =>
  noteAPI.getNote(id)
    .then(response => response.data)
    .catch(error => error)
);

const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    setVisibleSearchForm: (state, action) => {
      state.visibleSearchForm = action.payload;
    },
    setActiveNoteIndex: (state, action) => {
      state.activeNoteIndex = action.payload;
    },
    setNote: (state, { field, newValue }) => {
      state.notesInView[state.activeNoteIndex][field] = newValue;
    }
  },
  extraReducers: {
    [fetchNote.pending.type]: (state, action) => {
      state.notesInView[state.activeNoteIndex].loading = true;
    },
    [fetchNote.rejected.type]: (state, action) => {
      console.log('rejected');
      state.notesInView[state.activeNoteIndex].loading = false;
      state.notesInView[state.activeNoteIndex].error = action.payload;
    },
    [fetchNote.fulfilled.type]: (state, action) => {
      state.notesInView[state.activeNoteIndex].loading = false;
      state.notesInView[state.activeNoteIndex].data = action.payload;
    }
  }
});



const { reducer, actions } = note;
export const { setVisibleSearchForm, setNote, setActiveNoteIndex } = actions;
export default reducer;