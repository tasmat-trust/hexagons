import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import CustomHead from '../../../components/ui-globals/CustomHead';
import { withSession } from '../../../components/auth/session';
import checkSession from '../../../components/auth/checkSession';
import DownloadViaGroups from '../../../components/groups/DownloadViaGroups';
import WithUrlVariables from '../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../components/data-fetching/WithGroupFromSlug';

function Index(props) {
  return (
    <>
      <CustomHead titleContent="Data export" />
      <BreadCrumbs
        {...props}
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Data export"
        thirdLabel={props.groupName}
      />
      <DownloadViaGroups {...props} />
    </>
  );
}

export default WithUrlVariables(WithGroupFromSlug(Index));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
