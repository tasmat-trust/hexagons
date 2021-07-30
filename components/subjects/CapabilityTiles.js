import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import DialogButton from '../mui/DialogButton'
import { Button } from '@material-ui/core'
import { useState } from 'react'
import createCompetency from '../forms/handlers/createCompetency'
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
  const pseudoStyles = jssStyles()
  const { tile, competency, setCompetencies, gqlClient } = props
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
      pupilId: props.pupil.id
    }

    if (props.level) {
      competencyVars.levelId = props.level.id
      refreshCompetencyVars.levelId = props.level.id
    } else {
      const levelVars = {
        moduleId: props.currentStage.id,
        subjectId: props.subject.id,
        pupilId: props.pupil.id
      }
      const levelId = await createLevel(gqlClient, levelVars)
      competencyVars.levelId = levelId
      refreshCompetencyVars.levelId = levelId
    }
    createCompetency(gqlClient, competencyVars, checkCompetencyVars, refreshCompetencyVars, updateCompetencyVars, setCompetencies)
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


export default function CapabilityTiles({level, tiles, ...other}) {
  const styles = stringStyles()
  const pseudoStyles = jssStyles()

  let initialCompetencies = level && level.competencies ? level.competencies : null
  const [competencies, setCompetencies] = useState(initialCompetencies)


  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={`${styles.container}  ${pseudoStyles.container}`}>
          {tiles.map((tile, i) => {
            let competency = null
            if (level) {
              const gotC = competencies.map((competency) => parseInt(tile.id) === competency.capability_fk ? competency : null)
              const capabilities = gotC.filter((competency) => competency !== null)
              competency = capabilities[0]
            }

            return (
              <CapabilityTile {...other} key={`tile-${i}`} tile={tile} competency={competency} setCompetencies={setCompetencies} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
