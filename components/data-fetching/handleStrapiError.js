export default function handleStrapiError(error) {
  if (error.response && error.response.errors && error.response.errors.length > 0) {
    alert(error.response.errors[0].message)
  }
}