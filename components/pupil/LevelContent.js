import PropTypes from 'prop-types'
import WithCompetencies from '../data-fetching/WithCompetencies'
import CustomSuspense from '../data-fetching/CustomSuspense'
import LevelStatus from './LevelStatus'
import CapabilityTiles from '../subjects/CapabilityTiles'
import { useState, useEffect } from 'react'

function LevelContent({
  pupil,
  initialCompetencies,
  edSubjectId,
  subjectId,
  setGotCurrentLevel,
  gotCurrentLevel,
  setCurrentLevelId,
  currentLevelId,
  currentModule,
  setGuidanceActive,
  guidanceActive,
  user
}) {

  const [competencies, setCompetencies] = useState(initialCompetencies)



  useEffect(() => { // Set the overlays to appear once loaded
    if (initialCompetencies) {
      setCompetencies(initialCompetencies)
    }
  }, [initialCompetencies])

  return (
    <>
      <CustomSuspense message="Loading status">
        <LevelStatus
          setGotCurrentLevel={setGotCurrentLevel}
          setGlobalGuidanceActive={setGuidanceActive}
          setCurrentLevelId={setCurrentLevelId}
          currentModule={currentModule}
          pupil={pupil}
          competencies={competencies}
          subjectId={subjectId}
          edSubjectId={edSubjectId}
          getLevelVars={{ pupilId: pupil.id, subjectId: currentModule.isEd ? edSubjectId : subjectId, moduleId: currentModule.id }}
          setGuidanceActive={setGuidanceActive}
        />
      </CustomSuspense>
      <CustomSuspense message="Loading tiles">
        <CapabilityTiles
          userId={user.id}
          guidanceActive={guidanceActive}
          pupil={pupil}
          capabilities={currentModule.capabilities}
          competencies={competencies}
          setCompetencies={setCompetencies}
          currentModule={currentModule}
          gotCurrentLevel={gotCurrentLevel}
          setGotCurrentLevel={setGotCurrentLevel}
          currentLevelId={currentLevelId}
          subjectId={subjectId}
          edSubjectId={edSubjectId}
        />
      </CustomSuspense>
    </>
  )
}

LevelContent.propTypes = {
  isEd: PropTypes.bool,
  pupil: PropTypes.object,
  initialCompetencies: PropTypes.array,
  subjectId: PropTypes.number,
  setGotCurrentLevel: PropTypes.func,
  gotCurrentLevel: PropTypes.bool,
  setCurrentLevelId: PropTypes.func,
  currentLevelId: PropTypes.number,
  module: PropTypes.object,
  setGuidanceActive: PropTypes.func,
  guidanceActive: PropTypes.bool
}

export default WithCompetencies(LevelContent)