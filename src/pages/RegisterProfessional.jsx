import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import SignUpSvg from '../assests/Register.svg'

import { store } from '../App'
import { loginValidtion } from '../validation'
import { phonenumber, password } from './Login'
import OTP from '../components/OTP'
import PhoneInput from '../core/PhoneInput'
import Input from '../core/Input'
import Button from '../core/Button'
import Anchor from '../core/Anchor'
import UnProtected from '../Unprotected'
import Logo from '../core/Logo'
import Select from '../core/SelectInput'
import { RegisterAsProfessional } from '../api/Authenciation'

export default function ProfessionalRegister() {

    document.title = 'Professional  Register'
    const storeState = useContext(store) ?? false

    const navigate = useNavigate()
    const [isOpen, setisOpen] = useState(false)

    const form = useFormik({
        initialValues: { phone: '', password: '', as: '' },
        validationSchema: loginValidtion,
        onSubmit: () => {
            setisOpen(true)
        }
    })

    const successFunction = async () => {
        const api = await RegisterAsProfessional(form.values)
        switch (api.status) {
            case 201:
                setisOpen(false)
                const apiRes = await api.json
                storeState.setstate(pre => ({ ...pre, user: apiRes, isAuthenciated: true }))
                storeState.setmessage({
                    hidden: false,
                    message: 'Redirecting'
                })
                navigate(`/register-${form.values.as}`)
                break;
            case 400:
                setisOpen(false)
                form.setErrors({ phone: 'User already exists' })
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    }

    return (
        <UnProtected>
            <OTP isOpen={isOpen} setisOpen={setisOpen} phone={form.values.phone} successFunction={successFunction} />
            <div className='w-full min-h-screen grid py-4 grid-cols-2 place-content-start lg:place-content-center gap-5'>
                <div className="col-span-full lg:col-span-1 order-2 lg:order-1">
                    <form className='px-4 w-full lg:w-[60%] m-auto space-y-6' onSubmit={form.handleSubmit}>
                        <Logo />
                        <legend className='text-2xl font-bold'>Register as professional at One Solution</legend>
                        <PhoneInput {...phonenumber} value={form.values.phone} onChange={form.handleChange}
                            error={form.touched.phone && form.errors.phone} onBlur={form.handleBlur}
                        />
                        <Input {...password} value={form.values.password} onChange={form.handleChange}
                            error={form.touched.password && form.errors.password} onBlur={form.handleBlur}
                        />
                        <Select {...as} onChange={form.handleChange}
                            error={form.touched.as && form.errors.as} onBlur={form.handleBlur}
                        />
                        <Button type='submit' title="Create Account" disabled={!(form.isValid && form.dirty)} />
                        <Anchor to='/login' name='Already have a account' />
                    </form>
                </div>
                <div className="col-span-full lg:col-span-1 flex items-center h-64 lg:h-full justify-center order-1 lg:order-2">
                    <img src={SignUpSvg} alt="Login-svg " className='aspect-video' />
                </div>
            </div>
        </UnProtected>
    )
}

const as = {
    name: 'as',
    id: 'as',
    placeholder: 'Register as',
    label: 'Register As',
    required: true,
    list: [
        { name: "Select From List", value: '' },
        { name: "Service Provider", value: 'service' },
        { name: "Product Seller", value: 'product' },
    ]
}

export  { as }