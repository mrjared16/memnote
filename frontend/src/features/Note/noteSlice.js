import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteAPI from '../../api/noteAPI';

const initialState = {
  isSearchFormVisible: false,
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
  // async () => {
  //   console.log('fetching');
  //   const { note } = await noteAPI.getNote(id);
  //   console.log(note);
  //   return note;
  // }
  noteAPI.getNote(id)
    .then(({ note }) => note)
    .catch(error => error)
);

const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    setSearchFormVisible: (state, action) => {
      state.isSearchFormVisible = action.payload;
    },
    setActiveNoteIndex: (state, action) => {
      state.activeNoteIndex = action.payload;
    },
    setNoteData: (state, { payload }) => {
      // console.log('set Note Data', payload);
      payload.forEach(({ field, newValue }) => {
        // console.log(field, newValue);
        state.notesInView[state.activeNoteIndex].data[field] = newValue;
      });
    },
  },
  extraReducers: {
    [fetchNote.pending.type]: (state, action) => {
      console.log('fetching Note loading');
      state.notesInView[state.activeNoteIndex].loading = true;
    },
    [fetchNote.rejected.type]: (state, action) => {
      console.log('fetching Note rejected');
      state.notesInView[state.activeNoteIndex].loading = false;
      state.notesInView[state.activeNoteIndex].error = action.payload;
    },
    [fetchNote.fulfilled.type]: (state, action) => {
      console.log('fetching Note loading done', action.payload);
      state.notesInView[state.activeNoteIndex].loading = false;
      state.notesInView[state.activeNoteIndex].data = action.payload;
    }
  }
});



const { reducer, actions } = note;
export const { setSearchFormVisible, setNoteData, setActiveNoteIndex } = actions;
export default reducer;