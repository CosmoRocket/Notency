import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function uploadFile(csvFile) {
  console.log('uploading')
  return api.post('/upload', csvFile)
    .then(res => res.data)
    .catch(error => console.error("Error in api", error))
}
