import { useCallback, useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import TextInput from '../core/TextInput'
import { phonenumber } from './Login'
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import Button from '../core/Button'
import { useNavigate } from 'react-router-dom'
import { productPriceDetail, BookProduct } from '../api'
import Protected from '../Protected'
import { store } from '../App'
import PhoneInput from '../core/PhoneInput'
import { bookValidation } from '../validation'
import { alterphonenumber, address } from './BookService'

export default function BookProducts() {
  const navigate = useNavigate()
  const storeState = useContext(store) ?? false
  const { isAuthenciated } = storeState.state

  const [price, setprice] = useState(null)
  const [searchParams] = useSearchParams()

  const form = useFormik({
    initialValues: {
      product_seller: searchParams.get('name'),
      Product: searchParams.get('product'),
      catagory: searchParams.get('type'),
      quantity: searchParams.get('quantity'),
      phone: '',
      alter_phone: '',
      address: ''
    },
    validationSchema: bookValidation,
    onSubmit: async (values) => {
      const api = await BookProduct(form.values.product_seller, form.values.Product, form.values.catagory, form.values, form.values.quantity)
      switch (api.status) {
        case 201:
            storeState.setmessage({
                hidden: false,
                message: `Booking Successfull for ${form.values.Product} ${form.values.catagory}`
            })
            navigate('/dashboard')
          break;
        default:
          navigate(`/${api.status}`)
          break;
      }
    }
  })

  const loadPriceData = useCallback(async () => {
    if (isAuthenciated) {
      const api = await productPriceDetail(form.values.product_seller, form.values.Product, form.values.catagory, form.values.quantity)
      switch (api.status) {
        case 200:
          const apiRes = await api.json()
          setprice(apiRes)
          break;
        default:
          navigate(`/${api.status}`)
          break;
      }
    }
  }, [navigate, form.values.product_seller, form.values.Product, form.values.catagory , isAuthenciated, form.values.quantity])

  useEffect(() => { loadPriceData() }, [loadPriceData])
  document.title = 'Book Now'


  return (
    <Protected>
      <AppBar />
      <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto mt-20'>
        <h1 className='text-2xl font-bold capitalize'>Book Now</h1>
        <div className='border border-violet-600 bg-violet-100 dark:bg-violet-500/10 rounded p-4'>
          You are booking "{form.values.product_seller}" for "{form.values.catagory}" of your "{form.values.Product}"
        </div>
        <form className='space-y-4' onSubmit={form.handleSubmit}>
          <PhoneInput {...phonenumber} value={form.values.phone} onChange={form.handleChange}
            error={form.touched.phone && form.errors.phone} onBlur={form.handleBlur}
          />
          <PhoneInput {...alterphonenumber} value={form.values.alter_phone} onChange={form.handleChange}
            error={form.touched.alter_phone && form.errors.alter_phone} onBlur={form.handleBlur}

          />
          <TextInput {...address} value={form.values.address} onChange={form.handleChange}
            error={form.touched.address && form.errors.address} onBlur={form.handleBlur}
          />
          <p className='flex items-center'>Total amount <CurrencyRupeeIcon className='w-5 h-5 mx-1' /> {price} for {form.values.Product} {form.values.catagory}</p>
          <p className='text-green-500 '>Note: Price charged excluding addation part price </p>
          <Button title='Book Now' type='submit' disabled={!(form.isValid && form.dirty)} />
        </form>
      </main>
      <Footer />
    </Protected>
  )
}