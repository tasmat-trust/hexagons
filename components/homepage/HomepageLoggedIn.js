import LastActiveGroup from '../groups/LastActiveGroup';

function HomepageLoggedIn(props) {
  return (
    <>
      <LastActiveGroup isHomepage={true} {...props} />
    </>
  );
}

export default HomepageLoggedIn;
