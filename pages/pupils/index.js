import BreadCrumbs from '../../components/navigation/Breadcrumbs';
import { withSession } from '../../components/auth/session';
import checkSession from '../../components/auth/checkSession';
import LastActiveGroup from '../../components/groups/LastActiveGroup';
import CustomHead from '../../components/ui-globals/CustomHead';
import { useState } from 'react';
function Index(props) {
  const [groupLabel, setGroupLabel] = useState();

  return (
    <>
      <CustomHead titleContent="Pupils" />
      <BreadCrumbs {...props} firstLabel="Pupils" secondLabel={groupLabel} />
      <LastActiveGroup
        {...props}
        isGroupPupilPicker={true}
        setParentGroupBreadcumbLabel={setGroupLabel}
      />
    </>
  );
}

export default Index;
export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Teacher');
});
