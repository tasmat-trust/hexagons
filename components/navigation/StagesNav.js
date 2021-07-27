import Link from 'next/link'
import { getModules, getSingleSubjectBySlug } from '../../queries/Subjects'
import useSharedState from "../data-fetching/useSharedState"
import useStateOnce from '../data-fetching/useStateOnce'
import handleNonResponses from "../data-fetching/handleNonResponses"
import InlineNavItem from './InlineNavItem';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function SubjectGetter(WrappedComponent) {
  return function SubjectGetter(props) {
    const { query } = useRouter()
    const { user, variables, setBreadcrumbLabel, shouldShowStepStageInBreadcrumb } = props 
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, variables])
    const gotNonResponse = handleNonResponses(subjectData, error)
    const stage = query.stage
    useEffect(() => {
      if (subjectData && !shouldShowStepStageInBreadcrumb) {
        setBreadcrumbLabel && setBreadcrumbLabel(subjectData.subjects[0].name)
      }
      if (subjectData && shouldShowStepStageInBreadcrumb) {
        setBreadcrumbLabel && setBreadcrumbLabel(stage)
      }
    }, [setBreadcrumbLabel, subjectData, shouldShowStepStageInBreadcrumb, stage])
    if (gotNonResponse) return gotNonResponse
    const subjectId = subjectData.subjects[0].id
    const subjectName = subjectData.subjects[0].name
    return (
      <WrappedComponent {...props} subjectId={subjectId} subjectName={subjectName} variables={{ level: user.organization.school_type, subjectId: subjectId }} />
    )
  }
}

function StagesNav(props) {
  const { variables, user, subjectName, setBreadcrumbLabel } = props
  const [modulesData, setModulesData, error] = useSharedState([getModules, variables])
  const gotNonResponse = handleNonResponses(modulesData)

  const stepStage = user.organization.school_type === 'primary' ? 'step' : 'stage'
 
  if (gotNonResponse) return gotNonResponse
  return (
    <nav>
      <ul>
        {modulesData.modules.map((module, i) => (
          <InlineNavItem
            key={`link-${i}`}
            href={`/manage/subjects/${subjectName.toLowerCase()}/${stepStage}-${module.order}`}
            label={`${stepStage === 'step' ? 'Step' : 'Stage'} ${module.order}`}
          />
        ))}
      </ul>
    </nav>
  )
}

export default SubjectGetter(StagesNav)