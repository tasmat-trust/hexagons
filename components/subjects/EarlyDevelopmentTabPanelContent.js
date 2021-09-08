import PropTypes from 'prop-types'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import WithModules from '../data-fetching/WithModules'
import WithCompetencies from '../data-fetching/WithCompetencies'
import LevelStatus from '../pupil/LevelStatus'
import CapabilityTiles from './CapabilityTiles'
import { useState, useEffect } from 'react'

function EarlyDevelopmentTabPanelContent({ pupil, modules, competenciesData, subjectId, ...other }) {
  const [competencies, setCompetencies] = useState(competenciesData)
  useEffect(() => { // Set the overlays to appear once loaded
    if (competenciesData) {
      setCompetencies(competenciesData)
    }
  }, [competenciesData])
  return (
    <>
      <LevelStatus
        currentModule={modules[0]}
        allCompetencies={competencies}
        subjectId={subjectId}
        getLevelVars={{ pupilId: pupil.id, subjectId: subjectId, moduleId: modules[0].id }}
        {...other}
      />
      <CapabilityTiles
        subjectId={subjectId}
        pupil={pupil}
        competencies={competencies}
        capabilities={modules[0].capabilities}
        currentModule={modules[0]}
        setCompetencies={setCompetencies}
        {...other}

      />
    </>
  )
}

EarlyDevelopmentTabPanelContent.propTypes = {
  pupil: PropTypes.object,
  modules: PropTypes.array,
  competencies: PropTypes.array,
  subjectId: PropTypes.string
}

export default WithSingleSubjectFromSlug(WithModules(WithCompetencies(EarlyDevelopmentTabPanelContent)))
