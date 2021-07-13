import { useRouter } from "next/router"

import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import { Typography } from "@material-ui/core";

import PupilsByGroup from "../../components/groups/PupilsByGroup";


// Utils
import { getOrgIdFromSession } from '../../utils';


import checkSession from '../../components/auth/CheckSession'
import { useState } from "react"


export default function Group({ session }) {
  const { query } = useRouter()

  const orgId = getOrgIdFromSession(session)

  const [groupName, setGroupName] = useState(null)

  // Query:
  // Get group ID from slug
  // Get all pupils in that group

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/groups">
          Groups
        </Link>
        {groupName && <Typography>{groupName}</Typography>}
      </Breadcrumbs>

      <PupilsByGroup variables={{ orgId: orgId, slug: query.slug }} />

    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}