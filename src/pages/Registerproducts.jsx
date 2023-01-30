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
import { ProductsAndCatagories,RegisterProducts } from '../api'
import { store } from '../App'
import { name, address, phonenumber, pin } from './Registerservice'

export default function Registerservice() {

    document.title = 'Product Register'
    const navigate = useNavigate()

    const [products, setproducts] = useState([])
    const storeState = useContext(store) ?? false

    const onLoad = useCallback(async () => {
        const api = await ProductsAndCatagories()
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setproducts(apiRes)
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

    useEffect(() => { 
        setTimeout(() => {
            onLoad()
        }, 1000);
    }, [onLoad])


    const productform = useFormik({
        initialValues: {
            name: '',
            image: '',
            address: '',
            phone_number: '',
            pincode: '',
            Products: [],
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
            values.Products.forEach(products => {formData.append('Products', products)})
            values.catarogies.forEach(catarogies => {formData.append('catargories', catarogies)})
            const api = await RegisterProducts(formData)
            switch (api.status) {
                case 201:
                    storeState.setmessage({
                        hidden: false,
                        message: 'Registered Successfully'
                    })
                    navigate('/my-account')
                    break;
                case 400:
                    productform.setErrors({
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
            productform.setValues(pre => ({ ...pre, image: file }))
        }
    }

    const handleSelectvalues = (e) => {
        let formValues = productform.values.Products
        const { id } = e.target
        const isPresent = formValues.some(element => element === id)
        if (isPresent) {
            let updateValues = formValues.filter(element => element !== id)
            productform.setValues(pre => ({ ...pre, Products: updateValues }))
        }
        else {
            productform.setValues(pre => ({ ...pre, Products: [...pre.Products, id] }))
        }
    }

    const handleSelectcatagoriesvalues = (e) => {
        let formValues = productform.values.catarogies
        const { id } = e.target
        const isPresent = formValues.some(element => element === id)
        if (isPresent) {
            let updateValues = formValues.filter(element => element !== id)
            productform.setValues(pre => ({ ...pre, catarogies: updateValues }))
        }
        else {
            productform.setValues(pre => ({ ...pre, catarogies: [...pre.catarogies, id] }))
        }
    }

    return (
        <Protected>
            <AppBar />
            <div className='p-4 space-y-4 my-20 lg:w-[50%] mx-auto'>
                <form className='w-full space-y-6' onSubmit={productform.handleSubmit}>
                    <legend className='text-2xl font-bold'>Products Details</legend>
                    <p className='text-sm text-green-500 bg-green-100 dark:bg-green-500/10 p-2 rounded capitalize'>Complete your products details and get 100 rupee bonus </p>
                    <p className='text-xl font-light'>Select Image</p>
                    <label htmlFor='image' className='block aspect-video h-44 w-full rounded overflow-hidden border py-4 border-black dark:border-white'>
                        <img src={image} alt="imageplaceholder" className='w-full h-full object-contain' />
                        <input type="file" name="image" id="image" className='hidden' accept='image/*' onChange={handleImageChange} />
                    </label>
                    <span className='text-sm text-red-600 cursor-pointer' onClick={() => setimage(ImageSvg)}>clear</span>
                    <Input {...name} value={productform.values.name} onChange={productform.handleChange}
                        error={productform.touched.name && productform.errors.name} onBlur={productform.handleBlur}
                    />
                    <TextInput {...address} value={productform.values.address} onChange={productform.handleChange}
                        error={productform.touched.address && productform.errors.address} onBlur={productform.handleBlur}
                    />
                    <PhoneInput {...phonenumber} value={productform.values.phone_number} onChange={productform.handleChange}
                        error={productform.touched.phone_number && productform.errors.phone_number} onBlur={productform.handleBlur}
                    />
                    <Input {...pin} value={productform.values.pincode} onChange={productform.handleChange}
                        error={productform.touched.pincode && productform.errors.pincode} onBlur={productform.handleBlur}
                    />
                    <p className='text-xl font-light'>Select products</p>
                    <ul className='flex flex-wrap'>
                        {products.products?.map((data, index) => {
                            return <li key={index} className='flex items-center space-x-4 p-2 text-lg capitalize'>
                                <input type="checkbox" name={data.slug} id={data.slug} onChange={handleSelectvalues} className='h-5 w-5 bg-violet-100 dark:bg-violet-500/10 rounded border-violet-600 focus:ring-0 checked:focus:bg-violet-600 outline-none checked:bg-violet-600 checked:ring-0 active:bg-violet-600 checked:hover:bg-violet-600' />
                                <label htmlFor={data.slug}>{data.name}</label>
                            </li>
                        })}
                    </ul>
                    {productform.touched.products && productform.errors.products && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{productform.touched.products && productform.errors.products}</p>}
                    <p className='text-xl font-light'>Select Catagories</p>
                    <ul className='flex flex-wrap'>
                        {products.catarogies?.map((data, index) => {
                            return <li key={index} className='flex items-center space-x-4 p-2 text-lg capitalize'>
                                <input type="checkbox" name={data.name} id={data.name} onChange={handleSelectcatagoriesvalues} className='h-5 w-5 bg-violet-100 dark:bg-violet-500/10 rounded border-violet-600 focus:ring-0 checked:focus:bg-violet-600 outline-none checked:bg-violet-600 checked:ring-0 active:bg-violet-600 checked:hover:bg-violet-600' />
                                <label htmlFor={data.name}>{data.name}</label>
                            </li>
                        })}
                    </ul>
                    {productform.touched.catarogies && productform.errors.catarogies && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{productform.touched.products && productform.errors.products}</p>}
                    <Button title='save details' type='submit' disabled={!(productform.isValid && productform.dirty)} />
                </form>

            </div>
            <Footer />
        </Protected>
    )
}

