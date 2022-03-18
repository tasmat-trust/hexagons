import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import PupilsAndGroups from './PupilsAndGroups';
import SubjectsAndGroups from './SubjectsAndGroups';
import { HexagonsContext } from '../data-fetching/HexagonsContext';
import DownloadViaGroups from '../groups/DownloadViaGroups';

function LastActiveGroup({
  user,
  isGroupSubjectPicker,
  isGroupPupilPicker,
  isDataExport,
  setParentGroupBreadcumbLabel,
  ...other
}) {
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
        savedGroupId && setActiveGroupId(parseInt(savedGroupId));
      }
    }
  }, [setParentGroupBreadcumbLabel, orgId]);
  return (
    <>
      {isGroupSubjectPicker && (
        <SubjectsAndGroups
          {...other}
          userId={user.id}
          activeGroupSlug={activeGroupSlug}
          setActiveGroupSlug={setActiveGroupSlug}
          setActiveGroupName={setActiveGroupName}
          setActiveGroupId={setActiveGroupId}
          groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
        />
      )}
      {isGroupPupilPicker && (
        <PupilsAndGroups
          {...other}
          userId={user.id}
          schoolType={user.organization.school_type}
          groupName={activeGroupName}
          activeGroupSlug={activeGroupSlug}
          pupilsByGroupVariables={{ groupId: activeGroupId, orgId: orgId }}
          groupFromSlugVariables={{ orgId: orgId, slug: activeGroupSlug }}
          setActiveGroupSlug={setActiveGroupSlug}
          setActiveGroupName={setActiveGroupName}
          setActiveGroupId={setActiveGroupId}
        />
      )}
      {isDataExport && (
        <DownloadViaGroups
          user={user}
          activeGroupSlug={activeGroupSlug}
          activeGroupId={activeGroupId}
          groupName={activeGroupName}
        />
      )}
    </>
  );
}

LastActiveGroup.propTypes = {
  isReportPage: PropTypes.bool,
  setParentGroupBreadcumbLabel: PropTypes.func,
  isGroupSubjectPicker: PropTypes.bool,
  isGroupPupilPicker: PropTypes.bool,
  user: PropTypes.object,
};

export default LastActiveGroup;
