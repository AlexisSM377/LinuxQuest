import { useNavigate } from 'react-router-dom';

export default function AuthCard({ title, subtitle, children, footer }) {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      backgroundImage: `
        linear-gradient(var(--grid) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid) 1px, transparent 1px)
      `,
      backgroundSize: '32px 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
    }}>

      {/* Brand */}
      <button
        onClick={() => navigate('/')}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          color: 'var(--amber)',
          textShadow: '3px 3px 0 var(--ink)',
          letterSpacing: 2,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginBottom: 32,
        }}
      >
        ⬡ LINUXQUEST
      </button>

      {/* Card */}
      <div className="pcard" style={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <div style={{ marginBottom: 28, borderBottom: '4px solid var(--ink)', paddingBottom: 20 }}>
          <div className="tiny up" style={{ color: 'var(--amber)', marginBottom: 10 }}>
            ▸ SISTEMA DE ACCESO
          </div>
          <h2 style={{ marginBottom: 6 }}>{title}</h2>
          {subtitle && (
            <p className="vt muted" style={{ fontSize: 18 }}>{subtitle}</p>
          )}
        </div>

        {/* Form content */}
        {children}
      </div>

      {/* Footer link */}
      {footer && (
        <div className="vt" style={{ marginTop: 20, color: 'var(--parchment-2)', fontSize: 18 }}>
          {footer}
        </div>
      )}
    </div>
  );
}
