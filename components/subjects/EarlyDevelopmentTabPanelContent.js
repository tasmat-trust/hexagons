import PropTypes from 'prop-types'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import WithModules from '../data-fetching/WithModules'
import WithCompetencies from '../data-fetching/WithCompetencies'
import LevelStatus from '../pupil/LevelStatus'
import CapabilityTiles from './CapabilityTiles'
import { useState, useEffect } from 'react'
import CustomSuspense from '../data-fetching/CustomSuspense'

function EarlyDevelopmentTabPanelContent({ pupil, modules, initialCompetencies, subjectId, ...other }) {
  const [competencies, setCompetencies] = useState(initialCompetencies)
  useEffect(() => { // Set the overlays to appear once loaded
    if (initialCompetencies) {
      setCompetencies(initialCompetencies)
    }
  }, [initialCompetencies, setCompetencies])
  return (
    <>

      <LevelStatus
        currentModule={modules[0]}
        competencies={competencies}
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
