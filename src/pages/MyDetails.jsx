import { useState, useContext, useCallback, useEffect } from 'react'
import Input from '../core/Input'
import Select from '../core/SelectInput'
import Button from '../core/Button'
import ImagePreview from '../core/ImagePreview'
import Avatar from '../assests/avatar.jpg'
import { store } from '../App'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ImageUpload, DetailUpdate, Myaccount } from '../api'

import { CameraIcon } from '@heroicons/react/24/outline'

export default function Details() {
    document.title = 'Details'

    const stateStore = useContext(store) ?? false
    const [user, setuser] = useState({})
    const navigate = useNavigate()
    const profileImage = user.profile !== null ? user.profile : Avatar

    const [formDisable, setformDisable] = useState(true)
    const [isOpen, setisOpen] = useState(false)

    const form = useFormik({
        initialValues: { ...user },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const api = await DetailUpdate(values)
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    setuser(apiRes)
                    stateStore.setmessage({
                        hidden: false,
                        message: 'Account Details Updated'
                    })
                    setformDisable(true)
                    form.resetForm({ ...apiRes })
                    break;
                default:
                    navigate(`/${api.status}`)
                    break;
            }
        }
    })

    const [image, setimage] = useState({
        preview: null,
        image: null
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const previewurl = URL.createObjectURL(file)
        if (file !== null) {
            setimage({
                preview: previewurl,
                image: file
            })
            setisOpen(true)
        }
    }

    const handleImageUpload = async () => {
        const formData = new FormData()
        formData.append('profile', image.image)
        const api = await ImageUpload(formData)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setuser(pre => ({...pre, profile: apiRes.profile}))
                stateStore.setstate(pre => ({ ...pre, user: { ...pre.user, profile: apiRes.profile } }))
                stateStore.setmessage({
                    hidden: false,
                    message: 'Profile Picture Updated'
                })
                setisOpen(false)
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }

    const Onload = useCallback(async() => {
        const api = await Myaccount()
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setuser(apiRes)
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }, [navigate])


    useEffect(() => {Onload()}, [Onload])
    

    return (
        <div className='space-y-6'>
            <h1 className='text-2xl '>Details</h1>
            <div className='w-full lg:w-[85%] relative h-32 rounded-t-full bg-gradient-to-r from-violet-500 to-violet-500 mx-auto'>
                <div className='rounded-full h-44 w-44 absolute top-4 left-0 right-0 m-auto lg:m-0 lg:left-9 group'>
                    <div className='w-44 h-44 rounded-full overflow-hidden relative drop-shadow-xl transition-all'>
                        <img src={profileImage} alt="user-profile " className='z-30 w-full h-full object-fill' />
                        <div className="hidden w-full h-28 space-y-2 backdrop-filter backdrop-blur-2xl absolute z-50 bottom-0 left-0 group-hover:flex flex-col items-center justify-center">
                            <CameraIcon className='w-6 h-6' />
                            <label htmlFor="profile" className='text-xs w-20 mx-auto'>Click to update profile picture</label>
                            <input type="file" name="profile" id="profile" className='hidden' accept='image/*' onChange={handleImageChange} />
                        </div>
                    </div>
                </div>
            </div>

            <form className='pt-12 space-y-4 w-full lg:w-[85%] m-auto' onSubmit={form.handleSubmit}>
                <div className='flex justify-end'>
                    <Button title='edit details' onClick={() => setformDisable(false)} />
                </div>
                <Input {...firstname} disabled={formDisable} value={form.values.first_name} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.first_name && form.errors.first_name} />
                <Input {...lastname} disabled={formDisable} value={form.values.last_name} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.last_name && form.errors.last_name} />
                <Input {...email} disabled={formDisable} value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.email && form.errors.email} />
                <Select {...gender} disabled={formDisable} value={form.values.gender} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.gender && form.errors.gender} />
                <div className='flex justify-end'>
                    <Button type='submit' title='Update Details' disabled={!(form.isValid && form.dirty)} />
                </div>
            </form>
            <ImagePreview isOpen={isOpen} setisOpen={setisOpen} image={image} uploadFunction={handleImageUpload} />
        </div>
    )
}

const firstname = {
    name: 'first_name',
    id: 'first_name',
    placeholder: 'first name',
    label: 'First Name',
}

const lastname = {
    name: 'last_name',
    id: 'last_name',
    placeholder: 'last name',
    label: 'Last Name',
}
const gender = {
    name: 'gender',
    id: 'gender',
    placeholder: 'gender',
    label: 'Gender',
    list: [
        { name: "---select gender---", value: '' },
        { name: "Male", value: 'm' },
        { name: "Female", value: 'f' },
        { name: "Others", value: 'o' },
    ]
}

const email = {
    name: 'email',
    id: 'email',
    placeholder: 'example@somemail.com',
    label: 'Email',
}