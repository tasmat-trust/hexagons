const getNameFromCamelCased = (str) => str.split(/([A-Z][a-z]+)/).filter(Boolean).join(' ')
export default getNameFromCamelCased