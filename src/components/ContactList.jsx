import React, { useEffect } from 'react';
import { StyledList, StyledListItem, BoldText } from './styled';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectFilteredContacts } from '../redux/selectors';
import { deletetContactsThunk, fetchContacts } from '../redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <StyledList>
      {loading && <h2>Loading...</h2>}
      {contacts.map(({ id, name, number }) => (
        <StyledListItem key={id}>
          <div>
            <BoldText>{name}:</BoldText> {number}
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
