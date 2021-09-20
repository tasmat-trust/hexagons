
import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'
import LastActiveGroup from '../../components/groups/LastActiveGroup';
import CustomHead from '../../components/ui-globals/CustomHead';

function Index(props) {
  return (
    <>
      <CustomHead titleContent="Pupils" />
      <BreadCrumbs {...props} firstLabel="Pupils" />
      <LastActiveGroup {...props} />
    </>
  )
}


export default Index
export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

