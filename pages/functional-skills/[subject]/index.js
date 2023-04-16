import { withSession } from '../../../components/auth/session';
import checkSession from '../../../components/auth/checkSession';
import SubjectPupilChooserView from '../../../components/shared-pages/SubjectPupilChooserView';

const Subject = (props) => (
  <SubjectPupilChooserView
    {...props}
    isFunctionalSkills={true}
    firstLabel="Functional skills"
    firstModel="Functional skills"
    firstSlug="functional-skills"
  />
);

export default Subject;

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
