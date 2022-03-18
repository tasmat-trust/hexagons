import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';
import CustomHead from '../../../../components/ui-globals/CustomHead';
import SubjectsAndGroups from '../../../../components/groups/SubjectsAndGroups';
function Index(props) {
  return (
    <>
      <CustomHead titleContent={`${props.groupName}`} />
      <BreadCrumbs
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Group Overview"
        thirdLabel={props.groupName}
        {...props}
      />
      <SubjectsAndGroups getEverythingCombined={true} userId={props.user.id} {...props} />
    </>
  );
}

export default WithUrlVariables(WithGroupFromSlug(WithPupilData(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
