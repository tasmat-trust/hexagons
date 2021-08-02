import checkSession from "../../../components/auth/checkSession"
import { withSession } from "../../../middlewares/session"
import { WithQueryVariables, WithPupilData, WithSubjectData, WithCurrentLevel } from '../../../components/pupil/WithPupil'

import BreadCrumbs from "../../../components/layout/navigation/Breadcrumbs"

import SetPupilSubjectLevel from '../../../components/pupil/SetPupilSubjectLevel';
import StagesTabs from "../../../components/navigation/StagesTabs";

function Subject(props) {
  const { pupil, subject, level } = props
  return (
    <>
      <BreadCrumbs {...props} firstLabel="Pupils" firstHref="/pupils" secondLabel={`${pupil.name}`} secondHref={`/pupils/${pupil.id}`} thirdLabel={subject.name} />

      {level && <StagesTabs
        stepOrStage='steps'
        isAdmin={false}        
        variables={{ slug: subject.slug }}
        {...props} />}

      {!level && <SetPupilSubjectLevel 
      stepOrStage='steps' 
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