import { PropTypes } from 'prop-types';
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid';
import { ButtonBase } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import createCompetency from '../forms/handlers/createCompetency';
import createLevel from '../forms/handlers/createLevel';
import useTileStyles from '../../styles/useTileStyles';
import CapabilityTileContent from './CapabilityTileContent';
import CapabilityTileGuidance from './CapabilityTileGuidance';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import Image from 'next/image';

import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Loading from '../ui-globals/Loading';

function CapabilityTile(props) {
  const styles = stringStyles();
  const jStyles = jssStyles();
  const {
    guidanceActive,
    hexId,
    initialCapability,
    competency,
    setCompetencies,
    currentModule,
    pupil,
    setTilesDisabled,
    subjectId,
    levelId,
    setLevelId,
    edSubjectId,
    ...other
  } = props;
  const { gqlClient } = useContext(HexagonsContext);
  const [isComplete, setIsComplete] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [competencyStatus, setCompetencyStatus] = useState('incomplete');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [guidanceIsOpen, setGuidanceIsOpen] = useState(false);
  const [capability, setCapability] = useState(initialCapability);
  const tileStyles = useTileStyles();

  useEffect(() => {
    if (initialCapability) {
      setCapability(initialCapability);
    }
  }, [initialCapability, setCapability]);

  useEffect(() => {
    let initialIsIncomplete = !competency;
    const initialIsComplete = competency && competency.status === 'complete';
    const initialIsTarget = competency && competency.status === 'target';
    initialIsIncomplete = competency && competency.status === 'incomplete';
    setIsComplete(initialIsComplete);
    setIsTarget(initialIsTarget);
    competency && competency.status && setCompetencyStatus(competency.status);
    !competency && setCompetencyStatus('incomplete');
  }, [competency, competencyStatus]);

  function handleUpdate() {
    if (!guidanceActive) {
      // Disable button and update colour
      setButtonIsDisabled(true);
      let status = isComplete ? 'target' : isTarget ? 'incomplete' : 'complete';
      setCompetencyStatus(status); // Optimistic update
      handleStatus(status);
    } else {
      setGuidanceIsOpen(true);
    }
  }

  async function handleStatus(status) {
    let levelIdToUpdate;
    const pupilId = parseInt(pupil.id);
    const capabilityId = parseInt(capability.id);
    if (!levelId || levelId === 0) {
      setTilesDisabled(true);
      const variables = {
        status: 'incomplete',
        pupilId: pupilId,
        subjectId: currentModule.isEd ? edSubjectId : subjectId,
        moduleId: parseInt(currentModule.id),
      };
      const level = await createLevel(gqlClient, variables);
      if (!level) {
        return;
      }
      levelIdToUpdate = parseInt(level.id);
      setLevelId(levelIdToUpdate);
    } else {
      levelIdToUpdate = levelId;
    }

    if (status === 'complete') {
      setIsComplete(true);
      setIsTarget(false);
    } else if (status === 'incomplete') {
      setIsComplete(false);
      setIsTarget(false);
    } else if (status === 'target') {
      setIsTarget(true);
      setIsComplete(false);
    }

    const competencyVars = {
      pupilId: pupilId,
      status: status,
      adaptation: '',
      capability_fk: capabilityId,
      capability_text: capability.text,
    };

    const checkCompetencyVars = {
      levelId: levelIdToUpdate,
      capability_fk: capabilityId,
      pupilId: pupilId,
    };

    const updateCompetencyVars = {
      status: status,
      adaptation: '',
    };

    const refreshCompetencyVars = {
      pupilId: pupilId,
    };

    if (levelIdToUpdate) {
      competencyVars.levelId = levelIdToUpdate;
      refreshCompetencyVars.levelId = levelIdToUpdate;
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

  let buttonTitle = 'Set as complete';
  if (competencyStatus === 'target') buttonTitle = 'Set as incomplete';
  if (competencyStatus === 'complete') buttonTitle = 'Set as target';

  return (
    <div
      data-test-id={`${hexId}-${competencyStatus}`}
      className={`${styles.hex} ${jStyles.hex} ${styles[`hex_${competencyStatus}`]}`}
    >
      <div className={`${styles.hexIn}`}>
        <div
          role="region"
          aria-live="polite"
          className={`${styles.hexContent} ${jStyles.hexContent}`}
        >
          <>
            <div
              className={`${tileStyles.buttonBlocker} ${
                tileStyles[`buttonBlocker_${buttonIsDisabled ? 'visible' : 'hidden'}`]
              }`}
            ></div>
            <ButtonBase
              aria-busy={buttonIsDisabled ? true : false}
              data-test-id={hexId}
              className={`${styles.button} ${jStyles.button}`}
              onClick={() => handleUpdate()}
              title={buttonTitle}
            >
              {capability.guidance.length > 0 && (
                <div
                  data-test-id={`guidance-lightbulb-${hexId}`}
                  className={`${styles.lightbulb} ${
                    guidanceActive ? styles.lightbulbOn : styles.lightbulbOff
                  }`}
                >
                  <Image src="/lightbulb.svg" alt="Lightbulb icon" width="40px" height="40px" />
                </div>
              )}
              <CapabilityTileContent
                text={capability.text}
                className={`${styles.hexContent_inner}`}
              />
              <div
                visibility="hidden"
                style={{ display: 'none' }}
                id={`#tile-info-${hexId}`}
                aria-hidden="true"
              ></div>
              <div
                className={`${styles.tileInfo} ${
                  guidanceActive ? styles.lightbulbOff : styles.lightbulbOn
                }`}
              >
                {buttonIsDisabled && <Loading textOnly={true} message="Saving" />}
                {competencyStatus === 'target' && !buttonIsDisabled && (
                  <TrackChangesIcon titleAccess="Is current target" role="img" />
                )}
                {competencyStatus === 'complete' && !buttonIsDisabled && (
                  <CheckCircleIcon titleAccess="Is complete" role="img" />
                )}
              </div>
              <div aria-hidden="true" className="buttonFocusVisible"></div>
            </ButtonBase>
            {guidanceIsOpen && (
              <CapabilityTileGuidance
                {...other}
                capability={capability}
                setCapability={setCapability}
                capabilityId={capability.id}
                guidanceIsOpen={guidanceIsOpen}
                setGuidanceIsOpen={setGuidanceIsOpen}
                guidance={capability.guidance}
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
}

CapabilityTile.propTypes = {
  guidanceActive: PropTypes.bool,
  hexId: PropTypes.string,
  capability: PropTypes.object,
  competency: PropTypes.object,
  setCompetencies: PropTypes.func,
  currentModule: PropTypes.object,
  pupil: PropTypes.object,
  levelId: PropTypes.number,
  setLevelId: PropTypes.func,
  setTilesDisabled: PropTypes.func,
  subjectId: PropTypes.number,
  edSubjectId: PropTypes.number,
};

export default CapabilityTile;
