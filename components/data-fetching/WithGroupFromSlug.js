import { getSingleGroup } from "../../queries/Groups";
import { useEffect } from "react";
import useStateOnce from "./useStateOnce";
import handleNonResponses from "./handleNonResponses";
import { getOrgIdFromSession } from "../../utils";

export default function WithGroupFromSlug(WrappedComponent) {
  return function WithGroupFromSlug(props) { 
    const { groupFromSlugVariables, setGroupName, user } = props
    const orgId = getOrgIdFromSession(user)
    const [groupsData,  error] = useStateOnce([getSingleGroup, groupFromSlugVariables])
    const gotNonResponse = handleNonResponses(groupsData, error)

    useEffect(() => {
      if (groupsData && groupsData.groups && groupsData.groups.length > 0) { 
        setGroupName && setGroupName(groupsData.groups[0].name)
      }
    }, [groupsData, setGroupName])

    if (gotNonResponse) return gotNonResponse
    const groupId = groupsData.groups[0].id
    return <WrappedComponent {...props} pupilsByGroupVariables={{ groupId: groupId, orgId: orgId }} />
  }
}