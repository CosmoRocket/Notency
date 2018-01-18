import api from './init'

export function uploadFile(formData) {
  return api.post('/upload', formData)
    .then(res => res.data)
    .catch(error => console.error("Upload error in api", error))
}
