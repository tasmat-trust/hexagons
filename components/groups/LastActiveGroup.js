import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PupilsAndGroups from './PupilsAndGroups';
import SubjectsAndGroups from './SubjectsAndGroups'
import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
  title: {
    'font-family': theme.typography.secondaryFamily
  }
}))

function LastActiveGroup({ user, orgId, isHomepage, ...other }) {
  const [activeGroupSlug, setActiveGroupSlug] = useState();
  const [activeGroupName, setActiveGroupName] = useState();
  const [activeGroupId, setActiveGroupId] = useState();
  const classes = styles()

  useEffect(() => {
    if (window.localStorage) {
      const savedGroupSlug = window.localStorage.getItem('active-group-slug');
      const savedGroupName = window.localStorage.getItem('active-group-name');
      const savedGroupId = window.localStorage.getItem('active-group-id');
      savedGroupSlug && setActiveGroupSlug(savedGroupSlug);
      savedGroupName && setActiveGroupName(savedGroupName);
      savedGroupId && setActiveGroupId(savedGroupId);
    }
  }, []);
  return (
    <>
      <h1 className={classes.title}>Hello, {user.username}</h1>
      <p>
        Your most recent active group was {activeGroupName}.
      </p>

      {isHomepage && <SubjectsAndGroups
        {...other}
        orgId={orgId}
        userId={user.id}
        activeGroupSlug={activeGroupSlug}
        setActiveGroupSlug={setActiveGroupSlug}
        setActiveGroupName={setActiveGroupName}
        setActiveGroupId={setActiveGroupId}
      />}
      {!isHomepage && <PupilsAndGroups
        {...other}
        orgId={orgId}
        userId={user.id}
        groupName={activeGroupName}
        activeGroupSlug={activeGroupSlug}
        pupilsByGroupVariables={{ groupId: activeGroupId, orgId: orgId }}
        setActiveGroupSlug={setActiveGroupSlug}
        setActiveGroupName={setActiveGroupName}
        setActiveGroupId={setActiveGroupId}
      />}
    </>
  );
}

LastActiveGroup.propTypes = {
  orgId: PropTypes.number,
  isHomepage: PropTypes.bool,
  user: PropTypes.object,
};

export default LastActiveGroup;
 