import PropTypes from 'prop-types'
import BreadCrumbs from '../navigation/Breadcrumbs'
import LastActiveGroup from '../groups/LastActiveGroup'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import WithUrlVariables from '../data-fetching/WithUrlVariables'
import CustomSuspense from '../data-fetching/CustomSuspense'


function Index({ firstLabel, firstSlug, subjectName, ...other }) {

  return (
    <>
      <BreadCrumbs
        firstLabel={firstLabel}
        firstHref={`/${firstSlug}`}
        secondLabel={subjectName} />
      <CustomSuspense message="Loading groups">
        <LastActiveGroup
          shouldShowGroupBySubject={true}
          subjectName={subjectName}
          {...other} />
      </CustomSuspense>
    </>
  )
}

Index.propTypes = {
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  subjectName: PropTypes.string
}

export default WithUrlVariables(WithSingleSubjectFromSlug(Index))
