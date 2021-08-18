import { PropTypes } from 'prop-types'
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import SubjectTile from './SubjectTile'

function SubjectTiles({ subjects, onwardHref }) {
  const styles = stringStyles()
  const pseudoStyles = jssStyles()
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_wide}>
        <div className={`${styles.container_wide}  ${pseudoStyles.container_wide}`}>
          {subjects.map((subject, i) => {
            return (
              <SubjectTile key={`tile-${i}`} subject={subject} onwardHref={onwardHref} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

SubjectTiles.propTypes = {
  subjects: PropTypes.array,
  onwardHref: PropTypes.string
}

export default SubjectTiles
