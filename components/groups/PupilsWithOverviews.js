import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PupilCard from '../pupil/PupilCard';
import SubjectCard from '../pupil/SubjectCard';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import CustomSuspense from '../data-fetching/CustomSuspense';
import { useRouter } from 'next/router';
import WithCoreSubjects from '../data-fetching/WithCoreSubjects';
 function PupilsWithOverviews({
  activeGroupSlug,
  groupName,
  shouldShowGroupBySubject,
  sortedPupils,
  ...other
}) {
  const router = useRouter();
  const isSubjectsListing = router.asPath.includes('subjects');
  const isRainbowAwards = router.asPath.includes('rainbow-awards');
  const isEarlyDevelopment = router.asPath.includes('early-development')

  return (
    <>
      <Grid container spacing={2}>
        {shouldShowGroupBySubject && (
          <Grid item xs={12} md={12}>
            <ErrorBoundary alert="Error with SubjectCard">
              <CustomSuspense message="Loading pupils by subject">
                <SubjectCard
                  {...other}
                  isSubjectsListing={isSubjectsListing}
                  isRainbowAwards={isRainbowAwards}
                  isEarlyDevelopment={isEarlyDevelopment}
                  groupName={groupName}
                  activeGroupSlug={activeGroupSlug}
                  pupils={sortedPupils}
                />
              </CustomSuspense>
            </ErrorBoundary>
          </Grid>
        )}

        {sortedPupils.map((p, i) => {
          let linkUrl;
          if (isSubjectsListing || isRainbowAwards || isEarlyDevelopment) {
            const basePath = isEarlyDevelopment ? 'early-development' : isRainbowAwards ? 'rainbow-awards' : 'subjects'
            linkUrl = `/${basePath}/${router.query.subject}/${activeGroupSlug}/${p.id}`;
          } else {
            linkUrl = `/pupils/${activeGroupSlug}/${p.id}`;
          }
          return (
            <Grid key={`pupil-${i}`} item xs={12} md={6} lg={4} sm={6} xl={3}>
              <ErrorBoundary alert={`Error with ${p.name}`}>
                <PupilCard
                  {...other}
                  isSubjectsListing={isSubjectsListing}
                  isRainbowAwards={isRainbowAwards}
                  groupName={groupName}
                  key={i}
                  pupilId={parseInt(p.id)}
                  pupilName={p.name}
                  pupilGroups={p.groups}
                  activeGroupSlug={activeGroupSlug}
                  onwardHref={linkUrl}
                />
              </ErrorBoundary>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

PupilsWithOverviews.propTypes = {
  shouldShowGroupBySubject: PropTypes.bool,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  sortedPupils: PropTypes.array,
};

export default WithCoreSubjects(PupilsWithOverviews);
