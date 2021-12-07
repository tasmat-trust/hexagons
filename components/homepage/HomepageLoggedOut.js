import { Button, Paper } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import usePublicStyles from '../../styles/usePublicStyles';

const styles = makeStyles((theme) => ({
  imageListItem: {},
  schoolLogosContainer: {
    width: '100%',
    textAlign: 'center',
  },
  schoolLogo: {
    width: 'clamp(10rem, 12vw, 12rem)',
    height: 'auto',
    display: 'inline',
  },
  fundingLogosContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  fundingLogo: {
    width: 'clamp(6rem, 9vw, 8rem)',
    height: 'auto',
  }
}));

export default function HomepageLoggedIn(props) {
  const classes = styles();
  const publicClasses = usePublicStyles();
  return (
    <section className={publicClasses.content}>
      <Paper className={publicClasses.paper}>
        <h2 className={publicClasses.welcome} data-test-id="public-welcome">Welcome to Hexagons</h2>
        <p className={publicClasses.openingPara}>
          The Hexagons App is an assessment tool designed for learners with SEND and the
          professionals who support them. It facilitates the tracking of small steps of progress in
          all curriculum areas and six areas of personal development.
        </p>
        <p className={publicClasses.para}>
          Hexagons gives schools a <strong>highly flexible</strong> and{' '}
          <strong>easily personalised</strong> system to support pupils with the highest needs to{' '}
          <strong>achieve their potential</strong> and <strong>celebrate their progress</strong>. It
          can be used to support learners and professionals working at both Primary and Secondary
          phases in mainstream or specialist setting.
        </p>
        <p className={publicClasses.para}>
          If you are interested in finding out how the Hexagon App could be used in your school
          please contact Natalie Shuttleworth (Hexagon App Lead) at{' '}
          <a href="mailto:nshuttleworth@tasmat.org.uk">nshuttleworth@tasmat.org.uk</a>
        </p>
        <Link href="mailto:nshuttleworth@tasmat.org.uk" passHref>
          <Button data-test-id="get-in-touch" className={publicClasses.button} variant="contained" color="secondary">
            Get in touch
          </Button>
        </Link>

        <div className={classes.schoolLogosContainer} data-test-id="school-logos">
          <img
            className={classes.schoolLogo}
            src="/logos/torfield-school.png"
            alt="Torfield School"
            width="223"
            height="226"
          />

          <img
            className={classes.schoolLogo}
            src="/logos/saxon-mount-community-school.png"
            alt="Saxon Mount Community School"
            width="512"
            height="493"
          />
        </div>

        <p className={publicClasses.secondPara}>
          This app has been created as a result of the collaboration between the staff of Torfield
          School and Saxon Mount School (
          <a href="http://torfield-saxonmount.com/">Torfield and Saxon Mount Academy Trust</a>) and
          app designers{' '}
          <a href="https://danny.is/" title="Danny Smith">
            Danny Smith
          </a>{' '}
          (initial design) and{' '}
          <a
            href="https://www.aliblackwell.com"
            title="Alasdair Blackwell: App Designer and Developer"
          >
            Alasdair Blackwell
          </a>{' '}
          (design and development).
        </p>
        <p className={publicClasses.secondPara}>
          We are grateful to the DfE via the Hastings Opportunity Area for funding enabling TASMAT
          to initiate this project.
        </p>
        <div className={classes.fundingLogosContainer} data-test-id="funder-logos">
          <div>
            <img
              className={classes.fundingLogo}
              src="/logos/department-for-education.png"
              alt="Department for Education"
              width="630"
              height="408"
            />
          </div>
          <div>
            <img
              className={classes.fundingLogo}
              src="/logos/east-sussex-county-council.png"
              alt="East Sussex County Council"
              width="300"
              height="300"
            />
          </div>
          <div>
            <img
              className={classes.fundingLogo}
              src="/logos/hastings-opportunity-area.png"
              alt="Hastings Opportunity Area"
              width="217"
              height="100"
            />
          </div>
        </div>
      </Paper>
    </section>
  );
}
