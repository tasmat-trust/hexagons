import PropTypes from 'prop-types';
import SubjectsSection from './SubjectsSection';
function PupilOverview(props) {
  return (
    <>
      <h1>{props.pupil.name}</h1>
      <SubjectsSection {...props} />
    </>
  );
}

PupilOverview.propTypes = {
  pupil: PropTypes.object,
};

export default PupilOverview;
