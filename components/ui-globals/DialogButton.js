import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';

import { Button, ButtonBase } from '@mui/material';

import { PropTypes } from 'prop-types';

function DialogButton({
  startIcon,
  title,
  className,
  testId,
  variant,
  color,
  label,
  boxTitle,
  content,
  text,
  children,
  modelname,
  isHexagon,
  bubbleHandleClose,
  onClose,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  bubbleHandleClose && bubbleHandleClose(handleClose);

  return (
    <>
      {!isHexagon && (
        <Button
          variant={variant}
          color={color}
          className={className}
          title={title}
          startIcon={startIcon}
          data-test-id={testId}
          // startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          {label}
        </Button>
      )}
      {isHexagon && (
        <ButtonBase className={className} onClick={handleOpen} data-test-id={testId} title={title}>
          {content}
        </ButtonBase>
      )}

      <Dialog
        data-test-id={`${testId}-popup`}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {boxTitle && (
            <Typography gutterBottom={true} id="form-dialog-title" variant="h2" component="h4">
              {boxTitle}
            </Typography>
          )}
          <DialogContentText>{text}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            title={`Close ${modelname} popup`}
            data-test-id={`close-${modelname}-popup`}
            onClick={handleClose}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
  children: PropTypes.object, // Content to display in button
  modelname: PropTypes.string, // For test id
  isHexagon: PropTypes.bool, // Will this be appearing inside hexagon?
  bubbleHandleClose: PropTypes.func, // function to call when it closes
};

export default DialogButton;
