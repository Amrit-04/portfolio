import React from 'react';

interface Props {
  children: React.ReactNode;
  label: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="frame bg-paper p-8 m-8" role="alert" data-testid="error-boundary">
          <p className="label-mono text-red">Something snapped a chain.</p>
          <p className="font-serif text-2xl mt-2">{this.props.label} failed to render.</p>
          <p className="font-mono text-xs text-ink3 mt-2">{this.state.error.message}</p>
          <button className="btn-outline mt-6" onClick={() => window.location.reload()}>
            Reload the page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
