import { useState, useEffect, useCallback, Fragment } from 'react'
import Rating from 'react-rating'
import { Link, useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'

import EmptyResult from '../components/EmptyResult'
import DataLoading from './DataLoading'
import Input from '../core/Input'
import {
    StarIcon, ShoppingBagIcon, CurrencyRupeeIcon,
    MapPinIcon, PhoneIcon
} from '@heroicons/react/24/outline'
import Button from '../core/Button'
import Avtar from '../assests/avatar.jpg'

export default function Card(props) {

    const [searchParams, setSearchParams] = useSearchParams()
    const { slug } = useParams()
    const navigate = useNavigate()

    const [item, setitem] = useState({
        isopen: false,
        data: null
    })
    const [quantity, setquantity] = useState(1)

    const handleOpen = useCallback((bool, slug) => {
        const query = props.list.data.find(element => element.slug === slug)
        setitem({ isopen: bool, data: query })
        setSearchParams({ 'open': slug })
    }, [props.list.data, setSearchParams])

    const handleClose = (bool) => {
        setitem({ isopen: bool, data: null })
        setSearchParams({})
    }

    const handleBookNow = (name, type) => {
        if (props.type === 'service')
            navigate(`/book-now-${props.type}?name=${name}&service=${slug}&type=${type}`)
        else
            navigate(`/book-now-product?name=${name}&product=${slug}&type=${type}&quantity=${quantity}`)
    }

    const handleSearchLoad = useCallback(() => {
        let search = searchParams.get('open') ?? false
        if (search) {
            handleOpen(true, search)
        }
    }, [handleOpen, searchParams])


    useEffect(() => { handleSearchLoad() }, [handleSearchLoad])

    return (
        <>
            {!props.list.loading ? <ul className='rounded space-y-4'>
                {props.list.data?.length > 0 ? <>
                    {props.list.data.map((data, index) => {
                        return <li key={index} className='relative p-6  w-full bg-white space-y-4 shadow-lg shadow-violet-300 rounded-md'>
                            <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
                                <div className='flex justify-center  flex-col w-full space-y-4'>
                                    <Link to={`/details/${data.slug}`} className='text-3xl text-violet-500 font-bold hover:underline capitalize'>{data.name}</Link>
                                    <p className='flex items-center text-sm opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings: {data.rating > 0 ? data.rating : 'no ratings'}</p>
                                    <p className='flex items-center text-sm opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings: {data.booking > 0 ? data.booking : 'no bookings'}</p>
                                    <a href={`tel:${data.phone_number}`} className='flex items-center text-sm opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile: {data.phone_number}</a>
                                    <a href={`http://maps.google.com/?q=${data.address}`} className='flex items-start opacity-80 text-sm'>
                                        <MapPinIcon className='w-4 h-4 mr-2 ' />
                                        <span className='w-[70%]'>
                                            Address: {data.address}
                                        </span>
                                    </a>
                                </div>
                                <img src={data.image} alt="banner" className='aspect-video h-52 rounded-md' />
                            </div>
                            <Button title='View Pricing' onClick={() => handleOpen(true, data.slug)} />
                        </li>
                    })}
                </>
                    : <EmptyResult name='no services yet' />}
            </ul> : <DataLoading />}
            <Transition
                show={item.isopen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100 duration-200"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog open={item.isopen} onClose={() => handleClose(false)} className='backdrop-filter
                    backdrop-blur-md fixed top-0 left-0 w-full h-screen flex items-end justify-center'
                >
                    <Dialog.Panel className='z-40 bottom-0 mb-24 lg:mb-2 bg-white w-[95%] lg:w-[65%] h-[80%] 
                        rounded p-6 drop-shadow-xl'
                    >
                        <Dialog.Title className='flex justify-end mb-2'>
                            <button type='button' className='ml-auto text-sm text-blue-500' onClick={() => handleClose(false)} >Done</button>
                        </Dialog.Title>
                        <Dialog.Description className='pb-10 space-y-6 overflow-y-auto h-full hidden-scrollbar' as='div'>
                            <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
                                <div className='flex justify-center  flex-col w-full space-y-4'>
                                    <Link to={`/details/${item.data?.slug}`} className='text-3xl text-violet-500 font-bold hover:underline capitalize'>{item.data?.name}</Link>
                                    <p className='flex items-center text-sm opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings: {item.data?.rating > 0 ? item.data?.rating : 'no ratings'}</p>
                                    <p className='flex items-center text-sm opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings: {item.data?.booking > 0 ? item.data?.booking : 'no bookings'}</p>
                                    <a href={`tel:${item.data?.phone_number}`} className='flex items-center text-sm opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile: {item.data?.phone_number}</a>
                                    <a href={`http://maps.google.com/?q=${item.data?.address}`} className='flex items-start opacity-80 text-sm'>
                                        <MapPinIcon className='w-4 h-4 mr-2 ' />
                                        <span className='w-[70%]'>
                                            Address: {item.data?.address}
                                        </span>
                                    </a>
                                </div>
                                <img src={item.data?.image} alt="banner" className='aspect-video h-52 rounded-md' />
                            </div>
                            <p className='text-xl'>Our Pricing</p>
                            <div className="rounded flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
                                {item.data?.costing.map((data, index) => {
                                    return <div key={index} className='space-y-2 rounded p-4'>
                                        <p className='text-xl capitalize text-violet-500'>{data.catagory}</p>
                                        <p className='opacity-80 text-sm'>Note price can be altered by the service provider or products seller</p>
                                        <p className='opacity-80 flex items-center py-2 bg-violet-100 rounded justify-center text-xl'><CurrencyRupeeIcon className='w-5 h-5 mr-1' />{data.price} </p>
                                        <p className='opacity-80 text-sm'>Per service/ Per Product/ Per Length/ Per Bag / ect</p>
                                        {props.type !== 'service' && <Input {...Quantity} value={quantity} onChange={(e) => setquantity(e.target.value)} />}
                                        <Button title='book now' onClick={() => handleBookNow(item.data?.slug, data.catagory)} />
                                    </div>
                                })}
                            </div>
                            <p className='text-xl'>Customer Ratings and Feedbacks</p>
                            {item.data?.feedback.length > 0 ? <div className="pb-6 space-y-4">
                                {item.data?.feedback.map((item, index) => {
                                    return <div key={index} className='border-b flex flex-col lg:flex-row space-y-2 lg:space-y-0 items-center space-x-2 justify-between px-2'>
                                        <div className='flex items-center space-x-2'>
                                            <img src={item.user.profile || Avtar} alt="user-profile" className='w-5 h-5 rounded-full overflow-hidden' />
                                            <p className='text-sm'>{item.user.first_name} {item.user.last_name}</p>
                                        </div>
                                        <p className='text-sm'>{item.date}</p>
                                        <Rating initialRating={item.rating} className='space-x-2' readonly />
                                        <p className='capitalize text-sm'>{item.feedback}</p>
                                    </div>
                                })}
                            </div> : <EmptyResult name="no customer ratings and feedbacks" />}
                        </Dialog.Description>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </>
    )
}

const Quantity = {
    name: 'quantity',
    id: 'quantity',
    placeholder: 'Your Quantity',
    label: 'Quantity',
    type: 'number',
    min: 1,
    max: 100
}