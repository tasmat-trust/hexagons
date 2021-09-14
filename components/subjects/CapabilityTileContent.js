import PropTypes from 'prop-types'

function CapabilityTileContent({ text, className }) {
  return (
    <div className={`${className}`}>
      {text}
    </div>
  )
}

CapabilityTileContent.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
}

export default CapabilityTileContent
