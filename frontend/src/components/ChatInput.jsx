import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, loading, placeholder }) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim() || loading) return
    onSend(value)
    setValue('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      display: 'flex',
      gap: 10,
      alignItems: 'flex-end',
      padding: '16px 20px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.2)',
    }}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        rows={2}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 14,
          padding: '12px 16px',
          color: '#fff',
          fontSize: 14,
          resize: 'none',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(124,111,255,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      <button
        onClick={handleSend}
        disabled={loading || !value.trim()}
        style={{
          width: 48, height: 48,
          borderRadius: 14,
          background: loading || !value.trim()
            ? 'rgba(124,111,255,0.2)'
            : 'linear-gradient(135deg, #7C6FFF, #00D9B7)',
          border: 'none',
          cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s',
          transform: 'scale(1)',
        }}
        onMouseEnter={e => { if (!loading && value.trim()) e.target.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {loading ? (
          <div style={{
            width: 18, height: 18,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        ) : (
          <Send size={18} />
        )}
      </button>
    </div>
  )
}
