import { useState, useCallback, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import EmptyResult from '../components/EmptyResult'
import ProductSvg from '../assests/products.svg'
import DataLoading from '../components/DataLoading'

import { ProductsList } from '../api/Products'

export default function Services() {

  document.title = 'Our Products'

  const navigate = useNavigate()

  const [list, setlist] = useState({
    loading: true,
    data: []
  })

  const handleLoadProductList = useCallback(async () => {
    const api = await ProductsList()
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
  }, [navigate])

  useEffect(() => { handleLoadProductList() }, [handleLoadProductList])


  return (
    <>
      <AppBar />
      <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto my-20'>
        <h1 className='text-2xl font-bold'>Our Products</h1>
        <div className='grid grid-cols-2'>
          <div className='col-span-full lg:col-span-1 order-1 lg:order-2 p-4'>
            <img src={ProductSvg} alt="services-img" loading='lazy' className='aspect-video' />
          </div>
          {!list.loading ? <ul className='col-span-full lg:col-span-1 order-2 lg:order-1 grid gap-4 grid-cols-3 rounded place-content-start  p-2'>
            {list.data?.length > 0 ? <>
              {list.data.map((data, index) => {
                return <li key={index} >
                  <Link to={`/products/${data.slug}`} title={data.name}  className='block hover:scale-110 transition-all'>
                    <img src={data.image} alt={data.name} loading="lazy" className='p-2  object-fill  mx-auto shadow-lg shadow-violet-300 rounded-md overflow-hidden bg-white ' />
                    <p className='capitalize mt-2 text-center text-sm'>{data.name}</p>
                  </Link>
                </li>
              })}
            </>
              : <EmptyResult name='no Products yet' />}
          </ul> : <DataLoading />}
        </div>
      </main>
      <Footer />
    </>
  )
}
