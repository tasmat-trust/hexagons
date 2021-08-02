import Link from 'next/link'
import { getModules, getSingleSubjectBySlug } from '../../queries/Subjects'
import { getCompetencies } from '../../queries/Pupils'
import useSharedState from "../data-fetching/useSharedState"
import useStateOnce from '../data-fetching/useStateOnce'
import handleNonResponses from "../data-fetching/handleNonResponses"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs, Tab } from '@material-ui/core'
import { Typography, Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import AddCapabilities from '../forms/AddCapabilities'
import { DeleteCapabilities, DeleteStage } from '../forms/DeleteModule'

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
    const level = stepOrStage === 'steps' ? 'primary' : 'secondary'
    return (
      <WrappedComponent {...props} subjectId={subjectId} subjectName={subjectName} variables={{ level: level, subjectId: subjectId }} />
    )
  }
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function WithModules(WrappedComponent) {
  return function WithModules(props) {
    const { variables, isAdmin, pupil, subject } = props
    const [modulesData, setModulesData, error] = useSharedState([getModules, variables])
    let modules = []
    if (modulesData) {
      modules = modulesData.modules
    }
    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent 
        competenciesVars={{pupilId: pupil.id, subjectId: subject.id}}
        setModulesData={setModulesData} 
        modules={modules} 
        {...props} />}
        {isAdmin && <WrappedComponent setModulesData={setModulesData} modules={modules} {...props} />}
      </>
    )
  }
}

function WithCompetencies(WrappedComponent) {
  return function WithCompetencies(props) {
    const {competenciesVars, isAdmin} = props
    const [competenciesData, setCompetenciesData, error] = useSharedState([getCompetencies, competenciesVars])
    let competencies = []
    if (competenciesData) {
      competencies = competenciesData.competencies
    }
    return (
      <>
 
        {!isAdmin && <WrappedComponent setCompetenciesData={setCompetenciesData} competenciesData={competencies} {...props} />}

        {isAdmin && <WrappedComponent {...props} />}
      </>
    )
  }
}

function StagesNav(props) {
  const { modules, stepOrStage, isAdmin, level, setModulesData, competenciesData } = props
  const [gotActiveLevel, setGotActiveLevel] = useState(false)
  const [value, setValue] = useState(0);
  const [competencies, setCompetencies] = useState(competenciesData)
  const [passedUpCompetencies, setPassedUpCompetencies] = useState(competencies)

  useEffect(() => {
    if (competenciesData) {
      setCompetencies(competenciesData)
    }
  }, [competenciesData])

  useEffect(() => {
    if (modules && level) {
      const activeModule = modules.map((module, i) => module.order === level.module.order)
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setValue(startingIndex)
      setGotActiveLevel(true)
      setCompetencies(level.competencies)
    }
  }, [modules, level])


  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (!isAdmin) {
    //   if (competencies && competencies.toString() !== passedUpCompetencies.toString()) {
    //     setCompetencies(passedUpCompetencies)
    //   }
    // }
  };

  return (
    <>
      {isAdmin && <AddCapabilities setModulesData={setModulesData} {...props} />}

      <Tabs
        value={value}
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
        <TabPanel key={`panel-${i}`} value={value} index={i}>
          {isAdmin && <DeleteCapabilities setModulesData={setModulesData} {...props} currentStage={module} />}
          {isAdmin && <DeleteStage setModulesData={setModulesData} {...props} currentStage={module} />}

          <CapabilityTiles {...props} setPassedUpCompetencies={setPassedUpCompetencies} gotActiveLevel={gotActiveLevel} currentStage={module} tiles={module.capabilities} competencies={competencies} setCompetencies={setCompetencies} />

        </TabPanel>
      ))}
    </>
  )
}

export default StagesTabs(WithModules(WithCompetencies(StagesNav)))