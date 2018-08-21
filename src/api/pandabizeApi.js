import axios from 'axios';

const pandabizeApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8081/' : 'https://pandabizeapi.herokuapp.com/'
});

export default pandabizeApi;