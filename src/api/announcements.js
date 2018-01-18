import api from './init'

export function listSomeAnnouncements() {
  const announcementLimit = 5 // set initial number of announcements returned on home page
  return api.get(`/announcements/latest/${announcementLimit}`)
    .then(res => res.data)
}

export function listAnnouncements() {
  return api.get('/announcements').then(res => res.data)
}

export function createAnnouncement(data) {
  return api.get('/announcements', data)
    .then(res => res.data)
}