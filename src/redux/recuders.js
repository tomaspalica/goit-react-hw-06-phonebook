import { addContacts, deleteContacts, filterContacts } from './actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactsReducer = createReducer(initialState.contacts, {
  [addContacts]: (state, action) => {
    return [...state, action.payload];
  },
  [deleteContacts]: (state, action) => {
    return state.filter(contact => contact.id !== action.payload);
  },
});

export const filterReducer = createReducer(initialState.filter, {
  [filterContacts]: (state, action) => {},
});
