import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPinIcon, StarIcon, ShoppingBagIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { Details } from '../api/Base'
import DataLoading from '../components/DataLoading'
import Button from '../core/Button'

export default function ProductsAndServicesProvider() {

  const navigate = useNavigate()
  const { slug } = useParams()

  document.title = slug

  const [data, setdata] = useState({
    loading: true,
    detail: null
  })

  const onLoad = useCallback(async () => {
    const api = await Details(slug)
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setdata(pre => ({ ...pre, detail: apiRes }))
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
    setdata(pre => ({ ...pre, loading: false }))
  }, [slug, navigate])

  useEffect(() => { onLoad() }, [onLoad])


  return (
    <>
      <Appbar />
      <main className=" my-20 space-y-4">
        {!data.loading ? <div className='relative p-6  w-full lg:w-[75%] mx-auto bg-white space-y-4 shadow-lg shadow-violet-300 rounded-md'>
          <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
            <div className='flex justify-center  flex-col w-full space-y-4'>
              <Link to={`/details/${data.detail.slug}`} className='text-3xl text-violet-500 font-bold hover:underline capitalize'>{data.detail.name}</Link>
              <p className='flex items-center text-sm opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings: {data.detail.rating > 0 ? data.detail.rating : 'no ratings'}</p>
              <p className='flex items-center text-sm opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings: {data.detail.booking > 0 ? data.detail.booking : 'no bookings'}</p>
              <a href={`tel:${data.phone_number}`} className='flex items-center text-sm opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile: {data.detail.phone_number}</a>
              <a href={`http://maps.google.com/?q=${data.detail.address}`} className='flex items-start opacity-80 text-sm'>
                <MapPinIcon className='w-4 h-4 mr-2 ' />
                <span className='w-[70%]'>
                  Address: {data.detail.address}
                </span>
              </a>
            </div>
            <img src={data.detail.image} alt="banner" className='aspect-video h-52 rounded-md' />
          </div>
          <div className='space-y-1'>
            <p className='text-xl'>Services And Products</p>
            <p className='opacity-80 text-sm'>{data.detail.name} are providing these services and products to the customer</p>
            <ul className='flex items-center space-x-2'>
              {data.detail.services?.map((item, index) => {
                return <li key={index} >
                  <Button title={`View pricing of ${item}`} onClick={() => navigate(`/services/${item}/?open=${data.detail.slug}`)} />
                </li>
              })}
            </ul>
            <ul className='flex items-center'>
              {data.detail.Products?.map((item, index) => {
                return <li key={index} >
                  <Button title={`View pricing of ${item}`} onClick={() => navigate(`/products/${item}/?open=${data.detail.slug}`)} />
                </li>
              })}
            </ul>
          </div>
        </div> : <DataLoading />}
      </main>
      <Footer />
    </>
  )
}
