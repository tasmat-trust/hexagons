import PropTypes from 'prop-types';
import WithCurrentLevel from '../data-fetching/WithCurrentLevel';
import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel';
import PupilPicker from '../navigation/PupilPicker';
import CustomSuspense from '../data-fetching/CustomSuspense';

function SubjectMainView({ pupil, activeGroupSlug, orgId, subjectName, subjectSlug, ...other }) {
  return (
    <>
      <CustomSuspense message="Loading PupilPicker">
        <PupilPicker
          {...other}
          orgId={orgId}
          currentPupilId={parseInt(pupil.id)}
          activeGroupSlug={activeGroupSlug}
          subjectSlug={subjectSlug}
          groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
        />
      </CustomSuspense>
      <CustomSuspense message="Loading SubjectMainView">
        <SetPupilSubjectLevel
          {...other}
          subjectName={subjectName}
          subjectSlug={subjectSlug}
          pupil={pupil}
        />
      </CustomSuspense>
    </>
  );
}

SubjectMainView.propTypes = {
  pupil: PropTypes.object,
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  activeGroupSlug: PropTypes.string,
};

export default WithCurrentLevel(SubjectMainView);
