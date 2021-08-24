import PropTypes from 'prop-types'
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import Link from 'next/link'
import DialogButton from '../ui-globals/DialogButton'
function SubjectTile({ subject, onwardHref }) {
  const styles = stringStyles()
  const pseudoStyles = jssStyles()
  const isComplete = subject.percent > 85 ? true : ''
  return (
    <div className={`${styles.hex} ${styles[`hex_${subject.isCore ? 'core' : 'nonCore'}`]} ${pseudoStyles[`hex_${subject.isCore ? 'core' : 'nonCore'}`]}`}>
      <div className={`${styles.hexIn} ${isComplete && styles.HexagonTile__complete}`}>
        {subject.slug && (<Link href={`${onwardHref}/${subject.slug}`}>
          <a className={`${styles.hexLink} ${pseudoStyles.hexLink} hrxLink`}>
            {subject.name}
          </a>
        </Link>)}
        {!subject.slug && (<DialogButton
          className={styles.button}
          isHexagon={true}
          label={subject.name}
          content={<div className={`${styles.hexLink} ${pseudoStyles.hexLink} hrxLink`}>{subject.name}</div>}
        >
          <>
            {subject.subjects.map((s, i) => (
              <Link key={`subject-child-${i}`} href={`${onwardHref}/${s.slug}`}>
                <a>
                  {s.name}
                </a>
              </Link>
            ))}
          </>

        </DialogButton>)}
      </div>
    </div>
  )
}

SubjectTile.propTypes = {
  subject: PropTypes.object,
  onwardHref: PropTypes.string
}

export default SubjectTile