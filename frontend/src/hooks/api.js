import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000, // 2 minutes for AI responses
})

// Response interceptor for error handling
api.interceptors.response.use(
  res => res,
  err => {
    const msg = err.response?.data?.error
      || err.response?.data?.message
      || err.message
      || 'Something went wrong'
    return Promise.reject(new Error(msg))
  }
)

export const chatAPI = {
  send: (message, category, history = []) =>
    api.post('/chat', { message, category, history }),

  health: () =>
    api.get('/health'),

  getHistory: (category) =>
    api.get('/history', { params: category ? { category } : {} }),

  getStats: () =>
    api.get('/stats'),

  getCategories: () =>
    api.get('/categories'),
}

export default api
