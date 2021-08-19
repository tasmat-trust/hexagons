import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PupilsAndGroups from './PupilsAndGroups';

function LastActiveGroup({ user, orgId, ...other }) {
  const [activeGroupSlug, setActiveGroupSlug] = useState();
  const [activeGroupName, setActiveGroupName] = useState();
  const [activeGroupId, setActiveGroupId] = useState();

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
      <h1>Hello, {user.username}</h1>
      <p>
        Your most recent active group was {activeGroupName}. You can choose another group or search
        for an individual pupil.
      </p>
      <PupilsAndGroups
        {...other}
        orgId={orgId}
        userId={user.id}
        activeGroupSlug={activeGroupSlug}
        pupilsByGroupVariables={{ groupId: activeGroupId, orgId: orgId }}
        setActiveGroupSlug={setActiveGroupSlug}
        setActiveGroupName={setActiveGroupName}
        setActiveGroupId={setActiveGroupId}
      />
    </>
  );
}

LastActiveGroup.propTypes = {
  orgId: PropTypes.number,
  user: PropTypes.object,
};

export default LastActiveGroup;
