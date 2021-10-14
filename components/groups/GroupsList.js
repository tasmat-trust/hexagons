import PropTypes from 'prop-types';
import { Paper, Typography } from "@material-ui/core"
import Link from 'next/link';
import useAdminPage from "../../styles/useAdminPage"
import { useEffect } from "react"
import { allGroups, myGroups } from "../../queries/Groups"
import useSWR from 'swr'
import { useRouter } from 'next/router'
import sortByName from '../../utils/sortByName';

function GroupsList({ getGroupsVariables, setSharedState, getMyGroups }) {


  const router = useRouter()
  let query = getMyGroups ? myGroups : allGroups


  const classes = useAdminPage()
  const { data: groupsData, mutate: setGroupsData } = useSWR([query, getGroupsVariables], { suspense: true })

  useEffect(() => {
    if (setGroupsData && setSharedState) setSharedState({ update: setGroupsData })
  }, [setSharedState, setGroupsData])


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
    <ul data-test-id="group-list" className={classes.ul}>
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
              <a title={`Choose ${group.name} group`} data-test-id={`${group.slug}-link`} onClick={(e) => storeRecentGroup(e, group, linkUrl)}>
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
  getMyGroups: PropTypes.bool
}

export default GroupsList
