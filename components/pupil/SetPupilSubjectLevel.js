import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StagesTabsWithEarlyDevelopment from '../navigation/StagesTabsWithEarlyDevelopment';
import StagesTabsSingleSubject from '../navigation/StagesTabsSingleSubject';
import { useRouter } from 'next/router';
const styles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    clear: 'both',
  },
  title: {
    clear: 'both',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
}));

function SetPupilSubjectLevel({ subjectName, subjectSlug, subjectId, pupil, ...other }) {
  const classes = styles();
  let isRa = false;

  const { pathname } = useRouter();
  const noEarlyDevelopmentSlugs = [
    'expressive-and-receptive-language',
    'expressive-language',
    'receptive-language',
    'early-development',
  ];
  let includeEarlyDevelopment = true;
  if (noEarlyDevelopmentSlugs.includes(subjectSlug)) {
    includeEarlyDevelopment = false;
  }

  if (pathname.includes('rainbow-awards')) {
    includeEarlyDevelopment = false;
    isRa = true;
  }

  return (
    <Box className={classes.root}>
      {includeEarlyDevelopment && (
        <StagesTabsWithEarlyDevelopment
          {...other}
          isRa={isRa}
          pupil={pupil}
          subjectId={subjectId}
          subjectName={subjectName}
          subjectSlug={subjectSlug}
          isBaseline={true}
          getEarlyDevelopmentBySlugVariables={{ slug: 'early-development' }}
          getSubjectBySlugVariables={{ slug: subjectSlug }}
        />
      )}

      {!includeEarlyDevelopment && (
        <StagesTabsSingleSubject
          {...other}
          isRa={isRa}
          pupil={pupil}
          subjectId={subjectId}
          subjectName={subjectName}
          subjectSlug={subjectSlug}
          isBaseline={true}
          getSubjectBySlugVariables={{ slug: subjectSlug }}
        />
      )}
    </Box>
  );
}

SetPupilSubjectLevel.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  pupil: PropTypes.object,
};

export default SetPupilSubjectLevel;
