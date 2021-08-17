import checkSession from "../../../components/auth/checkSession"
import { withSession } from "../../../components/auth/session"
import { WithQueryVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../../../components/pupil/WithPupil'

import BreadCrumbs from "../../../components/navigation/Breadcrumbs"

import SetPupilSubjectLevel from '../../../components/pupil/SetPupilSubjectLevel';
import StagesTabs from "../../../components/navigation/StagesTabs";

function Subject(props) {
  const { pupil, subject, level } = props
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Subjects" firstHref="/subjects" secondLabel={`${pupil.name}`} secondHref={`/pupils/${pupil.id}`} thirdLabel={subject.name} />

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

export default WithQueryVariables(WithPupilData(WithSubjectData(WithCurrentLevel(Subject))))