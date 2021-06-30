import { useRouter } from "next/router"

import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";


import PupilCard from "../../components/pupil/PupilCard"


// Data updating/fetching
import DataFetcher from '../../components/data-fetching/DataFetcher'
import { gql } from "graphql-request"

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

      <DataFetcher
        query={gql`query getGroup($orgId: Int!, $slug: String!) {  
            groups (where: {organization: $orgId, slug: $slug}) { 
              name id
            }
          }`}
        variables={{ orgId: orgId, slug: query.slug }}
      >

        {(data) => {
          const group = data.groups.length > 0 ? data.groups[0] : null
          if (!group) return <p>No group found.</p>
          setGroupName(group.name)
          return (
            <>
              <DataFetcher
                query={gql`query getPupils($groupId: ID!) {  
            pupils (where: {groups: $groupId}) { 
              name id, groups {
                name
              }
            }
          }`}
                variables={{ groupId: group.id }}
              >
                {(data) => {
                  if (data.pupils.length === 0) return <p>No pupils found.</p>
                  return (
                    <>
                      <p>Pupils</p>
                      <Grid container spacing={3}>
                        {data.pupils.map((p, i) => (
                          <Grid key={`pupil-${i}`} item xs={4}>
                            <PupilCard key={i} pupil={p} />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )
                }}
              </DataFetcher>
            </>
          )
        }}

      </DataFetcher>

    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Teacher')
}