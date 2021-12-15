export default function getPermittedDomains(orgId, orgs) {
  let hArray = ''
  let cArray = []
  try {
    const org = orgs.filter((org) => parseInt(org.id) === parseInt(orgId))[0]
    const domains = org.email_domains.split(',')
    cArray = domains.map((domain) => domain.split(" ").join(""))
    hArray = cArray.map((domain, i) => `${domain}${i + 1 !== cArray.length ? ' or ' : ''}`)
  } catch (e) {
    console.error(e)
    return {
      error: {
        message: 'Error getting domain from organisation. Please check with person in charge.'
      }
    }
  }
  return {
    humanOrgsArray: hArray.toString().replace(/,/g, ''),
    computerOrgsArray: cArray
  };
}
