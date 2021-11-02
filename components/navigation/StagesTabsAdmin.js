import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import AddCapabilities from '../forms/AddCapabilities'
import CapabilityTilesAdmin from '../subjects/CapabilityTilesAdmin'
import DeleteModule from '../forms/DeleteModule'
import WithModulesAdmin from '../data-fetching/WithModulesAdmin'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import { sortModules } from '../../utils/sortLevelsAndModules'
 
import { HexagonsTabs, HexagonsTab } from '../HexagonsTabs'

import CustomSuspense from '../data-fetching/CustomSuspense'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function StagesTabsAdmin({ modules,
  setModulesData,
  subjectId }) {
  const [tabValue, setTabValue] = useState(0);
  const [sortedModules, setSortedModules] = useState(modules)

  useEffect(() => {
    if (modules) {
      const sortedModules = sortModules(modules)
      setSortedModules(sortedModules)
    }
  }, [modules])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);  
  };


  return (
    <>
      <AddCapabilities
        setModulesData={setModulesData}
        subjectId={subjectId} />
      <CustomSuspense message="Loading tabs">

        <HexagonsTabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sortedModules.map((module, i) => (
            <HexagonsTab
              key={`link-${i}`}
              label={`${module.level === 'step' ? 'Step' : 'Stage'} ${module.order}`}
              {...a11yProps(0)} />
          ))}
        </HexagonsTabs>
      </CustomSuspense>

      {sortedModules.map((module, i) => (
        <TabPanel key={`panel-${i}`} value={tabValue} index={i}>
          <DeleteModule
            setModulesData={setModulesData}
            currentStage={module}
            subjectId={subjectId}
          />
          <CustomSuspense message="Loading tiles">
            <CapabilityTilesAdmin
              setModulesData={setModulesData}
              subjectId={subjectId}
              capabilities={module.capabilities}
              currentModule={module}
            />
          </CustomSuspense>
        </TabPanel>
      ))}
    </>
  )
}

StagesTabsAdmin.propTypes = {
  modules: PropTypes.array,
  startingLevel: PropTypes.object,
  setModulesData: PropTypes.func,
  competencies: PropTypes.array,
  subjectId: PropTypes.string
}

export default WithSingleSubjectFromSlug(WithModulesAdmin(StagesTabsAdmin))
