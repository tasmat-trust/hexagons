
import { withSession } from '../../../../components/auth/session'
import checkSession from '../../../../components/auth/checkSession'

import GroupPupilChooserView from '../../../../components/shared-pages/GroupPupilChooserView'

const Group = (props) => <GroupPupilChooserView {...props} shouldShowGroupBySubject={true} firstLabel="Subjects" firstSlug="subjects" firstModel="subject" />

export default Group

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})