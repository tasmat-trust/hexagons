export default function handleStrapiError(error) {
  console.error(error)
  const response = {
    error: true
  }
  if (error.response && error.response.errors && error.response.errors.length > 0) {
    response.error = error.response.errors[0].message
  }
  return response
}