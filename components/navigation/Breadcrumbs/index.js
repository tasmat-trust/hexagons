import PropTypes from 'prop-types';
import { Breadcrumbs, Typography, Box } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  bc: {
    float: 'left',
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
  const { href, label, testId } = props;
  if (!href && !label) return null;
  return (
    <Box data-test-id={testId}>
      {href && (
        <Link color="inherit" href={href}>
          {label}
        </Link>
      )}
      {!href && label && <Typography>{label}</Typography>}
    </Box>
  );
}

LinkOrLabel.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  testId: PropTypes.string,
};

function BreadCrumbs(props) {
  const classes = useStyles();
  const {
    firstLabel,
    firstHref,
    secondLabel,
    secondHref,
    thirdLabel,
    thirdHref,
    fourthLabel,
    fourthHref,
  } = props;

  return (
    <>
      <Breadcrumbs className={classes.bc} aria-label="breadcrumb">
        {firstLabel && <LinkOrLabel testId="first-crumb" href={firstHref} label={firstLabel} />}
        {secondLabel && <LinkOrLabel testId="second-crumb" href={secondHref} label={secondLabel} />}
        {thirdLabel && <LinkOrLabel testId="third-crumb" href={thirdHref} label={thirdLabel} />}
        {fourthLabel && <LinkOrLabel testId="fourth-crumb" href={fourthHref} label={fourthLabel} />}
      </Breadcrumbs>
      <Box className={classes.clear}></Box>
    </>
  );
}

BreadCrumbs.propTypes = {
  firstLabel: PropTypes.string,
  firstHref: PropTypes.string,
  secondLabel: PropTypes.string,
  secondHref: PropTypes.string,
  thirdLabel: PropTypes.string,
  thirdHref: PropTypes.string,
  fourthLabel: PropTypes.string,
  fourthHref: PropTypes.string,
};

export default BreadCrumbs;
