import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSharedState from './useSharedState';
import useStateOnce from './useStateOnce';
import { getPupilById, getLevels } from '../../queries/Pupils';
import { getSingleSubjectBySlug } from '../../queries/Subjects'
import handleNonResponses from './handleNonResponses';
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
  function WithModules({ getModulesBySubjectIdVariables, isAdmin, pupil, subject, ...other } ) {
    const [modulesData, setModulesData, error] = useSharedState([getModules, getModulesBySubjectIdVariables])
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
          pupil={pupil}
          isAdmin={isAdmin}
          subject={subject}
          {...other} />}

        {isAdmin && <WrappedComponent 
          setModulesData={setModulesData} 
          modules={modules} 
          upil={pupil}
          isAdmin={isAdmin}
          subject={subject}
          {...other} />}
      </>
    )
  }
  WithModules.propTypes = {
    getModulesBySubjectIdVariables: PropTypes.object,
    isAdmin: PropTypes.bool,
    pupil: PropTypes.object,
    subject: PropTypes.object
  }
  return WithModules
}

function WithCompetencies(WrappedComponent) {
  function WithCompetencies({ competenciesVars, isAdmin, ...other }) {
    const [competenciesData, error] = useStateOnce([getCompetencies, competenciesVars])
    let competencies = []
    if (competenciesData) {
      competencies = competenciesData.competencies
    }
    // detect duplicates
    if (competencies.length > 0) {
      const fks = competencies.map((comp) => comp.capability_fk)
      const unique = Array.from(new Set(fks))
      if (fks.length !== unique.length) {
        throw new Error('Got duplicate competencies')
      }
    }
    return (
      <>
        {!isAdmin && <WrappedComponent isAdmin={isAdmin} competenciesData={competencies} {...other} />}
        {isAdmin && <WrappedComponent isAdmin={isAdmin} {...other} />}
      </>
    )
  }

  WithCompetencies.propTypes = {
    competenciesVars: PropTypes.object,
    isAdmin: PropTypes.bool
  }

  return WithCompetencies
}



export {
  WithQueryVariables,
  WithSubjectData,
  WithModules,
  WithCompetencies,
  WithPupilData,
  WithCurrentLevel
}