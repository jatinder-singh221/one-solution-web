import Cookies from 'universal-cookie'
const location = process.env.REACT_APP_API_KEY

const cookie = new Cookies()

const ProductsList = async () => {
    try {
        const url = location + `/products/list`
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

const ProductsSlugList = async (slug) => {
    try {
        const url = location + `/products/product-seller-list/${slug}`
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

export { ProductsList, ProductsSlugList }