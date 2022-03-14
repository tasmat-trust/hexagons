import CustomHead from '../../components/ui-globals/CustomHead'
import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'

import BreadCrumbs from '../../components/navigation/Breadcrumbs'
import Subjects from '../../components/subjects/Subjects'
import CustomSuspense from '../../components/data-fetching/CustomSuspense'

export default function Pupils(props) {
  return (
    <>
      <CustomHead titleContent="Subjects" />
      <CustomSuspense message="Loading subjects">
        <Subjects />
      </CustomSuspense>
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})
