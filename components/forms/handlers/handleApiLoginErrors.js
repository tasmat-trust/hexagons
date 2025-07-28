export default function handleErrors(error, setError, setLoading) {
  let errorOutput = 'An unknown error has occurred';
  const notifiedDeveloperMessage = ` If the problem persists, please email ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`;

  // No response - likely network error
  if (!error.response) {
    errorOutput = 'Please check your internet connection and try again.';
    console.error('Network error:', error);
  }
  // Has response with error data
  else if (error.response && error.response.data) {
    const { data } = error.response;
    
    // Handle Strapi authentication errors
    if (data.error?.message === 'Invalid identifier or password') {
      errorOutput = 'Incorrect email or password. Please try again.';
    }
    // Handle Strapi's array message format (used in most error responses)
    else if (Array.isArray(data.message) && data.message[0]?.messages?.[0]?.message) {
      const message = data.message[0].messages[0].message;
      
      // Map specific error messages to user-friendly versions
      switch (message) {
        case 'Email is already taken.':
          errorOutput = 'Your username or email is already registered.';
          break;
        case 'Please provide valid email address.':
          errorOutput = 'Please enter a valid email address.';
          break;
        case 'Incorrect code provided.':
          errorOutput = 'The reset code is invalid or has expired. Please request a new password reset.';
          break;
        default:
          errorOutput = message;
          // Log unexpected error messages for debugging
          console.warn('Unhandled Strapi error message:', message);
      }
    }
    // Handle direct message string
    else if (typeof data.message === 'string') {
      errorOutput = data.message;
    }
    // Log unexpected error formats
    else {
      console.error('Unexpected error format:', data);
    }
  }

  // Add developer contact message for non-auth errors
  if (!errorOutput.match(/incorrect|invalid|already registered|email address/i)) {
    errorOutput += notifiedDeveloperMessage;
  }

  setError(errorOutput);
  setLoading(false);
}