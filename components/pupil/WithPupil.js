import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSharedState from '../data-fetching/useSharedState';
import useStateOnce from '../data-fetching/useStateOnce';
import { getPupilById, getLevels } from '../../queries/Pupils';
import { getSingleSubjectBySlug } from '../../queries/Subjects'
import handleNonResponses from '../data-fetching/handleNonResponses';
import { getOrgIdFromSession } from '../../utils';
import { getModules } from '../../queries/Subjects'
import { getCompetencies } from '../../queries/Pupils'

function WithQueryVariables(WrappedComponent) {
  return function WithPupil(props) {
    const { user } = props
    const orgId = getOrgIdFromSession(user)
    const router = useRouter()
    const [query, setQuery] = useState(null)
    useEffect(() => {
      if (!router.isReady) return;
      setQuery(router.query)
    }, [router])

    return (
      <>
        {query && <WrappedComponent subjectVariables={{ slug: query.subject }} pupilVariables={{ id: query.pupil, orgId: orgId }} {...props} />}
      </>
    )
  }
}

function WithPupilData(WrappedComponent) {
  return function WithPupilData(props) {
    const [pupilsData, error] = useStateOnce([getPupilById, props.pupilVariables])
    const gotNonResponse = handleNonResponses(pupilsData, error, 'No pupil found')
    if (gotNonResponse) return gotNonResponse
    const pupil = pupilsData.pupils[0]
    return (
      <WrappedComponent {...props} pupil={pupil} />
    )
  }
}

function WithSubjectData(WrappedComponent) {
  return function WithPupilData(props) {
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, props.subjectVariables])
    const gotNonResponse = handleNonResponses(subjectData, error, 'Subject not found')
    if (gotNonResponse) return gotNonResponse
    const subject = subjectData.subjects[0]
    return (
      <WrappedComponent {...props} subject={subject} levelVariables={{ pupilId: props.pupil.id, subjectId: subject.id }} />
    )
  }
}

function WithCurrentLevel(WrappedComponent) {
  return function WithCurrentLevel(props) {
    const [levelsData, mutateLevelsData, error] = useSharedState([getLevels, props.levelVariables])
    const gotNonResponse = handleNonResponses(levelsData, error, 'No levels found')
    let startingLevel = null;
    if (!gotNonResponse) {
      // Get lowest incomplete level
      const incompleteLevels = levelsData.levels.filter((value) => value.status !== 'complete')
      const sortedLevels = incompleteLevels.sort((a, b) => a.module.order > b.module.order)
      startingLevel = sortedLevels[0]
    }
    return (
      <>
        {startingLevel && <WrappedComponent {...props} startingLevel={startingLevel} />}
        {!startingLevel && <WrappedComponent {...props} />}
      </>
    )
  }
}

function WithModules(WrappedComponent) {
  return function WithModules(props) {
    const { variables, isAdmin, pupil, subject } = props
    const [modulesData, setModulesData, error] = useSharedState([getModules, variables])
    let modules = []
    if (modulesData) {
      modules = modulesData.modules
    }
    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent
          competenciesVars={{ pupilId: pupil.id, subjectId: subject.id }}
          setModulesData={setModulesData}
          modules={modules}
          {...props} />}
        {isAdmin && <WrappedComponent setModulesData={setModulesData} modules={modules} {...props} />}
      </>
    )
  }
}

function WithCompetencies(WrappedComponent) {
  return function WithCompetencies(props) {
    const { competenciesVars, isAdmin } = props
    const [competenciesData, setCompetenciesData, error] = useSharedState([getCompetencies, competenciesVars])
    let competencies = []
    if (competenciesData) {
      competencies = competenciesData.competencies
    }
    return (
      <>

        {!isAdmin && <WrappedComponent setCompetenciesData={setCompetenciesData} competenciesData={competencies} {...props} />}

        {isAdmin && <WrappedComponent {...props} />}
      </>
    )
  }
}



export {
  WithQueryVariables,
  WithSubjectData,
  WithModules,
  WithCompetencies,
  WithPupilData,
  WithCurrentLevel
}