import { PropTypes } from 'prop-types';
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid';
import CapabilityTileContent from './CapabilityTileContent';
import { IconButton, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { AddNewCapabilityText } from '../forms/AddNew';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
function CapabilityTile(props) {
  const styles = stringStyles();
  const jStyles = jssStyles();

  const [manageCapabilityIsOpen, setManageCapabilityIsOpen] = useState(false);

  const { capability, setModulesData } = props;

  function handleShowHideCapability() {
    setManageCapabilityIsOpen(!manageCapabilityIsOpen);
  }

  return (
    <div className={`${styles.hex}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          <CapabilityTileContent text={capability.text} className={`${styles.hexContent_inner}`} />
          <IconButton
            data-test-id={`edit-${props.hexId}`}
            className={`${styles.tileInfo}`}
            onClick={handleShowHideCapability}
            aria-label="Edit capability"
            size="large">
            <EditIcon />
          </IconButton>
          {manageCapabilityIsOpen && (
            <Dialog
              open={manageCapabilityIsOpen}
              onClose={handleShowHideCapability}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <AddNewCapabilityText
                  {...props}
                  successCallback={() => {
                    setModulesData();
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  data-test-id={`close-guidance-popup`}
                  onClick={handleShowHideCapability}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

CapabilityTile.propTypes = {
  setModulesData: PropTypes.func,
  capability: PropTypes.object,
};

export default CapabilityTile;
