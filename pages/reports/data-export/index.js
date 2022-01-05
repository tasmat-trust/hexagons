import BreadCrumbs from '../../../components/navigation/Breadcrumbs';
import CustomHead from '../../../components/ui-globals/CustomHead';
import { withSession } from '../../../components/auth/session';
import checkSession from '../../../components/auth/checkSession';
import LastActiveGroup from '../../../components/groups/LastActiveGroup';
import { useState } from 'react';
function Index(props) {
  const [groupLabel, setGroupLabel] = useState();
  return (
    <>
      <CustomHead titleContent="Data export" />
      <BreadCrumbs
        {...props}
        firstLabel="Reports"
        firstHref="/reports"
        secondLabel="Data export"
        thirdLabel={groupLabel}
      />
      <LastActiveGroup
        {...props}
        isDataExport={true}
        setParentGroupBreadcumbLabel={setGroupLabel}
      />
    </>
  );
}

export default Index;

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader');
});
