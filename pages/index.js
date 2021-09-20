import HomepageLoggedIn from '../components/homepage/HomepageLoggedIn';
import HomepageLoggedOut from '../components/homepage/HomepageLoggedOut';

import { withSession } from '../components/auth/session';
import allowPublicSession from '../components/auth/allowPublicSession';
import CustomHead from '../components/ui-globals/CustomHead';

export default function Home(props) {
  return (
    <>
      <CustomHead titleContent="Hexagons" justContent={true} />
      <div className="container">
        {props.user && <HomepageLoggedIn {...props} />}
        {!props.user && <HomepageLoggedOut {...props} />}
      </div>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return allowPublicSession(ctx)
})

