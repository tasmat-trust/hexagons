import { makeStyles } from '@material-ui/core/styles';

export default function HexagonTiles({ subjects }) {
  // https://github.com/web-tiki/responsive-grid-of-hexagons/blob/css-grid/index.html
  const stringStyles = makeStyles((theme) => ({
    // https://cssinjs.org/jss-plugin-template/?v=v10.7.1
    wrapper: `
      font-size: 14px;
    `,
    main: `
      display: flex;
      --s: 16rem; /* size */
      --r: 0.75; /* ratio */
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
    hexIn: ` 
      position: relative;
    `,
    hexContent: ` 
      position: absolute;
      text-align: center;
      width: 100%;
      height: 100%;
      float: left;
    `
  }))

  const makeJssStyles = makeStyles((theme) => ({
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

  const styles = stringStyles()
  const jssStyles = makeJssStyles()

  function HexagonTile({ subject }) {

    const isComplete = subject.percent > 85 ? true : ''

    return (
      <div className={`${styles.hex} ${jssStyles.hex}`}>
        <div className={`${styles.hexIn} ${isComplete && styles.HexagonTile__complete}`}>
          <div className={`${styles.hexContent}`}>
            <h2 className={styles.heading}>{subject.name}</h2>
            <p>{subject.stage}</p>
            <span className={styles.percentage}>{subject.percent}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={`${styles.container}  ${jssStyles.container}`}>
          {subjects.map((subject, i) => {
            return (
              <HexagonTile key={`tile-${i}`} subject={subject} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
