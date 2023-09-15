import React, { useState, useEffect } from 'react';

import { ContactsList } from './ContactsList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, deleteContacts } from 'redux/actions';
export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const contactsList = useSelector(state => state.contacts);
  const storeFilter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const addNewContact = ({ name, number }) => {
    if (contactsList.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContacts(name, number));
    }
  };

  // handleSubmit = (e) =>{
  //   e.preventDefault();
  //  if(this.state.contacts.find(el => el.name === this.state.name)){
  //   alert(`${this.state.name} is already in contacts`)
  //  } else {
  //   this.setState((state) => {
  //     console.log(this.state)
  //    return {contacts:[ ...state.contacts, {id:nanoid(), name : state.name, number: state.number}]}
  //   })
  //   console.log(this.state.contacts)
  // }}

  const filterNames = (filter, contacts) => {
    if (filter === '') {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filteredUsers = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });
    return filteredUsers;
  };

  useEffect(() => {
    if (contactsList) {
      localStorage.setItem('contacts', JSON.stringify(contactsList));
    }
  }, [contactsList]);

  //  componentDidUpdate(prevProps, prevState){
  //   if(prevState.contacts === this.state.contacts){
  //     return false
  //   } else {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  //   }
  //  }

  const contactDelete = el => {
    dispatch(deleteContacts(el.target.id));
    // const data = contacts.filter(i => i.name !== el.target.name);
    // setContacts(data);

    // localStorage.removeItem(el.target.name)
  };
  useEffect(() => {
    const contactFromLS = localStorage.getItem('contacts');
    if (contactFromLS) {
      dispatch(addContacts(JSON.parse(contactFromLS)));
    }
  }, []);

  //  componentDidMount(){
  //   const contactFromLS = localStorage.getItem("contacts")
  //   if(contactFromLS){
  //   this.setState({contacts: JSON.parse(localStorage.getItem("contacts"))})
  //  }}

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmit={addNewContact}></ContactForm>
      <h2>Contacts</h2>

      <Filter handleFilter={handleFilter}></Filter>
      <ContactsList
        filteredNames={filterNames(storeFilter, contactsList)}
        contactDelete={contactDelete}
      ></ContactsList>
    </div>
  );
};
