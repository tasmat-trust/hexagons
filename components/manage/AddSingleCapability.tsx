import React, { FunctionComponent } from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { AddNewCapability } from '../forms/AddNew';


type Props = {
  moduleId: number,
  setModulesData: any
};

const AddSingleCapability: FunctionComponent<Props> = ({ moduleId, setModulesData }) => {
  const [newCapabilityIsOpen, setNewCapabilityIsOpen] = useState(false);

  function handleShowHideNewCapability() {
    setNewCapabilityIsOpen(!newCapabilityIsOpen);
  }

  return (
    <>
      <Button
        variant="outlined"
        data-test-id="add-single-capability"
        onClick={handleShowHideNewCapability}
        aria-label="add new capability"
      >
        Add single capability
      </Button>

      {newCapabilityIsOpen && (
        <Dialog
          open={newCapabilityIsOpen} 
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <AddNewCapability
              moduleId={moduleId}
              successCallback={() => {
                setModulesData();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              data-test-id={`close-summary-popup`}
              onClick={handleShowHideNewCapability}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AddSingleCapability;
