import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';

interface Props {
  children: ReactNode;
  label?: string;
  fallbackTitle?: string;
  repoUrl?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught demo failure:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="frame-sm bg-paper2/70 p-6 md:p-8 text-center space-y-4 font-sans border-red">
          <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center mx-auto">
            <AlertTriangle className="w-5 h-5 text-red" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold text-ink">
              {this.props.fallbackTitle || this.props.label || 'Demo Execution Paused'}
            </h4>
            <p className="font-sans text-xs text-ink2 mt-1.5 max-w-md mx-auto leading-relaxed">
              An unexpected client runtime exception occurred while running this browser sandbox. The rest of the notebook remains safe and intact.
            </p>
            {this.state.error?.message && (
              <p className="font-mono text-[11px] text-red/80 mt-2 bg-paper p-2 rounded-xs max-w-lg mx-auto overflow-x-auto">
                {this.state.error.message}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleRetry}
              className="btn-ink !py-1.5 !px-3 font-sans text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Sandbox</span>
            </button>
            {this.props.repoUrl && (
              <a
                href={this.props.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline !py-1.5 !px-3 font-sans text-xs flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Code</span>
                <ExternalLink className="w-3 h-3 text-ink3" />
              </a>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
