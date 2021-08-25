
import { withSession } from '../../../../components/auth/session'
import checkSession from '../../../../components/auth/checkSession'

import GroupPupilChooserView from '../../../../components/shared-pages/GroupPupilChooserView'

const Group = (props) => <GroupPupilChooserView {...props} firstLabel="Rainbow Awards" firstSlug="rainbow-awards" />

export default Group

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})