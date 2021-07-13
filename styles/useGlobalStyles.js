import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      "overflow-x": "hidden"
    }
  }
}));

export default useGlobalStyles
