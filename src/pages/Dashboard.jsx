import { useEffect, useCallback, useContext, useState, Fragment } from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { MyBookings, MyServiceBookings, MyProductBookings, MyServiceBookingUpdate, MyProductBookingUpdate } from '../api'
import { store } from '../App'
import EmptyResult from '../components/EmptyResult'
import ProtectedRoutes from '../Protected'
import Button from '../core/Button'
import { Transition, Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Icon from '../core/Icon'
import Select from '../core/SelectInput'
import Input from '../core/Input'
import { price } from './MyServices'


export default function Dashboard() {
  const navigate = useNavigate()
  const storeState = useContext(store) ?? false
  const { user } = storeState.state

  const [bookings, setbookings] = useState([])
  const [isOpen, setisOpen] = useState(false)
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState({})

  const onLoad = useCallback(async () => {
    let api = ''
    if (user.is_user)
      api = await MyBookings()
    else if (user.is_service_provider)
      api = await MyServiceBookings()
    else if (user.is_product_seller)
      api = await MyProductBookings()
      
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        if (user.is_user)
          setbookings(apiRes)
        else if (user.is_service_provider)
          setbookings({ products: [], services: apiRes })
          else if (user.is_product_seller)
          setbookings({ services: [], products: apiRes })
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
    setloading(false)
  }, [navigate, user.is_user, user.is_service_provider, user.is_product_seller])

  useEffect(() => { onLoad() }, [onLoad])
  document.title = 'Dashboard'

  const handleopen = (data) => {
    setdata(data)
    setisOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let api = await MyServiceBookingUpdate(data)
    if (user.is_service_provider)
      api = await MyServiceBookingUpdate(data)
    else if (user.is_product_seller)
      api = await MyProductBookingUpdate(data)
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        if (user.is_service_provider) {
          const newState = bookings.services.map(obj => {
            if (obj.id === apiRes.id) {
              return { ...obj, ...apiRes }
            }
            return obj
          })
          setbookings({ products: [], services: newState })
        }
        else if (user.is_product_seller) {
          const newState = bookings.products.map(obj => {
            if (obj.id === apiRes.id) {
              return { ...obj, ...apiRes }
            }
            return obj
          })
          setbookings({ services: [], products: newState })
        }
        storeState.setmessage({
          hidden: false,
          message: 'Update sucessfull'
        })
        setisOpen(false)
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
  }


  return (
    <ProtectedRoutes>
      <Appbar />
      <main className="mt-20 min-h-screen mx-4 lg:mx-10 space-y-4">
        <h1 className='text-2xl font-bold'>My Bookings</h1>
        {!loading ?
          <>
            <div class="relative overflow-x-auto hidden-scroll" >
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-100">
                      Shop/bussiness
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Service/Product
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-100">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3 ">
                      Address
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-100">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-100">
                      Phone Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Alternate Phone Number
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-100">
                      Status
                    </th>
                    {user.is_service_provider || user.is_product_seller ? <th scope="col" class="px-6 py-3 ">

                    </th> : null}
                  </tr>
                </thead>
                <tbody>
                  {bookings.products?.length > 0 || bookings.services?.length > 0 ? <>
                    {bookings.products?.map((data, index) => {
                      return <tr class="" key={index}>

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100 ">
                          {data.product_seller}
                        </th>
                        <td class="px-6 py-4">
                          {data.Product}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.catagory}
                        </td>
                        <td class="px-6 py-4 w-44 truncate">
                          {data.address}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.price}
                        </td>
                        <td class="px-6 py-4">
                          {data.quantity}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.phone}
                        </td>
                        <td class="px-6 py-4">
                          {data.alter_phone}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.status === 'p' ? 'Pending' : 'Complete'}
                        </td>
                        {user.is_service_provider || user.is_product_seller ? <td>
                          <Button title='Edit' onClick={() => handleopen(data)} disabled={data.status === 'C'} />
                        </td> : null}
                      </tr>
                    })}
                    {bookings.services?.map((data, index) => {
                      return <tr class="" key={index}>

                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100 ">
                          {data.service_provider}
                        </th>
                        <td class="px-6 py-4">
                          {data.service}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.catagory}
                        </td>
                        <td class="px-6 py-4 w-44 truncate">
                          {data.address}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.price}
                        </td>
                        <td class="px-6 py-4">
                          NILL
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.phone}
                        </td>
                        <td class="px-6 py-4">
                          {data.alter_phone}
                        </td>
                        <td class="px-6 py-4 bg-gray-100">
                          {data.status === 'p' ? 'Pending' : 'Complete'}
                        </td>
                        {user.is_service_provider || user.is_product_seller ? <td>
                          <Button title='Edit' onClick={() => handleopen(data)} disabled={data.status === 'C'} />
                        </td> : null}
                      </tr>
                    })}
                  </>
                    : <EmptyResult name='No Service Booking' />}
                </tbody>
              </table>
            </div>
          </>
          : <p>loading...</p>}

        <Transition
          show={isOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100 duration-200"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
        >
          <Dialog open={isOpen} onClose={() => setisOpen(false)} className='backdrop-filter 
                backdrop-blur-md fixed top-0 left-0 w-full h-screen flex items-end justify-center
            '>
            <Dialog.Panel className='mb-24 lg:mb-2 bg-white w-[95%] lg:w-[40%] min-h-[75%] 
                rounded p-6 drop-shadow-xl space-y-6'>
              <Dialog.Title className='flex items-center justify-between'>
                <p className='font-medium text-xl capitalize'>Status Update</p>
                <Icon icon={XMarkIcon} onClick={() => setisOpen(false)} />
              </Dialog.Title>
              <Dialog.Description className='space-y-2' as='div'>
                {data.service &&<p>Service: {data.service}</p>}
                {data.Product &&<p>Product: {data.Product}</p>}
                <p>Category: {data.catagory}</p>
                <p>Address: {data.address}</p>
                <p>Phone: {data.phone}</p>
                <p>Alternate Phone: {data.alter_phone}</p>
                {data.quantity && <p>Quantity: {data.quantity}</p>}
                <form className='space-y-4' onSubmit={handleSubmit}>
                  <Input {...price} value={data.price} onChange={(e) => setdata(pre => ({ ...pre, price: e.target.value }))} />
                  <Select {...status} value={data.status} onChange={(e) => setdata(pre => ({ ...pre, status: e.target.value }))} />
                  <Button title='Update' type='submit' />
                </form>
              </Dialog.Description>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </main>
      <Footer />
    </ProtectedRoutes>
  )
}


const status = {
  name: 'staus',
  id: 'status',
  placeholder: 'status',
  label: 'Status',
  list: [
    { name: "---select Status---", value: '' },
    { name: "Pending", value: 'p' },
    { name: "Complete", value: 'C' },
  ]
}