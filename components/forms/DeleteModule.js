import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import deleteModule from './handlers/deleteModule';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { useContext } from 'react';

function DeleteModule({ setModulesData, currentStage, testId, moduleTitle, setLoadingMessage }) {
  const { gqlClient } = useContext(HexagonsContext);

  async function handleForm(event) {
    event.preventDefault();
    const shouldDelete = confirm(
      'All existing capabilities associated with this module will be lost. Are you sure you wish to proceed?'
    );
    if (shouldDelete) {
      setLoadingMessage(`Deleting ${moduleTitle}`);
      await deleteModule(gqlClient, currentStage, () => {
        setModulesData();
        setLoadingMessage(false);
      });
    }
  }

  return (
    <form id={`new-module`} onSubmit={handleForm}>
      <FormControl margin="normal">
        <Button variant="outlined" color="error" data-test-id={testId} fullWidth type="submit">
          Delete {moduleTitle}
        </Button>
      </FormControl>
    </form>
  );
}

DeleteModule.propTypes = {
  setLoadingMessage: PropTypes.func,
  testId: PropTypes.string,
  setModulesData: PropTypes.func,
  currentStage: PropTypes.object,
};

export default DeleteModule;
