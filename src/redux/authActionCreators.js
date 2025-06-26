import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}
// auth Loadng
export const authLoading = (isLoading)=>{
    return{
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    }
}
// auth Loadng
export const authFailed = (failedMsg)=>{
    return{
        type: actionTypes.AUTH_FAILED,
        payload: failedMsg,
    }
}
export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    }
    const API_KEY = 'AIzaSyBpYrcPJnr0mGqvFOnL-L4uXgLY-6NB_ps'
    let apiUrl = null
    
    if (mode === "Sign Up") {
        apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    }
    else {
        apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }
    axios.post(apiUrl + API_KEY, authData)
    .then((response) => {
        dispatch(authLoading(false));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(response.data.idToken, response.data.localId))
    })
    .catch((err) =>{
            dispatch(authLoading(false));
            dispatch(authFailed(err.response.data.error.message));
        })
}
// logout
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        // logout
        dispatch(authLogout())
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            // logout
            dispatch(authLogout())
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId))
        }
    }
}