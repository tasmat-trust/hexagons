import { useRouter } from "next/router"

import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"


import { getOrgIdFromSession } from '../../../utils';
import checkSession from '../../../components/auth/CheckSession'

export default function Group({ session }) {
  const { query } = useRouter()

  const orgId = getOrgIdFromSession(session)


  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/manage/subjects">
          Subjects
        </Link> 
      </Breadcrumbs>

    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}