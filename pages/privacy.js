import { withSession } from '../components/auth/session';
import allowPublicSession from '../components/auth/allowPublicSession';
import CustomHead from '../components/ui-globals/CustomHead';
import usePublicStyles from '../styles/usePublicStyles';
import { Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const classes = usePublicStyles();
  return (
    <>
      <CustomHead titleContent="Accessibility" />

      <section className={classes.content} data-test-id="privacy-statement">
        <Paper className={classes.paper}>
          <h2 className={classes.welcome}>Privacy and Security statement for Hexagons App</h2>
          <p>
            Users of this app are subject to the privacy policy of their school or trust. The app
            makes use of no tracking cookies or anything that might compromise the privacy of the
            app{"'"}s users.
          </p>
          <p>The app fully complies with the data protection principles under the GDPR</p>
          <p>
            A full data protection impact assessment has been completed which you can request by
            emailing nshuttleworth@tasmat.org.uk (Hexagons App Lead)
          </p>
          <p>Pertinent points are listed below:</p>
          <h3>Security:</h3>
          <p>The Hexagons App cloud based server is hosted in Frankfurt. </p>
          <p>
            The Hexagons system is comprised of a database server and an app server. Every
            organisation that uses Hexagons is provided with their own database, database server and
            app server on cloud computing infrastructure that they administrate. This ensures that
            no users of the system from other organisations could gain access to other
            organisations{"'"} data through bugs in the codebase.
          </p>
          <p>
            Each Hexagons installation is given a list of domains from which it will accept user
            registrations.{' '}
          </p>
          <p>
            The database is managed by a super user with full read/write capabilities. Hexagons app
            users are assigned one of two roles, Leader or Teacher, with a Teacher having a limited
            subset of a Leader’s access rights. Only the super user can delete records, and this is
            done via a separate interface to the app itself.
          </p>
          <p>
            Encryption: The app server serves both the app and the database access API over HTTPS, a
            standard way of ensuring data integrity between client and server. Logged-in user
            sessions are secured with symmetric key encryption,
            further enabling us to securely pass cookies between the client and server.{' '}
          </p>
        </Paper>
      </section>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return allowPublicSession(ctx);
});
