import { withSession } from '../../../../components/auth/session';
import checkSession from '../../../../components/auth/checkSession';
import GroupRootPage from '../../../../components/shared-pages/GroupRootPage';
import BreadCrumbs from '../../../../components/navigation/Breadcrumbs';
import WithUrlVariables from '../../../../components/data-fetching/WithUrlVariables';
import WithGroupFromSlug from '../../../../components/data-fetching/WithGroupFromSlug';
import WithSingleSubjectFromSlug from '../../../../components/data-fetching/WithSingleSubjectFromSlug';

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
        secondLabel={props.subjectName}
        thirdLabel={props.groupName}
         {...props} />
      }
      {...props}
    />
  );
}

export default WithUrlVariables(WithSingleSubjectFromSlug(WithGroupFromSlug(Index)));

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
