import PropTypes from 'prop-types'
import { Typography } from "@material-ui/core"
import { useState, useEffect } from 'react'

function LevelTitle({ status, checkedStatus, classes, moduleLabel, moduleOrder }) {
  const [fadeStarted, setFadeStarted] = useState(false)
  useEffect(() => {
    if (fadeStarted !== true && checkedStatus === true) {
      setFadeStarted(true)
    }
  }, [fadeStarted, setFadeStarted, checkedStatus])
  return (
    <Typography data-test-id="level-status-title" className={classes.title} variant='h2'>
      {moduleLabel} {moduleOrder}
      {fadeStarted && <span> &#8212; <span data-test-id="level-status-status" className={`${classes.info} ${classes[status]}`}> {status}</span></span>}
    </Typography>
  )
}

LevelTitle.propTypes = {
  moduleLabel: PropTypes.string,
  moduleOrder: PropTypes.number,
  status: PropTypes.string,
  checkedStatus: PropTypes.bool,
  classes: PropTypes.object
}

export default LevelTitle
