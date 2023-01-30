import { useState, useCallback, useEffect, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductsSlugList } from '../api/Products'

import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Productslug() {

    const { slug } = useParams()
    const navigate = useNavigate()

    document.title = `Product - ${slug}`

    const [list, setlist] = useState({
        loading: true,
        data: []
    })

    const handleLoaProductList = useCallback(async () => {
        const api = await ProductsSlugList(slug)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setlist(pre => ({ ...pre, data: apiRes }))
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
        setlist(pre => ({ ...pre, loading: false }))
    }, [navigate, slug])

    useEffect(() => { handleLoaProductList() }, [handleLoaProductList])


    return (
        <>
            <AppBar />
            <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto my-20'>
                <h1 className='text-2xl font-bold capitalize'>Results for {slug}</h1>
                <Card list={list} type='product'/>
            </main>
            <Footer />
        </>

    )
}

