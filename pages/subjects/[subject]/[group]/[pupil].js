import checkSession from '../../../../components/auth/checkSession';
import { withSession } from '../../../../components/auth/session';
import PupilHexagonsView from '../../../../components/shared-pages/PupilHexagonsView'

export default function Pupil(props) {
  return (
    <PupilHexagonsView firstLabel="Subjects" firstSlug="subjects" {...props} />
  )
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
