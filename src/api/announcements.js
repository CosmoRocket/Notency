import api from './init'

export function listAnnouncements() {
  return api.get('/announcements').then(res => res.data)
}

export function createAnnouncement(data) {
  return api.get('/announcements', data)
    .then(res => res.data)
}