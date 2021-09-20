import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import PupilsAndGroups from './PupilsAndGroups';
import SubjectsAndGroups from './SubjectsAndGroups'
import { makeStyles } from '@material-ui/core';
import { HexagonsContext } from '../data-fetching/HexagonsContext';

const styles = makeStyles((theme) => ({
  title: {
    'font-family': theme.typography.secondaryFamily
  }
}))

function LastActiveGroup({ user, isHomepage, ...other }) {
  const [activeGroupSlug, setActiveGroupSlug] = useState();
  const [activeGroupName, setActiveGroupName] = useState();
  const [activeGroupId, setActiveGroupId] = useState();
  const { orgId } = useContext(HexagonsContext)
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
      {isHomepage && <SubjectsAndGroups
        {...other}
        userId={user.id}
        activeGroupSlug={activeGroupSlug}
        setActiveGroupSlug={setActiveGroupSlug}
        setActiveGroupName={setActiveGroupName}
        setActiveGroupId={setActiveGroupId}
      />}
      {!isHomepage && <PupilsAndGroups
        {...other}
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
  isHomepage: PropTypes.bool,
  user: PropTypes.object,
};

export default LastActiveGroup;
