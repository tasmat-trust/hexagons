
import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'
 
import BreadCrumbs from '../../components/navigation/Breadcrumbs'
import Subjects from '../../components/subjects/Subjects'

export default function Pupils(props) { 
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Subjects" /> 
      <Subjects />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})