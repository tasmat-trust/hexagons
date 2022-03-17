import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import GroupRootPage from '../../../../components/shared-pages/GroupRootPage';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import CustomSuspense from '../../../../components/data-fetching/CustomSuspense';
import SubjectPicker from '../../../../components/navigation/SubjectPicker';
function Index(props) {
  return (
    <GroupRootPage
      shouldShowGroupBySubject={true}
      titleContent={`${props.subjectName} | ${props.groupName} | Rainbow Awards`}
      breadcrumbs={
        <BreadCrumbs
          firstLabel="Rainbow Awards"
          firstModel="award"
          firstHref="/rainbow-awards"
          secondPicker={
            <CustomSuspense message="Loading subjects" textOnly={true}>
              <SubjectPicker
                isOverviewPage={true}
                isRainbowAwards={true}
                activeGroupSlug={props.activeGroupSlug}
                currentSubjectSlug={props.subjectSlug}
              />
            </CustomSuspense>
          }
          finalTitle={props.groupName}
          {...props}
        />
      }
      {...props}
    />
  );
}

export default WithUrlVariables(WithSingleSubjectFromSlug(WithGroupFromSlug(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
