import PropTypes from 'prop-types';
import { getPupilsByGroup } from '../../queries/Pupils';
import useSWR from 'swr';
import sortByName from '../../utils/sortByName';
import PupilsWithOverviews from './PupilsWithOverviews';
import PupilsWithSlimCards from './PupilsWithSlimCards';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug';

function PupilsByGroup({ pupilsByGroupVariables, groupName, activeGroupSlug, shouldShowGroupBySubject, ...other }) {
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
        shouldShowGroupBySubject={shouldShowGroupBySubject}
        {...other}
      />
    );
  } else {
    return (
      <PupilsWithSlimCards
        sortedPupils={sortedPupils}
        activeGroupSlug={activeGroupSlug}
        router={router}
        {...other}
      />
    );
  }
}

PupilsByGroup.propTypes = {
  pupilsByGroupVariables: PropTypes.object,
  activeGroupSlug: PropTypes.string,
  groupName: PropTypes.string,
  shouldShowGroupBySubject: PropTypes.bool,
};

export default WithGroupFromSlug(PupilsByGroup);
