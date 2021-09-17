import { PropTypes } from 'prop-types';
import { stringStyles } from '../../styles/useHexagonsGrid';
import CapabilityTileContent from './CapabilityTileContent';

function CapabilityTile(props) {
  const styles = stringStyles();
  const {
    capability
  } = props;


  return (
    <div className={`${styles.hex}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          <CapabilityTileContent
            text={capability.text}
            className={`${styles.hexContent_inner}`}
          />
        </div>
      </div>
    </div>
  );
}

CapabilityTile.propTypes = {
  capability: PropTypes.object,
};

export default CapabilityTile;
