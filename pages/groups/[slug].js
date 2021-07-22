import { useRouter } from "next/router"
import PupilsByGroup from "../../components/groups/PupilsByGroup";

// Utils
import { getOrgIdFromSession } from '../../utils';

import { withSession } from '../../middlewares/session'
import { checkIronSession } from '../../components/auth/checkIronSession'

import { useState } from "react"
import BreadCrumbs from "../../components/layout/navigation/Breadcrumbs";


export default function Group({ user }) {
  const { query } = useRouter()

  const orgId = getOrgIdFromSession(user)

  const [groupName, setGroupName] = useState(null)
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Groups" firstHref="/groups" secondLabel={groupName} />
      <PupilsByGroup variables={{ orgId: orgId, slug: query.slug }} groupSlug={query.slug} setGroupName={setGroupName} />
    </>
  )
}
export const getServerSideProps = withSession((ctx) => {
  return checkIronSession(ctx, 'Teacher')
})