import PropTypes from 'prop-types';
import WithCompetencies from '../data-fetching/WithCompetencies';
import CustomSuspense from '../data-fetching/CustomSuspense';
import LevelStatus from './LevelStatus';
import CapabilityTiles from '../subjects/CapabilityTiles';
import { useState, useEffect } from 'react';

function LevelContent({
  pupil,
  initialCompetencies,
  edSubjectId,
  subjectId,
  levelId,
  setLevelId,
  currentModule,
  user,
  levelTitle,
  ...other
}) {
  const [competencies, setCompetencies] = useState(initialCompetencies);
  const [isAssessing, setIsAssessing] = useState(false);

  useEffect(() => {
    // Set the overlays to appear once loaded
    if (initialCompetencies) {
      setCompetencies(initialCompetencies);
    }
  }, [initialCompetencies]);

  return (
    <>
      <CustomSuspense message="Loading status">
        <LevelStatus
          isAssessing={isAssessing}
          setIsAssessing={setIsAssessing}
          levelId={levelId}
          levelTitle={levelTitle}
          setLevelId={setLevelId}
          currentModule={currentModule}
          pupil={pupil}
          competencies={competencies}
          subjectId={subjectId}
          edSubjectId={edSubjectId}
          getLevelVars={{
            pupilId: parseInt(pupil.id),
            subjectId: currentModule.isTransition ? edSubjectId : subjectId,
            moduleId: parseInt(currentModule.id),
          }}
          {...other}
        />
      </CustomSuspense>
      <CustomSuspense message="Loading tiles">
        <CapabilityTiles
          isAssessing={isAssessing}
          setIsAssessing={setIsAssessing}
          userId={user.id}
          pupil={pupil}
          capabilities={currentModule.capabilities}
          competencies={competencies}
          setCompetencies={setCompetencies}
          currentModule={currentModule}
          levelId={levelId}
          setLevelId={setLevelId}
          subjectId={subjectId}
          edSubjectId={edSubjectId}
          {...other}
        />
      </CustomSuspense>
    </>
  );
}

LevelContent.propTypes = {
  isTransition: PropTypes.bool,
  pupil: PropTypes.object,
  initialCompetencies: PropTypes.array,
  subjectId: PropTypes.number,
  module: PropTypes.object,
  levelId: PropTypes.number,
  levelTitle: PropTypes.string,
  setLevelId: PropTypes.func,
};

export default WithCompetencies(LevelContent);
