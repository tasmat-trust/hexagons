import PropTypes from 'prop-types'
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import PupilsAndGroups from '../../../components/groups/PupilsAndGroups'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../components/data-fetching/WithGroupFromSlug';



function Index({ user, activeGroupSlug, groupName, ...other }) {

  return (
    <>
      <BreadCrumbs firstLabel="Pupils" secondLabel={groupName} {...other} />
      <PupilsAndGroups
        {...other}
        userId={user.id}
        groupName={groupName}
        activeGroupSlug={activeGroupSlug}
      />
    </>)
}

Index.propTypes = {
  user: PropTypes.object
}

export default WithUrlVariables(WithGroupFromSlug(Index))

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

