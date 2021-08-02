import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import DialogButton from '../mui/DialogButton'
import { Button } from '@material-ui/core'
import { useState } from 'react'
import createCompetency from '../forms/handlers/createCompetency'
import LevelStatus from '../pupil/LevelStatus'
import createLevel from '../forms/handlers/createLevel'
function Content({ tile, styles }) {
  return (
    <div className={`${styles.hexContent_inner}`}>
      {tile.text}
    </div>
  )
}


function CapabilityTile(props) {
  const styles = stringStyles()
  const { tile, competency, setCompetencies, gqlClient, currentLevel, setPassedUpCompetencies } = props
  const [isComplete, setIsComplete] = useState(false)
  const [isTarget, setIsTarget] = useState(false)
  const [isIncomplete, setIsIncomplete] = useState(false)
  let handleCloseDialog;

  async function handleStatus(status) {

    if (status === 'complete') {
      setIsComplete(true)
    } else if (status === 'incomplete') {
      setIsIncomplete(true)
    } else if (status === 'target') {
      setIsTarget(true)
    }

    const competencyVars = {
      subjectId: props.subject.id,
      pupilId: props.pupil.id,
      status: status,
      adaptation: '',
      capability_fk: parseInt(tile.id),
      capability_text: tile.text
    }

    const checkCompetencyVars = {
      capability_fk: parseInt(tile.id),
      pupilId: props.pupil.id
    }

    const updateCompetencyVars = {
      status: status,
      adaptation: ''
    }

    const refreshCompetencyVars = {
      pupilId: props.pupil.id,
      subjectId: props.subject.id
    }

    if (currentLevel) {
      competencyVars.levelId = currentLevel.id
      refreshCompetencyVars.levelId = currentLevel.id
    }


    createCompetency(gqlClient, competencyVars, checkCompetencyVars, refreshCompetencyVars, updateCompetencyVars, setCompetencies, setPassedUpCompetencies)
    handleCloseDialog && handleCloseDialog()
  }

  function bubbleHandleClose(handleClose) {
    handleCloseDialog = handleClose
  }
  return (
    <div className={`${styles.hex} ${competency && `${styles[`hex_${competency.status}`]}`}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          <DialogButton bubbleHandleClose={bubbleHandleClose} isHexagon={true} className={styles.button} content={<Content tile={tile} styles={styles} />}>
            <p>{tile.text}</p>
            <Button variant='contained' color='primary' onClick={() => handleStatus('complete')}>Complete</Button>
            <Button variant='contained' color='secondary' onClick={() => handleStatus('target')}>Target</Button>
            <Button variant='contained' onClick={() => handleStatus('incomplete')}>Incomplete</Button>
          </DialogButton>
        </div>
      </div>
    </div>
  )
}


export default function CapabilityTiles (props) {
  const { level, tiles, gotActiveLevel, competencies, module } = props
  const styles = stringStyles()
  const pseudoStyles = jssStyles()

  const [currentLevel, setCurrentLevel] = useState(level)
  return (
    <>
      {gotActiveLevel && <LevelStatus currentLevel={currentLevel} {...props} />}
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={`${styles.container}  ${pseudoStyles.container}`}>
            {tiles.map((tile, i) => {
              const gotC = competencies && competencies.map((competency) => parseInt(tile.id) === competency.capability_fk ? competency : null)
              const capabilities = gotC && gotC.filter((competency) => competency !== null)
              const competency = capabilities ? capabilities[0] : null
          

              return (
                <CapabilityTile {...props} currentLevel={currentLevel} key={`tile-${i}`} tile={tile} competency={competency}  />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
