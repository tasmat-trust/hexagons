import { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

import { Button, ButtonBase } from '@material-ui/core';

import { PropTypes } from "prop-types";

function DialogButton({ startIcon, className, testId, variant, color, label, boxTitle, content, text, children, modelname, isHexagon, bubbleHandleClose, onClose }) {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose()
    }

  };

  bubbleHandleClose && bubbleHandleClose(handleClose)

  return (
    <>

      {!isHexagon && <Button
        variant={variant}
        color={color}
        className={className}

        startIcon={startIcon}
        data-test-id={testId}
        // startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        {label}
      </Button>}
      {isHexagon && <ButtonBase
        className={className}
        onClick={handleOpen}
        data-test-id={testId}
      >
        {content}
      </ButtonBase>}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >

        <DialogContent>
          {boxTitle && <Typography gutterBottom={true} id="form-dialog-title" variant="h2" component="h4">{boxTitle}</Typography>}
          <DialogContentText>
            {text}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button data-test-id={`close-${modelname}-popup`} onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog >
    </>
  );
}

DialogButton.propTypes = {
  onClose: PropTypes.func,
  testId: PropTypes.string,
  boxTitle: PropTypes.string, // title of box
  variant: PropTypes.string, // outlined / contained
  color: PropTypes.string, // primary / secondary
  className: PropTypes.string, // Buttonbase class name
  label: PropTypes.string, // Button label
  content: PropTypes.element, // Content to display inside hexagons
  text: PropTypes.string, // Text to appear above the content in the popup
  children: PropTypes.string, // Content to display in button
  modelname: PropTypes.string, // For test id
  isHexagon: PropTypes.bool, // Will this be appearing inside hexagon?
  bubbleHandleClose: PropTypes.func // function to call when it closes
}

export default DialogButton