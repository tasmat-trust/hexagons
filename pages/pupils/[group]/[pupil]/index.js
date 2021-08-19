import PropTypes from 'prop-types';
import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';

import PupilSubjectsView from '../../../../components/pupil/PupilSubjectsView';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';

import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';

function Index({ groupName, activeGroupSlug, pupil, orgId, ...other }) {
  return (
    <>
      <BreadCrumbs
        firstLabel="Pupils"
        firstHref="/pupils"
        secondLabel={groupName}
        secondHref={`/pupils/${activeGroupSlug}`}
        thirdLabel={pupil.name}
      />
      <PupilSubjectsView
        {...other}
        orgId={orgId}
        pupil={pupil}
        groupName={groupName}
        activeGroupSlug={activeGroupSlug}
      />
    </>
  );
}

Index.propTypes = {
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object,
  orgId: PropTypes.number,
};

export default WithUrlVariables(WithGroupFromSlug(WithPupilData(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
