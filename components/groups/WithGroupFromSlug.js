import { getSingleGroup } from "../../queries/Groups";
import { useEffect } from "react";
import useSharedState from "../data-fetching/useSharedState";
import handleNonResponses from "../data-fetching/handleNonResponses";
import { getOrgIdFromSession } from "../../utils";

export default function WithGroupFromSlug(WrappedComponent) {
  return function WithGroupFromSlug(props) {
    const { groupFromSlugVariables, setGroupName, user } = props
    const orgId = getOrgIdFromSession(user)
    const [groupsData, setGroupsData, error] = useSharedState([getSingleGroup, groupFromSlugVariables])
    const gotNonResponse = handleNonResponses(groupsData, error)

    useEffect(() => {
      if (groupsData && groupsData.groups && groupsData.groups.length > 0) { 
        setGroupName && setGroupName(groupsData.groups[0].name)
      }
    }, [groupsData, setGroupName])

    if (gotNonResponse) return gotNonResponse
    const groupId = groupsData.groups[0].id
    return <WrappedComponent {...props} variables={{ groupId: groupId, orgId: orgId }} />
  }
}