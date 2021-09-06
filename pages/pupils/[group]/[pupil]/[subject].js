import PropTypes from 'prop-types';
import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import SubjectMainView from '../../../../components/subjects/SubjectMainView';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';

function Subject({ subjectName, subjectSlug, groupName, activeGroupSlug, pupil, ...other }) {
  return (
    <>
      <BreadCrumbs
        firstLabel="Pupils"
        firstHref="/pupils"
        secondLabel={groupName}
        secondHref={`/pupils/${activeGroupSlug}`}
        thirdLabel={pupil.name}
        thirdHref={`/pupils/${activeGroupSlug}/${pupil.id}`}
        fourthLabel={subjectName}
        fourthHref={`/subjects/${subjectSlug}/${activeGroupSlug}`}
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
  subjectName: PropTypes.string,
  subjectSlug: PropTypes.string,
  groupName: PropTypes.string,
  activeGroupSlug: PropTypes.string,
  pupil: PropTypes.object,
};

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});

export default WithUrlVariables(
  WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilData(Subject)))
);