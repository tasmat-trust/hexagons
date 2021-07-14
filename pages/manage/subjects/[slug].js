import { useRouter } from "next/router"

import BreadCrumbs from "../../../components/layout/navigation/Breadcrumbs";

import { getOrgIdFromSession } from '../../../utils';
import checkSession from '../../../components/auth/CheckSession'
import RoleInfoBanner from '../../../components/layout/RoleInfoBanner'
import { useState } from "react";
import ManageCapabilities from "../../../components/manage/ManageCapabilities";

export default function Group(props) {
  const { session } = props
  const { query } = useRouter()
  const orgId = getOrgIdFromSession(session)
  const [subjectName, setSubjectName] = useState(null)
  return (
    <>
      <RoleInfoBanner role="Senior Leader" />
      <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/manage/subjects" secondLabel={subjectName} />
      <ManageCapabilities {...props} variables={{ slug: query.slug }} setSubjectName={setSubjectName} />

    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}