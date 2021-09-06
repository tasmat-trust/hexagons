import PropTypes from 'prop-types';
import WithCurrentLevel from '../data-fetching/WithCurrentLevel';
import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel';
import PupilPicker from '../navigation/PupilPicker';

function SubjectMainView({ pupil, activeGroupSlug, orgId, subjectName, subjectSlug, ...other }) {
  return (
    <>
      {/* <PupilPicker
        {...other}
        orgId={orgId}
        currentPupil={pupil}
        activeGroupSlug={activeGroupSlug}
        subjectSlug={subjectSlug}
        groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
      /> */}

      <SetPupilSubjectLevel
        {...other}
        subjectName={subjectName}
        subjectSlug={subjectSlug}
        pupil={pupil}
      />
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
