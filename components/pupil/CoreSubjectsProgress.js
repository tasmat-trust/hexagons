import useStateOnce from "../data-fetching/useStateOnce"
import { getCoreSubjects } from "../../queries/Subjects"
import handleNonResponses from "../data-fetching/handleNonResponses"
import { getLevels } from "../../queries/Pupils"
import { Typography } from "@material-ui/core"
import Link from "next/link"
import { makeStyles, useTheme } from "@material-ui/core"
import "@reach/slider/styles.css"
import styled from 'styled-components'
import { Slider } from "@reach/slider"
import { cyan } from '@material-ui/core/colors';
import { useRouter } from "next/router"
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
    const percentComplete = parseInt((level.competencies.length / level.module.capabilities.length) * 100)
    level['percentComplete'] = percentComplete
  }

  if (level && level.status && level.status === 'complete') {
    level['percentComplete']  = 100
  }

  return level
}

function SubjectProgress(props) {
  const classes = useStyles()
  const { subject, getLevelVariables, pupil } = props
  const router = useRouter()
  const [levelData, error] = useStateOnce([getLevels, getLevelVariables])

  let level = null
  if (levelData && levelData.levels) {
    level = calculateStageAndPercent(levelData.levels)
  }

  return (
    <>
      {level && (
        <>
          <Typography component="h3" variant="h6"><Link href={`${router.asPath}/${pupil.id}/${subject.slug}`}>{subject.name}</Link> - {level.module.level === 'stage' ? 'Stage' : 'Step'} {level.module.order} <span className={classes.span}>{level.percentComplete}%</span></Typography>
          <StyledSlider className={classes.slider} disabled={true} value={level.percentComplete} min={0} max={100} />
        </>
      )}
      {!level && (
        <>
          <Typography component="h3" variant="h6"><Link href={`${router.asPath}/${pupil.id}/${subject.slug}`}>{subject.name}</Link><span className={classes.span}>0%</span></Typography>
          <StyledSlider className={classes.slider} disabled={true} value={0} min={0} max={100} />
        </>
      )}
    </>
  )
}


export default function CoreSubjectsProgress(props) {
  const { pupil, coreSubjects } = props
  const classes = useStyles()
  return (
    <ul className={classes.root}>
      {coreSubjects.map((subject, i) => (
        <li key={`subject-${i}`} className={classes.li}>
          <SubjectProgress
            {...props}
            subject={subject}
            pupil={pupil}
            getLevelVariables={{ subjectId: subject.id, pupilId: pupil.id }}
          />
        </li>

      ))}
    </ul>
  )

}