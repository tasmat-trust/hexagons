import CustomSuspense from '../data-fetching/CustomSuspense';

import SetPupilSubjectLevel from '../pupil/SetPupilSubjectLevel'; 

import WithCurrentLevel from '../data-fetching/WithCurrentLevel';

function SubjectMainView(props) {
  
  return (
    <CustomSuspense message="Loading Hexagons">
        <SetPupilSubjectLevel
          {...props}
        /> 
    </CustomSuspense>
  );
}

export default WithCurrentLevel(SubjectMainView);
