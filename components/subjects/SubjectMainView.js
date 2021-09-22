import PropTypes from 'prop-types';
import CustomSuspense from '../data-fetching/CustomSuspense';
import WithCurrentLevel from '../data-fetching/WithCurrentLevel';
import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel'; 


function SubjectMainView({ subjectName, subjectSlug, ...other }) {
  
  return (
    <CustomSuspense message="Loading Hexagons">
        <SetPupilSubjectLevel
          {...other}
          subjectName={subjectName}
          subjectSlug={subjectSlug} 
        /> 
    </CustomSuspense>
  );
}

SubjectMainView.propTypes = {
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
};

export default WithCurrentLevel(SubjectMainView);
