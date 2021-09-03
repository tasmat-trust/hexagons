import PropTypes from 'prop-types'
import BreadCrumbs from '../navigation/Breadcrumbs'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug'
import WithUrlVariables from '../data-fetching/WithUrlVariables'

import PupilsAndGroups from '../groups/PupilsAndGroups'

function Index({ firstLabel, firstSlug, user, subjectName, groupName, ...other }) {

  return (
    <>
      <BreadCrumbs
        firstLabel={firstLabel}
        firstHref={`/${firstSlug}`}
        secondLabel={subjectName}
        thirdLabel={groupName}
      />
      <PupilsAndGroups
        {...other}
        groupName={groupName}
        subjectName={subjectName}
        userId={user.id}
      />
    </>
  )
}

Index.propTypes = {
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  user: PropTypes.object,
  subjectName: PropTypes.string,
  groupName: PropTypes.string
}

export default WithUrlVariables(WithSingleSubjectFromSlug(WithGroupFromSlug(Index)))