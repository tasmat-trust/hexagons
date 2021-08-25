
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import SubjectChooserView from '../../../components/shared-pages/SubjectChooserView'

const Subject = (props) => <SubjectChooserView {...props} firstLabel="Rainbow Awards" firstSlug="rainbow-awards" />

export default Subject

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})
