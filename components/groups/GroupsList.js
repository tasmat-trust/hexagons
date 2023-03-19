import PropTypes from 'prop-types';
import Link from 'next/link';
import useAdminPage from '../../styles/useAdminPage';
import { useEffect, useContext } from 'react';
import { allGroups, myGroups } from '../../queries/Groups';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import sortByName from '../../utils/sortByName';
import { HexagonsContext } from '../data-fetching/HexagonsContext';

function GroupsList({ getGroupsVariables, setSharedState, getMyGroups }) {
  const router = useRouter();
  let query = getMyGroups ? myGroups : allGroups;
  const { orgId } = useContext(HexagonsContext);

  const classes = useAdminPage();
  const { data: groupsData, mutate: setGroupsData } = useSWR([query, getGroupsVariables], {
    suspense: true,
  });

  useEffect(() => {
    if (setGroupsData && setSharedState) setSharedState({ update: setGroupsData });
  }, [setSharedState, setGroupsData]);

  const groups = groupsData.groups;

  const sortedGroups = sortByName(groups);

  const isSubjectsListing = router.asPath.includes('subjects');
  const isRainbowAwards = router.asPath.includes('rainbow-awards');
  const isEarlyDevelopment = router.asPath.includes('early-development')
  const isReportListing = router.asPath.includes('reports');

  function storeRecentGroup(e, group, linkUrl) {
    e.preventDefault();
    localStorage.setItem('active-group-slug', group.slug);
    localStorage.setItem('active-group-name', group.name);
    localStorage.setItem('active-group-id', group.id);
    localStorage.setItem('active-group-org-id', orgId);
    router.push(linkUrl, undefined, { shallow: true });
  }

  return (
    <ul data-test-id="group-list" className={classes.ul}>
      {sortedGroups.map((group, i) => {
        let linkUrl;
        if (isSubjectsListing || isRainbowAwards || isEarlyDevelopment) {
          const basePath = isEarlyDevelopment ? 'early-development' : isRainbowAwards ? 'rainbow-awards' : 'subjects'
          linkUrl = `/${basePath}/${router.query.subject}/${group.slug}`;
        } else if (isReportListing) {
          let routerArray = router.asPath.split('/');
          let reportSlug = routerArray[2];
          linkUrl = `/reports/${reportSlug}/${group.slug}`;
        } else {
          linkUrl = `/pupils/${group.slug}`;
        }
        return (
          <li className={classes.listItem} key={`group-${i}`}>
            <Link href={linkUrl} className={classes.groupBox_link}>
              <a
                title={`Choose ${group.name} group`}
                data-test-id={`${group.slug}-link`}
                onClick={(e) => storeRecentGroup(e, group, linkUrl)}
              >
                {group.name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

GroupsList.propTypes = {
  getGroupsVariables: PropTypes.object,
  setSharedState: PropTypes.func,
  getMyGroups: PropTypes.bool,
};

export default GroupsList;
