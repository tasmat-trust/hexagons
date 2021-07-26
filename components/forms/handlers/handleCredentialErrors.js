export default function handleCredentialErrors(email, password, setError, setFieldError) {
  
  const permittedDomains = ["aliblackwell", "tasmat.org.uk"]

  if (!email) {
    setError('Please enter your email.')
    setFieldError('email')
    return true
  }

  const correctEmails = permittedDomains.map((domain) => email.includes(domain))
  if (!correctEmails.includes(true)) {
    setError('You must use an email address from Tasmat')
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