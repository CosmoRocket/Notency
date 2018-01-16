import api from './init'

export function listAnnouncements() {
  return api.get('/announcements').then(res => res.data)
}
