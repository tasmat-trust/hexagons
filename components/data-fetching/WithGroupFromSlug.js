import PropTypes from 'prop-types';
import { getSingleGroup } from '../../queries/Groups';
import useSWR from 'swr'

import { useRouter } from 'next/router';

export default function WithGroupFromSlug(WrappedComponent) {
  function WithGroupFromSlug({ orgId, groupFromSlugVariables, ...other }) {
    const { query } = useRouter();
    const { data: groupsData } = useSWR([getSingleGroup, groupFromSlugVariables], { suspense: true });
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
