import api from './init'

export function listRecipients() {
  return api.get('/recipients').then(res => res.data)
}
