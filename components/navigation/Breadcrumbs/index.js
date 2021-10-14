import PropTypes from 'prop-types';
import { Breadcrumbs, Typography, Box } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  bc: {
    padding: theme.spacing(1),
    '@media(max-width: 600px)': {
      padding: 0,
    },
    '& ol': {
      '@media(max-width: 600px)': {
        justifyContent: 'center',
      },
      justifyContent: 'center',
    },
    '& li': {
      marginBottom: '1.4em',
    },
  },
  clear: {
    clear: 'left',
  },
  MenuButton: {
    display: 'flex',
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
  },
}));

function LinkOrLabel(props) {
  const { href, label, testId, model } = props;
  if (!href && !label) return null;
  return (
    <Box data-test-id={testId}>
      {href && (
        <Link color="inherit" href={href}>
          <a title={`Change ${model}`}>{label}</a>
        </Link>
      )}
      {!href && label && <Typography>{label}</Typography>}
    </Box>
  );
}

LinkOrLabel.propTypes = {
  href: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  testId: PropTypes.string,
};

function BreadCrumbs(props) {
  const classes = useStyles();
  const {
    firstLabel,
    firstModel,
    firstHref,
    secondLabel,
    secondModel,
    secondHref,
    thirdLabel,
    thirdModel,
    thirdHref,
    fourthLabel,
    fourthModel,
    fourthHref,
  } = props;

  return (
    <>
      <Breadcrumbs className={classes.bc} aria-label="breadcrumb">
        {firstLabel && (
          <LinkOrLabel
            testId="first-crumb"
            href={firstHref}
            label={firstLabel}
            model={firstModel}
          />
        )}
        {secondLabel && (
          <LinkOrLabel
            testId="second-crumb"
            href={secondHref}
            label={secondLabel}
            model={secondModel}
          />
        )}
        {thirdLabel && (
          <LinkOrLabel
            testId="third-crumb"
            href={thirdHref}
            label={thirdLabel}
            model={thirdModel}
          />
        )}
        {fourthLabel && (
          <LinkOrLabel
            testId="fourth-crumb"
            href={fourthHref}
            label={fourthLabel}
            model={fourthModel}
          />
        )}
      </Breadcrumbs>
      <Box className={classes.clear}></Box>
    </>
  );
}

BreadCrumbs.propTypes = {
  firstLabel: PropTypes.string,
  firstHref: PropTypes.string,
  secondLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  secondHref: PropTypes.string,
  thirdLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  thirdHref: PropTypes.string,
  fourthLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fourthHref: PropTypes.string,
};

export default BreadCrumbs;
