import axios from 'axios';
import { getAuthToken } from '../Cookies/cookies';


var token = ''
if (localStorage.getItem('user'))
    token = JSON.parse(localStorage.getItem('user')).token
if ( getAuthToken() )
  token = getAuthToken()
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const userRequest = axios.create({
    baseURL: 'http://localhost:10000/api/users',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
});

const articleRequest = axios.create({
  baseURL: 'http://localhost:10000/api/article',
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
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
export const apiArticleMainShow = data => articleRequest.post('/mainShow', data);
export const apiArticleMyShow = data => articleRequest.post('/myShow', data);
export const apiArticleMySearch = data => articleRequest.post('/mySearch', data);
export const apiArticleDelete = data => articleRequest.post('/delete', data);
