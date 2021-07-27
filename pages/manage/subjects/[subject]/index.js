import { useRouter } from "next/router"

import BreadCrumbs from "../../../../components/layout/navigation/Breadcrumbs";


import { withSession } from '../../../../middlewares/session'
import checkSession from '../../../../components/auth/checkSession'

import RoleInfoBanner from '../../../../components/layout/RoleInfoBanner'
import { useState, useEffect } from "react";
import Link from 'next/link'

export default function Group(props) {
  const { user } = props
  const router = useRouter();
  const { query } = router
  const [path, setPath] = useState(null)
  useEffect(() => {
    if (!router.isReady) return;
    setPath(router.asPath)
    // codes using router.query

  }, [router.isReady, router.asPath]);
  return (
    <>
      <RoleInfoBanner role="Senior Leader" />
      <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/manage/subjects" secondLabel={`${query.subject}`} />
      {path && <Link href={`${path}/steps`}>Steps</Link>}
      {path && <Link href={`${path}/stages`}>Stages</Link>} 
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Senior Leader')
})