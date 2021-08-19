import PropTypes from 'prop-types'
import StagesTabs from "../navigation/StagesTabs"
import { Typography } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  }
}))

export default function SetPupilSubjectLevel(props) {

  const classes = styles()
  const { subject, pupil } = props
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h1">{`${pupil.name}'s ${subject.name} Baseline`}</Typography>
        <Typography>Please go to step or stage that {pupil.name} is currently working at and mark off as many competencies as you can.</Typography>
      </Box>
      <StagesTabs 
      {...props} 
      isAdmin={false} 
      isBaseline={true}
      getSubjectBySlugVariables={{ slug: subject.slug }} />
    </Box>
  )
}

