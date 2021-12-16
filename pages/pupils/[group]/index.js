import { withSession } from '../../../components/auth/session';
import checkSession from '../../../components/auth/checkSession';
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import GroupRootPage from '../../../components/shared-pages/GroupRootPage';
import WithUrlVariables from '../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../components/data-fetching/WithGroupFromSlug';

function Index(props) {
  return (
    <GroupRootPage
      titleContent={`${props.groupName} | Pupils`}
      breadcrumbs={<BreadCrumbs firstLabel="Pupils" secondLabel={props.groupName} {...props} />}
      {...props}
    />
  );
}

export default WithUrlVariables(WithGroupFromSlug(Index));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
