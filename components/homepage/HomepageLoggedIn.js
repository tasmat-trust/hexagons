import LastActiveGroup from '../groups/LastActiveGroup';

function HomepageLoggedIn(props) {
  return (
    <>
      <LastActiveGroup isGroupSubjectPicker={true} {...props} />
    </>
  );
}

export default HomepageLoggedIn;
