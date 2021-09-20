import PropTypes from 'prop-types';
import { Paper, Typography } from "@material-ui/core"
import Link from 'next/link';
import useAdminPage from "../../styles/useAdminPage"
import { useEffect } from "react"
import { allGroups, myGroups } from "../../queries/Groups"
import useSWR from 'swr'
import { useRouter } from 'next/router'
import sortByName from '../../utils/sortByName';

function GroupsList({ getGroupsVariables, setSharedState, getMyGroups, setActiveGroupSlug, setActiveGroupName, setActiveGroupId }) {


  const router = useRouter()
  let query = getMyGroups ? myGroups : allGroups


  const classes = useAdminPage()
  const { data: groupsData, mutate: setGroupsData } = useSWR([query, getGroupsVariables], { suspense: true })

  useEffect(() => {
    if (setGroupsData && setSharedState) setSharedState({ update: setGroupsData })
  }, [setSharedState, setGroupsData])

  useEffect(() => {

    if (!window.localStorage.getItem('active-group-slug')) {
      if (!getMyGroups  && groupsData && groupsData.groups.length > 0) {
        // No active group so let's get the first group
        setActiveGroupSlug && setActiveGroupSlug(groupsData.groups[0].slug)
        setActiveGroupName && setActiveGroupName(groupsData.groups[0].name)
        setActiveGroupId && setActiveGroupId(groupsData.groups[0].id)
      } 
    }


  }, [getMyGroups, groupsData, setActiveGroupSlug, setActiveGroupName, setActiveGroupId])


  const groups = groupsData.groups

  const sortedGroups = sortByName(groups)

  const isSubjectsListing = router.asPath.includes('subjects')
  const isRainbowAwards = router.asPath.includes('rainbow-awards')


  function storeRecentGroup(e, group, linkUrl) {
    e.preventDefault()
    localStorage.setItem('active-group-slug', group.slug)
    localStorage.setItem('active-group-name', group.name)
    localStorage.setItem('active-group-id', group.id)
    router.push(linkUrl, undefined, { shallow: true })
  }

  return (
    <ul className={classes.ul}>
      {sortedGroups.map((group, i) => {

        let linkUrl
        if (isSubjectsListing || isRainbowAwards) {
          const basePath = isSubjectsListing ? 'subjects' : 'rainbow-awards'
          linkUrl = `/${basePath}/${router.query.subject}/${group.slug}`
        } else {
          linkUrl = `/pupils/${group.slug}`
        }
        return (
          <li className={classes.listItem} key={`group-${i}`}>
            <Link href={linkUrl} className={classes.groupBox_link}>
              <a onClick={(e) => storeRecentGroup(e, group, linkUrl)}>
                {group.name}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

GroupsList.propTypes = {
  getGroupsVariables: PropTypes.object,
  setSharedState: PropTypes.func,
  getMyGroups: PropTypes.bool,
  setActiveGroupSlug: PropTypes.func,
  setActiveGroupName: PropTypes.func,
  setActiveGroupId: PropTypes.func
}

export default GroupsList
