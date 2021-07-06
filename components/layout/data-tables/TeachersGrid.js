
import { Typography } from "@material-ui/core"
import { DataGrid } from '@material-ui/data-grid'
import { allTeachers } from '../../../queries/Teachers'
import useSharedState from "../../data-fetching/useSharedState"

export default function TeachersGrid({ variables, showMultiAdd }) {
  const [state, setState, error] = useSharedState([allTeachers, variables])
  if (error) return <Typography>Error loading</Typography>
  if (!state) return <Typography>Loading</Typography>
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
        rows={state.users}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => { 
          if (newSelection.selectionModel.length > 0) {
            showMultiAdd(true)
          } else {
            showMultiAdd(false)
          }
        }}
      />
    </div>
  )
}


