import { createSlice } from '@reduxjs/toolkit';

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
    fetchData: (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
    },

    isLoading: (state, action) => {
      state.isLoading = true;
    },

    isError: (state, action) => {
      state.isLoading = false;
      state.error = 'Error';
    },

    addContact: (state, action) => {
      const { id, name, number } = action.payload;
      state.contacts.unshift({ id, name, number });
    },
    deleteContact: (state, action) => {
      const contactId = action.payload;
      state.contacts = state.contacts.filter(
        contact => contact.id !== contactId
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  setFilter,
  fetchData,
  isError,
  isLoading,
} = contactsSlice.actions;
export default contactsSlice.reducer;
