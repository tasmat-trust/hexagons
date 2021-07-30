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
  container: `
    position: relative;
    width: 110vw;
    margin-left: -6vw; 
    font-size: 0;
    //padding-bottom: calc(var(--s) *var(--r) + var(--mv));
    min-width: calc(var(--s)  * 3);
    // margin-left: -6rem
  `,
  hex: `
    width: var(--s);
    margin: var(--mv) var(--mh);
    height: calc(var(--s) *var(--r));
    display: inline-block;
    font-size: initial;
    clip-path: polygon(var(--hc) 0, calc(100% - var(--hc)) 0, 100% var(--vc), 100% calc(100% - var(--vc)), calc(100% - var(--hc)) 100%,var(--hc) 100%, 0 calc(100% - var(--vc)), 0 var(--vc));
    background: ${theme.palette.info.light};
    margin-bottom: calc(var(--mv) - var(--vc));
  `,
  hex_incomplete: `

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
    float: left;
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
  container: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: '-20vw',
    },
    '&::before': {
      content: "''",
      width: "calc(var(--s)/2 + var(--mh))",
      float: "left",
      height: "200vh",
      "shape-outside": "repeating-linear-gradient(#0000 0 calc(var(--f) - 2px),#000  0 var(--f))"
    }
  }

}));

export {
  stringStyles,
  jssStyles
}