import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import Link from 'next/link'

export default function SubjectTiles({ subjects, onwardHref }) {

  const styles = stringStyles()
  const pseudoStyles = jssStyles()

  function SubjectTile({ subject }) {

    const isComplete = subject.percent > 85 ? true : ''
    return (
      <div className={`${styles.hex}`}>
        <div className={`${styles.hexIn} ${isComplete && styles.HexagonTile__complete}`}>
          {subject.slug && (<Link href={`${onwardHref}/${subject.slug}`}>
            <a className={`${styles.hexLink}`} href={onwardHref}>
              {subject.name}
            </a>
          </Link>)}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={`${styles.container}  ${pseudoStyles.container}`}>
          {subjects.map((subject, i) => {
            return (
              <SubjectTile key={`tile-${i}`} subject={subject} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
