import { withSession } from '../../../../components/auth/session'
import checkSession from '../../../../components/auth/checkSession'

import PupilMainView from '../../../../components/pupil/PupilMainView'
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { getOrgIdFromSession } from '../../../../utils'

 
export default function Index(props) {
  const [pupilName, setPupilName] = useState(null)
  const [groupName, setGroupName] = useState(null)
  const orgId = getOrgIdFromSession(props.user)
  const { query } = useRouter()
  return (
    <>

      {query && query.slug && pupilName && groupName && <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={groupName} secondHref={`/pupils/${query.slug}`} thirdLabel={pupilName} />}
      <PupilMainView groupFromSlugVariables={{ orgId: orgId, slug: query.slug }} setGroupName={setGroupName} setBreadcrumbPupilName={setPupilName} {...props} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})