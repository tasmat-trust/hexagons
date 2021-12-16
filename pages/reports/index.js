import { withSession } from '../../components/auth/session';
import checkSession from '../../components/auth/checkSession';
import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import CustomHead from '../../components/ui-globals/CustomHead';
import Link from 'next/link';
export default function Reports(props) {
  return (
    <>
      <CustomHead titleContent="Reports" />
      <BreadCrumbs firstLabel="Reports" />
      <Link href={`/reports/pupil-overview`} passHref={true}>
        <a data-test-id="pupil-overview-link">Pupil overview</a>
      </Link>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
