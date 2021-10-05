
const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const getOrgIdFromSession = (user) => {
    return user.organization.id
}

export {
    fetcher, getOrgIdFromSession
}
