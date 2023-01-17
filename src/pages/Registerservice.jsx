import {useState, useCallback, useEffect, useContext } from 'react'
import Input from '../core/Input'
import AppBar from '../components/Appbar'
import Footer from '../components/Footer'
import PhoneInput from '../core/PhoneInput'
import TextInput from '../core/TextInput'
import ImageSvg from '../assests/image.svg'
import Button from '../core/Button'
import { useNavigate } from 'react-router-dom'
import Protected from '../Protected'

import { useFormik } from 'formik'
import { ServiceDetailValidation } from '../validation'
import { Register, ServicesAndCatagories } from '../api'
import { store } from '../App'

export default function Registerservice() {

    document.title = 'Service Register'
    const navigate = useNavigate()

    const [services, setservices] = useState([])
    const storeState = useContext(store) ?? false

    const onLoad = useCallback(async () => {
        const api = await ServicesAndCatagories()
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setservices(apiRes)
                if (apiRes.registered){
                    storeState.setmessage({
                        hidden: false,
                        message: 'Already registered'
                    })
                    navigate('/dashboard')
                }
                break
            default:
                navigate(`/${api.status}`)
                break;
        }
    }, [navigate, storeState])

    useEffect(() => { onLoad() }, [onLoad])


    const serviceform = useFormik({
        initialValues: {
            name: '',
            image: '',
            address: '',
            phone_number: '',
            pincode: '',
            services: [],
            catarogies: [],
        },
        validationSchema: ServiceDetailValidation,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('image', values.image)
            formData.append('address', values.address)
            formData.append('phone_number', values.phone_number)
            formData.append('pincode', values.pincode)
            values.services.forEach(service => {formData.append('services', service)})
            values.catarogies.forEach(catarogies => {formData.append('catargories', catarogies)})
            const api = await Register(formData)
            switch (api.status) {
                case 201:
                    storeState.setmessage({
                        hidden: false,
                        message: 'Registered Successfully'
                    })
                    navigate('/my-account')
                    break;
                case 400:
                    serviceform.setErrors({
                        'name': 'invlaid name',
                        'address': 'invlaid address',
                    })
                    break;
                default:
                    navigate(`/${api.status}`)
                    break;
            }
        }

    })

    const [image, setimage] = useState(ImageSvg)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const previewurl = URL.createObjectURL(file)
        if (file !== null) {
            setimage(previewurl)
            serviceform.setValues(pre => ({ ...pre, image: file }))
        }
    }

    const handleSelectvalues = (e) => {
        let formValues = serviceform.values.services
        const { id } = e.target
        const isPresent = formValues.some(element => element === id)
        if (isPresent) {
            let updateValues = formValues.filter(element => element !== id)
            serviceform.setValues(pre => ({ ...pre, services: updateValues }))
        }
        else {
            serviceform.setValues(pre => ({ ...pre, services: [...pre.services, id] }))
        }
    }

    const handleSelectcatagoriesvalues = (e) => {
        let formValues = serviceform.values.catarogies
        const { id } = e.target
        const isPresent = formValues.some(element => element === id)
        if (isPresent) {
            let updateValues = formValues.filter(element => element !== id)
            serviceform.setValues(pre => ({ ...pre, catarogies: updateValues }))
        }
        else {
            serviceform.setValues(pre => ({ ...pre, catarogies: [...pre.catarogies, id] }))
        }
    }

    return (
        <Protected>
            <AppBar />
            <div className='p-4 space-y-4 my-20 lg:w-[50%] mx-auto'>
                <form className='w-full space-y-6' onSubmit={serviceform.handleSubmit}>
                    <legend className='text-2xl font-bold'>Service Details</legend>
                    <p className='text-sm text-green-500 bg-green-100 dark:bg-green-500/10 p-2 rounded capitalize'>Complete your service details and get 100 rupee bonus </p>
                    <p className='text-xl font-light'>Select Image</p>
                    <label htmlFor='image' className='block aspect-video h-44 w-full rounded overflow-hidden border py-4 border-black dark:border-white'>
                        <img src={image} alt="imageplaceholder" className='w-full h-full object-contain' />
                        <input type="file" name="image" id="image" className='hidden' accept='image/*' onChange={handleImageChange} />
                    </label>
                    <span className='text-sm text-red-600 cursor-pointer' onClick={() => setimage(ImageSvg)}>clear</span>
                    <Input {...name} value={serviceform.values.name} onChange={serviceform.handleChange}
                        error={serviceform.touched.name && serviceform.errors.name} onBlur={serviceform.handleBlur}
                    />
                    <TextInput {...address} value={serviceform.values.address} onChange={serviceform.handleChange}
                        error={serviceform.touched.address && serviceform.errors.address} onBlur={serviceform.handleBlur}
                    />
                    <PhoneInput {...phonenumber} value={serviceform.values.phone_number} onChange={serviceform.handleChange}
                        error={serviceform.touched.phone_number && serviceform.errors.phone_number} onBlur={serviceform.handleBlur}
                    />
                    <Input {...pin} value={serviceform.values.pincode} onChange={serviceform.handleChange}
                        error={serviceform.touched.pincode && serviceform.errors.pincode} onBlur={serviceform.handleBlur}
                    />
                    <p className='text-xl font-light'>Select Services</p>
                    <ul className='flex flex-wrap'>
                        {services.services?.map((data, index) => {
                            return <li key={index} className='flex items-center space-x-4 p-2 text-lg capitalize'>
                                <input type="checkbox" name={data.slug} id={data.slug} onChange={handleSelectvalues} className='h-5 w-5 bg-violet-100 dark:bg-violet-500/10 rounded border-violet-600 focus:ring-0 checked:focus:bg-violet-600 outline-none checked:bg-violet-600 checked:ring-0 active:bg-violet-600 checked:hover:bg-violet-600' />
                                <label htmlFor={data.slug}>{data.name}</label>
                            </li>
                        })}
                    </ul>
                    {serviceform.touched.services && serviceform.errors.services && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{serviceform.touched.services && serviceform.errors.services}</p>}
                    <p className='text-xl font-light'>Select Catagories</p>
                    <ul className='flex flex-wrap'>
                        {services.catarogies?.map((data, index) => {
                            return <li key={index} className='flex items-center space-x-4 p-2 text-lg capitalize'>
                                <input type="checkbox" name={data.name} id={data.name} onChange={handleSelectcatagoriesvalues} className='h-5 w-5 bg-violet-100 dark:bg-violet-500/10 rounded border-violet-600 focus:ring-0 checked:focus:bg-violet-600 outline-none checked:bg-violet-600 checked:ring-0 active:bg-violet-600 checked:hover:bg-violet-600' />
                                <label htmlFor={data.name}>{data.name}</label>
                            </li>
                        })}
                    </ul>
                    {serviceform.touched.catarogies && serviceform.errors.catarogies && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{serviceform.touched.services && serviceform.errors.services}</p>}
                    <Button title='save details' type='submit' disabled={!(serviceform.isValid && serviceform.dirty)} />
                </form>

            </div>
            <Footer />
        </Protected>
    )
}

const name = {
    name: 'name',
    id: 'name',
    placeholder: 'Your shop, bussiness name',
    label: 'Name',
}

const address = {
    name: 'address',
    id: 'address',
    placeholder: 'Your shop, bussiness address with nearby land mark',
    label: 'Address',
}

const phonenumber = {
    name: 'phone_number',
    id: 'phone_number',
    placeholder: 'Bussiness phone number',
    label: 'Phone Number',
}

const pin = {
    name: 'pincode',
    id: 'pincode',
    placeholder: 'pin code',
    label: 'Pin Code',
    type: 'tel'
}


export { name, address, phonenumber, pin }