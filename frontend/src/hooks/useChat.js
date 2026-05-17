import { useState, useCallback } from 'react'
import { chatAPI } from './api'
import toast from 'react-hot-toast'

export function useChat(category) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return

    const userMsg = { role: 'user', content: text.trim(), id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Build history for context (last 6 messages)
    const history = messages.slice(-6).map(m => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const { data } = await chatAPI.send(text.trim(), category, history)
      if (data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.reply,
          id: Date.now() + 1,
          model: data.model,
        }])
      } else {
        throw new Error(data.error || 'AI did not respond')
      }
    } catch (err) {
      toast.error(err.message, { duration: 4000 })
      setMessages(prev => [...prev, {
        role: 'error',
        content: `❌ ${err.message}`,
        id: Date.now() + 1,
      }])
    }

    setLoading(false)
  }, [messages, category, loading])

  const clearChat = useCallback(() => setMessages([]), [])

  return { messages, loading, sendMessage, clearChat }
}
