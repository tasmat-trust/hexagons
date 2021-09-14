import PropTypes from 'prop-types'
import { Typography } from "@material-ui/core"
import { useState, useEffect } from 'react'
import WithLevel from '../data-fetching/WithLevel'

function LevelTitle({ status, classes, moduleLabel, moduleOrder, initialVisibleLevel, bubbleGotLevel }) {
  const [level, setLevel] = useState(null)
  useEffect(() => {
    if (initialVisibleLevel) {
      if (initialVisibleLevel.levels.length > 1) {
        throw new Error('Too many levels!')
      }
      let level = initialVisibleLevel.levels[0]
      bubbleGotLevel(level)
      setLevel(level)
    }
  }, [initialVisibleLevel, setLevel, bubbleGotLevel])
  return (
    <Typography data-test-id="level-status-title" className={classes.title} variant='h2'>
      {moduleLabel} {moduleOrder}
      {level && status === 'complete' && <span> &#8212; <span data-test-id="level-status-status" className={`${classes.info} ${classes[status]}`}> {status}</span></span>}
    </Typography>
  )
}

LevelTitle.propTypes = {
  bubbleGotLevel: PropTypes.func,
  initialVisibleLevel: PropTypes.object,
  moduleLabel: PropTypes.string,
  moduleOrder: PropTypes.number,
  status: PropTypes.string,
  checkedStatus: PropTypes.bool,
  classes: PropTypes.object
}

export default WithLevel(LevelTitle)