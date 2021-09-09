import Alert from '@material-ui/lab/Alert';
import React from 'react'
// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.props.alert && this.state.hasError) {
      return <Alert severity="error">{this.props.alert}</Alert>
    }
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary