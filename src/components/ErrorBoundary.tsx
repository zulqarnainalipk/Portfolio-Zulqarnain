import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
          <h1 className="text-4xl font-bold text-destructive mb-4">Oops! Something went wrong.</h1>
          <p className="text-xl mb-2">We're sorry for the inconvenience.</p>
          <p className="text-md mb-6">Please try refreshing the page, or contact support if the problem persists.</p>
          {this.state.error && (
            <details className="bg-secondary p-4 rounded-md text-left w-full max-w-2xl">
              <summary className="font-semibold cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-sm whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo && (
                  <>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
           <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
