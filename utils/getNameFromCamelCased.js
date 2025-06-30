const nameFromCamelCased = (str) => {
    if (!str) return '';
    return str.split(/([A-Z][a-z]+)/).filter(Boolean).join(' ');
}

const getNameFromCamelCased = (str) => {
    if (!str) return '';
    const n = nameFromCamelCased(str);
    return n.includes('Functional') ? n.replace('Functional', 'PfA') : n;
}

export default getNameFromCamelCased