import PropTypes from 'prop-types'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSharedState from './useSharedState';
import useStateOnce from './useStateOnce';
import { getPupilById, getLevels } from '../../queries/Pupils';
import { getSingleSubjectBySlug } from '../../queries/Subjects'
import handleNonResponses from './handleNonResponses';
import { getModules } from '../../queries/Subjects'
import { getCompetencies } from '../../queries/Pupils'

function WithQueryVariables(WrappedComponent) {
  function WithQueryVariables({ user, orgId, ...other }) {
    const router = useRouter()
    const [query, setQuery] = useState(null)
    useEffect(() => {
      if (!router.isReady) return;
      setQuery(router.query)
    }, [router])

    return (
      <>
        {query && <WrappedComponent
          orgId={orgId}
          user={user}
          subjectVariables={{ slug: query.subject }}
          pupilVariables={{ id: query.pupil, orgId: orgId }}
          {...other} />}
      </>
    )
  }

  WithQueryVariables.propTypes = {
    user: PropTypes.object,
    orgId: PropTypes.number
  }

  return WithQueryVariables
}

function WithParamVariables(WrappedComponent) {
  function WithParamVariables({ user, orgId, ...other }) {
    const router = useRouter()
    const [query, setQuery] = useState(null)
    useEffect(() => {
      if (!router.isReady) return;
      setQuery(router.query)
    }, [router])

    return (
      <>
        {query && <WrappedComponent
          orgId={orgId}
          user={user}
          subjectVariables={{ slug: query.subject }}
          pupilVariables={{ id: query.pupil, orgId: orgId }}
          {...other} />}
      </>
    )
  }

  WithParamVariables.propTypes = {
    user: PropTypes.object,
    orgId: PropTypes.number
  }

  return WithParamVariables
}

function WithPupilData(WrappedComponent) {
  function WithPupilData({ pupilVariables, ...other }) {
    const [pupilsData, error] = useStateOnce([getPupilById, pupilVariables])
    const gotNonResponse = handleNonResponses(pupilsData, error, 'No pupil found')
    if (gotNonResponse) return gotNonResponse
    const pupil = pupilsData.pupils[0]
    return (
      <WrappedComponent {...other} pupil={pupil} />
    )
  }

  WithPupilData.propTypes = {
    pupilVariables: PropTypes.object,
  }

  return WithPupilData
}

function WithSubjectData(WrappedComponent) {
  function WithSubjectData({ pupil, subjectVariables, ...other }) {
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, subjectVariables])
    const gotNonResponse = handleNonResponses(subjectData, error, 'Subject not found')
    if (gotNonResponse) return gotNonResponse
    const subject = subjectData.subjects[0]
    return (
      <WrappedComponent {...other} pupil={pupil} subject={subject} levelVariables={{ pupilId: pupil.id, subjectId: subject.id }} />
    )
  }

  WithSubjectData.propTypes = {
    pupil: PropTypes.object,
    subjectVariables: PropTypes.object
  }

  return WithSubjectData
}

function WithCurrentLevel(WrappedComponent) {
  return function WithCurrentLevel(props) {
    const [levelsData, error] = useStateOnce([getLevels, props.levelVariables])
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
  function WithModules({ getModulesBySubjectIdVariables, isAdmin, pupil, subject, ...other }) {
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
  WithParamVariables,
  WithSubjectData,
  WithModules,
  WithCompetencies,
  WithPupilData,
  WithCurrentLevel
}