import { withSession } from '../../../components/auth/session';
import checkSession from '../../../components/auth/checkSession';
import SubjectPupilChooserView from '../../../components/shared-pages/SubjectPupilChooserView';

const Subject = (props) => (
  <SubjectPupilChooserView
    {...props}
    isRainbowAwards={true}
    firstLabel="Rainbow Awards"
    firstModel="Rainbow Award"
    firstSlug="rainbow-awards"
  />
);

export default Subject;

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
