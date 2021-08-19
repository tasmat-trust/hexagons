import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Box } from '@material-ui/core'
import CapabilityTiles from '../subjects/CapabilityTiles'
import AddCapabilities from '../forms/AddCapabilities'
import DeleteModule from '../forms/DeleteModule'
import LevelStatus from '../pupil/LevelStatus'
import WithCompetencies from '../data-fetching/WithCompetencies'
import WithModules from '../data-fetching/WithModules'
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug'

import { withStyles } from '@material-ui/styles'
import theme from '../../styles/theme'

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
  gqlClient }) {
  const [tabValue, setTabValue] = useState(0);
  const [competencies, setCompetencies] = useState(competenciesData)
  const [gotCurrentLevel, setGotCurrentLevel] = useState(false) // boolean - have we got a current level
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
    setCurrentLevelId(0)
  };

  const HexagonsTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: theme.palette.info.light,
    },
  })(Tabs);

  const HexagonsTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      // fontFamily: [
      //   '-apple-system',
      //   'BlinkMacSystemFont',
      //   '"Segoe UI"',
      //   'Roboto',
      //   '"Helvetica Neue"',
      //   'Arial',
      //   'sans-serif',
      //   '"Apple Color Emoji"',
      //   '"Segoe UI Emoji"',
      //   '"Segoe UI Symbol"',
      // ].join(','),
      '&:hover': {
        color: theme.palette.info.main,
        opacity: 1,
      },
      '&$selected': {
        color: theme.palette.info.dark,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: theme.palette.info.main,
      },
    },
    selected: {},
  }))((props) => <Tab disableRipple {...props} />);

  return (
    <>
      {isAdmin && <AddCapabilities
        gqlClient={gqlClient}
        setModulesData={setModulesData}
        subjectId={subjectId} />}
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
  gqlClient: PropTypes.object,
}

export default WithSingleSubjectFromSlug(WithModules(WithCompetencies(StagesNav)))
