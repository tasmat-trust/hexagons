import {
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { AddNewSummaryText } from '../forms/AddNew';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

function ManageSummary({ summaryText, moduleId, setModulesData }) {
  const [manageSummaryIsOpen, setManageSummaryIsOpen] = useState(false);

  function handleShowHideSummary() {
    setManageSummaryIsOpen(!manageSummaryIsOpen);
  }

  return (
    <>
      <div>
        <Card
          variant="outlined"
          style={{ margin: '1rem 0 2rem', width: '40rem', maxWidth: '90vw' }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" >
              Summary
            </Typography>
            <div
              style={{
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
              }}
            >
              {summaryText}
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              data-test-id="summary-edit"
              onClick={handleShowHideSummary}
              aria-label="edit"
              startIcon={<EditIcon />}
            >
              Edit summary
            </Button>
          </CardActions>
        </Card>
      </div>

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
