import Alert from '@mui/material/Alert';
import React from 'react'
import handleStrapiError from './handleStrapiError';
import { withRouter } from 'next/router'

import axios from 'axios';

// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(e) {
    const response = handleStrapiError(e)    
    console.log(response)
    return {
      hasError: true,
      error: response.error,
      errorBody: response.errorBody
    };
  }

  componentDidCatch() {
    if (this.state.errorBody && this.state.errorBody.extensions && this.state.errorBody.extensions.exception.output.statusCode === 401) {
      axios.post('/api/logout').then(() => {
        this.props.router.push('/login')
      });
    }
  }

  render() {
    if (this.state.error && this.state.hasError) {
      return <Alert severity="error">{this.state.error}</Alert>
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary)