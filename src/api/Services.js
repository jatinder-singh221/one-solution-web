import Cookies from 'universal-cookie'
const location = process.env.REACT_APP_API_KEY

const cookie = new Cookies()

const ServicesList = async () => {
    try {
        const url = location + `/services/list`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

const ServicesSlugList = async (slug) => {
    try {
        const url = location + `/services/service-provider-list/${slug}`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        return api
    } catch (error) {
        return { status: 500 }
    }
}

export { ServicesList, ServicesSlugList }