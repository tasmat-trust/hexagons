import PropTypes from 'prop-types';
import { getPupilsByGroup } from '../../queries/Pupils';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import sortByName from '../../utils/sortByName';
import PupilsWithOverviews from './PupilsWithOverviews';
import PupilSlimCard from '../pupil/PupilSlimCard';
import Alert from '@mui/material/Alert';
import { Grid, Paper } from '@mui/material';
import useAdminPage from '../../styles/useAdminPage';
function PupilsByGroup({ pupilsByGroupVariables, groupName, activeGroupSlug, ...other }) {
  const styles = useAdminPage();
  const router = useRouter();
  const isReportsPage = router.asPath.includes('reports');
  const { data: pupilsData } = useSWR([getPupilsByGroup, pupilsByGroupVariables], {
    suspense: true,
  });
  if (pupilsData.pupils.length === 0)
    return <Alert severity="info">No pupils in {groupName}.</Alert>;
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
      <Paper className={styles.paper}>
        <ul className={styles.ul}>
          {sortedPupils.map((pupil, i) => {
            return (
              <li key={`pupil-${i}`} className={styles.listItem}>
                <PupilSlimCard
                  key={`pupil-${i}`}
                  pupil={pupil}
                  onwardHref={`/${routerArray[1]}/${routerArray[2]}/${activeGroupSlug}/${pupil.id}`}
                  {...other}
                />
              </li>
            );
          })}
        </ul>
      </Paper>
    );
  }
}

PupilsByGroup.propTypes = {
  pupilsByGroupVariables: PropTypes.object,
  activeGroupSlug: PropTypes.string,
};

export default PupilsByGroup;
