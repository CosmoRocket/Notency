import api from './init'

export function sendEmail(data) {
  return api.post('/email/send', data).then(res => res.data)
}