import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100vh', background: 'var(--bg)',
          fontFamily: 'var(--font-display)', color: 'var(--parchment)',
          padding: 40, textAlign: 'center',
        }}>
          <h1 style={{ fontSize: 24, color: 'var(--blood)', marginBottom: 16 }}>
            ERROR
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, marginBottom: 24, color: 'var(--parchment-2)' }}>
            Algo salió mal. La app se ha recuperado.
          </p>
          <button
            className="btn btn-leaf"
            onClick={() => window.location.reload()}
            style={{ fontSize: 10 }}
          >
            RECARGAR
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
