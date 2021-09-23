import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import LevelContent from '../pupil/LevelContent'
import { sortModules } from '../../utils/sortLevelsAndModules'
import CustomSuspense from '../data-fetching/CustomSuspense'

import { HexagonsTabs, HexagonsTab } from '../HexagonsTabs'

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

function StagesTabs({
  modules,
  startingLevel,
  pupil,
  ...other }) {
  const [tabValue, setTabValue] = useState(0);

  const [gotCurrentLevel, setGotCurrentLevel] = useState(startingLevel ? true : false) // boolean - have we got a current level
  const [currentLevelId, setCurrentLevelId] = useState(startingLevel ? startingLevel.id : 0)
  const [sortedModules, setSortedModules] = useState(modules)
  const [guidanceActive, setGuidanceActive] = useState(false)


  useEffect(() => {
    if (modules) {
      const sortedModules = sortModules(modules)
      setSortedModules(sortedModules)
    }
  }, [modules])

  useEffect(() => {
    if (modules && startingLevel && startingLevel.module) {
      const activeModule = modules.map((module, i) => module.order === startingLevel.module.order && module.level === startingLevel.module.level)
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setTabValue(startingIndex)
      setCurrentLevelId(startingLevel.id)
      setGotCurrentLevel(true)
    } else {
      setTabValue(0)
    }
  }, [modules, startingLevel, pupil])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setGotCurrentLevel(false)
    setCurrentLevelId(0)
  };

  return (
    <>
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
              {...a11yProps(i)} />
          ))}
        </HexagonsTabs>
      </CustomSuspense>
      {sortedModules.map((currentModule, i) => {
        const isEd = currentModule.isEd ? true : false
        return (
          <TabPanel key={`panel-${i}`} value={tabValue} index={i}>
            <CustomSuspense message={`Loading ${currentModule.order}`}>
              <LevelContent
                pupil={pupil}
                setGotCurrentLevel={setGotCurrentLevel}
                gotCurrentLevel={gotCurrentLevel}
                setCurrentLevelId={setCurrentLevelId}
                currentLevelId={currentLevelId}
                currentModule={currentModule}
                setGuidanceActive={setGuidanceActive}
                guidanceActive={guidanceActive}
                competenciesVars={{ pupilId: parseInt(pupil.id), levelId: parseInt(currentLevelId) }}
                {...other}
              />
            </CustomSuspense>
          </TabPanel>

        )
      })}
    </>
  )
}

StagesTabs.propTypes = {
  modules: PropTypes.array,
  startingLevel: PropTypes.object,
  pupil: PropTypes.object
}

export default StagesTabs
