import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import Link from 'next/link';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import { makeStyles } from '@mui/styles';
import sortByName from '../../utils/sortByName';

const useStyles = makeStyles((theme) => ({
  groupUl: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  groupLi: {
    listStyle: 'none',
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:last-child::after': {
      content: "''",
    },
  },
}));

function GroupChips({ pupilId, groups, shouldLink, baseHref }) {
  console.log(groups);
  const sortedGroups = sortByName(groups);
  const styles = useStyles();
  console.log(sortedGroups);
  return (
    <ul className={styles.groupUl} data-test-id={`groups-list-pupil-${pupilId}`}>
      {sortedGroups &&
        sortedGroups.map((group, i) => (
          <ErrorBoundary key={`pupil-group-${i}`} fallback={<p>Error loading {group.name}</p>}>
            <li className={styles.groupLi}>
              {shouldLink && (
                <Link href={`${baseHref}/${group.slug}`}>
                  <a>
                    <Chip clickable={true} size="small" label={group.name} />
                  </a>
                </Link>
              )}
              {!shouldLink && <Chip clickable={false} size="small" label={group.name} />}
            </li>
          </ErrorBoundary>
        ))}
    </ul>
  );
}

GroupChips.propTypes = {
  baseHref: PropTypes.string,
  pupilId: PropTypes.number,
  groups: PropTypes.array,
  shouldLink: PropTypes.bool,
};

export default GroupChips;
