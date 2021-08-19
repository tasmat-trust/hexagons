import PropTypes from 'prop-types'
import { withSession } from '../../../../components/auth/session'
import checkSession from '../../../../components/auth/checkSession'
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs'
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug'
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug'
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables'
 
import PupilsAndGroups from '../../../../components/groups/PupilsAndGroups'
 
function Index({ user, subjectName, groupName, ...other }) {
   
  return (
    <>
      <BreadCrumbs 
      firstLabel='Subjects' 
      firstHref='/subjects' 
      secondLabel={subjectName}
      thirdLabel={groupName} 
      />
      <PupilsAndGroups
        {...other}
        userId={user.id}
      />
    </>
  )
}

Index.propTypes = {
  user: PropTypes.object,
  subjectName: PropTypes.string,
  groupName: PropTypes.string
}

export default WithUrlVariables(WithSingleSubjectFromSlug(WithGroupFromSlug(Index)))

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})