import axios from "axios";

const AUTH_REST_API_BASE_URL = "/api/auth"

export const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

export const loginAPICall = (email, password) => axios.post(AUTH_REST_API_BASE_URL + '/login', { email, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (email) => sessionStorage.setItem("authenticatedUser", email);

export const isUserLoggedIn = () => {

    const email = sessionStorage.getItem("authenticatedUser");

    if(email == null) {
        return false;
    }    
    else {
        return true;
    }   
}

export const getLoggedInUser = () => {
    const email = sessionStorage.getItem("authenticatedUser");
    return email;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}