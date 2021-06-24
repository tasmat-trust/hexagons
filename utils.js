
const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const getOrgIdFromSession = (session) => {
    return session.user.image.length > 0 ? session.user.image[0].id : 1
}

export {
    fetcher, getOrgIdFromSession
}
