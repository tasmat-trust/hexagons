import PropTypes from 'prop-types';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    item: {
      color: theme.palette.text.secondary,
    },
    bc: {
      padding: theme.spacing(1),
      '@media(max-width: 600px)': {
        padding: 0,
      },
      '& ol': {
        '@media(max-width: 600px)': {
          justifyContent: 'center',
        },
        justifyContent: 'left',
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
  };
});

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
          <Chip
            title={`Change ${model}`}
            label={label}
            component="a"
            href={href}
            color="primary"
            clickable
          />
        )}
        {!href && label && <Chip label={label} color="primary" />}
        {picker && <>{picker}</>}
      </Box>
    );
  }

  BreadcrumbContent.propTypes = {
    order: PropTypes.string,
  };

  return (
    <>
      <Breadcrumbs
        className={classes.bc}
        aria-label="breadcrumb"
        separator={<ArrowForwardIcon className={classes.item} fontSize="small" />}
      >
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
