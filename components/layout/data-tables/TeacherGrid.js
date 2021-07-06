import useSWR from "swr"
import { allTeachers } from '../../../queries/Teachers'
import { Typography } from "@material-ui/core"
import { DataGrid } from '@material-ui/data-grid'

function TeacherGridLayout({ teachers }) {

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
}


export default function TeacherGrid(props) {
  const { query, variables } = props
  const { data, error } = useSWR([query, variables])
  if (error) return <Typography>There has been an error fetching the data</Typography>
  if (!data) return <Typography>Loading</Typography>
  if (data[Object.keys(data)[0]].length === 0) return <Typography>No records found.</Typography>
  return (
    <TeacherGridLayout {...props} teachers={data.users} />
  )
}


 