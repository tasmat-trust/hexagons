
import { withSession } from '../../middlewares/session'
import checkSession from '../../components/auth/checkSession'

import PupilsAndGroups from '../../components/groups/PupilsAndGroups'
import { getOrgIdFromSession } from '../../utils'
import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs'

export default function Pupils(props) { 
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Subjects" />
      <p>TODO: Search all pupils</p>
      <PupilsAndGroups {...props} activeGroup='class-1' />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})