import PropTypes from 'prop-types'
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs'
import LastActiveGroup from '../../../components/groups/LastActiveGroup'
import WithSingleSubjectFromSlug from '../../../components/data-fetching/WithSingleSubjectFromSlug'
import WithSingleSubjectFromSlugVariables from '../../../components/data-fetching/WithSingleSubjectFromSlugVariables'


function Index({ subjectName, ...other }) {
  return (
    <>
      <BreadCrumbs firstLabel='Subjects' firstHref='/subjects' secondLabel={subjectName} />
      <LastActiveGroup {...other} />
    </>
  )
}

Index.propTypes = {
  subjectName: PropTypes.string
}

export default WithSingleSubjectFromSlugVariables(WithSingleSubjectFromSlug(Index))

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})