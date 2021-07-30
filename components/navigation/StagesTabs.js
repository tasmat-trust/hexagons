import Link from 'next/link'
import { getModules, getSingleSubjectBySlug } from '../../queries/Subjects'
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
    const { variables , isAdmin} = props
    const [modulesData, setModulesData, error] = useSharedState([getModules, variables])
    let modules = []
    if (modulesData) {
      modules = modulesData.modules
    }
    return (
      <>
        {modules.length > 0 && !isAdmin && <WrappedComponent setModulesData={setModulesData} modules={modules} {...props} />}
        {isAdmin &&  <WrappedComponent setModulesData={setModulesData} modules={modules} {...props} />}
      </>
    )
  }
}

function StagesNav(props) {

  const { modules, stepOrStage, isAdmin, currentLevel,setModulesData } = props

  useEffect(() => {
    if (modules) {
      const activeModule = modules.map((module, i) => module.order === currentLevel)
      const startingIndex = activeModule.indexOf(true) > -1 ? activeModule.indexOf(true) : 0;
      setValue(startingIndex)
    }
  }, modules)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <CapabilityTiles {...props} currentStage={module} tiles={module.capabilities} />

        </TabPanel>
      ))}
    </>
  )
}

export default StagesTabs(WithModules(StagesNav))