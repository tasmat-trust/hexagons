import { PropTypes } from "prop-types"
import { Dialog, DialogContent, DialogActions, Button } from "@material-ui/core"
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core"
import { useState } from "react"
import { AddNewGuidance } from "../forms/AddNew"
import { withStyles } from "@material-ui/styles"

const TabsDialogContent = withStyles({
  root: {
    '&:first-child': {
      paddingTop: '0px'
    },
    padding: '0px'
  }
})(DialogContent)


function CapabilityTileGuidance({
  guidance,
  guidanceIsOpen,
  setGuidanceIsOpen,
  capability,
  setCapability,
  ...other }) {

  const [value, setValue] = useState(0)

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
    setGuidanceIsOpen(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gotGuidance = guidance.length > 0

  return (
    <Dialog
      open={guidanceIsOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <TabsDialogContent>


        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {gotGuidance && <Tab label="Guidance" {...a11yProps(0)} />}
            <Tab label="Add new" {...a11yProps(gotGuidance ? 1 : 0)} />
          </Tabs>
        </AppBar>

        {gotGuidance && <TabPanel value={value} index={0}>
          {guidance.map((g, i) => <p key={`guidance-${i}`}>{g.text}</p>)}
        </TabPanel>}
        <TabPanel value={value} index={gotGuidance ? 1 : 0}>
          <AddNewGuidance
            {...other} // capabilityId
            successCallback={(formResult) => {
              // refresh capability
              const newCap = JSON.parse(JSON.stringify(capability))
              newCap.guidance.push(formResult.guidance.createGuidance.guidance)
              setTimeout(() => {
                setCapability(newCap)
              }, 1000)
              
            }}
          />
        </TabPanel>




      </TabsDialogContent>
      <DialogActions>
        <Button data-test-id={`guidance-popup`} onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog >
  )
}

CapabilityTileGuidance.propTypes = {
  setGuidanceIsOpen: PropTypes.func,
  guidanceIsOpen: PropTypes.bool,
  guidance: PropTypes.array
}

export default CapabilityTileGuidance
