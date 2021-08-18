import PropTypes from 'prop-types'
import { Typography, Box, Button, Fade } from "@material-ui/core"
import createLevel from '../forms/handlers/createLevel'
import updateLevel from '../forms/handlers/updateLevel'
import { useEffect, useState, useCallback } from "react"
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/core"
import getPercentComplete from "../../utils/getPercentComplete"
import WithLevel from "../data-fetching/WithLevel";
import LevelStatusTitle from './LevelStatusTitle'

const useStyles = makeStyles((theme) => ({
  level: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  info: {
    border: 'solid 1px',
    padding: '6px',
    borderRadius: '5px'
  },
  complete: {
    background: theme.palette.success.light,
    borderColor: theme.palette.success.dark
  },
  incomplete: {
    background: theme.palette.info.light,
    borderColor: theme.palette.info.main
  },
  notstarted: {
    background: theme.palette.warning.light,
    borderColor: theme.palette.warning.main
  },
  header: {
    textAlign: 'center',
    display: 'inline-flex'
  },
  title: {
    flexGrow: 0,
    marginRight: theme.spacing(2)
  }
}));


function calculateCompetenciesForThisLevel(allComps, capabilitiesToMatch) {
  const capString = JSON.stringify(capabilitiesToMatch)
  const competencies = allComps.filter((comp, i) => capString.includes(comp.capability_fk))
  return competencies
}




function LevelStatus({ setGotCurrentLevel,
  setCurrentLevelId,
  initialVisibleLevel,
  currentModule,
  subjectId,
  pupil,
  allCompetencies,
  gqlClient }) {

  const classes = useStyles()
  const [visiblePercentComplete, setVisiblePercentComplete] = useState(0)
  const [visibleLevel, setVisibleLevel] = useState(null)
  const [readyToShow, setReadyToShow] = useState(false)
  const [checkedStatus, setCheckedStatus] = useState(false)

  const moduleLabel = currentModule.level === 'step' ? 'Step' : 'Stage'
  const status = visibleLevel ? visibleLevel.status : 'notstarted'
  const thisLevelCompetencies = calculateCompetenciesForThisLevel(allCompetencies, currentModule.capabilities)

  const bubbleGotLevel = useCallback((level) => {
    if (level && level.id) {
      setVisibleLevel(level)
      setGotCurrentLevel(true)
      setCurrentLevelId(level.id)
    }
  }, [setCurrentLevelId, setVisibleLevel, setGotCurrentLevel])


  useEffect(() => {
    const percentComplete = getPercentComplete(thisLevelCompetencies, currentModule.capabilities)
    const percentCompleteWithShortcuts = status === 'complete' ? 100 : percentComplete
    setVisiblePercentComplete(percentCompleteWithShortcuts)
  }, [thisLevelCompetencies, currentModule.capabilities, status])

  useEffect(() => {

    if (initialVisibleLevel && initialVisibleLevel.levels.length < 1) {
      setCheckedStatus(true)
    }

    if (initialVisibleLevel && initialVisibleLevel.levels.length > 0) {
      const level = initialVisibleLevel.levels[0]
      bubbleGotLevel(level)
      setCheckedStatus(true)
    }

    setReadyToShow(true)

  }, [initialVisibleLevel, bubbleGotLevel])

  async function triggerCreateLevel(status) {
    const variables = {
      status: status,
      subjectId: subjectId,
      pupilId: pupil.id,
      moduleId: currentModule.id
    }
    const level = await createLevel(gqlClient, variables)

    bubbleGotLevel(level)
  }

  async function triggerUpdateLevel(status) {
    const variables = {
      status: status,
      levelId: visibleLevel.id
    }
    const level = await updateLevel(gqlClient, variables)

    bubbleGotLevel(level)
  }



  function completeStepHandler(e) {
    e.preventDefault()
    completeStep()
  }

  function completeStep() {
    if (visibleLevel) {
      triggerUpdateLevel('complete')
    } else {
      //create level and mark as complete
      triggerCreateLevel('complete')
    }
  }

  async function markActive() {
    if (visibleLevel) {
      // Mark current level as incomplete
      triggerUpdateLevel('incomplete')

    } else {
      // create level and mark as incomplete
      triggerCreateLevel('incomplete')
    }
  }
  return (
    <Fade in={readyToShow}>
      <Box className={classes.level}>
        <Box className={classes.header}>
          <LevelStatusTitle status={status} checkedStatus={checkedStatus} classes={classes} moduleLabel={moduleLabel} moduleOrder={module.order} />
          {currentModule && currentModule.summary && <Typography>{currentModule.summary}</Typography>}
          {currentModule && currentModule.guidance && <Typography>{currentModule.guidance}</Typography>}
          {status !== 'complete' && <Button variant="outlined" color="primary" onClick={completeStep}>Complete this {moduleLabel}</Button>}
          {status === 'complete' && <Button variant="outlined" color="info" onClick={markActive}>Mark {moduleLabel} incomplete</Button>}
        </Box>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" value={status === 'complete' ? 100 : visiblePercentComplete} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(
              visiblePercentComplete,
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

LevelStatus.propTypes = {
  setGotCurrentLevel: PropTypes.func,
  setCurrentLevelId: PropTypes.func,
  initialVisibleLevel: PropTypes.object, // injected by WithLevel HOC
  currentModule: PropTypes.object,
  subjectId: PropTypes.string,
  pupil: PropTypes.object,
  allCompetencies: PropTypes.array,
  gqlClient: PropTypes.object
}

export default WithLevel(LevelStatus)
