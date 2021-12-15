import { PropTypes } from 'prop-types'
import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import { Box } from '@mui/material'
import { useState } from 'react'
import useTileStyles from '../../styles/useTileStyles'
import CapabilityTileAdmin from './CapabilityTileAdmin'


function CapabilityTiles({ capabilities, ...other }) {
  const styles = stringStyles()
  const pseudoStyles = jssStyles()
  const [tilesDisabled, setTilesDisabled] = useState(false)
  const tileStyles = useTileStyles() 
  return (
    <>
      <Box className={styles.wrapper}>
        <div className={`${tileStyles.buttonBlocker} ${tileStyles[`buttonBlocker_${tilesDisabled ? 'visible' : 'hidden'}`]}`}></div>
        <div className={styles.main}>
          <div className={`${styles.container}  ${pseudoStyles.container}`}>
            {capabilities.map((capability, i) => {
              return (
                <CapabilityTileAdmin
                  {...other}
                  hexId={`hex-${i + 1}`}
                  setTilesDisabled={setTilesDisabled}
                  key={`capability-${i}`}
                  capability={capability}
                />
              )
            })}
          </div>
        </div>
      </Box>
    </>
  )
}

CapabilityTiles.propTypes = { 
  capabilities: PropTypes.array,
  competencies: PropTypes.array
}

export default CapabilityTiles