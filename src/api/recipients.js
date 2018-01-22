import api from './init'

export function listRecipients() {
  return api.get('/recipients/active').then(res => res.data)
}
