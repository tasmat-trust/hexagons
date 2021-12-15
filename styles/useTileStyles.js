import makeStyles from '@mui/styles/makeStyles';

const useTileStyles = makeStyles(() => ({
  buttonBlocker: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'transparent',
    zIndex: '100',
    cursor: 'wait'
  },
  buttonBlocker_visible: {
    display: 'block'
  },
  buttonBlocker_hidden: {
    display: 'none'
  }
}))

export default useTileStyles