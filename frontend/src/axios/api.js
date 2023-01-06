import axios from 'axios';

var token = ''
if (localStorage.getItem('user'))
    token = localStorage.getItem('user').token
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const userRequest = axios.create({
    baseURL: 'http://localhost:8080/api/users',
});


export const apiUserLogin = data => userRequest.post('/login', data);
export const apiUserSignUp = data => userRequest.post('/signup', data);