import { Grid, Paper, Box, Typography } from '@material-ui/core';

import checkSession from '../../components/auth/CheckSession'


import useAdminPage from "../../styles/useAdminPage";

import TeachersGrid from '../../components/layout/data-tables/TeacherGrid'

import DialogButton from '../../components/mui/DialogButton'

import { AddNewGroup } from '../../components/forms/AddNew';

// Utils
import { getOrgIdFromSession } from '../../utils';

import { allTeachers } from '../../queries/Teachers'
import { allGroups } from '../../queries/Groups'

import { gql } from 'graphql-request';


export default function Index(props) {
  const { session, gqlClient } = props
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

                  <AddNewGroup
                    {...props}
                    session={session}
                    updateModel={createTeacher}
                    nameFieldName={'username'}
                    includeEmail={true}
                    model="user"
                    query={allGroups} 
                    variables={{ orgId: orgId }}               
                  />

 
                </DialogButton>
              </Box>

              <TeachersGrid query={allTeachers} variables={{ orgId: orgId }}></TeachersGrid>
 
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