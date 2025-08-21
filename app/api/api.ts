import axios from 'axios';


const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

if (!baseURL || baseURL === 'undefined/api') {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in your environment variables.');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});