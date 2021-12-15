import PropTypes from 'prop-types';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';

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

function BreadCrumbs(props) {
  const classes = useStyles();

  function BreadcrumbContent({ order }) {
    const href = props[`${order}Href`];
    const model = props[`${order}Model`];
    const label = props[`${order}Label`];
    const picker = props[`${order}Picker`];
    return (
      <Box data-test-id={`${order}-crumb`}>
        {href && (
          <Link color="inherit" href={href}>
            <a title={`Change ${model}`}>{label}</a>
          </Link>
        )}
        {!href && label && <Typography>{label}</Typography>}
        {picker && <>{picker}</>}
      </Box>
    );
  }

  BreadcrumbContent.propTypes = {
    order: PropTypes.string,
  };

  return (
    <>
      <Breadcrumbs className={classes.bc} aria-label="breadcrumb">
        {(props.firstLabel || props.firstPicker) && <BreadcrumbContent order="first" />}
        {(props.secondLabel || props.secondPicker) && <BreadcrumbContent order="second" />}
        {(props.thirdLabel || props.thirdPicker) && <BreadcrumbContent order="third" />}
        {(props.fourthLabel || props.fourthPicker) && <BreadcrumbContent order="fourth" />}
      </Breadcrumbs>
      <Box className={classes.clear}></Box>
    </>
  );
}

BreadCrumbs.propTypes = {
  firstLabel: PropTypes.string,
  firstPicker: PropTypes.object,
  firstHref: PropTypes.string,
  secondLabel: PropTypes.string,
  secondPicker: PropTypes.object,
  secondHref: PropTypes.string,
  thirdLabel: PropTypes.string,
  thirdPicker: PropTypes.object,
  thirdHref: PropTypes.string,
  fourthLabel: PropTypes.string,
  fourthPicker: PropTypes.object,
  fourthHref: PropTypes.string,
};

export default BreadCrumbs;
