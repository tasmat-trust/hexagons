import PropTypes from 'prop-types';
import { getSingleGroup } from '../../queries/Groups';
import { useEffect } from 'react';
import useStateOnce from './useStateOnce';
import handleNonResponses from './handleNonResponses';
import { useRouter } from 'next/router';

export default function WithGroupFromSlug(WrappedComponent) {
  function WithGroupFromSlug({ orgId, groupFromSlugVariables, ...other }) {
    const { query } = useRouter();
    const [groupsData, error] = useStateOnce([getSingleGroup, groupFromSlugVariables]);
    const gotNonResponse = handleNonResponses(groupsData, error);
    if (gotNonResponse) return gotNonResponse;
    const currentGroup = groupsData.groups[0];
    const groupId = currentGroup.id;
    const groupName = currentGroup.name;
    return (
      <WrappedComponent
        {...other}
        orgId={orgId}
        groupName={groupName}
        pupilVariables={{ id: query.pupil, orgId: orgId }}
        pupilsByGroupVariables={{ groupId: groupId, orgId: orgId }}
      />
    );
  }

  WithGroupFromSlug.propTypes = {
    orgId: PropTypes.number,
    setBreadcrumbsGroupName: PropTypes.func,
    groupFromSlugVariables: PropTypes.object,
  };

  return WithGroupFromSlug;
}
