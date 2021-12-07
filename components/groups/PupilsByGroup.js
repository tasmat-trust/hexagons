import PropTypes from 'prop-types'
import { getPupilsByGroup } from "../../queries/Pupils"
import useSWR from 'swr';
import { Grid } from "@material-ui/core";
import PupilCard from "../pupil/PupilCard";
import WithCoreSubjects from "../data-fetching/WithCoreSubjects";
import { useRouter } from 'next/router';
import SubjectCard from '../pupil/SubjectCard';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import CustomSuspense from '../data-fetching/CustomSuspense';
import sortByName from '../../utils/sortByName';

function PupilsByGroup({ pupilsByGroupVariables, groupName, activeGroupSlug, shouldShowGroupBySubject, ...other }) {
  const router = useRouter()
  const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], { suspense: true })
  const isSubjectsListing = router.asPath.includes('subjects')
  const isRainbowAwards = router.asPath.includes('rainbow-awards')

  if (pupilsData.pupils.length === 0) return <p>No pupils in {groupName}.</p>
  const sortedPupils = sortByName(pupilsData.pupils)
  return (
    <>
      <Grid container spacing={2}>
        {shouldShowGroupBySubject && <Grid item xs={12} md={12}>
          <ErrorBoundary alert="Error with SubjectCard">
            <CustomSuspense message="Loading pupils by subject">
              <SubjectCard
                {...other}
                groupName={groupName}
                activeGroupSlug={activeGroupSlug}
                pupils={sortedPupils}
              />
            </CustomSuspense>
          </ErrorBoundary>
        </Grid>}



        {sortedPupils.map((p, i) => {
          let linkUrl
          if (isSubjectsListing || isRainbowAwards) {
            const basePath = isSubjectsListing ? 'subjects' : 'rainbow-awards'
            linkUrl = `/${basePath}/${router.query.subject}/${activeGroupSlug}/${p.id}`
          } else {
            linkUrl = `/pupils/${activeGroupSlug}/${p.id}`
          }
          return (

            <Grid key={`pupil-${i}`} item xs={12} md={6} lg={4} sm={6} xl={3}>
              <ErrorBoundary alert={`Error with ${p.name}`}>
                <PupilCard
                  {...other}
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
          )
        })}
      </Grid>
    </>
  )
}

PupilsByGroup.propTypes = {
  shouldShowGroupBySubject: PropTypes.bool,
  pupilsByGroupVariables: PropTypes.object,
  activeGroupSlug: PropTypes.string
}

export default WithCoreSubjects(PupilsByGroup)