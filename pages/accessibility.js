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

      <section className={classes.content} data-test-id="accessibility-statement">
        <Paper className={classes.paper}>
          <h2 className={classes.welcome}>Accessibility statement for Hexagons App</h2>
          <p>
            Hexagons has been designed from the ground up to meet and exceed the latest
            accessibility standards, the{' '}
            <Link href="https://www.gov.uk/service-manual/helping-people-to-use-your-service/understanding-wcag">
              <a title="Government Digital Service on WCAG2.1">
                Web Content Accessibility Guidelines 2.1
              </a>
            </Link>
          </p>
          <p>
            This app is run by Torfield and Saxon Mount Acadamy Trust (TASMAT). We want as many
            people as possible to be able to use this app. For example, that means you should be
            able to:
          </p>
          <ul>
            <li>change colours, contrast levels and fonts</li>
            <li>zoom in up to 300% without the text spilling off the screen</li>
            <li>navigate most of the website using just a keyboard</li>
            <li>navigate most of the website using speech recognition software</li>
            <li>
              listen to most of the website using a screen reader (including the most recent
              versions of JAWS, NVDA and VoiceOver)
            </li>
          </ul>
          <p>We’ve also made the website text as simple as possible to understand.</p>
          <p>
            <Link href="https://mcmw.abilitynet.org.uk/">
              <a rel="external">AbilityNet</a>
            </Link>{' '}
            has advice on making your device easier to use if you have a disability.
          </p>

          <h3 id="reporting-accessibility-problems-with-this-website">
            Reporting accessibility problems with this website
          </h3>

          <p>
            We’re always looking to improve the accessibility of this app. If you find any problems
            not listed on this page or think we’re not meeting accessibility requirements, contact:
            nshuttleworth@tasmat.org.uk (Hexagons App Lead).
          </p>

          <h2 id="technical-information-about-this-websites-accessibility">
            Technical information about this app{"'"}s accessibility
          </h2>

          <p>
            TASMAT is committed to making its app accessible, in accordance with the Public Sector
            Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.
          </p>

          <h3 id="compliance-status">Compliance status</h3>

          <p>
            This website is fully compliant with the{' '}
            <Link href="https://www.w3.org/TR/WCAG21/">
              <a rel="external">Web Content Accessibility Guidelines version 2.1</a>
            </Link>{' '}
            AA standard.
          </p>
        </Paper>
      </section>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return allowPublicSession(ctx);
});
