
import { DataGrid } from '@material-ui/data-grid'
import { allTeachers } from '../../../queries/Teachers'
import { allPupilsWithGroups } from '../../../queries/Pupils'
import useSharedState from "../../data-fetching/useSharedState"
import handleNonResponses from "../../data-fetching/handleNonResponses"
import { useEffect } from "react"
import sortByName from '../../../utils/sortByName'

export default function UsersGrid({ variables, showMultiAdd, userType, setSharedState, setSelectedUsers, setAllUsers }) {

  const query = userType === 'teacher' ? allTeachers : allPupilsWithGroups

  const [state, setState, error] = useSharedState([query, variables])

  useEffect(() => { // Set page-wide pupil/teacher state
    if (setState && setSharedState) setSharedState({ update: setState })
  }, [setSharedState, setState])

  useEffect(() => {
    if (state) {
      const users = userType === 'teacher' ? state.users : state.pupils
      setAllUsers && setAllUsers(users)
    }
  }, [state, userType, setAllUsers])
  const gotNonResponse = handleNonResponses(state, error)
  if (gotNonResponse) return gotNonResponse

  let columns = [];

  if (userType === 'teacher') {
    columns.push({ field: 'username', headerName: 'Teacher', width: 130 })
    columns.push({ field: 'email', headerName: 'Email', width: 220 })
    columns.push({ field: 'role', headerName: 'Role', width: 130, valueGetter: params => params.row.role.name })

  } else {
    columns.push({ field: 'name', headerName: 'Pupil', width: 130 })
  }

  columns.push({
    field: 'groups',
    headerName: 'Groups',
    width: 200,
    sortable: false,
    valueGetter: (params) => {
      if (params.row.groups) {
        const sortedGroups = sortByName(params.row.groups)
        return sortedGroups.map((group) => `${group.name}`)
      } else {
        return ''
      }
    }
  })

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={userType === 'teacher' ? state.users : state.pupils}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedUsers(newSelection)
          if (newSelection.length > 0) {
            showMultiAdd(true)
          } else {
            showMultiAdd(false)
          }
        }}
      />
    </div>
  )
}


