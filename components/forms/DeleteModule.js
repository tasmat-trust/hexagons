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
    setLoadingMessage(`Deleting ${moduleTitle}`);
    await deleteModule(gqlClient, currentStage, () => {
      setModulesData();
      setLoadingMessage(false);
    });
  }

  return (
    <form id={`new-module`} onSubmit={handleForm}>
      <FormControl margin="normal">
        <Button data-test-id={testId} fullWidth type="submit" variant="contained" color="primary">
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
