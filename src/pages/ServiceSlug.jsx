import { useState, useCallback, useEffect, Fragment } from 'react'
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import EmptyResult from '../components/EmptyResult'
import { StarIcon, ShoppingBagIcon, CurrencyRupeeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Button from '../core/Button'
import { ServicesSlugList } from '../api'
import Rating from 'react-rating'

export default function ServiceSlug() {

    const [state, setstate] = useState({
        isOpen: false, 
        data:null
    })
    const [searchParams, setSearchParams] = useSearchParams()

    const { slug } = useParams()
    const navigate = useNavigate()

    document.title = `Services - ${slug}`

    const [list, setlist] = useState([])
    const [loading, setloading] = useState(true)

    const handleLoadServicesList = useCallback(async () => {
        const api = await ServicesSlugList(slug)
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
    }, [navigate, slug])

    useEffect(() => { handleLoadServicesList() }, [handleLoadServicesList])

    const handleBookNow = (name, type) => {
        navigate(`/book-now?name=${name}&service=${slug}&type=${type}`)
    }

    const handleOpen = useCallback((isOpen, slug) => {
        const dataFiltered = list.find(element => element.slug === slug)
        setstate({isOpen:isOpen, data:dataFiltered})
        setSearchParams({'open': slug})
    },[list, setSearchParams])

    const handleSearchLoad  = useCallback(() => {
        let search = searchParams.get('open') ?? false
        if (search){
            handleOpen(true, search)
        }
    },[handleOpen, searchParams])

    const handleClose = (isOpen) => {
        setstate({isOpen: isOpen, data:null})
        setSearchParams({})
    }

    useEffect(() => {handleSearchLoad()}, [handleSearchLoad])
    

    return (
        <>
            <AppBar />
            <main className='min-h-screen p-4 space-y-4 w-full lg:w-[65%] mx-auto my-20'>
                <h1 className='text-2xl font-bold capitalize'>Results for {slug}</h1>
                {!loading ? <ul className='rounded space-y-4'>
                    {list.length > 0 ? <>
                        {list.map((data, index) => {
                            return <li key={index} className='relative p-6 rounded w-full bg-white space-y-4 '>
                                <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
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
                                <Button title='View Pricing' onClick={() => handleOpen(true, data.slug)} />
                            </li>
                        })}
                    </>
                        : <EmptyResult name='no services yet' />}
                </ul> : <p>loading...</p>}
                <Transition
                    show={state.isOpen}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100 duration-200"
                    leaveTo="transform scale-95 opacity-0"
                    as={Fragment}
                >
                    <Dialog open={state.isOpen} onClose={() => handleClose(false)} className='backdrop-filter
                      backdrop-blur-md fixed top-0 left-0 w-full h-screen flex items-end justify-center
                      '>
                        <Dialog.Panel className='z-40 bottom-0 mb-24 lg:mb-2 bg-white w-[95%] lg:w-[65%] h-[80%] lg:h-[90%] 
                          rounded p-6 drop-shadow-xl'>
                            <Dialog.Title className='flex justify-end mb-2'>
                                <button type='button' className='ml-auto text-sm text-blue-500' onClick={() => handleClose(false)} >Done</button>
                            </Dialog.Title>
                            <Dialog.Description className='space-y-6 overflow-y-auto h-full hidden-scrollbar' as='div'>
                                <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0'>
                                    <div className='flex justify-center  flex-col w-full space-y-4'>
                                        <p className='text-3xl text-violet-500'>{state.data?.name}</p>
                                        <p className='flex items-center text-lg opacity-80'><StarIcon className='w-4 h-4 mr-2' /> Average ratings {state.data?.rating}</p>
                                        <p className='flex items-center text-lg opacity-80'><ShoppingBagIcon className='w-4 h-4 mr-2' /> Bookings {state.data?.booking}</p>
                                        <a href={`tel:${state.data?.phone_number}`} className='flex items-center text-lg opacity-80'><PhoneIcon className='w-4 h-4 mr-2' /> Mobile {state.data?.phone_number}</a>
                                        <div className='flex items-center opacity-80'>
                                            <MapPinIcon className='w-4 h-4 mr-2' />
                                            Address {state.data?.address}
                                        </div>
                                    </div>
                                    <img src={state.data?.image} alt="banner" className='aspect-video h-52 rounded-md' />
                                </div>
                                <p className='text-xl mb-2'>Service Price List</p>
                                <div className="rounded flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">
                                    {state.data?.costing.map((item, index) => {
                                        return <div key={index} className='space-y-2  rounded p-4'>
                                            <p className='text-xl capitalize text-violet-500'>{item.catagory}</p>
                                            <p className='opacity-80'>excluding addation part price</p>
                                            <p className='opacity-80 flex items-center py-2 bg-violet-100 rounded justify-center text-xl'><CurrencyRupeeIcon className='w-5 h-5 mr-1' />{item.price} </p>
                                            <Button title='book now' onClick={() => handleBookNow(state.data?.name, item.catagory)} />
                                        </div>
                                    })}
                                </div>
                                <p className='text-xl mb-2'>Customer Rating and Feedback</p>
                                <div className="pb-6 space-y-4">
                                    {state.data?.feedback.map((item, index) => {
                                        return <div key={index} className='border-b pb-2'>
                                            <Rating initialRating={item.rating} className='space-x-2' readonly />
                                            <p className='text-violet-500 capitalize text-lg'>{item.feedback}</p>
                                            <p className='text-xs'>{item.date}</p>
                                        </div>
                                    })}
                                </div>
                            </Dialog.Description>
                        </Dialog.Panel>
                    </Dialog>
                </Transition>
            </main>
            <Footer />
        </>
    )
}
