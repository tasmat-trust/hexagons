import { Grid, Paper, Box, Typography } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'

import DataFetcher from "../../components/data-fetching/DataFetcher";
import useAdminPage from "../../styles/useAdminPage";


import DialogButton from '../../components/mui/DialogButton'
import AddNew from '../../components/forms/AddNew';

import { DataGrid } from '@material-ui/data-grid'
// Utils
import { getOrgIdFromSession } from '../../utils';

import { allTeachers } from '../../queries/Teachers'
import { allGroups } from '../../queries/Groups'

import { gql } from 'graphql-request';


export default function Index({ session, gqlClient }) {

  const classes = useAdminPage()

  const orgId = getOrgIdFromSession(session)

  async function createTeacher(formData) {
    const query = gql`
        mutation createUser($username: String!, $email: String!, $role: ID!, $orgId: [ID!], $groupId: [ID!]) {
            createUser(input: {
              data:{
                username: $username,
                email: $email,
                role: $role,
                groups:$groupId,
                organizations:$orgId
                }
              }) {
              user {
                role {
                  id
                }
              }
            }
        }`
    const variables = {
      role: "1",
      username: formData.username,
      email: formData.email,
      orgId: [orgId],
      groupId: formData.groups
    }
    console.log(variables)
    try {
      const data = await gqlClient.request(query, variables)
      if (data) console.log('success', data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>All users</Typography>
                <DialogButton
                  className={classes.button}
                  label="New user"
                  text="Add a new teacher and assign them groups and roles. You can always assign groups/roles later."
                  model="user">
                  <DataFetcher
                    query={allGroups}
                    variables={{ orgId: orgId }}>
                    {(data) => (
                      <AddNew
                        updateModel={createTeacher}
                        nameFieldName={'username'}
                        includeEmail={true}
                        model="user"
                        selectItems={data.groups}
                      />
                    )}
                  </DataFetcher>
                </DialogButton>
              </Box>

              <DataFetcher query={allTeachers} variables={{ orgId: orgId }}>
                {(data) => {
                  const teachers = data.users
                  // https://material-ui.com/api/data-grid/data-grid/
                  const columns = [
                    { field: 'username', headerName: 'Teacher', width: 130 },
                    { field: 'email', headerName: 'Email', width: 220 },
                    { field: 'role', headerName: 'Role', width: 130, valueGetter: params => params.row.role.name },
                    {
                      field: 'groups',
                      headerName: 'Groups',
                      width: 200,
                      sortable: false,
                      valueGetter: (params) => {
                        return params.row.groups && params.row.groups.map((group) => `${group.name}`)
                      }

                    },
                  ];

                  return (
                    <div style={{ height: 800, width: '100%' }}>
                      <DataGrid
                        rows={teachers}
                        columns={columns}
                        checkboxSelection
                      />
                    </div>
                  )
                }}
              </DataFetcher>
            </Paper>
          </Grid>
        </Grid>
      </div>


    </>
  )
}

export async function getServerSideProps(ctx) {
  return await checkSession(ctx, 'Senior Leader')
}