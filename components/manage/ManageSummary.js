import { Button, ButtonBase } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { AddNewSummaryText } from '../forms/AddNew';
import { useState } from 'react';

function ManageSummary({ summaryText, moduleId, setModulesData }) {
  const [manageSummaryIsOpen, setManageSummaryIsOpen] = useState(false);

  function handleShowHideSummary() {
    setManageSummaryIsOpen(!manageSummaryIsOpen);
  }

  return (
    <>
      <h3>Summary:</h3>
      <ButtonBase onClick={handleShowHideSummary} title="edit">
        <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', textAlign: 'left', width: '40rem', maxWidth: '90vw', marginBottom: '2rem' }}>{summaryText}</div>
      </ButtonBase>
      {manageSummaryIsOpen && (
        <Dialog
          open={manageSummaryIsOpen}
          onClose={handleShowHideSummary}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <AddNewSummaryText
              moduleId={moduleId}
              summaryText={summaryText}
              successCallback={() => {
                setModulesData();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              data-test-id={`close-summary-popup`}
              onClick={handleShowHideSummary}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ManageSummary;
