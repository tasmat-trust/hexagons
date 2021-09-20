import PropTypes from 'prop-types'
import Head from 'next/head'

function CustomHead({ titleContent, justContent }) {
  return (
    <Head>
      <title>{justContent ?  `${titleContent}` : `${titleContent} | Hexagons`}</title>
    </Head>
  )
}

CustomHead.propTypes = {
  justContent: PropTypes.bool,
  titleContent: PropTypes.string
}

export default CustomHead
