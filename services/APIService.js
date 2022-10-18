const url = 'http://localhost:5000';

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
    get(ressource) {
        return axios.get(`${url}/api/${ressource}`)
    },
    post(ressource, data) {
        return axios
            .post(`${url}/api/${ressource}`, data)
    },
    put(ressource, data) {
        return axios
            .put(`${url}/api/${ressource}`, data)
    },
    delete(ressource, id) {
        return axios
            .delete(`${url}/api/${ressource}/${id}`)
    },
}
  
export { apiService }