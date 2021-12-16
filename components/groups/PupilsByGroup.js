import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { getPupilsByGroup } from '../../queries/Pupils';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import sortByName from '../../utils/sortByName';
import PupilsWithOverviews from './PupilsWithOverviews';
import PupilSlimCard from '../pupil/PupilSlimCard';

function PupilsByGroup({ pupilsByGroupVariables, groupName, activeGroupSlug, ...other }) {
  const router = useRouter();
  const isReportsPage = router.asPath.includes('reports');
  const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], {
    suspense: true,
  });
  if (pupilsData.pupils.length === 0) return <p>No pupils in {groupName}.</p>;
  const sortedPupils = sortByName(pupilsData.pupils);
  if (!isReportsPage) {
    return (
      <PupilsWithOverviews
        activeGroupSlug={activeGroupSlug}
        groupName={groupName}
        sortedPupils={sortedPupils}
        {...other}
      />
    );
  } else {
    let routerArray = router.asPath.split('/');
    return (
      <Grid container spacing={2}>
        {sortedPupils.map((pupil, i) => {
          return (
            <PupilSlimCard
              key={`pupil-${i}`}
              pupil={pupil}
              onwardHref={`/${routerArray[1]}/${routerArray[2]}/${activeGroupSlug}/${pupil.id}`}
              {...other}
            />
          );
        })}
      </Grid>
    );
  }
}

PupilsByGroup.propTypes = {
  pupilsByGroupVariables: PropTypes.object,
  activeGroupSlug: PropTypes.string,
};

export default PupilsByGroup;
