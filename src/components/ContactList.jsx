import React, { useEffect } from 'react';
import { StyledList, StyledListItem, BoldText } from './styled';
import { Button } from '@mui/material';
import { Notify } from 'notiflix';
import { deleteContact } from '../redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  selectContacts,
  selectLoading,
} from '../redux/selectors';
import {
  deletetContacts,
  deletetContactsThunk,
  fetchContacts,
} from '../redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <StyledList>
      {loading && <h2>Loading...</h2>}
      {filteredContacts.map(({ id, name, phone }) => (
        <StyledListItem key={id}>
          <div>
            <BoldText>{name}:</BoldText> {phone}
          </div>
          <Button
            type="text"
            variant="contained"
            color="warning"
            onClick={() => {
              dispatch(deletetContactsThunk(id));
            }}
          >
            Delete
          </Button>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default ContactList;
