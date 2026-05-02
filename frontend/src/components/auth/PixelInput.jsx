export default function PixelInput({ label, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <span className="tiny up" style={{ color: 'var(--amber)' }}>{label}</span>
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'var(--bg)',
        border: '4px solid var(--ink)',
        padding: '12px 14px',
        minHeight: 44,
        boxShadow: '4px 4px 0 var(--shadow)',
      }}>
        <span style={{ color: 'var(--leaf)', fontFamily: 'var(--font-code)', flexShrink: 0 }}>{'>'}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--parchment)',
            fontFamily: 'var(--font-code)',
            fontSize: 15,
            width: '100%',
          }}
        />
      </div>
    </div>
  );
}
