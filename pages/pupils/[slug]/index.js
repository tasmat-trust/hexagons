import { useRouter } from 'next/router';
import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'
import PupilsAndGroups from '../../../components/groups/PupilsAndGroups'
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import { useState } from 'react';

export default function Index(props) {
  const { query } = useRouter();
  const [groupName, setGroupName] = useState(null);
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={groupName} />
      <PupilsAndGroups {...props} activeGroup={query.slug} setGroupName={setGroupName} />
    </>)
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

