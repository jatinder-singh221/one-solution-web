import { useState, useCallback, useEffect } from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { useParams, Link } from 'react-router-dom'
import { MapPinIcon, StarIcon, ShoppingBagIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Details } from '../api'
import { useNavigate } from 'react-router-dom'

export default function ProductsAndServicesProvider() {
  const { slug } = useParams()
  document.title = slug
  const navigate = useNavigate()

  const [data, setdata] = useState({})

  const onLoad = useCallback(async () => {
    const api = await Details(slug)
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setdata(apiRes)
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
  }, [slug, navigate])

  useEffect(() => { onLoad() }, [onLoad])
  

  return (
    <>
      <Appbar />
      <main className="min-h-screen mt-24 mx-4 lg:mx-10 space-y-4">
        <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 w-[80%] lg:w-[70%] mx-auto'>
          <div className='flex justify-center  flex-col w-full space-y-4'>
            <p className='text-3xl text-violet-500'>{data.name}</p>
            <p className='flex items-center text-lg opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings {data.rating}</p>
            <p className='flex items-center text-lg opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings {data.booking}</p>
            <a href={`tel:${data.phone_number}`} className='flex items-center text-lg opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile {data.phone_number}</a>
            <div className='flex items-center opacity-80'>
              <MapPinIcon className='w-4 h-4 mr-2' />
              <span className='w-[90%]'>
                Address {data.address}
              </span>
            </div>
          </div>
          <img src={data.image} alt="banner" className='aspect-video h-52 rounded-md' />
        </div>
        <div className='w-[80%] lg:w-[70%] mx-auto space-y-1'>
          <p>Services And Products</p>
          <ul className='flex items-center'>
            {data.services?.map((data, index) => {
              return <li key={index} >
                <Link to={`/services/${data}`} className='cursor-pointer py-1 px-2 hover:bg-violet-600/10 text-violet-600 rounded'>{data}</Link>
              </li>
            })}
          </ul>
          <ul className='flex items-center'>
            {data.Products?.map((data, index) => {
              return <li key={index} >
                <Link to={`/products/${data}`} className='cursor-pointer py-1 px-2 hover:bg-violet-600/10 text-violet-600 rounded'>{data}</Link>
              </li>
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
