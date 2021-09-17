import PropTypes from 'prop-types'
import StagesTabs from "../navigation/StagesTabs"
import { Typography } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const styles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    clear: 'both'
  },
  title: {
    clear: 'both',
    marginBottom: theme.spacing(3),
    textAlign: 'center'
  }
}))

function SetPupilSubjectLevel({ subjectName, subjectSlug, subjectId, pupil, ...other }) {


  const classes = styles()

  return (
    <Box className={classes.root}>
      <StagesTabs
        {...other}
        pupil={pupil}
        subjectId={subjectId}
        subjectName={subjectName}
        subjectSlug={subjectSlug}
        isBaseline={true}
        getSubjectBySlugVariables={{ slug: subjectSlug }} />
    </Box>
  )
}

SetPupilSubjectLevel.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  pupil: PropTypes.object
}

export default SetPupilSubjectLevel