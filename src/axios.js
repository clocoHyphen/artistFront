import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export default axios
