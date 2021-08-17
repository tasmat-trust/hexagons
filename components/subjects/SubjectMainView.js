import checkSession from "../auth/checkSession"
import { withSession } from "../auth/session"
import { WithQueryVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../data-fetching/WithPupil'
import WithGroupFromSlug from "../data-fetching/WithGroupFromSlug"

import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel';
import StagesTabs from "../navigation/StagesTabs";
import PupilPicker from '../navigation/PupilPicker';

import { useEffect } from "react"
import { getOrgIdFromSession } from "../../utils";
import { useRouter } from "next/router";

function Subject(props) {
  const { user, pupil, subject, level, setBreadcrumbPupilName, setBreadcrumbPupilId, setBreadcrumbSubjectName } = props
  const orgId = getOrgIdFromSession(user)
  const { query } = useRouter()
  useEffect(() => {
    if (subject) {
      setBreadcrumbSubjectName && setBreadcrumbSubjectName(subject.name)
    }
  }, [subject, setBreadcrumbSubjectName])

  useEffect(() => {
    if (pupil) {
      setBreadcrumbPupilName && setBreadcrumbPupilName(pupil.name)
      setBreadcrumbPupilId && setBreadcrumbPupilId(pupil.id)
    }
  }, [pupil, setBreadcrumbPupilName, setBreadcrumbPupilId])

  return (
    <>

      {pupil && <PupilPicker currentPupil={pupil} groupFromSlugVariables={{ orgId: orgId, slug: query.slug }} {...props} />}

      {level && <StagesTabs
        isAdmin={false}
        variables={{ slug: subject.slug }}
        {...props} />}

      {!level && <SetPupilSubjectLevel
        pupil={pupil}
        subject={subject}
        {...props} />}
    </>
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher')
})

export default WithQueryVariables(WithGroupFromSlug(WithPupilData(WithSubjectData(WithCurrentLevel(Subject)))))