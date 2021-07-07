import { makeStyles } from '@material-ui/core/styles';

export default function HexagonTiles({ subjects }) {
  // https://github.com/web-tiki/responsive-grid-of-hexagons/blob/css-grid/index.html
  const stringStyles = makeStyles((theme) => ({
    // https://cssinjs.org/jss-plugin-template/?v=v10.7.1
    hexGrid: `
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
      font-family: 'Raleway', sans-serif;
      font-size: 15px;
      list-style-type: none;
    `,
    hex: `
      position: relative;
      visibility:hidden;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    `,
    hexIn: `
      position: absolute;
      width:96%;
      padding-bottom: 110.851%; /* =  width / sin(60) */
      margin:0 2%;
      overflow: hidden;
      visibility: hidden;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
      -webkit-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
          -ms-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
              transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    `,
    hexContent: `
      background: ${theme.palette.secondary.light};
      display:block;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #fff;
      overflow: hidden;
      -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
          -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
              transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    `,
    heading: `
      font-size: 1.4em;
    `,
    percentage: `
      background: ${theme.palette.primary.light};
      border-radius: 100%;
      padding: 0.5em;
    `,
  }))

  const makeJssStyles = makeStyles((theme) => ({
    hexGrid: {
      ["@media (min-width:1201px)"]: {  /* <- 5-4  hexagons per row */
        paddingBottom: "4.4%"
      }, 
      ["@media (max-width: 1200px) and (min-width:901px)"]: {  /* <- 4-3  hexagons per row */
        paddingBottom: "5.5%"
      },
      ["@media (max-width: 900px) and (min-width:601px)"]: {  /* <- 3-2  hexagons per row */
        paddingBottom: "7.4%"
      },
      ["@media (max-width: 600px) "]: { /* <- 2-1  hexagons per row */
        paddingBottom: "11.2%"
      }
    },
    hex: {
      ["@media (min-width:1201px)"]: { /* <- 5-4  hexagons per row */
        width: "20%", /* = 100 / 5 */
        '&:nth-child(9n+6)': {
          marginLeft: "10%",  /* = width of .hex / 2  to indent even rows */
        }
      },
      ["@media (max-width: 1200px) and (min-width:901px)"]: { /* <- 4-3  hexagons per row */
        width: "25%",  /* = 100 / 4 */
        '&:nth-child(7n+5)': { /* first hexagon of even rows */
          marginLeft: "12.5%",  /* = width of .hex / 2  to indent even rows */
        }
      },
      ["@media (max-width: 900px) and (min-width:601px)"]: { /* <- 3-2  hexagons per row */
        width: "33.333%", /* = 100 / 3 */
        '&:nth-child(5n+4)': {/* first hexagon of even rows */
          marginLeft: '16.666%', /* = width of .hex / 2  to indent even rows */
        }
      },
      ["@media (max-width: 600px)"]: { /* <- 2-1  hexagons per row */
        width: "50%", /* = 100 / 2 */
        '&:nth-child(3n+3)': {/* every third hexagon */
          marginLeft: '25%', /* = width of .hex / 2  to indent even rows */
        }
      },
      '&::after': {
        content: "''",
        display: "block",
        paddingBottom: "86.602%",  /* =  100 / tan(60) * 1.5 */
      }
    },
    hexIn: {
      '& *': {
        position: "absolute",
        visibility: "visible",
        outline: "1px solid transparent" /* fix for jagged edges in FF on hover transition */
      }
    },
    hexContent: {
      '& *': {
        "-webkit-transform": "translate3d(0,- 100 %, 0)",
        "-ms-transform": "translate3d(0, -100 %, 0)",
        "transform": "translate3d(0, -100 %, 0)"
      }
    }
  }));

  const styles = stringStyles()
  const jssStyles = makeJssStyles()

  function HexagonTile({ subject }) {

    const isComplete = subject.percent > 85 ? true : ''

    return (
      <li className={`${styles.hex} ${jssStyles.hex}`}>
        <div className={`${styles.hexIn} ${jssStyles.hexIn} ${isComplete && styles.HexagonTile__complete}`}>
          <div className={`${styles.hexContent} ${jssStyles.hexContent}`}>
            <h2 className={styles.heading}>{subject.name}</h2>
            <p>{subject.stage}</p>
            <span className={styles.percentage}>{subject.percent}</span>
          </div>
        </div>
      </li>
    )
  }

  return (
    <ul className={`${styles.hexGrid}  ${jssStyles.hexGrid}`}>
      {subjects.map((subject, i) => {
        return (
          <HexagonTile key={`tile-${i}`} subject={subject} />
        )
      })}
    </ul>
  )
}
