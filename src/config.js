/*
* Application configurations
*/

import axios from 'axios';

// API URLs
export const baseAPIURL = 'http://yummy-recipes-apis.herokuapp.com';
export const authAPIURL = baseAPIURL.concat('/api/v1/auth/');
export const categoryAPIURL = baseAPIURL.concat('/api/v1/category/');
export const recipeAPIURL = baseAPIURL.concat('/api/v1/recipe/');

// axios instance for private API calls
const privateAxiosInstance = axios.create({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
privateAxiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('token') && config.headers.Authorization === 'Bearer null') {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

export default privateAxiosInstance;
