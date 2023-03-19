import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'

import BreadCrumbs from '../../components/navigation/Breadcrumbs'
import Subjects from '../../components/subjects/Subjects'
import CustomHead from '../../components/ui-globals/CustomHead'

export default function Pupils(props) {
  return (
    <>
      <CustomHead titleContent="Early development" />
      <BreadCrumbs  finalTitle="Early development" />
      <Subjects isEarlyDevelopment={true} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})