import { withSession } from "../../../../components/auth/session"
import checkSession from "../../../../components/auth/checkSession"

import BreadCrumbs from "../../../../components/navigation/Breadcrumbs"
import SubjectMainView from "../../../../components/subjects/SubjectMainView"
import { useRouter } from "next/router"
import { useState } from "react"
import { getOrgIdFromSession } from "../../../../utils"

function Subject(props) {
  const [pupilName, setPupilName] = useState(null)
  const [pupilId, setPupilId] = useState(null)
  const [groupName, setGroupName] = useState(null)
  const [subjectName, setSubjectName] = useState(null)
  const { query } = useRouter()
  const orgId = getOrgIdFromSession(props.user)
  console.log(subjectName, groupName, pupilId, pupilName, query, query.slug)
  return (
    <>
      {query && query.slug && pupilName && pupilId && groupName && subjectName && <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={groupName} secondHref={`/pupils/${query.slug}`} thirdLabel={pupilName} thirdHref={`/pupils/${query.slug}/${pupilId}`} fourthLabel={subjectName} />}

      <SubjectMainView
        groupFromSlugVariables={{ orgId: orgId, slug: query.slug }}
        setBreadcrumbPupilName={setPupilName}
        setBreadcrumbPupilId={setPupilId}
        setGroupName={setGroupName}
        setBreadcrumbSubjectName={setSubjectName}
        {...props} />
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

export default Subject