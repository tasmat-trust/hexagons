const nameFromCamelCased = (str) => str.split(/([A-Z][a-z]+)/).filter(Boolean).join(' ')
const getNameFromCamelCased = (str) => {
    const n = nameFromCamelCased(str)
    return n.includes('Functional') ? n.replace('Functional', 'PfA') : n
}
export default getNameFromCamelCased