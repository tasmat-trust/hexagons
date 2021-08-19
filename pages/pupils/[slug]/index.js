import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import PupilsAndGroups from '../../../components/groups/PupilsAndGroups'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import { useEffect, useState } from 'react';

function Index({ user, ...other }) {
  const { query } = useRouter();
  const [activeSlug, setActiveSlug] = useState(null)

  useEffect(() => {
    if (query && query.slug) {
      setActiveSlug(query.slug)
    }
  }, [query])

  const [breadcrumbsGroupName, setBreadcrumbsGroupName] = useState(null);
  console.log(activeSlug)
  return (
    <>
      <BreadCrumbs firstLabel="Pupils" firstHref="/pupils" secondLabel={breadcrumbsGroupName} />
      <PupilsAndGroups
        {...other}
        userId={user.id}
        activeGroupSlug={activeSlug}
        setBreadcrumbsGroupName={setBreadcrumbsGroupName}
      />
    </>)
}

Index.propTypes = {
  user: PropTypes.object
}

export default Index

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

