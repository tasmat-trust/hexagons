export default function handleCredentialErrors(email, password, setError, setFieldError, humanOrgsArray, computerOrgsArray) {

  if (!email) {
    setError('Please enter your email.')
    setFieldError('email')
    return true
  }

  const correctEmails = computerOrgsArray.map((domain) => email.includes(domain))
  if (!correctEmails.includes(true)) {
    setError(`You must use an email address from ${humanOrgsArray}`)
    setFieldError('email')
    return true
  }

  if (!password) {
    setError('Please enter a password.')
    setFieldError('password')
    return true
  }
  return false
}