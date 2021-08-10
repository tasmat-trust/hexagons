
import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs';
import { withSession } from '../../middlewares/session'
import checkSession from '../../components/auth/checkSession'
import PupilsAndGroups from '../../components/groups/PupilsAndGroups'

export default function Index(props) {
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Groups" />
      <PupilsAndGroups {...props} activeGroup='class-1' />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

