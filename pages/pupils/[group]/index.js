import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import PupilsAndGroups from '../../../components/groups/PupilsAndGroups'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import { useEffect, useState } from 'react';
import WithUrlVariables from '../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../components/data-fetching/WithGroupFromSlug';

function Index({ user, groupName, activeGroupSlug, ...other }) {
  const { query } = useRouter();
  const [activeSlug, setActiveSlug] = useState(null)

  useEffect(() => {
    if (query && query.group) {
      setActiveSlug(query.group)
    }
  }, [query])

  
  return (
    <>
      <BreadCrumbs firstLabel="Pupils"  />
      <PupilsAndGroups
        {...other}
        userId={user.id}
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

