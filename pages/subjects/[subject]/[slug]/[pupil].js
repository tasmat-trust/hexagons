import checkSession from "../../../../components/auth/checkSession"
import { withSession } from "../../../../components/auth/session"
import { WithParamVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../../../../components/data-fetching/WithPupil'
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug'
import WithSingleSubjectFromSlugVariables from '../../../../components/data-fetching/WithSingleSubjectFromSlugVariables'
import BreadCrumbs from "../../../../components/navigation/Breadcrumbs"

import SetPupilSubjectLevel from '../../../../components/pupil/SetPupilSubjectLevel'; 
import { useRouter } from "next/router";

function Subject(props) {
  const { pupil, subject, level, subjectName } = props
  const { query } = useRouter()
  return (
    <>
      {query && query.subject && <BreadCrumbs
        firstLabel="Subjects"
        firstHref="/subjects"
        secondLabel={subjectName}
        secondHref={`/subjects/${query.subject}`}
        thirdLabel={'Class 4'}
        thirdHref={'/subjects/pshe/class-4'}
        fourthLabel={pupil.name} />}

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

export default WithSingleSubjectFromSlugVariables(WithSingleSubjectFromSlug(WithParamVariables(WithPupilData(WithSubjectData(WithCurrentLevel(Subject))))))