import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchData,
  isError,
  isLoading,
} from './contactsSlice';
import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://65b264219bfb12f6eafda298.mockapi.io/';

export const fetchContacts = () => async dispatch => {
  // const dispatch = useDispatch();
  try {
    dispatch(isLoading());
    const response = await axios.get('contacts');
    dispatch(fetchData(response.data));
    console.log(response);
    return response.data;
  } catch (error) {
    dispatch(isError());
    console.log('Error');
  }
};

export const deletetContactsThunk = id => async dispatch => {
  try {
    await axios.delete(`contacts/${id}`);
    dispatch(deleteContact(id));
    Notify.success('Contact deleted successfully.');
  } catch (error) {
    dispatch(isError());
    Notify.success('Oops! Something went wrong.');
  }
};

export const addContactsThunk = body => async dispatch => {
  try {
    const { data } = await axios.post(`contacts`, body);
    dispatch(addContact(data));
    console.log(data);
  } catch (error) {
    dispatch(isError());
    Notify.success('Oops! Something went wrong.');
  }
};
