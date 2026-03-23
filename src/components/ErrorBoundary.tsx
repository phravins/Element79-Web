import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'Something went wrong.';
      let details = '';

      try {
        const parsedError = JSON.parse(this.state.error?.message || '{}');
        if (parsedError.error) {
          errorMessage = 'Vault Access Denied';
          details = `Operation: ${parsedError.operationType} on ${parsedError.path}. Please check your permissions.`;
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
          <div className="bg-surface-container-low p-8 rounded-2xl border border-error/20 max-w-md w-full space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error mx-auto">
              <span className="material-symbols-outlined text-4xl">warning</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">{errorMessage}</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {details || 'An unexpected error occurred while accessing the Gilded Vault. Our security protocols may have blocked the request.'}
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-error text-on-error font-bold py-3 rounded-lg active:scale-95 transition-transform"
            >
              Re-authenticate & Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
