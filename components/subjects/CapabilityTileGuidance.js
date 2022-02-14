import { PropTypes } from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { AddNewGuidance } from '../forms/AddNew';
import { withStyles, makeStyles } from '@mui/styles';
import extractDate from '../../utils/extractDate';

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
}));

function CapabilityTileGuidance({
  guidance,
  guidanceIsOpen,
  setGuidanceIsOpen,
  capability,
  setCapability,
  ...other
}) {
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
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
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

  const gotGuidance = guidance.length > 0;

  return (
    <Dialog open={guidanceIsOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <TabsDialogContent>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} textColor="inherit" 
  indicatorColor="secondary">
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
                const created_at = extractDate(g.created_at);
                return (
                  <ListItem key={`guidance-${i}`} alignItems="flexStart">
                    <ListItemText
                      data-test-id={`guidance-${i}`}
                      primary={g.text}
                      secondary={`${g.users_permissions_user.username} - ${created_at}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </TabPanel>
        )}
        <TabPanel value={value} index={gotGuidance ? 1 : 0}>
          <AddNewGuidance
            {...other} // capabilityId, userId
            successCallback={(formResult) => {
              // refresh capability
              const newCap = JSON.parse(JSON.stringify(capability));
              newCap.guidance.push(formResult.guidance.createGuidance.guidance);
              setTimeout(() => {
                setCapability(newCap);
              }, 1000);
            }}
          />
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
