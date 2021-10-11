import PropTypes from 'prop-types'
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import PupilsAndGroups from '../../../components/groups/PupilsAndGroups'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../components/data-fetching/WithGroupFromSlug';
import CustomHead from '../../../components/ui-globals/CustomHead';



function Index({ user, activeGroupSlug, groupName, ...other }) {

  return (
    <>
      <CustomHead titleContent={`${groupName} | Pupils`} />
      <BreadCrumbs firstLabel="Pupils" secondLabel={groupName} {...other} />
      <PupilsAndGroups
        {...other}
        userId={user.id}
        schoolType={user.organization.school_type} 
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

