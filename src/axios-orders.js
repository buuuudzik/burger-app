import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://amber-inferno-8937.firebaseio.com/'
});

export default instance;