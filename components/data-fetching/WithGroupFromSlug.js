import PropTypes from 'prop-types'
import { getSingleGroup } from "../../queries/Groups";
import { useEffect } from "react";
import useStateOnce from "./useStateOnce";
import handleNonResponses from "./handleNonResponses";

export default function WithGroupFromSlug(WrappedComponent) {
  function WithGroupFromSlug({ orgId, groupFromSlugVariables, setBreadcrumbsGroupName, ...other }) {

 
    const [groupsData, error] = useStateOnce([getSingleGroup, groupFromSlugVariables])
    const gotNonResponse = handleNonResponses(groupsData, error)

    useEffect(() => {
      if (groupsData && groupsData.groups && groupsData.groups.length > 0) {
        setBreadcrumbsGroupName && setBreadcrumbsGroupName(groupsData.groups[0].name)
      }
    }, [groupsData, setBreadcrumbsGroupName])

    if (gotNonResponse) return gotNonResponse
    const groupId = groupsData.groups[0].id
    return <WrappedComponent {...other} orgId={orgId} pupilsByGroupVariables={{ groupId: groupId, orgId: orgId }} />
  }

  WithGroupFromSlug.propTypes = {
    orgId: PropTypes.number,
    setBreadcrumbsGroupName: PropTypes.func,
    groupFromSlugVariables: PropTypes.object
  }

  return WithGroupFromSlug
}