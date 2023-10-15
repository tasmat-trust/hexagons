import { DataGrid } from '@mui/x-data-grid';
import { allTeachers } from '../../../queries/Teachers';
import { allPupilsWithGroups } from '../../../queries/Pupils';
import { useEffect } from 'react';
import sortByName from '../../../utils/sortByName';
import useSWR from 'swr';

export default function UsersGrid({
  variables,
  showMultiAdd,
  userType,
  setSharedState,
  setSelectedUsers,
  setAllUsers,
}) {
  const query = userType === 'teacher' ? allTeachers : allPupilsWithGroups;

  const { data: state, mutate: setState } = useSWR([query, variables], { suspense: true });

  useEffect(() => {
    // Set page-wide pupil/teacher state
    if (setState && setSharedState) setSharedState({ update: setState });
  }, [setSharedState, setState]);

  useEffect(() => {
    if (state) {
      const users = userType === 'teacher' ? state.usersPermissionsUsers : state.pupils;

      setAllUsers && setAllUsers(users);
    }
  }, [state, userType, setAllUsers]);

  let columns = [];

  if (userType === 'teacher') {
    columns.push({ field: 'username', headerName: 'Teacher', width: 130 });
    columns.push({ field: 'email', headerName: 'Email', width: 220 });
    columns.push({
      field: 'role',
      headerName: 'Role',
      width: 130,
      valueGetter: (params) => params.row.role.name,
    });
  } else {
    columns.push({ field: 'name', headerName: 'Pupil', width: 130 });
  }

  columns.push({
    field: 'groups',
    headerName: 'Groups',
    width: 200,
    sortable: false,
    valueGetter: (params) => {
      if (params.row.groups) {
        const sortedGroups = sortByName(params.row.groups);
        return sortedGroups.map((group) => ` ${group.name}`);
      } else {
        return '';
      }
    },
  });

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={sortByName(userType === 'teacher' ? state.usersPermissionsUsers : state.pupils)}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectedUsers(newSelection);
          if (newSelection.length > 0) {
            showMultiAdd(true);
          } else {
            showMultiAdd(false);
          }
        }}
      />
    </div>
  );
}
