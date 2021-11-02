export default function handleStrapiError(error) {
  console.error(error)
  const response = {
    error: 'Someting went wrong, please refresh and try again'
  }
  if (error.response && error.response.errors && error.response.errors.length > 0) {
    response.error = error.response.errors[0].message
    response.errorBody = error.response.errors[0]
  }
  return response
}