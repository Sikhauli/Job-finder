import axios from "axios";

export const API_URL = "http://localhost:1960/api/";

export const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const AUTH_ENDPOINTS = {
    login: "auth/login",
    logout: "auth/logout",
    register: "/users/register",
};

export const COFFIN_ENDPOINTS = {
    get: "jobs/",
    update: "/jobs/",
    delete: "/jobs/",
    add: "/jobs/",
};