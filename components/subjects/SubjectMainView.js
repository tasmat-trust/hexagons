import checkSession from "../auth/checkSession"
import { withSession } from "../../middlewares/session"
import { WithQueryVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../pupil/WithPupil'
import WithGroupFromSlug from "../groups/WithGroupFromSlug"

import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel';
import StagesTabs from "../navigation/StagesTabs";
import PupilPicker from '../groups/PupilPicker';

import { useEffect } from "react"

function Subject(props) {
  const { pupil, subject, level, setBreadcrumbPupilName, setBreadcrumbPupilId, setBreadcrumbSubjectName } = props

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

      {pupil && <PupilPicker currentPupil={pupil} groupSlug={'class-1'} />}

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