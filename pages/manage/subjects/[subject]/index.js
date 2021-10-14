import RoleInfoBanner from "../../../../components/layout/RoleInfoBanner"
import BreadCrumbs from "../../../../components/navigation/Breadcrumbs"
import StagesTabsAdmin from "../../../../components/navigation/StagesTabsAdmin"
import { withSession } from "../../../../components/auth/session"
import checkSession from "../../../../components/auth/checkSession"
import { useRouter } from "next/router"
import { useState } from "react"

import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables'
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import CustomHead from "../../../../components/ui-globals/CustomHead"


function Stage(props) {
  const { subjectName } = props
  const { query } = useRouter()

  return (
    <>
      <CustomHead titleContent={`${subjectName} | Manage Subjects`} justContent={true} />
      <RoleInfoBanner role="Leader" />
      <BreadCrumbs {...props}
        firstLabel="Manage Subjects"
        firstModel="subject"
        firstHref="/manage/subjects"
        secondLabel={subjectName} secondHref={`/manage/subjects/${query.subject}`} thirdLabel={query['step-stage']} />

      <StagesTabsAdmin
        {...props}
        getSubjectBySlugVariables={{ slug: query.subject }} />

    </>
  )
}

export default WithUrlVariables(WithSingleSubjectFromSlug(Stage))

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader')
})