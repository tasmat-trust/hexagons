import PropTypes from 'prop-types';
import BreadCrumbs from '../navigation/Breadcrumbs';
import LastActiveGroup from '../groups/LastActiveGroup';
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug';
import WithUrlVariables from '../data-fetching/WithUrlVariables';
import CustomSuspense from '../data-fetching/CustomSuspense';
import CustomHead from '../ui-globals/CustomHead';
import { useState } from 'react';
import SubjectPicker from '../navigation/SubjectPicker';

function Index({
  firstLabel,
  firstSlug,
  firstModel,
  subjectName,
  isRainbowAwards,
  subjectSlug,
  ...other
}) {
  const [groupLabel, setGroupLabel] = useState();

  return (
    <>
      <CustomHead titleContent={`${subjectName} | ${firstLabel}`} />
      <BreadCrumbs
        firstLabel={firstLabel}
        firstModel={firstModel}
        firstHref={`/${firstSlug}`}
        secondPicker={
          <CustomSuspense message="Loading subjects" textOnly={true}>
            <SubjectPicker
              isOverviewPage={true}
              isRainbowAwards={isRainbowAwards}
              currentSubjectSlug={subjectSlug}
            />
          </CustomSuspense>
        }
        finalTitle={groupLabel}
      />
      <CustomSuspense message="Loading groups">
        <LastActiveGroup
          setParentGroupBreadcumbLabel={setGroupLabel}
          isGroupPupilPicker={true}
          shouldShowGroupBySubject={true}
          subjectName={subjectName}
          subjectSlug={subjectSlug}
          {...other}
        />
      </CustomSuspense>
    </>
  );
}

Index.propTypes = {
  isRainbowAwards: PropTypes.bool,
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  subjectName: PropTypes.string,
};

export default WithUrlVariables(WithSingleSubjectFromSlug(Index));
