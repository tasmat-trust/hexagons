import styles from "./HexagonTiles.module.css"

export default function HexagonTiles({ subjects }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          {subjects.map((subject) => (
            <li className={styles.HexagonTile}>{subject.name}</li>
          ))}
        </div>
      </div>
    </>
  )
}
