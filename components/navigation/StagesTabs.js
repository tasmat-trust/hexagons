import Link from 'next/link'
import { getSingleSubjectBySlug } from '../../queries/Subjects'
import useSharedState from "../data-fetching/useSharedState"
import useStateOnce from '../data-fetching/useStateOnce'
import handleNonResponses from "../data-fetching/handleNonResponses"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs, Tab, Fade } from '@material-ui/core'
import { Typography, Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import AddCapabilities from '../forms/AddCapabilities'
import { DeleteCapabilities, DeleteStage } from '../forms/DeleteModule'
import LevelStatus from '../pupil/LevelStatus'
import { WithModules, WithCompetencies } from '../pupil/WithPupil'

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
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function StagesTabs(WrappedComponent) {
  return function StagesTabs(props) {
    const { query } = useRouter()
    const { variables, setBreadcrumbLabel, shouldShowStepStageInBreadcrumb, stepOrStage } = props
    const [subjectData, error] = useStateOnce([getSingleSubjectBySlug, variables])
    const gotNonResponse = handleNonResponses(subjectData, error)
    const stage = query.stage
    useEffect(() => {
      if (subjectData && !shouldShowStepStageInBreadcrumb) {
        setBreadcrumbLabel && setBreadcrumbLabel(subjectData.subjects[0].name)
      }
      if (subjectData && shouldShowStepStageInBreadcrumb) {
        setBreadcrumbLabel && setBreadcrumbLabel(stage)
      }
    }, [setBreadcrumbLabel, subjectData, shouldShowStepStageInBreadcrumb, stage])
    if (gotNonResponse) return gotNonResponse
    const subjectId = subjectData.subjects[0].id
    const subjectName = subjectData.subjects[0].name
    const stepStage = stepOrStage === 'steps' ? 'step' : 'stage'
    return (
      <>
        <WrappedComponent {...props} subjectId={subjectId} subjectName={subjectName} variables={{ level: stepStage, subjectId: subjectId }} />
      </>
    )
  }
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



function StagesNav(props) {
  const { modules, stepOrStage, isAdmin, startingLevel, setModulesData, competenciesData, pupil, subject } = props
  const [tabValue, setTabValue] = useState(0);
  const [competencies, setCompetencies] = useState(competenciesData)
  const [gotCurrentLevel, setGotCurrentLevel] = useState(false) // boolean - have we got a current level
  const [currentLevel, setCurrentLevel] = useState(null)  // object - the current level, if any


  useEffect(() => { // Set the overlays to appear once loaded
    if (competenciesData) {
      setCompetencies(competenciesData)
    }
  }, [competenciesData])

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
  };




  return (
    <>
      {isAdmin && <AddCapabilities setModulesData={setModulesData} {...props} />}

      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {modules.map((module, i) => (
          <Tab
            key={`link-${i}`}
            label={`${stepOrStage === 'steps' ? 'Step' : 'Stage'} ${module.order}`}
            {...a11yProps(0)} />
        ))}
      </Tabs>

      {modules.map((module, i) => (
        <TabPanel key={`panel-${i}`} value={tabValue} index={i}>

          {isAdmin && <DeleteCapabilities setModulesData={setModulesData} {...props} currentStage={module} />}
          {isAdmin && <DeleteStage setModulesData={setModulesData} {...props} currentStage={module} />}

          {!isAdmin && <LevelStatus
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            setGotCurrentLevel={setGotCurrentLevel}
            currentModule={module}
            getLevelVars={{ pupilId: pupil.id, subjectId: subject.id, moduleId: module.id }}
            {...props} />}

          <CapabilityTiles
            {...props}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            setGotCurrentLevel={setGotCurrentLevel}
            gotCurrentLevel={gotCurrentLevel}
            currentModule={module}
            tiles={module.capabilities}
            competencies={competencies}
            setCompetencies={setCompetencies} />

        </TabPanel>
      ))}
    </>
  )
}

export default StagesTabs(WithModules(WithCompetencies(StagesNav)))
