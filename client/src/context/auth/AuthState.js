import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from "../../utils/setAuthToken";
import {
    SET_ALERT,
    REMOVE_ALERT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS


} from '../types';
import ContactContext from "../contacts/ContactContext";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //load user
    const loadUser = async () => {

        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth');


            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {

            dispatch({ type: AUTH_ERROR });
        }
    };

    //register user
    const register = async formData=>{

        const config = {
            headers: {
                "Content-Type": "application/json"
            }}
        try{
            const res = await  axios.post('/api/users',formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload: res.data
            })
            await loadUser()
            console.log("connect load user  register")

        }
        catch (err){
            console.log("failed register")
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //login user
    const login = async formData=>{

        const config = {
            headers: {
                "Content-Type": "application/json"
            }}
        try{
            const res = await  axios.post('/api/auth',formData,config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload: res.data
            })
            await loadUser()

        }
        catch (err){

            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //logout
    const logout = ()=>{
        dispatch({type:LOGOUT})
    }

    //clear errors
    const clearErrors = ()=>{
        dispatch({
            type:CLEAR_ERRORS
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                loading:state.loading,
                user:state.user,
                error:state.error,
                register,
                loadUser,
                logout,
                login,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

}
export default AuthState