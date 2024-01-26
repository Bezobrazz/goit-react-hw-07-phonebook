import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactsThunk,
  deletetContactsThunk,
  fetchContacts,
} from './operations';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,

  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(deletetContactsThunk.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(addContactsThunk.fulfilled, (state, action) => {
        state.contacts = state.contacts.unshift(action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deletetContactsThunk.rejected,
          addContactsThunk.rejected
        ),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { setFilter, fetchData } = contactsSlice.actions;
export default contactsSlice.reducer;
