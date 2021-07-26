export default function handleErrors(error, setError, setLoading) {

  let errorOutput = 'An unknown error has occurred'
  let connectionErrorMessage = 'Please check your internet connection and try again.'
  let unknownError = 'An unknown error has occurred. Please check and try again.'
  let econnrefused = 'The authentication server is down.'
  let notifiedDeveloperMessage = ` If the problem persists, please email ${process.env.NEXT_PUBLIC_API_URL_REMOTE}`

  if (!error.response) {
    console.log(error);
    console.log('No error.response');
    errorMessage = connectionErrorMessage;
  }

  if (error.response) {

    if (!error.response.data) {
      console.log(error.response)
      errorOutput = connectionErrorMessage
    }

    if (error.response.data) {

      if (!error.response.data.message) {
        console.log(error.response.data);
        console.log('No error.response.data.message');
        errorOutput = connectionErrorMessage
      }

      if (error.response.data.message) {

        if (!Array.isArray(error.response.data.message)) {
          console.log(error.response.data.message)
          console.log("error.response.data.message isn't array")
          errorOutput = unknownError;

          console.log(error.response.data)
          if (error.response.data.code === 'ECONNREFUSED') {
            errorOutput = econnrefused
          } else {
            if (typeof error.response.data.message === 'object') {
              errorOutput = error.response.data.message.code + ' error.'
            } else { // is string
              errorOutput = error.response.data.message
            }
            
          }
          errorOutput += notifiedDeveloperMessage
        }

        if (Array.isArray(error.response.data.message)) {

          if (!error.response.data.message[0].messages) {
            console.log(error.response.data.message[0]);
            console.log('No error.response.data.message[0].messages');
            errorOutput = unknownError
          }

          if (!Array.isArray(error.response.data.message[0].messages)) {
            console.log(error.response.data.message[0].messages);
            console.log('error.response.data.message[0].messages is not array');
            errorOutput = unknownError
          }

          if (Array.isArray(error.response.data.message[0].messages)) {
            if (error.response.data.message[0].messages.length > 0) {
              if (error.response.data.message[0].messages[0].messages) {
                errorOutput = error.response.data.message[0].messages[0].message
              } else {
                if (error.response.data.message[0].messages[0].message) {

                  const message = error.response.data.message[0].messages[0].message
                  errorOutput = error.response.data.message[0].messages[0].message
                  if (message === "Email already taken") {
                    errorOutput = "Your username or email is already registered."
                  }
                  
                } else {
                  errorOutput = unknownError
                  console.log('!error.response.data.message[0].messages[0].message')
                }
              }
            } else {
              console.log('!error.response.data.message[0].messages.length > 0')
              errorOutput = unknownError
            }
          }
        }
      }
    }
  }

  setError(errorOutput)
  setLoading(false);
}