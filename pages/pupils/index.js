
import { withSession } from '../../middlewares/session'
import checkSession from '../../components/auth/checkSession'

import PupilsList from '../../components/pupil/PupilsList'
import { getOrgIdFromSession } from '../../utils'
import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs'

export default function Pupils({ user, ...other }) {
  const orgId = getOrgIdFromSession(user)
  return (
    <>
      <BreadCrumbs {...other} firstLabel="Pupils" />
      <p>TODO: Filter by group</p>
      <p>TODO: Search all pupils</p>
      <PupilsList variables={{ orgId: orgId }} {...other} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})