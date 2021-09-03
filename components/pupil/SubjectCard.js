import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

import SubjectProgress from '../subjects/SubjectProgress';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.secondaryFamily
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    columns: 'auto 2',
    columnGap: theme.spacing(4)
  },
  li: {
    breakInside: 'avoid-column',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  }
}));

function SubjectCard({
  onwardHref,
  subjectSlug,
  subjectName,
  subjectId,
  pupils,
  groupName,
  ...other }) // pupilId, coreSubjects, activeGroupSlug
{
  const styles = useStyles();
  return (
    <Card>
      <CardContent >
        <Typography className={styles.title} component='h2' variant='h3'>     
          {groupName} - {subjectName}
        </Typography>
        <ul className={styles.ul}>
          {pupils && pupils.map((pupil, i) => (
            <li key={`pupil-${i}`} className={styles.li}>
              <SubjectProgress
                {...other} // activeGroupSlug
                subjectSlug={subjectSlug}
                titleName={pupil.name}
                getLevelVariables={{ subjectId: subjectId, pupilId: pupil.id }}
                pupilId={pupil.id}

              />
            </li>
          ))}
        </ul>

      </CardContent>

    </Card >
  )
}

SubjectCard.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  subjectId: PropTypes.string,
  groupName: PropTypes.string,
  onwardHref: PropTypes.string,
  pupils: PropTypes.array
}

export default SubjectCard