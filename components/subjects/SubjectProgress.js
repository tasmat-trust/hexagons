import PropTypes from 'prop-types'
import useSWR from 'swr'
import { getLevelsForOverview } from "../../queries/Pupils"
import { Typography } from "@mui/material"
import Link from "next/link"
import { Chip } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import "@reach/slider/styles.css"
import styled from 'styled-components'
import { Slider } from "@reach/slider"
import { purple } from '@mui/material/colors';
import { useRouter } from "next/router"
import getCurrentLevel from '../../utils/getCurrentLevel'
import ErrorBoundary from '../data-fetching/ErrorBoundary'
import getRainbowLabel from '../../utils/getRainbowLabel'


// Uses styled components to customise Reach Slider component
// https://reach.tech/styling/
const StyledSlider = styled(Slider)`
  [data-reach-slider-range] {
    background: ${purple['A400']}
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




function SubjectProgress({ titleName, subjectSlug, isPupilCard, getLevelVariables, pupilId, activeGroupSlug, isRainbowListingPage }) {
  const classes = useStyles()
  const router = useRouter()
  const { data: levelData } = useSWR([getLevelsForOverview, getLevelVariables])
  let level = null
  if (levelData) {
    level = getCurrentLevel(levelData.levels)
  }



  const isSubjectsListing = router.asPath.includes('subjects')
  const isRainbowAwards = router.asPath.includes('rainbow-awards')

  let linkUrl
  if (isSubjectsListing || isRainbowAwards) {
    let basePath = 'subjects' // Is a core subject on a rainbow-awards page
    if (isRainbowListingPage) {
      basePath = 'rainbow-awards'
    }
    linkUrl = `/${basePath}/${subjectSlug}/${activeGroupSlug}/${pupilId}`
  } else {
    linkUrl = `/pupils/${activeGroupSlug}/${pupilId}/${subjectSlug}`
  }

  let label = ''

  if (level) {
    if (isRainbowAwards && !isPupilCard) {
      label = getRainbowLabel(parseInt(level.module.order) - 1)
    } else {
      label = `${level.module.level === 'stage' ? 'Stage' : 'Step'} ${level.module.order}`
    }
  }

  return (
    <ErrorBoundary alert="Error in SubjectProgress component">
      {level && (
        <>
          {router && router.asPath && <Typography component="h3" variant="h6" className={classes.flexy}>

            <Link href={linkUrl}><a>{titleName}</a></Link>
            <Chip color="secondary" size="small" label={label} />

            <span className={classes.span}>{level.percentComplete}%</span>
          </Typography>}
          <StyledSlider className={classes.slider} disabled={true} value={level.percentComplete} min={0} max={100} />
        </>
      )}
      {!level && (
        <>
          {router && router.asPath && <Typography component="h3" variant="h6"><Link href={linkUrl}><a>{titleName}</a></Link><span className={classes.span}>0%</span></Typography>}
          <StyledSlider className={classes.slider} disabled={true} value={0} min={0} max={100} />
        </>
      )}
    </ErrorBoundary>
  )
}

SubjectProgress.propTypes = {
  isPupilCard: PropTypes.bool,
  isRainbowListingPage: PropTypes.bool,
  subjectSlug: PropTypes.string,
  titleName: PropTypes.string,
  getLevelVariables: PropTypes.object,
  pupilId: PropTypes.number,
  activeGroupSlug: PropTypes.string
}


export default SubjectProgress