import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2, Sparkles } from 'lucide-react'
import { CATEGORIES, PLACEHOLDERS } from '../assets/categories'
import { useChat } from '../hooks/useChat'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'

export default function ChatPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const bottomRef = useRef(null)

  const category = CATEGORIES.find(c => c.id === categoryId)
  const { messages, loading, sendMessage, clearChat } = useChat(categoryId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (!category) {
    navigate('/')
    return null
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(160deg, #070711 0%, #0D0D1E 100%)',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            borderRadius: 10,
            padding: '7px 14px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontFamily: 'var(--font-body)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{ fontSize: 26 }}>{category.icon}</div>
        <div>
          <div style={{
            fontFamily: 'var(--font-head)',
            fontWeight: 700, fontSize: 16,
            color: category.color,
          }}>{category.label}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{category.desc}</div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: '#00D9B7',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D9B7', animation: 'pulse 2s infinite' }} />
            Ollama Running
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              title="Clear chat"
              style={{
                background: 'rgba(244,63,94,0.1)',
                border: '1px solid rgba(244,63,94,0.2)',
                color: '#F43F5E',
                borderRadius: 10, padding: '7px 12px',
                cursor: 'pointer', fontSize: 12,
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-body)',
                transition: 'background 0.2s',
              }}
            >
              <Trash2 size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: '10vh' }}>
              <div style={{ fontSize: 64, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>
                {category.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-head)',
                fontSize: 22, fontWeight: 700,
                marginBottom: 8, color: category.color,
              }}>
                {category.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 28 }}>
                {category.desc}
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {category.examples.map((ex, i) => (
                  <button key={i}
                    onClick={() => sendMessage(ex)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${category.color}44`,
                      borderRadius: 20,
                      padding: '8px 16px',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${category.color}22`
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                    }}
                  >
                    <Sparkles size={11} style={{ marginRight: 5, verticalAlign: -1 }} />
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C6FFF, #00D9B7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, boxShadow: '0 0 12px rgba(124,111,255,0.4)',
              }}>✨</div>
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px 18px 18px 18px',
                padding: '14px 18px',
                display: 'flex', gap: 6, alignItems: 'center',
              }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: category.color,
                    animation: 'pulse 1.2s infinite',
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} style={{ height: 20 }} />
        </div>
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, maxWidth: 900, width: '100%', margin: '0 auto', width: '100%' }}>
        <ChatInput
          onSend={sendMessage}
          loading={loading}
          placeholder={PLACEHOLDERS[categoryId]}
        />
      </div>
    </div>
  )
}
