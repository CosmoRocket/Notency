import api from './init'

export function uploadFile(csvFile) {
  console.log('uploading')
  return api.post('/upload', csvFile)
    .then(res => res.data)
    .catch(error => console.error("Error in api", error))
}
