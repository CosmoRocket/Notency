import api from './init'

export function listSomeNotifications() {
  const notificationLimit = 10 // set initial number of notifications returned on home page
  return api.get(`/notifications/latest/${notificationLimit}`)
    .then(res => res.data)
}

export function listNotifications() {
  return api.get('/notifications').then(res => res.data)
}

export function createNotification(data) {
  return api.post('/notifications', data).then(res => res.data)
}
