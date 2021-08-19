import checkSession from '../../../../components/auth/checkSession';
import { withSession } from '../../../../components/auth/session';
import { WithPupilData } from '../../../../components/data-fetching/WithPupil';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';

import SubjectMainView from '../../../../components/subjects/SubjectMainView';

function Subject({ subjectName, subjectSlug, groupName, activeGroupSlug, pupil,...other }) {
  return (
    <>
      <BreadCrumbs
        firstLabel="Subjects"
        firstHref="/subjects"
        secondLabel={subjectName}
        thirdLabel={groupName}
        thirdHref={`/subjects/${subjectSlug}/${activeGroupSlug}`}
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

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});

export default WithUrlVariables(
  WithUrlVariables(WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilData(Subject))))
);
