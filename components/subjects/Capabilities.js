import CapabilityTiles from '../subjects/CapabilityTiles' 

export default function Capabilities(props) {
  const { currentStage } = props
  return (
    <>
      {currentStage && <CapabilityTiles tiles={currentStage.capabilities} />}
    </>
  )

}