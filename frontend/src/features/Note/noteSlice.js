import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteAPI from '../../api/noteAPI';
import { Children } from 'react';

const initialState = {
  isSearchFormVisible: false,
  favoriteNotes: {
    loading: false,
    data: [],
    error: {}
  },
  // [{
  //   id:
  //   title:
  //   Children: []
  // }]
  topLevelNotes: {
    loading: false,
    data: [],
    error: {}
  },
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
    .then(({ note }) => note)
    .catch(error => error)
);

export const fetchFavoriteNotes = createAsyncThunk('note/favoriteNotesLoading', () =>
  noteAPI.getFavoriteNotes()
    .then(({ result }) => result)
    .catch(error => error)
);

export const fetchTopLevelNotes = createAsyncThunk('note/topLevelNotesLoading', () =>
  noteAPI.getNotes()
    .then(({ result }) => result)
    .catch(error => error)
);

export const updateCurrentNote = createAsyncThunk('note/noteLoading', () =>
  noteAPI.updateNote({})
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
    setFavoriteNotes: (state, { payload = {} }) => {
      console.log('set favorites Notes', payload);
      const { newData = [] } = payload;
      state.favoriteNotes.data = newData;
    },
    setTopLevelNotes: (state, { payload }) => {
      console.log('set top level Notes', payload);
      const { newData = [] } = payload;
      state.topLevelNotes.data = newData;
    }
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
    },

    [fetchFavoriteNotes.pending.type]: (state, action) => {
      console.log('fetching favorite notes loading');
      state.favoriteNotes.loading = true;
    },
    [fetchFavoriteNotes.rejected.type]: (state, action) => {
      console.log('fetching favorite notes rejected');
      state.favoriteNotes.loading = false;
    },
    [fetchFavoriteNotes.fulfilled.type]: (state, action) => {
      console.log('fetching favorite notes done');
      state.favoriteNotes.loading = false;
      state.favoriteNotes.data = action.payload;
    },

    [fetchTopLevelNotes.pending.type]: (state, action) => {
      console.log('fetching top level notes loading');
      state.topLevelNotes.loading = true;
    },
    [fetchTopLevelNotes.rejected.type]: (state, action) => {
      console.log('fetching top level notes rejected');
      state.topLevelNotes.loading = false;
    },
    [fetchTopLevelNotes.fulfilled.type]: (state, action) => {
      console.log('fetching top level notes done');
      state.topLevelNotes.loading = false;
      state.topLevelNotes.data = action.payload;
    }
  }
});



const { reducer, actions } = note;
export const { setSearchFormVisible, setNoteData, setActiveNoteIndex, setFavoriteNotes, setTopLevelNotes } = actions;
export default reducer;