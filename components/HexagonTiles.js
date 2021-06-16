import { makeStyles } from '@material-ui/core/styles';

export default function HexagonTiles({ subjects }) {

  const useStyles = makeStyles((theme) => ({
    container: `
      font-size: 16px;
      padding: 12em 0 10rem 0;
      display: flex;
  `,
    HexagonTile_outer: `
      height: 16em;
      width: 16em;
      margin: 1px;
      position: relative;
      padding: 0;
      list-style: none;
    `,
    HexagonTile: `
      background: ${theme.palette.grey[300]};
      position: relative;
      height: 16em;
      width: 16em;
      margin: 1px;
      clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    `,
    HexagonTile__complete: `
      background: ${theme.palette.success.light};
    `,
    HexagonTileNth: {
      '&:nth-child(2n)': {
        position: 'relative',
        marginLeft: '0em',
        top: '0em',
      }
    },
    heading: `
      font-size: 1.4em;
    `,
    percentage: `
      background: ${theme.palette.primary.light};
      border-radius: 100%;
      padding: 0.5em;
    `,
    row: `
      display: inline-flex;
      flex-wrap: wrap; 
    `
  }))

  const styles = useStyles()


  function HexagonTile({ subject }) {


    const isComplete = subject.percent > 85 ? true : ''

    return (
      <li className={`${styles.HexagonTile_outer}  ${styles.HexagonTileNth}`}>
        <div className={`${styles.HexagonTile} ${isComplete && styles.HexagonTile__complete}`}>
          <div className={styles.HexagonTile_content}>
            <h2 className={styles.heading}>{subject.name}</h2>
            <p>{subject.stage}</p>
            <span className={styles.percentage}>{subject.percent}</span>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className={styles.row}>
      {subjects.map((subject, i) => {
        return (
          <HexagonTile subject={subject} />
        )
      })}
    </div>
  )
}
