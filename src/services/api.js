import axios from "axios";

const baseUrl = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: `${baseUrl}`
})

api.interceptors.request.use(config=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
