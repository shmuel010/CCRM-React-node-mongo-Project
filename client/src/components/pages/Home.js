import React, {useContext, useEffect} from 'react';
import Contacts from "../Contacts/Contacts"
import ContactForm from "../Contacts/ContactForm";
import ContactFilter from "../Contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";

const Home=()=> {
    const authContent = useContext(AuthContext)
    useEffect(()=>{
        authContent.loadUser()
    },[])
    return (
        <div className={"grid-2"} >
            <div>
           <ContactForm/>
            </div>
            <div>
                <ContactFilter/>
               <Contacts />
            </div>
        </div>

    );
}
export default Home


