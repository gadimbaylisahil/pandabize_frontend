import axios from 'axios';

const pandabizeApi = axios.create({
  baseURL: 'http://localhost:8081/'
});

export default pandabizeApi;