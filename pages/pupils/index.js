
import BreadCrumbs from '../../components/layout/navigation/Breadcrumbs';
import { withSession } from '../../middlewares/session'
import checkSession from '../../components/auth/checkSession'
import LastActiveGroup from '../../components/groups/LastActiveGroup';
 

export default function Index(props) {
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" />
      <LastActiveGroup {...props} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

