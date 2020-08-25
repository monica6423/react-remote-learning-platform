import axios from 'axios';

const setAuthToken = token => {
    if(token){
        //to see if there is token in local storage, if is, set it into global headers
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;