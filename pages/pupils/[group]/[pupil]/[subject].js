import PropTypes from 'prop-types';
import { useContext } from 'react';
import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import SubjectMainView from '../../../../components/subjects/SubjectMainView';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';
import CustomHead from '../../../../components/ui-globals/CustomHead';
import PupilPicker from '../../../../components/navigation/PupilPicker';
import { HexagonsContext } from '../../../../components/data-fetching/HexagonsContext';
import SubjectPicker from '../../../../components/navigation/SubjectPicker';
import { useRouter } from 'next/router';

function Subject({ subjectName, subjectSlug, groupName, activeGroupSlug, pupil, ...other }) {
  const { pathname } = useRouter();
  const { orgId } = useContext(HexagonsContext);
  let isRainbowAwards = false;
  if (pathname.includes('rainbow-awards')) {
    isRainbowAwards = true;
  }
  return (
    <>
      <CustomHead
        titleContent={`${pupil.name} | ${subjectName} | ${groupName}`}
        justContent={true}
      />
      <BreadCrumbs
        firstLabel="Pupils"
        firstHref="/pupils"
        secondLabel={groupName}
        secondHref={`/pupils/${activeGroupSlug}`}
        thirdPicker={
          <PupilPicker
            {...other}
            currentPupilId={parseInt(pupil.id)}
            activeGroupSlug={activeGroupSlug}
            subjectSlug={subjectSlug}
            groupName={groupName}
            groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
          />
        }
        fourthPicker={
          <SubjectPicker
            isRainbowAwards={isRainbowAwards}
            currentSubjectSlug={subjectSlug}
            activeGroupSlug={activeGroupSlug}
            currentPupilId={parseInt(pupil.id)}
          />
        }
        fifthChipTitle={`View ${pupil.name}`}
        fifthLabel="View pupil overview"
        fifthHref={`/pupils/${activeGroupSlug}/${pupil.id}`}
      />
      <SubjectMainView
        {...other}
        pupil={pupil}
        groupName={groupName}
        activeGroupSlug={activeGroupSlug}
        subjectName={subjectName}
        subjectSlug={subjectSlug}
      />
    </>
  );
}

Subject.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object,
};

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});

export default WithUrlVariables(
  WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilData(Subject)))
);
