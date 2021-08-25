import './App.css';
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/alerts";
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from "./components/auth/Register";
import login from "./components/auth/Login";
import ContactState from "./context/contacts/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/alertState";
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from "./utils/setAuthToken";

// if(localStorage.token)
// {
//     console.log("localStorage.token: true: "+ localStorage.token)
//     setAuthToken(localStorage.token)
// }
import Contacts from "./components/Contacts/Contacts";
const App=()=> {
  return (
      <AlertState>
      <AuthState>
      <ContactState>
      <Router>

    <Fragment className="App">
        <Navbar/>
        <div className={"container"}>
            <Alerts/>
            <Switch>
                <PrivateRoute exact path = "/" component = {Home}/>
                <Route exact path = "/about" component = {About}/>
                <Route exact path = "/register" component = {Register}/>
                <Route exact path = "/login" component = {login}/>
            </Switch>
        </div>
    </Fragment>
      </Router>
      </ContactState>
      </AuthState>
      </AlertState>
  );
}

export default App;
