import RegistrationForm from '../components/forms/Registration'

import useStateOnce from '../components/data-fetching/useStateOnce'
import handleNonResponses from '../components/data-fetching/handleNonResponses'
import { getAllOrgs } from '../queries/Organizations'
export default function Register(props) {


  const [data, error] = useStateOnce(getAllOrgs)
  const gotNonResponse = handleNonResponses(data, error)
  if (gotNonResponse) return gotNonResponse
  return (
    <RegistrationForm {...props} orgs={data.organizations} />
  )
}