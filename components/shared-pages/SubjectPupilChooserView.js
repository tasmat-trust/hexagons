import PropTypes from 'prop-types';
import BreadCrumbs from '../navigation/Breadcrumbs';
import LastActiveGroup from '../groups/LastActiveGroup';
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug';
import WithUrlVariables from '../data-fetching/WithUrlVariables';
import CustomSuspense from '../data-fetching/CustomSuspense';
import CustomHead from '../ui-globals/CustomHead';
import { useState } from 'react';

function Index({ firstLabel, firstSlug, firstModel, subjectName, ...other }) {
  const [groupLabel, setGroupLabel] = useState();

  return (
    <>
      <CustomHead titleContent={`${subjectName} | ${firstLabel}`} />
      <BreadCrumbs
        firstLabel={firstLabel}
        firstModel={firstModel}
        firstHref={`/${firstSlug}`}
        secondLabel={subjectName}
        thirdLabel={groupLabel}
      />
      <CustomSuspense message="Loading groups">
        <LastActiveGroup
          setParentGroupBreadcumbLabel={setGroupLabel}
          isGroupPupilPicker={true}
          shouldShowGroupBySubject={true}
          subjectName={subjectName}
          {...other}
        />
      </CustomSuspense>
    </>
  );
}

Index.propTypes = {
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  subjectName: PropTypes.string,
};

export default WithUrlVariables(WithSingleSubjectFromSlug(Index));
