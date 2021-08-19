import PropTypes from 'prop-types'
import useStateOnce from "../data-fetching/useStateOnce"
import { getCoreSubjects } from "../../queries/Subjects"
import handleNonResponses from "../data-fetching/handleNonResponses"
import { getLevels } from "../../queries/Pupils"
import { Typography } from "@material-ui/core"
import Link from "next/link"
import { makeStyles, Chip } from "@material-ui/core"
import "@reach/slider/styles.css"
import styled from 'styled-components'
import { Slider } from "@reach/slider"
import { cyan } from '@material-ui/core/colors';
import { useRouter } from "next/router"
import getPercentComplete from '../../utils/getPercentComplete'
// Uses styled components to customise Reach Slider component
// https://reach.tech/styling/
const StyledSlider = styled(Slider)`
  [data-reach-slider-range] {
    background: ${cyan['A400']}
  }
 
  [data-reach-slider-handle] {
    display: none;
  }
  `

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    padding: 0
  },
  li: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  span: {
    float: "right"
  },
  slider: {
    marginBottom: theme.spacing(1)
  },
  flexy: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


function calculateStageAndPercent(levels) {
  // Sort by module order
  levels.sort((a, b) => a.module.order > b.module.order)
  // Find current level:
  // Get incomplete levels
  const incompleteLevelsWithNull = levels.map((level) => level.status === 'incomplete' ? level : null) // [null, null, {...}, null, {...}]
  const incompleteLevels = incompleteLevelsWithNull.filter((level) => level !== null) // remove null values
  let level = null;
  if (incompleteLevels.length === 0) {
    // Get latest complete level
    let completeLevelsWithNull = levels.map((level) => level.status === 'complete' ? level : null)
    let completeLevels = completeLevelsWithNull.filter((level) => level !== null)
    if (completeLevels.length > 0) {
      let latestLevelIndex = completeLevels.length - 1;
      level = completeLevels[latestLevelIndex]
    }

  } else if (incompleteLevels.length > 1) {
    // Got more than one incomplete level, get later
    level = incompleteLevels[0] // choose earliest for now (possible duplicates)
  } else {
    // Choose the incomplete level
    level = incompleteLevels[0]
  }

  // Calculate level percent complete
  if (level && level.status && level.status === 'incomplete') {
    level['percentComplete'] = getPercentComplete(level.competencies, level.module.capabilities)
  }

  if (level && level.status && level.status === 'complete') {
    level['percentComplete'] = 100
  }

  return level
}

function SubjectProgress({ subjectName, subjectSlug, getLevelVariables, pupilId, activeGroupSlug }) {
  const classes = useStyles()
  const router = useRouter()
  const [levelData, error] = useStateOnce([getLevels, getLevelVariables])
  let level = null
  if (levelData && levelData.levels) {
    level = calculateStageAndPercent(levelData.levels)
  }

  const isSubjectsListing = router.asPath.includes('subjects')
  let linkUrl
  if (isSubjectsListing) {
    linkUrl = `/subjects/${router.query.subject}/${activeGroupSlug}/${pupilId}`    
  } else {
    linkUrl = `/pupils/${activeGroupSlug}/${pupilId}/${subjectSlug}`
  }

  return (
    <>
      {level && (
        <>
          {router && router.asPath && <Typography component="h3" variant="h6" className={classes.flexy}>
          
            <Link href={linkUrl}>{subjectName}</Link> 
            <Chip variant="outlined" color="secondary" size="small" label={`${level.module.level === 'stage' ? 'Stage' : 'Step'} ${level.module.order}`} /> 
            
            <span className={classes.span}>{level.percentComplete}%</span>
            </Typography>}
          <StyledSlider className={classes.slider} disabled={true} value={level.percentComplete} min={0} max={100} />
        </>
      )}
      {!level && (
        <>
          {router && router.asPath && <Typography component="h3" variant="h6"><Link href={linkUrl}>{subjectName}</Link><span className={classes.span}>0%</span></Typography>}
          <StyledSlider className={classes.slider} disabled={true} value={0} min={0} max={100} />
        </>
      )}
    </>
  )
}

SubjectProgress.propTypes = {
  subjectSlug: PropTypes.string,
  subjectName: PropTypes.string,
  getLevelVariables: PropTypes.object,
  pupilId: PropTypes.string,
  activeGroupSlug: PropTypes.string
}

function CoreSubjectsProgress({ pupilId, coreSubjects, ...other }) {
  const classes = useStyles()
  return (
    <ul className={classes.root}>
      {coreSubjects.map((subject, i) => (
        <li key={`subject-${i}`} className={classes.li}>
          <SubjectProgress
            subjectSlug={subject.slug}
            subjectName={subject.name}
            getLevelVariables={{ subjectId: subject.id, pupilId: pupilId }}
            pupilId={pupilId}
            {...other} // activeGroupSlug
          />
        </li>

      ))}
    </ul>
  )
}

CoreSubjectsProgress.propTypes = {
  pupilId: PropTypes.string,
  coreSubjects: PropTypes.array
}

export default CoreSubjectsProgress