import { PropTypes } from 'prop-types'
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import SubjectTile from './SubjectTile'

function SubjectTiles({ isNarrow, subjects, ...other }) {
  const styles = stringStyles()
  const pseudoStyles = jssStyles()
  const isN = isNarrow ? isNarrow : false
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.main_wide} ${pseudoStyles.main_wide} ${isNarrow ? styles.main_wide_smaller : ''}`}>
        <div className={`${styles.container_wide}  ${pseudoStyles.container_wide}`}>
          {subjects.map((subject, i) => {
            return (
              <SubjectTile key={`tile-${i}`} subject={subject} {...other} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

SubjectTiles.propTypes = {
  isNarrow: PropTypes.boolean,
  subjects: PropTypes.array
}

export default SubjectTiles
