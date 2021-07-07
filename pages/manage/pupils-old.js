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

// Queries
import { createGroupQuery, allGroups, getGroupsByOrg } from '../../queries/Groups'
import { createPupilQuery, getPupilsWithGroups, updatePupilGroups } from '../../queries/Pupils'
import AssignTo from '../../components/forms/AssignTo';

export default function Pupils({ session, gqlClient }) {


  const classes = useAdminPage()
  const orgId = getOrgIdFromSession(session)

  const [mutatePupil, setMutatePupil] = useState()
  const [mutateGroup, setMutateGroup] = useState()
  const [selectedPupils, setSelectedPupils] = useState([])
  const [allPupils, setAllPupils] = useState([])

  const [addToGroupButtonVisible, setAddToGroupButtonVisible] = useState(false)

  if (!session) return ''

  function handleAssignToGroups(formData) {
    selectedPupils.map(pupilId => {
      const currentPupil = allPupils.filter(pupil => pupil.id === pupilId)[0]      
      const newPupil = {
        id: currentPupil.id
      }  
      if (formData.shouldOverwrite === false) {
        const existingGroupIds = currentPupil.groups.map(group => group.id)
        newPupil.groups = formData.groups.concat(existingGroupIds)
      } else {
        newPupil.groups = formData.groups
      }       
      assignToGroups(newPupil)   
      return newPupil
    })    
  }

  async function assignToGroups(pupil) {
    const variables = {
      pupilId: pupil.id,
      groupIds: pupil.groups
    }
    try {
      const data = await gqlClient.request(updatePupilGroups, variables)
      if (data) mutatePupil.mutate()
    } catch (e) {
      console.error(e)
    }
  }

  async function createPupil(formData) {
    const variables = {
      name: formData.name,
      orgId: orgId,
      groupId: formData.groups
    }
    try {
      const data = await gqlClient.request(createPupilQuery, variables)
      if (data) mutatePupil.mutate()
    } catch (e) {
      console.error(e)
    }
  }

  async function updateGroup(formData) {
    const query = createGroupQuery
    const variables = {
      name: formData.name,
      orgId: orgId
    }
    try {
      const data = await gqlClient.request(createGroupQuery, variables)
      if (data) mutateGroup.mutate()
    } catch (e) {
      console.error(e)
    }
  }

  return (

    <>
      <Paper elevation={2}>
        <Alert severity="info" data-test-id="notification">This is an <b>Org Admin</b> page. It is only visible to Senior Leaders.</Alert>
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={7}>
            <Paper variant="outlined" className={classes.paper}>
              <Box className={classes.box}>
                <Typography variant="h4" component="h2" className={classes.title} data-test-id="title">Manage pupils</Typography>

                {addToGroupButtonVisible && (
                  <DialogButton
                    data-test-id="add-to-group"
                    className={classes.button}
                    label="Assign groups"
                    text="Assign selected pupils to groups."
                    modelname="assign-groups">
                    <DataFetcher
                      query={getGroupsByOrg}
                      variables={{ orgId: orgId }}>
                      {(data) => (<AssignTo updateModel={handleAssignToGroups} modelname="groups" selectItems={data.groups} />)}
                    </DataFetcher>
                  </DialogButton>
                )}



                <DialogButton
                  className={classes.button}
                  data-test-id="new-pupil"
                  label="New pupil"
                  text="Add a new pupil and assign them to groups. You can always add groups later."
                  modelname="pupil">
                  <DataFetcher
                    query={getGroupsByOrg}
                    variables={{ orgId: orgId }}>
                    {(data) => <AddNew updateModel={createPupil} modelname="pupil" selectItems={data.groups} />}
                  </DataFetcher>
                </DialogButton>
              </Box>
              <Grid container spacing={2}>
                <DataFetcher
                  query={getPupilsWithGroups}
                  setMutate={setMutatePupil}
                >
                  {(data) => {
                    // https://material-ui.com/api/data-grid/data-grid/
                    setAllPupils(data.pupils)
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
                            setSelectedPupils(newSelection.selectionModel)
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
                  data-test-id="new-group"
                  text="Create a new group. Pupils can then be assigned to groups."
                  modelname="group">
                  <AddNew updateModel={updateGroup} modelname="group" />
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