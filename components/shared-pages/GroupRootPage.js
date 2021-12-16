import PropTypes from 'prop-types';
import PupilsAndGroups from '../groups/PupilsAndGroups';
import CustomHead from '../ui-globals/CustomHead';

function GroupRootPage({ user, titleContent, activeGroupSlug, groupName, breadcrumbs, ...other }) {
  return (
    <>
      <CustomHead titleContent={titleContent} justContent={true} />
      {breadcrumbs}
      <PupilsAndGroups
        {...other}
        userId={user.id}
        schoolType={user.organization.school_type}
        groupName={groupName}
        activeGroupSlug={activeGroupSlug}
      />
    </>
  );
}

GroupRootPage.propTypes = {
  titleContent: PropTypes.string,
  breadcrumbs: PropTypes.object,
  user: PropTypes.object,
};

export default GroupRootPage;
