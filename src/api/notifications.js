import api from './init'

export function listNotifications() {
  return api.get('/notifications').then(res => res.data)
}

export function createNotification(data) {
  return api.post('/notifications', data).then(res => res.data)
}
