import { withSession } from '../components/auth/session'
import checkSession from '../components/auth/checkSession'
import BreadCrumbs from '../components/navigation/Breadcrumbs'

function RainbowAwards(props) {
  return (
    <>
      <BreadCrumbs firstLabel="Rainbow Awards" />
 
    </>
  )
}

export default RainbowAwards

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})