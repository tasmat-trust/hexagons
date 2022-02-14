import PupilSlimCard from '../pupil/PupilSlimCard';
import { Paper } from '@mui/material';

import useAdminPage from '../../styles/useAdminPage';
function PupilsWithSlimCards({ sortedPupils, router, activeGroupSlug, ...other }) {
  
  const styles = useAdminPage();
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

export default PupilsWithSlimCards;
