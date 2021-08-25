import ContactContext from '../../context/contacts/ContactContext'
import ContactsItem from "../Contacts/ContactsItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import React,{Fragment, useContext, useEffect} from "react";
import Spinner from "../layout/Spinner";

const Contacts = ()=>{
   const contactContext = useContext(ContactContext) ;
    const {contacts, filtered, getContacts, loading}=contactContext
    useEffect(()=>{
        getContacts()

        // eslint-disable-next-line
    },[])

    if(contacts!==null && contacts.length===0 ){
        return <h4>Please add a Contacts</h4>
    }

    return (
        <Fragment>
            {contacts !==null && !loading ? ( <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames='item'>
                                <ContactsItem contact={contact}  />
                            </CSSTransition>
                        ))
                        : contacts.map(contact => (
                            <CSSTransition
                                key={contact._id}
                                timeout={500}
                                classNames='item'
                            >
                                <ContactsItem contact={contact} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner/>}

        </Fragment>
    );
}
export default Contacts