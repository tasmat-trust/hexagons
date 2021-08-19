import PropTypes from 'prop-types'
import checkSession from "../auth/checkSession"
import { withSession } from "../auth/session"
import { WithQueryVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../data-fetching/WithPupil'
import WithGroupFromSlug from "../data-fetching/WithGroupFromSlug"

import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel';
import StagesTabs from "../navigation/StagesTabs";
import PupilPicker from '../navigation/PupilPicker';

import { useEffect } from "react"
import { useRouter } from "next/router";

function Subject(props) {
  const {  pupil, subject, level, setBreadcrumbPupilName, setBreadcrumbPupilId, setBreadcrumbSubjectName, orgId } = props
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

  console.log(pupil)

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


export default WithQueryVariables(WithGroupFromSlug(WithPupilData(WithSubjectData(WithCurrentLevel(Subject)))))