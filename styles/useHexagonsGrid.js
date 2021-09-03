import { makeStyles } from '@material-ui/core/styles';

const stringStyles = makeStyles((theme) => ({
  // https://cssinjs.org/jss-plugin-template/?v=v10.7.1
  wrapper: `
    font-size: 14px;
  `,
  main: `
    display: flex;
    --s: 16rem; /* size */
    --r: 0.9; /* ratio */
    /* clip-path */
    --h: 0.25;
    --v: 0.5;
    --hc: calc(clamp(0,var(--h), 0.5) * var(--s));
    --vc: calc(clamp(0,var(--v), 0.5) * var(--s) * var(--r));
    /*margin */
    --mv: 4px; /* vertical */
    --mh: calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 8px);
    --f: calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc) - 2px);
  `,
  main_wide: `
    display: flex; 
    --s: 16rem; /* size */
    --r: 1.05; /* ratio */
    /* clip-path */
    --h: 0.5;
    --v: 0.25;
    --hc: calc(clamp(0,var(--h), 0.5) * var(--s));
    --vc: calc(clamp(0,var(--v), 0.5) * var(--s) * var(--r));
    /*margin */
    --mv: 4px; /* vertical */
    --mh: calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 2px);
    --f: calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc) - 2px);
  `,
  main_wide_smaller: `
    --s: 10rem;
  `,
  container: `
    position: relative;
    width: 110vw;
    font-size: 0;
    margin-left: -6vw; 
    //padding-bottom: calc(var(--s) *var(--r) + var(--mv));
    min-width: calc(var(--s)  * 3);
  `,
  container_wide: `
    position: relative;
    width: 110vw;
    font-size: 0;
    margin-left: -1vw; 
    //padding-bottom: calc(var(--s) *var(--r) + var(--mv));
    min-width: calc(var(--s)  * 3);
  `,
  hex: `
    width: var(--s);
    margin: var(--mv) var(--mh);
    height: calc(var(--s) *var(--r));
    display: inline-block;
    font-size: initial;
    clip-path: polygon(var(--hc) 0, calc(100% - var(--hc)) 0, 100% var(--vc), 100% calc(100% - var(--vc)), calc(100% - var(--hc)) 100%,var(--hc) 100%, 0 calc(100% - var(--vc)), 0 var(--vc));
    background: ${theme.palette.primary.main};
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
    font-size: 1.4rem;
    font-family: ${theme.typography.secondaryFamily};
    font-weight: normal;
  `,
  hexButtonLink: ` 
    margin-bottom: ${theme.spacing(1)}px;
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
  `,
  button: `
    width: 100%;
    height: 100%;
    font-size: inherit;
    float: left;
  `,
  hexContent_inner: `
    width: 70%;
    margin: 0px auto;
  `
}))

const jssStyles = makeStyles((theme) => ({
  hex: {
    '&:hover': {
      background: theme.palette.info.dark,
    }
  },
  hex_nonCore: {
    '& .hrxLink': {
      color: theme.palette.text.primary
    }
  },
  main_wide_smaller: {
    '& .hrxLink': {
      fontSize: '1rem'
    }
  },
  main_wide: {
    [theme.breakpoints.down('xs')]: {
      '--s': '8rem',
      '--mv': '2px',
      '--mh': 'calc(var(--mv) + (var(--s) - 2 *var(--hc)) /2 + 1px)',
      '--f': 'calc(2 *var(--s) *var(--r) + 4 *var(--mv) - 2 *var(--vc) - 1px)'
    }
  },
  hexLink: {
    '&:hover': {
      textDecoration: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '140%',
      minWidth: '140%',
      marginLeft: '-20vw',
    },
    '&::before': {
      content: "''",
      width: "calc(var(--s)/2 + var(--mh))",
      float: "left",
      height: "300vh",
      "shape-outside": "repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),#000  0 var(--f))"
    }
  },
  container_wide: {
    [theme.breakpoints.down('xs')]: {
      minWidth: '130%',
      width: '130%',
      marginLeft: '-3rem',
    },
    '&::before': {
      content: "''",
      width: "calc(var(--s)/2 + var(--mh))",
      float: "left",
      height: "100%",
      "shape-outside": "repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),#000  0 var(--f))"
    }
  }

}));

export {
  stringStyles,
  jssStyles
}