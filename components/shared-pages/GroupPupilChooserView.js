import PropTypes from 'prop-types'
import BreadCrumbs from '../navigation/Breadcrumbs'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug'
import WithUrlVariables from '../data-fetching/WithUrlVariables'
import CustomHead from '../ui-globals/CustomHead'
import PupilsAndGroups from '../groups/PupilsAndGroups'

function Index({ firstLabel, firstSlug, firstModel, user, subjectName, groupName, ...other }) {

  return (
    <>
      <CustomHead titleContent={`${groupName} | ${subjectName} | ${firstLabel}`} justContent={true} />
      <BreadCrumbs
        firstLabel={firstLabel}
        firstModel={firstModel}
        firstHref={`/${firstSlug}`}
        secondLabel={subjectName}
        thirdLabel={groupName}
      />
      <PupilsAndGroups
        {...other}
        groupName={groupName}
        subjectName={subjectName}
        userId={user.id}
        schoolType={user.organization.school_type}
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