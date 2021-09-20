import PropTypes from 'prop-types';
import BreadCrumbs from '../navigation/Breadcrumbs';
import LastActiveGroup from '../groups/LastActiveGroup';

function HomepageLoggedIn({ user, ...other }) {
  return (
    <>
      <LastActiveGroup isHomepage={true} user={user} {...other} />
    </>
  );
}

HomepageLoggedIn.propTypes = {
  user: PropTypes.object,
};

export default HomepageLoggedIn;
