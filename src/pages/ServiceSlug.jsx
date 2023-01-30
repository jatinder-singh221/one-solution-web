import { useState, useCallback, useEffect, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { ServicesSlugList } from '../api/Services'

export default function ServiceSlug() {

    const { slug } = useParams()
    const navigate = useNavigate()

    document.title = `Services - ${slug}`

    const [list, setlist] = useState({
        data: [],
        loading: true,
    })

    const handleLoadServicesList = useCallback(async () => {
        const api = await ServicesSlugList(slug)
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

    useEffect(() => { handleLoadServicesList() }, [handleLoadServicesList])

    return (
        <>
            <AppBar />
            <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto mt-20'>
                <h1 className='text-2xl font-bold capitalize'>Results for {slug}</h1>
                <Card list={list} type='service'/>
            </main>
            <Footer />
        </>
    )
}
