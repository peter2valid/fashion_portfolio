import React from 'react';

/**
 * Error boundary component to catch and display errors gracefully
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-creamBg">
          <div className="text-center p-8 max-w-md">
            <h2 className="font-fashion text-2xl text-fashionRed mb-4">
              Something went wrong
            </h2>
            <p className="font-body text-black mb-4">
              We're having trouble loading the content. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="text-left bg-gray-100 p-4 rounded mb-4 text-sm">
                <summary className="font-bold cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-fashionRed text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
