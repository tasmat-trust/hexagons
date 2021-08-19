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

function WithPupilData(WrappedComponent) {
  function WithPupilData({ pupilVariables, subjectId, ...other }) {
    const [pupilsData, error] = useStateOnce([getPupilById, pupilVariables])
    const gotNonResponse = handleNonResponses(pupilsData, error, 'No pupil found')
    if (gotNonResponse) return gotNonResponse
    const pupil = pupilsData.pupils[0]
    return (
      <WrappedComponent 
      {...other} 
      subjectId={subjectId}
      pupil={pupil} 
      levelVariables={{ pupilId: pupil.id, subjectId: subjectId }} />
    )
  }

  WithPupilData.propTypes = {
    pupilVariables: PropTypes.object,
    subjectId: PropTypes.string
  }

  return WithPupilData
}

function WithCurrentLevel(WrappedComponent) {
  function WithCurrentLevel({levelVariables, ...other}) {
    const [levelsData, error] = useStateOnce([getLevels, levelVariables])
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
        {startingLevel && <WrappedComponent {...other} startingLevel={startingLevel} />}
        {!startingLevel && <WrappedComponent {...other} />}
      </>
    )
  }

  WithCurrentLevel.propTypes = {
    levelVariables: PropTypes.object
  }

  return WithCurrentLevel
}

function WithModules(WrappedComponent) {
  function WithModules({ getModulesBySubjectIdVariables, isAdmin, pupil, subjectId, ...other }) {
    const [modulesData, setModulesData, error] = useSharedState([getModules, getModulesBySubjectIdVariables])
    let modules = []
    if (modulesData) {
      modules = modulesData.modules
    }
    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent
          competenciesVars={{ pupilId: pupil.id, subjectId: subjectId }}
          setModulesData={setModulesData}
          modules={modules}
          pupil={pupil}
          isAdmin={isAdmin} 
          subjectId={subjectId}
          {...other} />}

        {isAdmin && <WrappedComponent
          setModulesData={setModulesData}
          modules={modules}
          upil={pupil}
          isAdmin={isAdmin} 
          {...other} />}
      </>
    )
  }
  WithModules.propTypes = {
    getModulesBySubjectIdVariables: PropTypes.object,
    isAdmin: PropTypes.bool,
    pupil: PropTypes.object,
    subjectId: PropTypes.string
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
  WithModules,
  WithCompetencies,
  WithPupilData,
  WithCurrentLevel
}