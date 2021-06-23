import checkSession from '../../components/auth/CheckSession'
import { Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'; 
import { DataGrid } from '@material-ui/data-grid' 

import useAdminPage from '../../styles/useAdminPage';

// Forms
import AddNew from '../../components/forms/AddNew'

// Data updating/fetching
import DataFetcher from '../../components/data-fetching/DataFetcher'
import ModalButton from '../../components/mui/ModalButton'
import { gql } from 'graphql-request'


function newPupilInit() {
  alert('new')
}


export default function Pupils({ session }) {
  if (!session) return ''
  if (!session.user) return ''
  if (!session.user.image) return ''
  const classes = useAdminPage()
  const orgId = session.user.image.length > 0 ? session.user.image[0].id : 1
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
                <Typography variant="h4" component="h2" className={classes.title}>Manage pupils</Typography>
                <ModalButton
                  className={classes.button}
                  label="New pupil"
                  model="pupil">
                  <>
                     <AddNew />
                  </>

                </ModalButton>
              </Box>
              <Grid container spacing={2}>
                <DataFetcher query={gql`
                  {pupils { id, name, groups {
  name, id
} }}
                `}>
                  {(data) => {
                    // https://material-ui.com/api/data-grid/data-grid/
                    const columns = [
                      { field: 'id', headerName: 'ID', width: 100 },
                      { field: 'name', headerName: 'Pupil', width: 130 },
                      {
                        field: 'groupsList',
                        headerName: 'Groups',
                        width: 200,
                        sortable: false,
                        valueGetter: (params) => {
                          return params.row.groups && params.row.groups.map((group) => `<span>${group.name}</span>`)
                        }

                      },
                    ];

                    return (
                      <div style={{ height: 400, width: '100%' }}>

                        <DataGrid rows={data.pupils} columns={columns} pageSize={3} checkboxSelection />
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
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  New group
                </Button>
              </Box>
              <DataFetcher query={gql`
              query getGroups($orgId: Int!) {
                groups (where: {organization: $orgId})  
                    { 
                      name, 
                      organization {
                        name
                      } 
                    }
                  
              }

                `} variables={{ orgId: orgId }}>
                {(data) => (
                  <>
                    <ul>
                      {data.groups.map((group, i) => (
                        <li key={`group-${i}`}>
                          <Typography variant="h4" gutterBottom={true}>{group.name}</Typography>
                        </li>
                      ))}
                    </ul>
                  </>
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
  return await checkSession(ctx, 'Super Admin')
}