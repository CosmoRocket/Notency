import api, { setToken } from './init'
import { getDecodedToken } from './token'

export function signUp({ email, password }) {
  return api.post('/auth/register', { email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
    .catch(error => {
      if (/ 401/.test(error.message)) {
        error = new Error('The email/password combination were incorrect')
      }
      throw error
    })
}

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then(res => {
      const token = res.data.token
      setToken(token)
      return getDecodedToken()
    })
    .catch(error => {
      if (/ 401/.test(error.message)) {
        error = new Error('The email/password combination were incorrect')
      }
      throw error
    })
}

export function signOutNow() {
  setToken(null)
}