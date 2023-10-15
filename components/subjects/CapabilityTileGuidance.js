import { PropTypes } from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import { useState, useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import { AddNewGuidance } from '../forms/AddNew';
import { withStyles, makeStyles } from '@mui/styles';
import extractDate from '../../utils/extractDate';
import deleteGuidance from '../forms/handlers/deleteGuidance';

const TabsDialogContent = withStyles({
  root: {
    '&:first-child': {
      paddingTop: '0px',
    },
    padding: '0px',
  },
})(DialogContent);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  secondary: {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    display: 'block',
  },
  para: {
    maxWidth: '100%',
  },
}));

function CapabilityTileGuidance({
  guidance,
  guidanceIsOpen,
  setGuidanceIsOpen,
  capability,
  setCapability,
  setModulesData,
  ...other
}) {
  const { gqlClient, userId, role } = useContext(HexagonsContext);
  const [value, setValue] = useState(0);

  const classes = useStyles();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function handleClose() {
    setGuidanceIsOpen(false);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteGuidance = async (g) => {
    const deleteSuccess = await deleteGuidance(g.id, gqlClient);
    if (deleteSuccess.success) {
      setModulesData();
    } else {
      alert('There has been an error deleting, please refresh the page and try again');
    }
  };

  const gotGuidance = guidance.length > 0;

  return (
    <Dialog open={guidanceIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <TabsDialogContent>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {gotGuidance && (
              <Tab
                label="View guidance"
                aria-label="View existing guidance"
                data-test-id="view-guidance-tab"
                {...a11yProps(0)}
              />
            )}
            <Tab
              data-test-id="add-new-guidance-tab"
              label="Add new guidance"
              aria-label="Add new guidance"
              {...a11yProps(gotGuidance ? 1 : 0)}
            />
          </Tabs>
        </AppBar>

        {gotGuidance && (
          <TabPanel data-test-id="existing-guidance-panel" value={value} index={0}>
            <List className={classes.root}>
              {guidance.map((g, i) => {
                const created_at = extractDate(g.createdAt);
                const shouldShowDelete =
                  role === 'Leader' || parseInt(g.users_permissions_user.id) === parseInt(userId);
                let shortenedText = g.text.length > 16 ? g.text.slice(0, 15) : g.text;
                return (
                  <ListItem
                    sx={{
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #e8e8e8',
                      maxWidth: '100%',
                    }}
                    key={`guidance-${i}`}
                    alignItems="center"
                  >
                    <div>
                      <span
                        className={classes.para}
                        data-test-id={`guidance-${i}`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {g.text}
                      </span>

                      <span
                        className={classes.secondary}
                      >{`${g.users_permissions_user.username} - ${created_at}`}</span>
                    </div>
                    {shouldShowDelete && (
                      <IconButton
                        onClick={() => handleDeleteGuidance(g)}
                        color="error"
                        size="small"
                        title={`Delete ${shortenedText}...`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </TabPanel>
        )}
        <TabPanel value={value} index={gotGuidance ? 1 : 0}>
          <Box p={3}>
            <AddNewGuidance
              {...other} // capabilityId, userId
              successCallback={(formResult) => {
                // refresh capability
                const newCap = JSON.parse(JSON.stringify(capability));
                newCap.guidance.push(formResult.guidance.createGuidance);
                setTimeout(() => {
                  setCapability(newCap);
                }, 1000);
              }}
            />
          </Box>
        </TabPanel>
      </TabsDialogContent>
      <DialogActions>
        <Button data-test-id={`close-guidance-popup`} onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CapabilityTileGuidance.propTypes = {
  setGuidanceIsOpen: PropTypes.func,
  guidanceIsOpen: PropTypes.bool,
  guidance: PropTypes.array,
};

export default CapabilityTileGuidance;
