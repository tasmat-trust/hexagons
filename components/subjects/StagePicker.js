import { Button } from "@material-ui/core"

export default function StagePicker(props) {
  const { stages, session, setCurrentStage } = props
  const stageName = session.school_type === 'primary' ? 'Step' : 'Stage'
  return (
    <>
      {stages && stages.map((stage, i) => (
        <Button key={`stage-${i}`} onClick={() => setCurrentStage(stage)}>
          {stageName} {stage.order}
        </Button>
      ))}
    </>
  )
}