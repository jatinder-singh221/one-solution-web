import { useState, useCallback, useEffect, Fragment, useContext } from 'react'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { StarIcon, ShoppingBagIcon, MapPinIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MyProduct, MyProductCosting, MyProductCostingUpdate, MyProductCostingCreate } from '../api'
import { useNavigate } from 'react-router-dom'
import Button from '../core/Button'
import { Transition, Dialog, Tab } from '@headlessui/react'
import Icon from '../core/Icon'
import Input from '../core/Input'
import { store } from '../App'


export default function MyProducts() {

    const [details, setdetails] = useState({})
    const storeState = useContext(store) ?? false
    const navigate = useNavigate()
    const [isOpen, setisOpen] = useState(false)
    const [costing, setcosting] = useState({
        price: null,
        product_seller: null,
        Product: null,
        catagory: null,
        index: 0
    })

    const onLoad = useCallback(async () => {
        const api = await MyProduct()
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setdetails(apiRes)
                break
            default:
                navigate(`/${api.status}`)
                break;
        }
    }, [navigate])

    useEffect(() => { onLoad() }, [onLoad])

    const handleOpen = async (product) => {
        const api = await MyProductCosting(product, '10mm')
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setcosting(pre => ({ ...apiRes, index: 0 }))
                setisOpen(true)
                break
            case 404:
                setcosting({
                    price: 0,
                    product_seller: null,
                    Product: product,
                    catagory: '10mm',
                    index: 0
                })
                setisOpen(true)
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }

    const handleChange = async (index, catagory) => {
        const api = await MyProductCosting(costing.Product, catagory)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setcosting(pre => ({ index: index, ...apiRes }))
                break
            case 404:
                setcosting(pre => ({
                    ...pre,
                    price: 0,
                    catagory: catagory,
                    index: index
                }))
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const api = await MyProductCostingUpdate(costing)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setcosting(pre => ({ index: costing.index, ...apiRes }))
                storeState.setmessage({
                    hidden: false,
                    message: 'Price updated'
                })
                setisOpen(false)
                break;
            case 404:
                const data = await MyProductCostingCreate(costing)
                const apiData = await data.json()
                setcosting(pre => ({ index: costing.index, ...apiData }))
                storeState.setmessage({
                    hidden: false,
                    message: 'Price updated'
                })
                setisOpen(false)
                break
            default:
                navigate(`/${api.status}`)
                break;
        }
    }


    return (
        <>
            <Appbar />
            <main className="min-h-screen mt-20 space-y-4 mx-4 lg:mx-16">
                <h1 className='text-2xl font-bold'>Product Details</h1>
                <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
                    <div className='flex justify-center  flex-col w-full space-y-4'>
                        <p className='text-3xl text-violet-500'>{details.name}</p>
                        <p className='flex items-center text-lg opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings {details.rating}</p>
                        <p className='flex items-center text-lg opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings {details.booking}</p>
                        <a href={`tel:${details.phone_number}`} className='flex items-center text-lg opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile {details.phone_number}</a>
                        <div className='flex items-center opacity-80'>
                            <MapPinIcon className='w-4 h-4 mr-2' />
                            <span className='w-[90%]'>
                                Address {details.address}
                            </span>
                        </div>
                    </div>
                    <img src={details.image} alt="banner" className='aspect-video h-52 rounded-md' />
                </div>
                <p className='text-lg'>View Your Product Costing</p>
                <ul className='flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2 '>
                    {details.Products?.map((data, index) => {
                        return <li key={index} >
                            <Button title={`View Pricing for ${data}`} onClick={() => handleOpen(data)} />
                        </li>
                    })}
                </ul>

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
                                <p className='font-medium text-xl capitalize'>Costing for {costing.service} </p>
                                <Icon icon={XMarkIcon} onClick={() => setisOpen(false)} />
                            </Dialog.Title>
                            <Dialog.Description className='space-y-6' as='div'>
                                <Tab.Group defaultIndex={costing.index}>
                                    <Tab.List as='div' className='w-auto p-2 rounded space-x-1' >
                                        {details.catargories?.map((data, index) => {
                                            return <Tab key={index} onClick={() => handleChange(index, data)} className={`py-2 px-4 capitalize ${costing.index === index && 'bg-violet-600 rounded text-white'}`}>{data}</Tab>
                                        })}
                                    </Tab.List>
                                    <Tab.Panels>
                                        {details.catargories?.map((data, index) => {
                                            return <Tab.Panel key={index} className='capitalize space-y-4p'>
                                                <p>cost of {costing.catagory}  {costing.Product}</p>.
                                                <form className='space-y-4' onSubmit={handleSubmit}>
                                                    <Input value={costing.price} {...price} onChange={(e) => setcosting(pre => ({ ...pre, price: e.target.value }))} />
                                                    <Button title='update Price' type='submit' />
                                                </form>
                                            </Tab.Panel>
                                        })}
                                    </Tab.Panels>
                                </Tab.Group>
                            </Dialog.Description>
                        </Dialog.Panel>
                    </Dialog>
                </Transition>
            </main>
            <Footer />
        </>
    )
}

const price = {
    name: 'otp',
    id: 'otp',
    placeholder: 'price',
    label: 'Price',
    autoFocus: true
}