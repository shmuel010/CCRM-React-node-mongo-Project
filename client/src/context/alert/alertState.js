import React, {useReducer} from 'react';
import axios from 'axios';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext'
import { v4 as uuidv4 } from 'uuid';


import {
    SET_ALERT,
    REMOVE_ALERT

} from '../types';

const AlertState = props => {
    const initialState = []


    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //Set alert
    const setAlert = (msg,type,timeout=5000)=>{
        const id = uuidv4();
        dispatch({
            type:SET_ALERT,
            payload: {msg, type, id}
        })
        setTimeout(()=>{
            dispatch({type:REMOVE_ALERT, payload: id})
        },timeout)
    }



    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert

            }}
        >
            {props.children}
        </AlertContext.Provider>
    );

}
export default AlertState