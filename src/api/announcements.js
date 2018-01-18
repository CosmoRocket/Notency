import api from './init'

export function listSomeAnnouncements() {
  const announcementLimit = 5 // set initial number of announcements returned on home page, could be set in .env or even stored as settings in db?
  return api
    .get(`/announcements/latest/${announcementLimit}`)
    .then(res => res.data)
}

export function listAnnouncements() {
  return api.get('/announcements').then(res => res.data)
}

export function createAnnouncement(data) {
  return api.post('/announcements', data).then(res => res.data)
}
