import Cookies from 'universal-cookie'
const location = process.env.REACT_APP_API_KEY

const cookie = new Cookies()

const Search = async (query) => {
    try {
        const url = location + `/base/search?search=${query}`
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

const Details = async (slug) => {
    try {
        const url = location + `/base/${slug}`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        return api

    } catch (error) {
        return {status: 500}
    }
}

export { Search, Details }