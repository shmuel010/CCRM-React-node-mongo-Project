import React,{Fragment, useContext} from "react";
import ContactContext from "../../context/contacts/ContactContext"

const ContactsItem = ({contact})=>{
    const contactContext = useContext(ContactContext)
const {deleteContact,clearCurrent, setCurrent}=contactContext
    const {_id,phone,email,name,type}=contact
    const onDelete = ()=>{
        deleteContact(_id)}
    return(
         <div className={"card bg-light"}>
            <h3 className="text-primary text-left">
                {name}{""}
                <span style={{float:"right"}}
                className={'badge '+ (type==='professional' ? 'badge-success' : 'badge-primary')}>
                {type.charAt(0).toUpperCase()+type.slice(1)}
                </span>
            </h3 >
             <ul>
                 {email&&(
                     <li >
                         <i style={{padding:10}} className={" fas fa-envelope-open "}></i>
                         {email}
                 </li>)}
                 {phone&&(
                     <li >
                         <i style={{padding:10}} className={" fas fa-phone "}></i>
                         {phone}
                 </li>)}
             </ul>
             <p>
                 <button className={"btn btn-dark btn-sm"} onClick={()=>{
                     setCurrent(contact)
                 }}>Edit</button>
                 <button className={"btn btn-danger btn-sm"}onClick={onDelete}>Delete</button>
             </p>
         </div>
    )
}
export default ContactsItem;