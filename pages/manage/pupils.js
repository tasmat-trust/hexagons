import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Paper, Link } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import { DataGrid } from '@material-ui/data-grid'

import { useState } from 'react';

import GroupsList from '../../components/groups/GroupsList';

// Design
import useAdminPage from '../../styles/useAdminPage';

// Utils
import { getOrgIdFromSession } from '../../utils';

// Forms
import AddNew from '../../components/forms/AddNew'

// Data updating/fetching
import DataFetcher from '../../components/data-fetching/DataFetcher'
import DialogButton from '../../components/mui/DialogButton'
import { gql } from 'graphql-request'

// Queries
import { allGroups } from '../../queries/Groups'

export default function Pupils({ session, gqlClient }) {

  
  const classes = useAdminPage()
  const orgId = getOrgIdFromSession(session)

  const [mutatePupil, setMutatePupil] = useState()
  const [mutateGroup, setMutateGroup] = useState()

  const [addToGroupButtonVisible, setAddToGroupButtonVisible] = useState(false)

  if (!session) return ''

  async function createPupil(formData) {
    const query = gql`
        mutation createPupil($name: String!, $orgId: ID!, $groupId: [ID!]) {
            createPupil(input: {
              data:{
                name:$name,
                groups:$groupId,
                organization:$orgId
                }
              }) {
              pupil {
                name
                groups {
                  name
                }
                organization {
                  name
                }
              }
            }      
        }`
    const variables = {
      name: formData.name,
      orgId: orgId,
      groupId: formData.groups
    }
    try {
      const data = await gqlClient.request(query, variables)
      if (data) mutatePupil.mutate()
    } catch (e) {
      console.error(e)
    }
  }

  async function updateGroup(formData) {
    const query = gql`
    mutation createGroup($name: String!, $orgId: ID!) {
        createGroup(input: {
          data:{
            name:$name,
            organization:$orgId
            }
          }) {
          group {
            name
            organization {
              name
            }
          }
        }      
    }`
    const variables = {
      name: formData.name,
      orgId: orgId
    }
    try {
      const data = await gqlClient.request(query, variables)
      if (data) mutateGroup.mutate()
    } catch (e) {
      console.error(e)
    }
  }

  return (

    <>
      <Paper elevation={2}>
        <Alert severity="info">This is an <b>Org Admin</b> page. It is only visible to Senior Leaders.</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={7}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">Manage pupils</Typography>

                {addToGroupButtonVisible && (
                  <DialogButton
                    className={classes.button}
                    label="Assign groups"
                    text="Assign selected pupils to groups."
                    model="pupil">
                    <DataFetcher
                      query={gql`query getGroups($orgId: Int!) {  
                groups (where: {organization: $orgId}) { 
                  name id slug
                }
              }`}
                      variables={{ orgId: orgId }}>
                      {(data) => (<></>)}
                    </DataFetcher>
                  </DialogButton>
                )}



                <DialogButton
                  className={classes.button}
                  label="New pupil"
                  text="Add a new pupil and assign them to groups. You can always add groups later."
                  model="pupil">
                  <DataFetcher
                    query={gql`query getGroups($orgId: Int!) {  
                groups (where: {organization: $orgId}) { 
                  name id
                }
              }`}
                    variables={{ orgId: orgId }}>
                    {(data) => <AddNew updateModel={createPupil} model="pupil" selectItems={data.groups} />}
                  </DataFetcher>
                </DialogButton>
              </Box>
              <Grid container spacing={2}>
                <DataFetcher
                  query={gql`{pupils { id, name, groups {name, id} }}`}
                  setMutate={setMutatePupil}
                >
                  {(data) => {
                    // https://material-ui.com/api/data-grid/data-grid/
                    const columns = [
                      { field: 'name', headerName: 'Pupil', width: 130 },
                      {
                        field: 'groupsList',
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
                          rows={data.pupils}
                          columns={columns}
                          checkboxSelection
                          onSelectionModelChange={(newSelection) => {
                            //setSelectionModel(newSelection.selectionModel);
                            if (newSelection.selectionModel.length > 0) {
                              setAddToGroupButtonVisible(true)
                            } else {
                              setAddToGroupButtonVisible(false)
                            }
                          }}
                        />
                      </div>
                    )
                  }}
                </DataFetcher>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={5} xs={12}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title}>Groups</Typography>
                <DialogButton
                  className={classes.button}
                  label="New group"
                  text="Create a new group. Pupils can then be assigned to groups."
                  model="group">
                  <AddNew updateModel={updateGroup} model="group" />
                </DialogButton>
              </Box>
              <DataFetcher
                setMutate={setMutateGroup}
                query={allGroups}
                variables={{ orgId: orgId }}>
                {(data) => (
                  <GroupsList groups={data.groups} />
                )}
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