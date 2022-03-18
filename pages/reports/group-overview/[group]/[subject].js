import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';
import WithPupilsByGroup from '../../../../components/data-fetching/WithPupilsByGroup';
import CustomHead from '../../../../components/ui-globals/CustomHead';
import SubjectPicker from '../../../../components/navigation/SubjectPicker';
import SubjectCard from '../../../../components/pupil/SubjectCard';
function Index(props) {
  console.log(props)
  return (
    <>
      <CustomHead titleContent={`${props.groupName} | `} />
      <BreadCrumbs
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Group Overview"
        thirdLabel={props.groupName}
        thirdHref={`/reports/group-overview/${props.activeGroupSlug}`}
        fourthPicker={
          <SubjectPicker
            isGroupOverviewReport={true}
            currentSubjectSlug={props.subjectSlug}
            activeGroupSlug={props.activeGroupSlug}
            getEverythingCombined={true}
            {...props}
          />
        }
        {...props}
      />
      <SubjectCard {...props} groupName={props.groupName} activeGroupSlug={props.activeGroupSlug} />
    </>
  );
}

export default WithUrlVariables(
  WithSingleSubjectFromSlug(WithGroupFromSlug(WithPupilsByGroup(Index)))
);

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
