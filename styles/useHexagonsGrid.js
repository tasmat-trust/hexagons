import makeStyles from '@mui/styles/makeStyles';

const stringStyles = makeStyles((theme) => ({
  // https://cssinjs.org/jss-plugin-template/?v=v10.7.1
  wrapper: `
    font-size: 14px;
  `,
  main: `
    display: flex;
    width: 100vw;
    --s:  clamp(180px, 200px, 352px);
    --r: 0.9; /* ratio */
    /* clip-path */
    --h: 0.25;
    --v: 0.5;
    --hc: calc(clamp(0,var(--h), 0.5) * var(--s));
    --vc: calc(clamp(0,var(--v), 0.5) * var(--s) * var(--r));
    /*margin */
    --mv: 3px; /* vertical */
    --mh: calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 6px);
    --f: calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc));
    padding-bottom: calc(var(--s) * (var(--r) * 1.2));
  `,
  main_wide: `
    display: flex; 
    --s: clamp(10.5rem, 19vw, 20rem); 
    --r: 1.05; /* ratio */
    /* clip-path */
    --h: 0.5;
    --v: 0.25;
    --hc: calc(clamp(0,var(--h), 0.5) * var(--s));
    --vc: calc(clamp(0,var(--v), 0.5) * var(--s) * var(--r));
    /*margin */
    --mv: 4px; /* vertical */
    --mh: calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 1px);
    --f: calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc) - 2px);
    padding-bottom: calc(var(--s) * (var(--r) * 1.2));
  `,
  main_wide_smaller: `
     --s: clamp(10.5rem, 19vw, 20rem); 
  `,
  container: `
    position: relative; 
    font-size: 0;
    margin: 0 auto;   
    padding-bottom: 200px;
  `,
  container_wide: `
    position: relative;
    width: 100vw;
    font-size: 0;
    margin-left: 0vw;  
    min-width: calc(var(--s)  * 3);
  `,
  hex: `
    transition: all 0.2s ease-out;
    width: var(--s);
    margin: var(--mv) var(--mh);
    height: calc(var(--s) *var(--r));
    display: inline-block;
    font-size: initial;
    background: ${theme.palette.primary.main};
    clip-path: polygon(var(--hc) 0, calc(100% - var(--hc)) 0, 100% var(--vc), 100% calc(100% - var(--vc)), calc(100% - var(--hc)) 100%,var(--hc) 100%, 0 calc(100% - var(--vc)), 0 var(--vc));
    margin-bottom: calc(var(--mv) - var(--vc));
  `,
  hex_nonCore: `
    background: ${theme.palette.secondary.light};
  `,
  hex_core: `
    background: ${theme.palette.secondary.dark};
  `,
  hex_complete: `
    background: ${theme.palette.success.light};
  `,
  hex_incomplete: `
    background: ${theme.palette.primary.main};
  `,
  hex_target: `
    background: ${theme.palette.warning.light};
  `,
  hexIn: ` 
    position: relative;
    width: 100%;
    height: 100%;
  `,
  hexLink: `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    float: left;
    color: white;
    text-decoration: none;
    font-size: 1.3rem;
    font-family: ${theme.typography.secondaryFamily};
    font-weight: normal;
  `,
  hexButtonLink: ` 
    margin-bottom: ${theme.spacing(1)};
  `,
  hexContent: ` 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    float: left;
    font-size: clamp(0.6rem, 1.4vw, 1.4rem);
  `,
  button: `
    width: 100%;
    height: 100%;
    font-size: clamp(0.725rem, 1em,0.9rem);
    float: left;
  `,
  lightbulb: `
    position: absolute !important;
    top: 5%;
    right: 25%;
  `,
  lightbulbOn: `
    opacity: 100%;
  `,
  lightbulbOff: `
    opacity: 50%;
  `,
  hexContent_inner: `
    width: 70%;
    font-size: 13px;
    margin: 0px auto;
  `,
  tileInfo: `
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
  `,
  icon: `
    font-size: 1.4em;
  `,
}));

const jssStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 460px)': {
      width: '540px',
      marginLeft: '-70px',
    },
  },
  button: {
    '& .buttonFocusVisible': {
      display: 'none',
      position: 'absolute',
      top: '0rem',
      width: '100%',
      height: '0.25em',
      background: theme.palette.secondary.dark,
    },
    '&:focus': {
      '& .buttonFocusVisible': {
        display: 'block',
      },
    },
  },
  hex: {},
  hex_nonCore: {
    '& .hrxLink': {
      color: theme.palette.text.primary,
    },
  },
  main_wide_smaller: {
    '& .hrxLink': {},
  },
  main_wide: {
    [theme.breakpoints.down('sm')]: {
      '--s': '8rem',
      '--mv': '2px',
      '--mh': 'calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 1px)',
      '--f': 'calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc) - 1px)',
    },
  },
  hexContent: {},
  hexLink: {
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  container: {
    '&::before': {
      content: "''",
      width: 'calc(var(--s)/2 + var(--mh))',
      float: 'left',
      height: 'calc(100% + 400px)',
      'shape-outside': 'repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),#000  0 var(--f))',
    },
  },

  container_wide: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
    '&::before': {
      content: "''",
      width: 'calc(var(--s)/2 + var(--mh))',
      float: 'left',
      height: 'calc(100% + 400px)',
      'shape-outside': 'repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),#000  0 var(--f))',
    },
  },
}));

export { stringStyles, jssStyles };
