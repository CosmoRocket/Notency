import api from './init'

export function sendSms(data) {
  return api.post('/sms/groupSend', data).then(res => res.data)
}