import { PropTypes } from 'prop-types';
import { stringStyles } from '../../styles/useHexagonsGrid';
import { ButtonBase } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import createCompetency from '../forms/handlers/createCompetency';
import createLevel from '../forms/handlers/createLevel';
import useTileStyles from '../../styles/useTileStyles';
import CapabilityTileContent from './CapabilityTileContent';
import CapabilityTileGuidance from './CapabilityTileGuidance'
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import Image from 'next/image'

function CapabilityTile(props) {
  const styles = stringStyles();
  const {
    guidanceActive,
    hexId,
    initialCapability,
    competency,
    setCompetencies,
    currentModule,
    gotCurrentLevel,
    setGotCurrentLevel,
    subjectId,
    pupil,
    currentLevelId,
    setTilesDisabled,
    ...other
  } = props;
  const { gqlClient } = useContext(HexagonsContext)
  const [isComplete, setIsComplete] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [competencyStatus, setCompetencyStatus] = useState(null);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [guidanceIsOpen, setGuidanceIsOpen] = useState(false)
  const [capability, setCapability] = useState(initialCapability)
  const tileStyles = useTileStyles();

  useEffect(() => {
    if (initialCapability) {
      setCapability(initialCapability)
    }
  }, [initialCapability, setCapability])


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
    if (!guidanceActive) {
      // Disable button and update colour
      setButtonIsDisabled(true);
      let status = isComplete ? 'target' : isTarget ? 'incomplete' : 'complete';
      setCompetencyStatus(status); // Optimistic update
      let levelId = currentLevelId;
      handleStatus(levelId, status);
    } else {
      setGuidanceIsOpen(true)
    }

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
          <>
            <div
              className={`${tileStyles.buttonBlocker} ${tileStyles[`buttonBlocker_${buttonIsDisabled ? 'visible' : 'hidden'}`]
                }`}
            ></div>
            <ButtonBase data-test-id={hexId} className={styles.button} onClick={() => handleUpdate()}>
              {capability.guidance.length > 0 && (
                <div className={styles.lightbulb}>
                  <Image src="/lightbulb.svg" alt="Lightbulb icon" width="40px" height="40px" />
                </div>
              )}
              <CapabilityTileContent
                text={capability.text}
                className={`${styles.hexContent_inner}`}
              />

            </ButtonBase>
            {guidanceIsOpen && <CapabilityTileGuidance
              {...other}
              capability={capability}
              setCapability={setCapability}
              capabilityId={capability.id}
              guidanceIsOpen={guidanceIsOpen}
              setGuidanceIsOpen={setGuidanceIsOpen}
              guidance={capability.guidance}
            />}
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
  gotCurrentLevel: PropTypes.bool,
  setGotCurrentLevel: PropTypes.func,
  subjectId: PropTypes.string,
  pupil: PropTypes.object,
  currentLevelId: PropTypes.number,
  setTilesDisabled: PropTypes.func,
};

export default CapabilityTile;
