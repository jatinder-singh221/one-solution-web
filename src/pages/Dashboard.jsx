import { useEffect, useCallback, useContext, useState } from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { MyBookings } from '../api'
import { store } from '../App'
import EmptyResult from '../components/EmptyResult'
import ProtectedRoutes from '../Protected'


export default function Dashboard() {
  const navigate = useNavigate()
  const storeState = useContext(store) ?? false

  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(false)

  const onLoad = useCallback(async () => {
    const api = await MyBookings()
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setbookings(apiRes)
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
    setloading(false)
  }, [navigate])

  useEffect(() => { onLoad() }, [onLoad])
  document.title = 'Dashboard'


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
                      Service
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
                  </tr>
                </thead>
                <tbody>
                  {bookings.products?.length > 0 || bookings.services?.length > 0 ? <>
                    {bookings.products.map((data, index) => {
                      return <tr class="">

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
                      </tr>
                    })}
                    {bookings.services.map((data, index) => {
                      return <tr class="">

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
                      </tr>
                    })}
                  </>
                    : <EmptyResult name='No Service Booking' />}
                </tbody>
              </table>
            </div>
          </>
          : <p>loading...</p>}
      </main>
      <Footer />
    </ProtectedRoutes>
  )
}
