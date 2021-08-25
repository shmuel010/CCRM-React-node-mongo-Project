import { v4 as uuidv4 } from 'uuid';
import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        console.log("get contact trying")
        try {
            const res = await axios.get('/api/contacts');
            console.log("get contact success")

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            console.log("get contact fail")
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }}
            try{
                const res = await axios.post('/api/contacts',contact, config)
                dispatch({
                    type: ADD_CONTACT,
                    payload:  res.data
                });
            }catch (err){
        dispatch({type:CONTACT_ERROR , payload:err.response.msg})
        }



    };

    // Delete Contact
    const deleteContact = async _id => {

        try{
            const res = await axios.delete('/api/contacts/'+_id)
            dispatch({
                type: DELETE_CONTACT,
                payload: _id
            });
        }catch (err){
            dispatch({type:CONTACT_ERROR , payload:err.response.msg})
        }





    };


    // Update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }}
        try{
            const res = await axios.put('/api/contacts/'+contact._id,contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        }catch (err){
            dispatch({type:CONTACT_ERROR , payload:err.response.msg})
        }
            dispatch({
                type: UPDATE_CONTACT,
                payload: contact
            });
    };

    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
