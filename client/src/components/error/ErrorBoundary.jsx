// ErrorBoundary.js
import React from 'react';
import Error from './Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false,error:null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show the fallback UI
    return { hasError: true,error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
    return true; // Prevents the error from being logged to the console
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <Error error={this.state.error}/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
