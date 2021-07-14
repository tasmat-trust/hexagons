import { useRouter } from "next/router"
import PupilsByGroup from "../../components/groups/PupilsByGroup";

// Utils
import { getOrgIdFromSession } from '../../utils';


import checkSession from '../../components/auth/CheckSession'
import { useState } from "react"
import BreadCrumbs from "../../components/layout/navigation/Breadcrumbs";


export default function Group(props) {
  const { session } = props
  const { query } = useRouter()
  const orgId = getOrgIdFromSession(session)
  const [groupName, setGroupName] = useState(null)
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Groups" firstHref="/groups" secondLabel={groupName} />
      <PupilsByGroup variables={{ orgId: orgId, slug: query.slug }} groupSlug={query.slug} setGroupName={setGroupName} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}