import axios from 'axios'
import { rememberToken, getValidToken } from './token'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  rememberToken(token)

  if (token) {
    // Set the authorization header for all requests in the future
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Validate the token and if it's invalid, remove from local storage
setToken(getValidToken())

export default api