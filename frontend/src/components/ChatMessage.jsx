import ReactMarkdown from 'react-markdown'

export default function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  const isError = msg.role === 'error'

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 20,
      animation: 'fadeUp 0.35s ease',
      alignItems: 'flex-end',
      gap: 10,
    }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7C6FFF, #00D9B7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
          boxShadow: '0 0 12px rgba(124,111,255,0.4)',
        }}>✨</div>
      )}

      <div style={{
        maxWidth: '80%',
        background: isUser
          ? 'linear-gradient(135deg, #7C6FFF 0%, #6055CC 100%)'
          : isError
          ? 'rgba(244,63,94,0.1)'
          : 'rgba(255,255,255,0.05)',
        border: isUser ? 'none' : isError
          ? '1px solid rgba(244,63,94,0.3)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        padding: '12px 16px',
        color: '#fff',
        fontSize: 14,
        lineHeight: 1.7,
        wordBreak: 'break-word',
      }}>
        {isUser ? (
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
        ) : (
          <div className="ai-message">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        )}
        {msg.model && (
          <div style={{
            marginTop: 8,
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            textAlign: 'right',
            fontFamily: 'var(--font-code)',
          }}>
            via {msg.model}
          </div>
        )}
      </div>

      {isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(124,111,255,0.2)',
          border: '1px solid rgba(124,111,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>👤</div>
      )}
    </div>
  )
}
