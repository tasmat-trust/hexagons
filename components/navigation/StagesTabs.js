import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import AddCapabilities from '../forms/AddCapabilities'
import DeleteModule from '../forms/DeleteModule'
import LevelStatus from '../pupil/LevelStatus'
import { WithModules, WithCompetencies } from '../data-fetching/WithPupil'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'

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

function StagesNav({ modules, 
  isAdmin, 
  startingLevel, 
  setModulesData, 
  competenciesData, 
  pupil, 
  subjectId, 
  subjectName, 
  gqlClient }) {

  const [tabValue, setTabValue] = useState(0);
  const [competencies, setCompetencies] = useState(competenciesData)
  const [gotCurrentLevel, setGotCurrentLevel] = useState(false) // boolean - have we got a current level
  const [currentLevel, setCurrentLevel] = useState(null)  // object - the current level, if any
  const [currentLevelId, setCurrentLevelId] = useState(0)
  const [sortedModules, setSortedModules] = useState(modules)

  useEffect(() => { // Set the overlays to appear once loaded
    if (competenciesData) {
      setCompetencies(competenciesData)
    }
  }, [competenciesData])

  useEffect(() => {
    if (modules) {
      modules.sort((a, b) => a.order > b.order)
      modules.sort((a, b) => {
        const aLevel = a.level === 'step' ? 1 : 0
        const bLevel = b.level === 'step' ? 1 : 0
        return (
          aLevel < bLevel
        )
      })
      setSortedModules(modules)
    }

  }, [modules])

  useEffect(() => {
    if (modules && startingLevel) {
      const activeModule = modules.map((module, i) => module.order === startingLevel.module.order)
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setTabValue(startingIndex)
      //setCompetencies(level.competencies)
    }
  }, [modules, startingLevel])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    setGotCurrentLevel(false)
    setCurrentLevel(null)
    setCurrentLevelId(0)
  };




  return (
    <>
      {isAdmin && <AddCapabilities
        gqlClient={gqlClient}
        setModulesData={setModulesData}
        subjectId={subjectId} />}
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {sortedModules.map((module, i) => (
          <Tab
            key={`link-${i}`}
            label={`${module.level === 'step' ? 'Step' : 'Stage'} ${module.order}`}
            {...a11yProps(0)} />
        ))}
      </Tabs>

      {sortedModules.map((module, i) => (
        <TabPanel key={`panel-${i}`} value={tabValue} index={i}>
          {isAdmin && <DeleteModule gqlClient={gqlClient} setModulesData={setModulesData} currentStage={module} />}
          {!isAdmin && <LevelStatus
            setGotCurrentLevel={setGotCurrentLevel}
            setCurrentLevelId={setCurrentLevelId}
            currentModule={module}
            subjectId={subjectId}
            pupil={pupil}
            allCompetencies={competencies}
            gqlClient={gqlClient}
            getLevelVars={{ pupilId: pupil.id, subjectId: subjectId, moduleId: module.id }}
          />}
          <CapabilityTiles
            gqlClient={gqlClient}
            subjectId={subjectId}
            pupil={pupil}
            capabilities={module.capabilities}
            competencies={competencies}
            isAdmin={isAdmin}
            setCompetencies={setCompetencies}
            currentModule={module}
            gotCurrentLevel={gotCurrentLevel}
            setGotCurrentLevel={setGotCurrentLevel}
            setCurrentLevel={setCurrentLevel}
            currentLevelId={currentLevelId}
          />
        </TabPanel>
      ))}
    </>
  )
}

StagesNav.propTypes = {
  modules: PropTypes.array,
  isAdmin: PropTypes.bool,
  startingLevel: PropTypes.object,
  setModulesData: PropTypes.func,
  competenciesData: PropTypes.array,
  pupil: PropTypes.object,
  subjectId: PropTypes.string,
  subjectName: PropTypes.string,
  gqlClient: PropTypes.object,
}

export default WithSingleSubjectFromSlug(WithModules(WithCompetencies(StagesNav)))
