import axios from 'axios'

console.log(process.env)
export const apiUrl = process.env.REACT_APP_API_URL
// export const apiUrl = 'http://localhost:500'

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json',
  }
})

export default api
