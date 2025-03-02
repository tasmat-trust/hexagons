import {  Paper } from '@mui/material';
import Alert from '@mui/material/Alert';

import { withSession } from '../../components/auth/session'
import checkSession from '../../components/auth/checkSession'
import Snapshots from '../../components/reporting/Snapshots';

import useAdminPage from "../../styles/useAdminPage";
import CustomHead from '../../components/ui-globals/CustomHead';

function Index(props) {

  return (
    <>
      <CustomHead titleContent="Manage Snapshots and Targets" />
      <Snapshots />
    </>
  )
}

export default Index

export const getServerSideProps = withSession((ctx) => {
  return checkSession(ctx, 'Leader')
})
