import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = '/api/inventory';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllInventories = (foodCategory) => axios.get(BASE_REST_API_URL+'/getAllInventories/'+foodCategory)

export const getProductCategory = () => axios.get(BASE_REST_API_URL+'/getProductCategory')
