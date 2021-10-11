import PropTypes from 'prop-types'
import SubjectProgress from '../subjects/SubjectProgress'
import { makeStyles } from "@material-ui/core"
import ErrorBoundary from '../data-fetching/ErrorBoundary';
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

function CoreSubjectsProgress({ pupilId, coreSubjects, schoolType, edLevel, ...other }) {
  const classes = useStyles()
  let subjects = []
  if (schoolType === 'secondary') {
    subjects = coreSubjects.filter((subject) => !subject.isEarlyDevelopment && subject.slug !== 'primary-science')
  } else {
    if (edLevel.status === 'incomplete') {
      subjects = coreSubjects.filter((subject) => subject.isEarlyDevelopment || subject.isExpressiveAndReceptiveLanguage)
    } else {
      subjects = coreSubjects.filter((subject) => !subject.isEarlyDevelopment)
    }
  }
  return (
    <ul className={classes.root}>
      {subjects.map((subject, i) => (
        <ErrorBoundary key={`subject-${i}`} fallback={<p>Error rendering {subject.name}</p>}>
          <li className={classes.li}>
            <SubjectProgress
              {...other} // activeGroupSlug
              subjectSlug={subject.slug}
              titleName={subject.name}
              getLevelVariables={{ subjectId: subject.id, pupilId: pupilId }}
              pupilId={pupilId}
            />
          </li>
        </ErrorBoundary>
      ))}
    </ul>

  )
}

CoreSubjectsProgress.propTypes = {
  schoolType: PropTypes.string,
  edLevel: PropTypes.object,
  pupilId: PropTypes.string,
  coreSubjects: PropTypes.array
}

export default CoreSubjectsProgress