import PropTypes from 'prop-types';
import WithPupilData from '../data-fetching/WithPupilData';
import WithGroupFromSlug from '../data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../data-fetching/WithSingleSubjectFromSlug';
import WithUrlVariables from '../data-fetching/WithUrlVariables';
import BreadCrumbs from '../navigation/Breadcrumbs';
import { useRouter } from 'next/router';
import SubjectMainView from '../subjects/SubjectMainView';
import CustomHead from '../ui-globals/CustomHead';
import PupilPicker from '../navigation/PupilPicker';
import { useContext } from 'react';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import SubjectPicker from '../navigation/SubjectPicker';
import CustomSuspense from '../data-fetching/CustomSuspense';

function Subject({
  firstLabel,
  firstSlug,
  subjectName,
  subjectSlug,
  groupName,
  activeGroupSlug,
  pupil,
  ...other
}) {
  const { orgId } = useContext(HexagonsContext);

  const { pathname } = useRouter();
  let isRainbowAwards = false;
  let isEarlyDevelopment = false;
  let isFunctionalSkills = false
  if (pathname.includes('rainbow-awards')) {
    isRainbowAwards = true;
  }
  if (pathname.includes('early-development')) {
    isEarlyDevelopment = true;
  }
  if (pathname.includes('functional-skills')) {
    isFunctionalSkills = true;
  }

  return (
    <>
      <CustomHead
        titleContent={`${pupil.name} | ${groupName} | ${subjectName}`}
        justContent={true}
      />
      <BreadCrumbs
        firstLabel={firstLabel}
        firstModel={`back to ${isRainbowAwards ? 'Rainbow Awards' : 'Subject'} overview`}
        firstHref={`/${firstSlug}`}
        secondPicker={
          <CustomSuspense message="Loading subjects" textOnly={true}>
            <SubjectPicker
              isEarlyDevelopment={isEarlyDevelopment}
              isFunctionalSkills={isFunctionalSkills}
              isRainbowAwards={isRainbowAwards}
              currentSubjectSlug={subjectSlug}
              activeGroupSlug={activeGroupSlug}
              currentPupilId={parseInt(pupil.id)}
            />
          </CustomSuspense>
        }
        thirdLabel={groupName}
        thirdModel="group"
        thirdHref={`/${firstSlug}/${subjectSlug}/${activeGroupSlug}`}
        fourthPicker={
          <CustomSuspense message="Loading pupils" textOnly={true}>
            <PupilPicker
              {...other}
              currentPupilId={parseInt(pupil.id)}
              activeGroupSlug={activeGroupSlug}
              subjectSlug={subjectSlug}
              groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
            />
          </CustomSuspense>
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
  firstLabel: PropTypes.string,
  firstSlug: PropTypes.string,
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object,
};

export default WithUrlVariables(
  WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilData(Subject)))
);
