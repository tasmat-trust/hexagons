import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import { SubjectProgressWithLinks } from '../subjects/SubjectProgress';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.secondaryFamily,
  },
  ul: {
    '@media (min-width: 600px)': {
      columns: 'auto 2',
      columnGap: theme.spacing(4),
    },
    listStyle: 'none',
    padding: 0,
  },
  li: {
    breakInside: 'avoid-column',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
}));

function SubjectCard({
  onwardHref,
  subjectSlug,
  subjectName,
  subjectId,
  pupils,
  groupName,
  isRainbowAwards,
  isEarlyDevelopment,
  ...other
}) {
  // pupilId, coreSubjects, activeGroupSlug
  const styles = useStyles();
  return (
    <Card>
      <CardContent role="region" aria-live="polite">
        <Typography
          data-test-id="subject-card-title"
          className={styles.title}
          component="h2"
          variant="h3"
        >
          {groupName} - {subjectName}
        </Typography>
        <ul className={styles.ul}>
          {pupils &&
            pupils.map((pupil, i) => {
              const pupilId = parseInt(pupil.id);
              return (
                <li key={`pupil-${i}`} className={styles.li}>
                  <ErrorBoundary fallback={<p>Error rendering {pupil.name}</p>}>
                    <SubjectProgressWithLinks
                      {...other} // activeGroupSlug, isSubjectsListing, isRainbowAwards
                      isRainbowAwards={isRainbowAwards}
                      isEarlyDevelopment={isEarlyDevelopment}
                      useSubjectsBaseSlug={isRainbowAwards || isEarlyDevelopment ? false : true}
                      isConstrained={false}
                      subjectSlug={subjectSlug}
                      titleName={pupil.name}
                      getLevelVariables={{ subjectId: subjectId, pupilId: pupilId }}
                      pupilId={pupilId}
                    />
                  </ErrorBoundary>
                </li>
              );
            })}
        </ul>
      </CardContent>
    </Card>
  );
}

SubjectCard.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  subjectId: PropTypes.number,
  isRainbowAwards: PropTypes.bool,
  groupName: PropTypes.string,
  onwardHref: PropTypes.string,
  pupils: PropTypes.array,
};

export default WithSingleSubjectFromSlug(SubjectCard);
