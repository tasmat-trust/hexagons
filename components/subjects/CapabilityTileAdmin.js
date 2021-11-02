import { PropTypes } from 'prop-types';
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid';
import CapabilityTileContent from './CapabilityTileContent';
import { ButtonBase, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { AddNewCapabilityText } from '../forms/AddNew';
import { useState } from 'react';

function CapabilityTile(props) {
  const styles = stringStyles();
  const jStyles = jssStyles()

  const [manageCapabilityIsOpen, setManageCapabilityIsOpen] = useState(false)

  const {
    capability,
    setModulesData
  } = props;


  function handleShowHideCapability() {
    setManageCapabilityIsOpen(!manageCapabilityIsOpen)
  }




  return (
    <div className={`${styles.hex}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          <ButtonBase
            className={`${styles.button} ${jStyles.button}`}
            onClick={handleShowHideCapability}
            title='edit'
          >
            <CapabilityTileContent
              text={capability.text}
              className={`${styles.hexContent_inner}`}
            />
          </ButtonBase>
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
                    setModulesData()
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button data-test-id={`close-guidance-popup`} onClick={handleShowHideCapability} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog >
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
