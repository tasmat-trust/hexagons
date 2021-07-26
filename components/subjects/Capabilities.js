import CapabilityTiles from '../subjects/CapabilityTiles'
import AddCapabilities from '../forms/AddCapabilities'

export default function Capabilities(props) {
  const { currentStage } = props
  return (
    <>
      <AddCapabilities {...props} />
      {currentStage && <CapabilityTiles tiles={currentStage.capabilities} />}
    </>
  )

}