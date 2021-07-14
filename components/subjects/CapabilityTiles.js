import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import Link from 'next/link'

export default function CapabilityTiles({ tiles }) {

  const styles = stringStyles()
  const pseudoStyles = jssStyles()

  function CapabilityTile({ tile }) {



    return (
      <div className={`${styles.hex}`}>
        <div className={`${styles.hexIn}`}>
          <div className={`${styles.hexContent}`}>
            <div className={`${styles.hexContent_inner}`}>
              {tile.text}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={`${styles.container}  ${pseudoStyles.container}`}>
          {tiles.map((tile, i) => {
            return (
              <CapabilityTile key={`tile-${i}`} tile={tile} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
