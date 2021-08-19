import PropTypes from 'prop-types'
import { withSession } from '../../../../components/auth/session'
import checkSession from '../../../../components/auth/checkSession'
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs'
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug'
import WithSingleSubjectFromSlugVariables from '../../../../components/data-fetching/WithSingleSubjectFromSlugVariables'
import { useRouter } from 'next/router'
import PupilsAndGroups from '../../../../components/groups/PupilsAndGroups'
import { useState, useEffect } from 'react'
function Index({ user, subjectName, ...other }) {
  const { query } = useRouter();
  const [activeSlug, setActiveSlug] = useState(null)

  useEffect(() => {
    if (query && query.slug) {
      setActiveSlug(query.slug)
    }
  }, [query])
  const [breadcrumbsGroupName, setBreadcrumbsGroupName] = useState(null);
  return (
    <>
      <BreadCrumbs firstLabel='Subjects' firstHref='/subjects' secondLabel={subjectName} />
      <PupilsAndGroups
        {...other}
        userId={user.id}
        activeGroupSlug={activeSlug}
        setBreadcrumbsGroupName={setBreadcrumbsGroupName}
      />
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