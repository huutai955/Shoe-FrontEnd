import { ACCESS_TOKEN, FACEBOOK_ACCESS_TOKEN } from "@/utils/constant";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001/api/v1/'

const handleSendToken = () => {
    if (typeof window !== 'undefined') {
        const token = window.localStorage.getItem(ACCESS_TOKEN);
        const facebookToken = window.localStorage.getItem(FACEBOOK_ACCESS_TOKEN);
        if (token) {
            return token
        }
        if (facebookToken) {
            return facebookToken
        }
    }
}

export const api = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${handleSendToken()}`
    }
});


// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default api