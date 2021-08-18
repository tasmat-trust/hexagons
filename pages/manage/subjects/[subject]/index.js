import RoleInfoBanner from "../../../../components/layout/RoleInfoBanner"
import BreadCrumbs from "../../../../components/navigation/Breadcrumbs"
import StagesTabs from "../../../../components/navigation/StagesTabs"
import { withSession } from "../../../../components/auth/session"
import checkSession from "../../../../components/auth/checkSession"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Stage(props) {
  const { query } = useRouter()
  const [stageName, setStageName] = useState(null) 
  return (
    <>
      <RoleInfoBanner role="Senior Leader" />

      <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/manage/subjects" secondLabel={query.subject} secondHref={`/manage/subjects/${query.subject}`} thirdLabel={query['step-stage']} />

      <StagesTabs 
      {...props} 
      isAdmin={true} 
      getSubjectBySlugVariables={{ slug: query.subject }} 
      setBreadcrumbLabel={setStageName} />
 
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Senior Leader')
})