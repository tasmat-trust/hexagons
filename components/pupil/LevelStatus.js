import { Typography, Box, Button, Fade } from "@material-ui/core"
import createLevel from '../forms/handlers/createLevel'
import updateLevel from '../forms/handlers/updateLevel'
import { getLevel } from "../../queries/Pupils"
import { useEffect, useState, useCallback } from "react"
import useSharedState from "../data-fetching/useSharedState"

import { makeStyles } from "@material-ui/core"
import Loading from "../ui-globals/Loading"
import { memo } from "react"

const useStyles = makeStyles({
  level: {
    border: 'solid red 1px'
  },
  complete: {
    border: 'solid green 1px'
  },
  incomplete: {
    border: 'solid orange 1px'
  },
  notstarted: {
    border: 'solid transparent 1px'
  }
});


function LevelBox(props) {
  const { visibleLevel, subject, currentModule, completeStep, markActive } = props
  const classes = useStyles()
  const moduleLabel = currentModule.level === 'step' ? 'Step' : 'Stage'
  const status = visibleLevel ? visibleLevel.status : 'notstarted'
  return (
    <Box style={props.style} className={`${classes.level} ${classes[status]}`}>
      <p>Status: {visibleLevel ? visibleLevel.status : 'not started'} </p>
      <p>{visibleLevel ? 'got current level' : 'no current level'}</p>
      <Typography variant='h1'>{subject.name}</Typography>
      <Typography variant='h2'>{moduleLabel} {currentModule.order}</Typography>
      {status !== 'complete' && <Button variant="contained" color="secondary" onClick={completeStep}>Complete this {moduleLabel}</Button>}
      {status === 'complete' && <Button variant="contained" color="secondary" onClick={markActive}>{moduleLabel} incomplete</Button>}
    </Box>
  )
}

function WithLevel(WrappedComponent) {
  return function WithLevel(props) {
    const [visibleLevelData, setVisibleLevelData] = useSharedState([getLevel, props.getLevelVars])
    return (
      <WrappedComponent initialVisibleLevel={visibleLevelData} setVisibleLevelData={setVisibleLevelData}  {...props} />
    )
  }
}

const LevelStatus = memo(function LevelStatus(props) {
  const { setGotCurrentLevel, setCurrentLevel, initialVisibleLevel, currentModule, subject, pupil, currentLevel, setVisibleLevelData } = props

  const [visibleLevel, setVisibleLevel] = useState(null)
  const [readyToShow, setReadyToShow] = useState(false)

  function bubbleGotLevel(level) {
    if (level && level.id) {
      setGotCurrentLevel(true)
      setCurrentLevel(level)
    }
  }

  useEffect(() => {
    if (currentLevel) {
      setVisibleLevel(currentLevel)
    }
  }, [currentLevel, visibleLevel])

  useEffect(() => {

    if (initialVisibleLevel && initialVisibleLevel.levels.length > 0) {
      bubbleGotLevel(initialVisibleLevel.levels[0])
    }
    setReadyToShow(true)

  }, [initialVisibleLevel])

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

  function completeStep(e) {
    e.preventDefault()
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
      <LevelBox visibleLevel={visibleLevel} {...props} completeStep={completeStep} markActive={markActive} />
    </Fade>

  )
})

export default WithLevel(LevelStatus)