import { Button } from "@material-ui/core"

export default function StagePicker(props) {
  const { stages, user, setCurrentStage } = props
  const stageName = user.organization.school_type === 'primary' ? 'Step' : 'Stage'
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