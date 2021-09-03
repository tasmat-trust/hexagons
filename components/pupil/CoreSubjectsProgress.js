import PropTypes from 'prop-types'
import SubjectProgress from '../subjects/SubjectProgress'
import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles(() => ({
  root: {
    listStyle: 'none',
    padding: 0
  },
  li: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  }
}));

function CoreSubjectsProgress({ pupilId, coreSubjects, ...other }) {
  const classes = useStyles()
  return (
    <ul className={classes.root}>
      {coreSubjects.map((subject, i) => (
        <li key={`subject-${i}`} className={classes.li}>
          <SubjectProgress
            {...other} // activeGroupSlug
            subjectSlug={subject.slug}
            titleName={subject.name}
            getLevelVariables={{ subjectId: subject.id, pupilId: pupilId }}
            pupilId={pupilId}

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