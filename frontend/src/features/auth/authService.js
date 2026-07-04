import axios from 'axios'

const API_URL = '/api/users'

// REGISTER SERVICE FUNCTION
const registerService = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// LOGIN SERVICE
const loginService = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// LOGOUT SERVICE
const logoutService = () => localStorage.removeItem('user')

const authService = { registerService, logoutService, loginService }
export default authService
