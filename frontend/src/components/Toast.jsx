import { useToastStore } from '../store/toastStore';

const colorByType = {
  success: { bg: 'rgba(20, 60, 30, 0.95)', border: '#5fff7f', text: '#5fff7f', icon: '✓' },
  error:   { bg: 'rgba(60, 20, 20, 0.95)', border: '#ff5f5f', text: '#ff7f7f', icon: '✗' },
  warning: { bg: 'rgba(60, 50, 20, 0.95)', border: '#ffd58a', text: '#ffd58a', icon: '⚠' },
  info:    { bg: 'rgba(20, 30, 60, 0.95)', border: '#5fb3d4', text: '#5fb3d4', icon: 'ℹ' }
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 400,
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const colors = colorByType[toast.type] || colorByType.info;
        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            style={{
              background: colors.bg,
              border: `2px solid ${colors.border}`,
              color: colors.text,
              padding: '12px 16px',
              fontFamily: '"JetBrains Mono", "Courier New", monospace',
              fontSize: 13,
              lineHeight: 1.4,
              boxShadow: `0 0 12px ${colors.border}55, 0 4px 12px rgba(0,0,0,0.4)`,
              cursor: 'pointer',
              pointerEvents: 'auto',
              animation: 'toast-slide-in 0.3s ease-out',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>{colors.icon}</span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <span style={{ opacity: 0.5, fontSize: 11 }}>×</span>
          </div>
        );
      })}
      <style>{`
        @keyframes toast-slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
