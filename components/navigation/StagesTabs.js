import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import LevelStatus from '../pupil/LevelStatus'
import WithCompetencies from '../data-fetching/WithCompetencies'
import WithModules from '../data-fetching/WithModules'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'
import { sortModules } from '../../utils/sortLevelsAndModules'
import EarlyDevelopmentTabPanelContent from '../subjects/EarlyDevelopmentTabPanelContent'
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
  setModulesData,
  initialCompetencies,
  pupil,
  subjectId }) {
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
    if (modules && startingLevel) {
      const activeModule = modules.map((module, i) => module.order === startingLevel.module.order && module.level === startingLevel.module.level)
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setTabValue(startingIndex + 1) // Plus one for early development
      setCompetencies(startingLevel.competencies)
      setCurrentLevelId(startingLevel.id)
      setGotCurrentLevel(true)
    }
  }, [modules, startingLevel])

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

          <HexagonsTab
            label='Step 1'
            {...a11yProps(0)} />
          {sortedModules.map((module, i) => (
            <HexagonsTab
              key={`link-${i}`}
              label={`${module.level === 'step' ? 'Step' : 'Stage'} ${module.order}`}
              {...a11yProps(i + 1)} />
          ))}
        </HexagonsTabs>
      </CustomSuspense>

      <TabPanel value={tabValue} index={0}>
        <CustomSuspense message="Loading Early development">
          <EarlyDevelopmentTabPanelContent
            pupil={pupil}
            setGlobalGuidanceActive={setGuidanceActive}
            setGotCurrentLevel={setGotCurrentLevel}
            setCurrentLevelId={setCurrentLevelId}
            gotCurrentLevel={gotCurrentLevel}
            currentLevelId={currentLevelId}
            getSubjectBySlugVariables={{ slug: 'early-development' }}
            setModulesData={setModulesData}
          />
        </CustomSuspense>
      </TabPanel>
      {sortedModules.map((module, i) => (
        <TabPanel key={`panel-${i}`} value={tabValue} index={i + 1}>
          <CustomSuspense message="Loading status">
            <LevelStatus
              setGotCurrentLevel={setGotCurrentLevel}
              setGlobalGuidanceActive={setGuidanceActive}
              setCurrentLevelId={setCurrentLevelId}
              currentModule={module}
              subjectId={subjectId}
              pupil={pupil}
              competencies={competencies}
              getLevelVars={{ pupilId: pupil.id, subjectId: subjectId, moduleId: module.id }}
            />
          </CustomSuspense>
          <CustomSuspense message="Loading tiles">
            <CapabilityTiles
              subjectId={subjectId}
              guidanceActive={guidanceActive}
              pupil={pupil}
              capabilities={module.capabilities}
              competencies={competencies}
              setCompetencies={setCompetencies}
              currentModule={module}
              gotCurrentLevel={gotCurrentLevel}
              setGotCurrentLevel={setGotCurrentLevel}
              currentLevelId={currentLevelId}
              setModulesData={setModulesData}
            />
          </CustomSuspense>
        </TabPanel>
      ))}
    </>
  )
}

StagesTabs.propTypes = {
  modules: PropTypes.array,
  startingLevel: PropTypes.object,
  setModulesData: PropTypes.func,
  competencies: PropTypes.array,
  pupil: PropTypes.object,
  subjectId: PropTypes.string
}

export default WithSingleSubjectFromSlug(WithModules(WithCompetencies(StagesTabs)))
