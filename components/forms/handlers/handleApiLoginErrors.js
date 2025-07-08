export default function handleErrors(error, setError, setLoading) {
  let errorOutput = 'An unknown error has occurred';
  const notifiedDeveloperMessage = ` If the problem persists, please email ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`;

  // No response - likely network error
  if (!error.response) {
    errorOutput = 'Please check your internet connection and try again.';
  }
  // Has response with error data
  else if (error.response && error.response.data) {
    const { data } = error.response;
    
    // Handle Strapi authentication errors
    if (data.error) {
      switch (data.error.message) {
        case 'Invalid identifier or password':
          errorOutput = 'Incorrect email or password. Please try again.';
          break;
        case 'User not confirmed':
          errorOutput = 'Please verify your email address before logging in.';
          break;
        default:
          errorOutput = data.error.message;
      }
    }
    // Handle other API errors
    else if (data.message) {
      if (typeof data.message === 'string') {
        errorOutput = data.message;
      }
      // Handle Strapi's nested message format
      else if (Array.isArray(data.message) && data.message[0]?.messages?.[0]?.message) {
        errorOutput = data.message[0].messages[0].message;
      }
    }
  }

  // Add developer contact message for non-auth errors
  if (!errorOutput.includes('Incorrect email or password')) {
    errorOutput += notifiedDeveloperMessage;
  }

  setError(errorOutput);
  setLoading(false);
}