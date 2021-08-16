import { Typography, Box, Button, Fade } from "@material-ui/core"
import createLevel from '../forms/handlers/createLevel'
import updateLevel from '../forms/handlers/updateLevel'
import { getLevel } from "../../queries/Pupils"
import { useEffect, useState, useCallback } from "react"
import useStateOnce from "../data-fetching/useStateOnce"
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/core"
import { memo } from "react"
import getPercentComplete from "../../utils/getPercentComplete"

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


function LevelBox(props) {
  const { visibleLevel, subject, currentModule, completeStep, markActive, allCompetencies } = props
  const [visiblePercentComplete, setVisiblePercentComplete] = useState(0)
  const classes = useStyles()
  const moduleLabel = currentModule.level === 'step' ? 'Step' : 'Stage'
  const status = visibleLevel ? visibleLevel.status : 'notstarted'
  const thisLevelCompetencies = calculateCompetenciesForThisLevel(allCompetencies, currentModule.capabilities)

  useEffect(() => {
    const percentComplete = getPercentComplete(thisLevelCompetencies, currentModule.capabilities)
    const percentCompleteWithShortcuts = status === 'complete' ? 100 : percentComplete
    setVisiblePercentComplete(percentCompleteWithShortcuts)
  }, [thisLevelCompetencies, currentModule.capabilities, status])


  return (
    <Box style={props.style} className={classes.level}>
      <Box className={classes.header}>
        <Typography className={classes.title} variant='h2'>{moduleLabel} {currentModule.order} &#8212; <span className={`${classes.info} ${classes[status]}`}>{visibleLevel ? visibleLevel.status : 'not started'}</span></Typography>
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
  )
}

function WithLevel(WrappedComponent) {
  return function WithLevel(props) {
    const [visibleLevelData] = useStateOnce([getLevel, props.getLevelVars])
    return (
      <WrappedComponent initialVisibleLevel={visibleLevelData}  {...props} />
    )
  }
}

const LevelStatus = memo(function LevelStatus(props) {
  const { setGotCurrentLevel, setCurrentLevelId, initialVisibleLevel, currentModule, subject, pupil } = props

  const [visibleLevel, setVisibleLevel] = useState(null)
  const [readyToShow, setReadyToShow] = useState(false)

  const bubbleGotLevel = useCallback((level) => {
    if (level && level.id) {
      setVisibleLevel(level)
      setGotCurrentLevel(true)
      setCurrentLevelId(level.id)
    }
  }, [setCurrentLevelId, setVisibleLevel, setGotCurrentLevel])

  useEffect(() => {

    if (initialVisibleLevel && initialVisibleLevel.levels.length > 0) {
      const level = initialVisibleLevel.levels[0]
      bubbleGotLevel(level)

    }

    setReadyToShow(true)



  }, [initialVisibleLevel, bubbleGotLevel])

  async function triggerCreateLevel(status) {
    const variables = {
      status: status,
      subjectId: subject.id,
      pupilId: pupil.id,
      moduleId: currentModule.id
    }
    const level = await createLevel(props.gqlClient, variables)

    bubbleGotLevel(level)
  }

  async function triggerUpdateLevel(status) {
    const variables = {
      status: status,
      levelId: visibleLevel.id
    }
    const level = await updateLevel(props.gqlClient, variables)

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
      <LevelBox visibleLevel={visibleLevel} {...props} completeStep={completeStepHandler} markActive={markActive} />
    </Fade>

  )
})

export default WithLevel(LevelStatus)