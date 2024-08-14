import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = '/api/order';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const saveOrder = (orderItem) => axios.post(BASE_REST_API_URL+'/addToCart', orderItem);

export const newOrder = (email) => axios.get(BASE_REST_API_URL+'/newOrder/'+ email);

export const getCartData = (email, orderNumber) => axios.get(BASE_REST_API_URL + '/getCartData/' + email + '/' + orderNumber);

export const getActiveOrderId = (email) => axios.get(BASE_REST_API_URL+'/getActiveOrderId/'+ email);

export const deleteCartItem = (id) => axios.get(BASE_REST_API_URL+'/deleteCartItem/'+ id);


