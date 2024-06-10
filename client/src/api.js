import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://react-remote-learning-platform-backend.vercel.app'
    : 'http://localhost:5050'

export const API = axios.create({
  baseURL: `${API_URL}`,
})
