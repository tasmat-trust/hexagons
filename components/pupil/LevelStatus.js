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
import DialogButton from '../ui-globals/DialogButton'

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
    background: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main
  },
  notstarted: {
    background: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    flexGrow: 0,
    fontFamily: theme.typography.secondaryFamily,
    marginRight: theme.spacing(2)
  },
  endButton: {
    marginLeft: theme.spacing(1)
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
      setCurrentLevelId(parseInt(level.id))
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

 
    if (visiblePercentComplete === 100) {
      completeStep()
    } 

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

  function markActiveHandler(e) {
    e.preventDefault()
    markActive()
  }

  function completeStep() {
    if (status !== 'complete') {
      if (visibleLevel) {
        triggerUpdateLevel('complete')
      } else {
        //create level and mark as complete
        triggerCreateLevel('complete')
      }
    }
  }

  async function markActive() {
    if (status === 'complete') {
      if (visibleLevel) {
        // Mark current level as incomplete
        triggerUpdateLevel('incomplete')

      } else {
        // create level and mark as incomplete
        triggerCreateLevel('incomplete')
      }
    }
  }

  return (
    <Fade in={readyToShow}>

      <Box className={classes.level}>
        <Box className={classes.header}>
          <Box>
            <LevelStatusTitle status={status} checkedStatus={checkedStatus} classes={classes} moduleLabel={moduleLabel} moduleOrder={currentModule.order} />
          </Box>
          <Box>
            <DialogButton
              label="View Summary"
              testId="view-summary-button"
              color="secondary"
              variant="contained"
              boxTitle={`${moduleLabel} ${currentModule.order} summary`}>
              {currentModule.summary}
            </DialogButton>
            {status !== 'complete' && <Button
              data-test-id="mark-complete"
              className={classes.endButton}
              variant="outlined"
              color="secondary"
              onClick={completeStepHandler}>Complete this {moduleLabel}</Button>}
            {status === 'complete' && <Button
              data-test-id="mark-incomplete"
              className={classes.endButton}
              variant="outlined"
              color="secondary"
              onClick={markActiveHandler}>Mark {moduleLabel} incomplete</Button>}

          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={status === 'complete' ? 100 : visiblePercentComplete} />
          </Box>
          <Box minWidth={35}>
            <Typography data-test-id="percent-complete-label" variant="body2" color="textSecondary">{`${Math.round(
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
