

import { withSession } from '../../../components/auth/session'
import checkSession from '../../../components/auth/checkSession'

import useAdminPage from "../../../styles/useAdminPage";
import AllSubjects from '../../../components/subjects/AllSubjects';
import BreadCrumbs from '../../../components/navigation/Breadcrumbs';

import RoleInfoBanner from '../../../components/layout/RoleInfoBanner';
import CustomHead from '../../../components/ui-globals/CustomHead';

function Index(props) {

  const classes = useAdminPage()

  return (
    <>
      <CustomHead titleContent="Manage Subjects" />
      <RoleInfoBanner role="Leader" />
      <BreadCrumbs {...props} firstLabel="Manage Subjects" />
      <div className={classes.root}>
        <AllSubjects onwardHref={'/manage/subjects'} classes={classes} />
      </div>
    </>
  )
}

export default Index

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader')
})