import axios from 'axios';
import { getAuthToken } from '../Cookies/cookies';


var token = ''
if (localStorage.getItem('user'))
    token = JSON.parse(localStorage.getItem('user')).token
if ( getAuthToken() )
  token = getAuthToken()
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const userRequest = axios.create({
    baseURL: 'http://localhost:8080/api/users',
});

const articleRequest = axios.create({
  baseURL: 'http://localhost:8080/api/article',
});


export const apiUserLogin = data => userRequest.post('/login', data);
export const apiUserSignUp = data => userRequest.post('/signup', data);
export const apiUserAccount = data => userRequest.post('/account', data);
export const apiUserUpdate = data => userRequest.post('/update', data);

export const apiArticleSave = data => articleRequest.post('/save',data);
export const apiArticleCreate = data => articleRequest.post('/create',data);
export const apiArticleShow = data => articleRequest.post('/show', data);
export const apiArticlePost = data => articleRequest.post('/post', data);
export const apiArticleSearch = data => articleRequest.post('/search', data);


const read_token = process.env.REACT_APP_READ_TOKEN;

export const apiBlogList = async () => {
  const url = `
  https://api.buttercms.com/v2/posts?auth_token=${read_token}`;
  return axios.get(url).then((res) => {
    return res.data.data;
  });
};