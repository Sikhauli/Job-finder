import axios from "axios";

export const API_BASE_URL = 'https://jobs-finder-api-eg08.onrender.com/api/';
// export const API_BASE_URL = 'http://localhost:1960/api/';

export const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

API.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        config.credentials = 'include'; 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const AUTH_ENDPOINTS = {
    login: "user/login",
    logout: "user/logout",
    register: "/user/register",
};

export const USER_ENDPOINTS = {
    get: "user/",
    update: "user/",
    delete: "user/",
    add: "user/",
};

export const EXPERIENCE_ENDPOINTS = {
    get: "experience/",
    update: "experience/",
    delete: "experience/",
    add: "experience/",
};


export const EDUCATION_ENDPOINTS = {
    get: "education/",
    update: "education/",
    delete: "education/",
    add: "education/",
};

export const JOB_ENDPOINTS = {
    get: "jobs",
    update: "jobs/",
    delete: "jobs/",
    add: "jobs/",
    apply: "jobs/apply",
    selection: "jobs/selection"
};

export const SAVED_ENDPOINTS = {
    get: "save",
    update: "save/",
    delete: "save",
    add: "save/",
    search: "save/search",
};

export const getAxiosError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        return error.response.data;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        return error.request.data;
    } else {
        console.error(error);
        return "Internal error occured!";
        // return error.message;
    }
};

