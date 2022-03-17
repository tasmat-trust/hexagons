import { useContext } from 'react';
import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithPupilData from '../../../../components/data-fetching/WithPupilData';
import PupilOverview from '../../../../components/reporting/PupilOverview';
import CustomHead from '../../../../components/ui-globals/CustomHead';
import PupilPicker from '../../../../components/navigation/PupilPicker';
import { HexagonsContext } from '../../../../components/data-fetching/HexagonsContext';
import CustomSuspense from '../../../../components/data-fetching/CustomSuspense';
import ErrorBoundary from '../../../../components/data-fetching/ErrorBoundary';
function Index(props) {
  const { orgId } = useContext(HexagonsContext);
  return (
    <>
      <CustomHead titleContent={`${props.pupil.name}`} />
      <BreadCrumbs
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Pupil Overview"
        thirdLabel={props.groupName}
        fourthPicker={
          <CustomSuspense message="Loading pupils" textOnly={true}>
            <ErrorBoundary>
              <PupilPicker
                isPupilReport={true}
                currentPupilId={parseInt(props.pupil.id)}
                activeGroupSlug={props.activeGroupSlug}
                pupilsByGroupVariables={{ orgId: orgId, groupId: props.activeGroupId }}
              />
            </ErrorBoundary>
          </CustomSuspense>
        }
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
