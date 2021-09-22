import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import LevelStatus from '../pupil/LevelStatus'
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

function StagesTabs({ modules,
  startingLevel,
  initialCompetencies,
  pupil,
  edSubjectId,
  subjectId,
  showEdAndSubjectsTogether }) {
  const [tabValue, setTabValue] = useState(0);
  const [competencies, setCompetencies] = useState(initialCompetencies)
  const [gotCurrentLevel, setGotCurrentLevel] = useState(startingLevel ? true : false) // boolean - have we got a current level
  const [currentLevelId, setCurrentLevelId] = useState(startingLevel ? startingLevel.id : 0)
  const [sortedModules, setSortedModules] = useState(modules)
  const [guidanceActive, setGuidanceActive] = useState(false)

  useEffect(() => { // Set the overlays to appear once loaded
    if (initialCompetencies) {
      setCompetencies(initialCompetencies)

    }
  }, [initialCompetencies])

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
  }, [modules, startingLevel, initialCompetencies, pupil])

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
      {sortedModules.map((module, i) => {
        const isEd = module.isEd ? true : false
        return (
          <TabPanel key={`panel-${i}`} value={tabValue} index={i}>
            <CustomSuspense message="Loading status">
              <LevelStatus
                setGotCurrentLevel={setGotCurrentLevel}
                setGlobalGuidanceActive={setGuidanceActive}
                setCurrentLevelId={setCurrentLevelId}
                currentModule={module}
                subjectId={subjectId}
                edSubjectId={edSubjectId}
                pupil={pupil}
                competencies={competencies}
                getLevelVars={{ pupilId: pupil.id, subjectId: isEd ? edSubjectId : subjectId, moduleId: module.id }}
                isEd={isEd}
              />
            </CustomSuspense>
            <CustomSuspense message="Loading tiles">
              <CapabilityTiles
                showEdAndSubjectsTogether={showEdAndSubjectsTogether}
                subjectId={subjectId}
                edSubjectId={edSubjectId}
                guidanceActive={guidanceActive}
                pupil={pupil}
                capabilities={module.capabilities}
                competencies={competencies}
                setCompetencies={setCompetencies}
                currentModule={module}
                gotCurrentLevel={gotCurrentLevel}
                setGotCurrentLevel={setGotCurrentLevel}
                currentLevelId={currentLevelId}
                isEd={isEd}
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
  competencies: PropTypes.array,
  pupil: PropTypes.object,
  subjectId: PropTypes.number,
  edSubjectId: PropTypes.number,
  showEdAndSubjectsTogether: PropTypes.bool
}

export default StagesTabs
