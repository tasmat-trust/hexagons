import RoleInfoBanner from "../../../../components/layout/RoleInfoBanner"
import BreadCrumbs from "../../../../components/navigation/Breadcrumbs"
import StagesTabs from "../../../../components/navigation/StagesTabs"
import { withSession } from "../../../../components/auth/session"
import checkSession from "../../../../components/auth/checkSession"
import { useRouter } from "next/router"
import { useState } from "react"

import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables'
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';


function Stage(props) {
  const { query } = useRouter()
  const [stageName, setStageName] = useState(null)
 
  return (
    <>
      <RoleInfoBanner role="Leader" />

      <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/manage/subjects" secondLabel={query.subject} secondHref={`/manage/subjects/${query.subject}`} thirdLabel={query['step-stage']} />

      <StagesTabs
        {...props}
        isAdmin={true}
        getSubjectBySlugVariables={{ slug: query.subject }}
        setBreadcrumbLabel={setStageName} />

    </>
  )
}

export default WithUrlVariables(WithSingleSubjectFromSlug(Stage))

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader')
})