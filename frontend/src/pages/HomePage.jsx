import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../assets/categories'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #070711 0%, #0D0D1E 60%, #070711 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{ position:'fixed', top:'-15%', left:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-10%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,217,183,0.06) 0%, transparent 65%)', pointerEvents:'none' }} />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          background: '#fff',
          borderRadius: '50%',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.35 + 0.05,
          animation: `pulse ${Math.random() * 4 + 2}s infinite`,
          animationDelay: Math.random() * 4 + 's',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <div style={{ fontSize: 72, marginBottom: 16, animation: 'float 4s ease-in-out infinite', display: 'inline-block' }}>🌌</div>
          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            margin: '0 0 12px',
            background: 'linear-gradient(135deg, #fff 0%, #A78BFA 35%, #00D9B7 65%, #fff 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 5s linear infinite',
            lineHeight: 1.1,
          }}>
            Know Everything
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 'clamp(14px, 2vw, 18px)',
            maxWidth: 560,
            margin: '0 auto 12px',
            lineHeight: 1.7,
          }}>
            Your all-knowing AI companion — powered by local Ollama AI.
            Medicine · Law · Code · Books · Science · Languages · and beyond.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,217,183,0.08)',
            border: '1px solid rgba(0,217,183,0.2)',
            borderRadius: 20, padding: '6px 16px',
            fontSize: 12, color: '#00D9B7',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00D9B7', animation: 'pulse 2s infinite' }} />
            100% Private · Runs on your machine · No subscription
          </div>
        </div>

        {/* Category Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/chat/${cat.id}`)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20,
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
                e.currentTarget.style.borderColor = cat.color + '55'
                e.currentTarget.style.background = cat.glow
                e.currentTarget.style.boxShadow = `0 8px 30px ${cat.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
              <div style={{
                fontFamily: 'var(--font-head)',
                fontWeight: 700, fontSize: 15,
                color: cat.color, marginBottom: 6,
              }}>{cat.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                {cat.desc}
              </div>
              <div style={{
                marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.25)',
                fontFamily: 'var(--font-code)',
              }}>
                click to open →
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48, color: 'rgba(255,255,255,0.18)', fontSize: 12 }}>
          <div>Know Everything · Java Spring Boot + React + Ollama</div>
          <div style={{ marginTop: 4 }}>Running locally on your machine · Your data never leaves your computer</div>
        </div>
      </div>
    </div>
  )
}
