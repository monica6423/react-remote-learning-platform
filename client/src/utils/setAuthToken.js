import axios from 'axios';
import { API } from "../api"

const setAuthToken = token => {
    if(token){
        //to see if there is token in local storage, if is, set it into global headers
        API.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete API.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;