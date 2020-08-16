import axios from 'axios';

const api = axios.create({
  // frontend address
  baseURL: 'http://localhost:3333',
})

export default api;