import {Link} from "react-router-dom";
import AuthContext from '../../context/auth/AuthContext'
import ContactContext from '../../context/contacts/ContactContext'
import {Fragment, useContext} from "react";

const Navbar = ({title, icon}) => {

    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)
    const {clearContacts} = contactContext
    const {isAuthenticated, logout, user} = authContext
    const onLogout=() =>{
        logout()
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>
                Hello {user && user.name}
            </li>
            <li>
                <a onClick={onLogout} href={'#!'}>
                    <i className={'fas fa-sign-out-alt'}>

                    </i>
                    <span style={{margin: "3dp"}} className={"hide-sm"}>
                        logout
                    </span>
                </a>
            </li>
        </Fragment>)

    const guestLink = (
        <Fragment>
            <li>
                <Link to={'/login'}>login</Link>
            </li>
            <li>
                <Link to={'/register'}>register</Link>
            </li>
        </Fragment>)

//         <li>
//         <Link to={ '/'} >Home</Link>
// </li>
//     <li>
//         <Link to={ '/about'} >About</Link>
//     </li>


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLink}
            </ul>

        </div>
    );
}
// Navbar.prototype{
//     title: PropTypes.string.isRequired,
//     icon: PropTypes.string
// }
Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt',
}

export default Navbar;
