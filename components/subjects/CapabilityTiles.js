import { PropTypes } from 'prop-types';
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import useTileStyles from '../../styles/useTileStyles';
import CapabilityTile from './CapabilityTile';

function CapabilityTiles({ capabilities, competencies, ...other }) {
  const styles = stringStyles();
  const pseudoStyles = jssStyles();
  const [tilesDisabled, setTilesDisabled] = useState(false);
  const tileStyles = useTileStyles();
  return (
    <>
      <Box className={styles.wrapper}>
        <div
          className={`${tileStyles.buttonBlocker} ${
            tileStyles[`buttonBlocker_${tilesDisabled ? 'visible' : 'hidden'}`]
          }`}
        ></div>
        <div className={`${styles.main}  ${pseudoStyles.main}`}>
          <div
            role="region"
            aria-live="polite"
            className={`${styles.container}  ${pseudoStyles.container}`}
          >
            {capabilities.map((capability, i) => {
              const gotC =
                competencies &&
                competencies.map((competency) =>
                  parseInt(capability.id) === competency.capability_fk ? competency : null
                );
              const capabilities = gotC && gotC.filter((competency) => competency !== null);
              const competency = capabilities ? capabilities[0] : null;
              return (
                <CapabilityTile
                  {...other}
                  hexId={`hex-${i + 1}`}
                  setTilesDisabled={setTilesDisabled}
                  key={`capability-${i}`}
                  initialCapability={capability}
                  competency={competency}
                />
              );
            })}
          </div>
        </div>
      </Box>
    </>
  );
}

CapabilityTiles.propTypes = {
  capabilities: PropTypes.array,
  competencies: PropTypes.array,
};

export default CapabilityTiles;
