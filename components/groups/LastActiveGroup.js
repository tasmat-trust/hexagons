import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import PupilsAndGroups from './PupilsAndGroups';
import SubjectsAndGroups from './SubjectsAndGroups';
import { HexagonsContext } from '../data-fetching/HexagonsContext';

function LastActiveGroup({ user, isHomepage, setParentGroupBreadcumbLabel, ...other }) {
  const [activeGroupSlug, setActiveGroupSlug] = useState();
  const [activeGroupName, setActiveGroupName] = useState();
  const [activeGroupId, setActiveGroupId] = useState();
  const { orgId } = useContext(HexagonsContext);

  useEffect(() => {
    if (window.localStorage) {
      const savedGroupSlug = window.localStorage.getItem('active-group-slug');
      const savedGroupName = window.localStorage.getItem('active-group-name');
      const savedGroupId = window.localStorage.getItem('active-group-id');
      const savedGroupOrgId = parseInt(window.localStorage.getItem('active-group-org-id'));
      if (savedGroupOrgId === orgId) {
        savedGroupSlug && setActiveGroupSlug(savedGroupSlug);
        savedGroupName && setActiveGroupName(savedGroupName);
        savedGroupName &&
          setParentGroupBreadcumbLabel &&
          setParentGroupBreadcumbLabel(savedGroupName);
        savedGroupId && setActiveGroupId(savedGroupId);
      }
    }
  }, [setParentGroupBreadcumbLabel, orgId]);
  return (
    <>
      {isHomepage && (
        <SubjectsAndGroups
          {...other}
          userId={user.id}
          activeGroupSlug={activeGroupSlug}
          setActiveGroupSlug={setActiveGroupSlug}
          setActiveGroupName={setActiveGroupName}
          setActiveGroupId={setActiveGroupId}
        />
      )}
      {!isHomepage && (
        <PupilsAndGroups
          {...other}
          userId={user.id}
          schoolType={user.organization.school_type}
          groupName={activeGroupName}
          activeGroupSlug={activeGroupSlug}
          pupilsByGroupVariables={{ groupId: activeGroupId, orgId: orgId }}
          setActiveGroupSlug={setActiveGroupSlug}
          setActiveGroupName={setActiveGroupName}
          setActiveGroupId={setActiveGroupId}
        />
      )}
    </>
  );
}

LastActiveGroup.propTypes = {
  setParentGroupBreadcumbLabel: PropTypes.func,
  isHomepage: PropTypes.bool,
  user: PropTypes.object,
};

export default LastActiveGroup;
