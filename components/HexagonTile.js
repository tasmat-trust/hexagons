import styles from './HexagonTile.module.css'

export default function HexagonTile({ subject }) {
    return (
        <>
            <p className={styles.HexagonTile}>{subject.name}</p>
        </>
    )

}