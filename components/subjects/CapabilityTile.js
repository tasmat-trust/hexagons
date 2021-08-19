import { PropTypes } from 'prop-types';
import { stringStyles } from '../../styles/useHexagonsGrid';
import { ButtonBase } from '@material-ui/core';
import { useState, useEffect } from 'react';
import createCompetency from '../forms/handlers/createCompetency';
import createLevel from '../forms/handlers/createLevel';
import useTileStyles from '../../styles/useTileStyles';
import CapabilityTileContent from './CapabilityTileContent';

function CapabilityTile(props) {
  const styles = stringStyles();
  const {
    capability,
    isAdmin,
    competency,
    setCompetencies,
    gqlClient,
    currentModule,
    gotCurrentLevel,
    setGotCurrentLevel,
    subjectId,
    pupil,
    setCurrentLevel,
    currentLevelId,
    setTilesDisabled,
  } = props;

  const [isComplete, setIsComplete] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [competencyStatus, setCompetencyStatus] = useState(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const tileStyles = useTileStyles();

  useEffect(() => {
    let initialIsIncomplete = !competency;
    const initialIsComplete = competency && competency.status === 'complete';
    const initialIsTarget = competency && competency.status === 'target';
    initialIsIncomplete = competency && competency.status === 'incomplete';
    setIsComplete(initialIsComplete);
    setIsTarget(initialIsTarget);
    setIsIncomplete(initialIsIncomplete);
    competency && competency.status && setCompetencyStatus(competency.status);
  }, [competency, competencyStatus]);

  function handleUpdate() {
    // Disable button and update colour
    setButtonIsDisabled(true);
    let status = isComplete ? 'target' : isTarget ? 'incomplete' : 'complete';
    setCompetencyStatus(status); // Optimistic update
    let levelId = currentLevelId;
    handleStatus(levelId, status);
  }

  async function handleStatus(levelId, status) {
    if (!gotCurrentLevel && !currentLevelId) {
      setTilesDisabled(true);
      const variables = {
        status: 'incomplete',
        subjectId: subjectId,
        pupilId: pupil.id,
        moduleId: currentModule.id,
      };
      const level = await createLevel(gqlClient, variables);
      if (!level) {
        return;
      }
      levelId = level.id;
      setGotCurrentLevel(true);
      setCurrentLevel(level);
    }

    if (status === 'complete') {
      setIsComplete(true);
      setIsTarget(false);
      setIsIncomplete(false);
    } else if (status === 'incomplete') {
      setIsIncomplete(true);
      setIsComplete(false);
      setIsTarget(false);
    } else if (status === 'target') {
      setIsTarget(true);
      setIsIncomplete(false);
      setIsComplete(false);
    }

    const competencyVars = {
      subjectId: subjectId,
      pupilId: pupil.id,
      status: status,
      adaptation: '',
      capability_fk: parseInt(capability.id),
      capability_text: capability.text,
    };

    const checkCompetencyVars = {
      capability_fk: parseInt(capability.id),
      pupilId: props.pupil.id,
    };

    const updateCompetencyVars = {
      status: status,
      adaptation: '',
    };

    const refreshCompetencyVars = {
      pupilId: props.pupil.id,
      subjectId: props.subjectId,
    };

    if (levelId) {
      competencyVars.levelId = levelId;
      refreshCompetencyVars.levelId = levelId;
      const finished = await createCompetency(
        gqlClient,
        competencyVars,
        checkCompetencyVars,
        refreshCompetencyVars,
        updateCompetencyVars,
        setCompetencies
      );
      if (finished) {
        setButtonIsDisabled(false); // sometimes get no op unmounted component warning
        setTilesDisabled(false);
      }
    }
  }

  return (
    <div className={`${styles.hex} ${styles[`hex_${competencyStatus}`]}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          {isAdmin && (
            <CapabilityTileContent
              text={capability.text}
              className={`${styles.hexContent_inner}`}
            />
          )}
          {!isAdmin && (
            <>
              <div
                className={`${tileStyles.buttonBlocker} ${
                  tileStyles[`buttonBlocker_${buttonIsDisabled ? 'visible' : 'hidden'}`]
                }`}
              ></div>
              <ButtonBase className={styles.button} onClick={() => handleUpdate()}>
                <CapabilityTileContent
                  text={capability.text}
                  className={`${styles.hexContent_inner}`}
                />
              </ButtonBase>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

CapabilityTile.propTypes = {
  capability: PropTypes.object,
  isAdmin: PropTypes.bool,
  competency: PropTypes.object,
  setCompetencies: PropTypes.func,
  gqlClient: PropTypes.object,
  currentModule: PropTypes.object,
  gotCurrentLevel: PropTypes.bool,
  setGotCurrentLevel: PropTypes.func,
  subjectId: PropTypes.string,
  pupil: PropTypes.object,
  setCurrentLevel: PropTypes.func,
  currentLevelId: PropTypes.number,
  setTilesDisabled: PropTypes.func,
};

export default CapabilityTile;
