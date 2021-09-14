import PropTypes from 'prop-types';
import { getSingleGroup } from '../../queries/Groups';
import useSWR from 'swr'

import { useRouter } from 'next/router';
import { useContext } from 'react';
import { HexagonsContext } from './HexagonsContext';

export default function WithGroupFromSlug(WrappedComponent) {
  function WithGroupFromSlug({ groupFromSlugVariables, ...other }) {
    const { query } = useRouter();
    const { orgId } = useContext(HexagonsContext)
    const { data: groupsData } = useSWR([getSingleGroup, groupFromSlugVariables], { suspense: true });
    const currentGroup = groupsData.groups[0];
    const groupId = currentGroup.id;
    const groupName = currentGroup.name;
    return (
      <WrappedComponent
        {...other}
        groupName={groupName}
        pupilVariables={{ id: query.pupil, orgId: orgId }}
        pupilsByGroupVariables={{ groupId: groupId, orgId: orgId }}
      />
    );
  }

  WithGroupFromSlug.propTypes = {
    groupFromSlugVariables: PropTypes.object,
  };

  return WithGroupFromSlug;
}
