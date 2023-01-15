import { useState, useCallback, useEffect } from 'react'
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import EmptyResult from '../components/EmptyResult'
import ServiceSvg from '../assests/services.svg'

import { useNavigate, Link } from 'react-router-dom'

import { ProductsList } from '../api'

export default function Services() {

  document.title = 'Our Products'

  const [list, setlist] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()

  const handleLoadProductList = useCallback(async () => {
    const api = await ProductsList()
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setlist(apiRes)
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
    setloading(false)
  }, [navigate])

  useEffect(() => { handleLoadProductList() }, [handleLoadProductList])


  return (
    <>
      <AppBar />
      <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto my-20'>
        <h1 className='text-2xl font-bold'>Our Products</h1>
        <div className='grid grid-cols-2'>
          <div className='col-span-full lg:col-span-1 order-1 lg:order-2 p-4'>
            <img src={ServiceSvg} alt="services-img" loading='lazy' className='aspect-video' />
          </div>
          {!loading ? <ul className='col-span-full lg:col-span-1 order-2 lg:order-1 grid grid-cols-2 gap-4 lg:grid-cols-3 rounded place-content-start  p-2'>
            {list.length > 0 ? <>
              {list.map((data, index) => {
                return <li key={index} className='py-4 rounded w-full hover:bg-violet-500 hover:text-white '>
                  <Link to={`/products/${data.slug}`} title={data.name}>
                    <img src={data.image} alt={data.name} loading="lazy" className='h-20 w-20 object-fill  mx-auto' />
                    <p className='capitalize mt-2 text-center'>{data.name}</p>
                  </Link>
                </li>
              })}
            </>
              : <EmptyResult name='no services yet' />}
          </ul> : <p>loading...</p>}
        </div>
      </main>
      <Footer />
    </>
  )
}
