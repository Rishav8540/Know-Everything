import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
          },
          error: {
            iconTheme: { primary: '#F43F5E', secondary: '#fff' },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:categoryId" element={<ChatPage />} />
      </Routes>
    </>
  )
}
