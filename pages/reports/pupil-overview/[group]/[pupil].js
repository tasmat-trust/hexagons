import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';
import PupilOverview from '../../../../components/reporting/PupilOverview';
import CustomHead from '../../../../components/ui-globals/CustomHead';
function Index(props) {
  return (
    <>
    <CustomHead titleContent={`${props.pupil.name}`} />
      <BreadCrumbs
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Pupil Overview"
        thirdLabel={props.groupName}
        fourthLabel={props.pupil.name}
        {...props}
      />
      <PupilOverview {...props} />
    </>
  );
}

export default WithUrlVariables(WithGroupFromSlug(WithPupilData(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
