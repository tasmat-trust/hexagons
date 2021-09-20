import PropTypes from 'prop-types'
import WithPupilData from '../data-fetching/WithPupilData';
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug';
import WithUrlVariables from '../data-fetching/WithUrlVariables';
import BreadCrumbs from '../navigation/Breadcrumbs';

import SubjectMainView from '../subjects/SubjectMainView';
import CustomHead from '../ui-globals/CustomHead';

function Subject({ firstLabel, firstSlug, subjectName, subjectSlug, groupName, activeGroupSlug, pupil, ...other }) {
  return (
    <>
      <CustomHead titleContent={`${pupil.name} | ${groupName} | ${subjectName}`} justContent={true} />
      <BreadCrumbs
        firstLabel={firstLabel}
        firstHref={`/${firstSlug}`}
        secondLabel={subjectName}
        thirdLabel={groupName}
        thirdHref={`/${firstSlug}/${subjectSlug}/${activeGroupSlug}`}
        fourthLabel={pupil.name}
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
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object
}

export default WithUrlVariables(
  WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilData(Subject)))
);
