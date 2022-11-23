const url = 'https://appeclateeback.onrender.com';

import axios from 'axios'

const apiService = {
    refreshAccessToken(data) {
        return axios
            .post(`${url}/api/auth/token`, data)
    },
    login(logs) {
        return axios
            .post(`${url}/api/auth/login`, logs)
    },
    get(ressource, options) {
        return axios
            .get(`${url}/api/${ressource}`, options)
    },
    post(ressource, data) {
        return axios
            .post(`${url}/api/${ressource}`, data)
    },
    put(ressource, data, options) {
        return axios
            .put(`${url}/api/${ressource}`, data, options)
    },
    delete(ressource, id, options) {
        return axios
            .delete(`${url}/api/${ressource}/${id}`, options)
    },
}

export { apiService }