import api from './init'

export function listNotifications() {
  return api.get('/notifications').then(res => res.data)
}
