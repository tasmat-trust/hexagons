import { stringStyles, jssStyles } from '../../styles/useHexagonsGrid'
import { Box, ButtonBase } from '@material-ui/core'
import { useState, useEffect } from 'react'
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
  const { tile, isAdmin, competency, setCompetencies, gqlClient, currentModule, gotCurrentLevel, setGotCurrentLevel, subject, pupil, setCurrentLevel, currentLevelId } = props



  const [isComplete, setIsComplete] = useState(false)
  const [isTarget, setIsTarget] = useState(false)
  const [isIncomplete, setIsIncomplete] = useState(false)
  const [competencyStatus, setCompetencyStatus] = useState(null)


  useEffect(() => {
    let initialIsIncomplete = !competency
    const initialIsComplete = competency && competency.status === 'complete'
    const initialIsTarget = competency && competency.status === 'target'
    initialIsIncomplete = competency && competency.status === 'incomplete'
    setIsComplete(initialIsComplete)
    setIsTarget(initialIsTarget)
    setIsIncomplete(initialIsIncomplete)
    // competency && competency.status && setCompetencyStatus(competency.status)
  }, [competency])

  async function handleStatus() {

    let levelId = currentLevelId;
    if (!gotCurrentLevel && !currentLevelId) {
      const variables = {
        status: 'incomplete',
        subjectId: subject.id,
        pupilId: pupil.id,
        moduleId: currentModule.id
      }
      const level = await createLevel(gqlClient, variables)
      levelId = level.id
      setGotCurrentLevel(true)
      setCurrentLevel(level)
    }

    let status = isComplete ? 'target' : isTarget ? 'incomplete' : 'complete'
    // setCompetencyStatus(status) // Optimistic update
    if (status === 'complete') {
      setIsComplete(true)
      setIsTarget(false)
      setIsIncomplete(false)
    } else if (status === 'incomplete') {
      setIsIncomplete(true)
      setIsComplete(false)
      setIsTarget(false)
    } else if (status === 'target') {
      setIsTarget(true)
      setIsIncomplete(false)
      setIsComplete(false)
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

    if (levelId) {
      competencyVars.levelId = levelId
      refreshCompetencyVars.levelId = levelId
      createCompetency(gqlClient, competencyVars, checkCompetencyVars, refreshCompetencyVars, updateCompetencyVars, setCompetencies)
    }

  }



  return (
    <div className={`${styles.hex} ${competency && `${styles[`hex_${competency.status}`]}`}`}>
      <div className={`${styles.hexIn}`}>
        <div className={`${styles.hexContent}`}>
          {isAdmin && <Content tile={tile} styles={styles} />}
          {!isAdmin && (
            <ButtonBase className={styles.button} onClick={() => handleStatus()}>
              <Content tile={tile} styles={styles} />
            </ButtonBase>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CapabilityTiles(props) {
  const { tiles, competencies, module } = props
  const styles = stringStyles()
  const pseudoStyles = jssStyles()

  return (
    <>
      <Box style={props.style} className={styles.wrapper}>
        <div className={styles.main}>
          <div className={`${styles.container}  ${pseudoStyles.container}`}>
            {tiles.map((tile, i) => {
              const gotC = competencies && competencies.map((competency) => parseInt(tile.id) === competency.capability_fk ? competency : null)
              const capabilities = gotC && gotC.filter((competency) => competency !== null)
              const competency = capabilities ? capabilities[0] : null
              return (
                <CapabilityTile {...props} key={`tile-${i}`} tile={tile} competency={competency} />
              )
            })}
          </div>
        </div>
      </Box>
    </>
  )
}
