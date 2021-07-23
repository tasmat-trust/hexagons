import LoginForm from '../components/forms/Login'

export default function AccountConfirmed(props) {
  return (
    <LoginForm {...props} title="Account confirmed" subtitle="Please login to get started" />
  )
}