import { useState, useContext } from 'react'
import { useFormik } from 'formik'
import Otp from '../components/OTP'
import Input from '../core/Input'
import SignUpSvg from '../assests/signup.svg'
import Logo from '../core/Logo'
import Button from '../core/Button'
import Anchor from '../core/Anchor'
import { useNavigate } from 'react-router-dom'
import { store } from '../App'

import { loginValidtion } from '../validation'
import { phonenumber, password } from './Login'
import { signup } from '../api'
import UnProtectedRoute from '../Unprotected'
import PhoneInput from '../core/PhoneInput'

export default function SignUp() {

    document.title = 'Sign up'

    const navigate = useNavigate()
    const storeState = useContext(store) ?? false
    const [isOpen, setisOpen] = useState(false)

    const form = useFormik({
        initialValues: { phone: '', password: '' },
        validationSchema: loginValidtion,
        onSubmit: () => {
            setisOpen(true)
        }
    })

    const successFunction = async () => {
        const api = await signup(form.values)
        switch (api) {
          case 201:
            setisOpen(false)
            storeState.setstate(pre => ({...pre, isAuthenciated: true}))
            storeState.setmessage({
                hidden: false,
                message: 'Your account has been created'
              })
            navigate('/my-account')
            break;
          case 400:
            setisOpen(false)
            form.setErrors({phone:'User Already exists'})
            break;
          default:
            navigate(`/${api}`)
            break;
        }
      }
    
    return (
        <UnProtectedRoute>
            <Otp isOpen={isOpen} setisOpen={setisOpen} phone={form.values.phone} successFunction={successFunction} />
            <div className='w-full h-screen grid grid-cols-2 place-content-start lg:place-content-center gap-5'>
                <div className="col-span-full lg:col-span-1 order-2 lg:order-1">
                    <form className='px-4 w-full lg:w-[60%] m-auto space-y-6' onSubmit={form.handleSubmit}>
                        <Logo />
                        <legend className='text-2xl font-bold'>Create Account to One Solution</legend>
                        <PhoneInput {...phonenumber} value={form.values.phone} onChange={form.handleChange}
                            error={form.touched.phone && form.errors.phone} onBlur={form.handleBlur}
                        />
                        <Input {...password} value={form.values.password} onChange={form.handleChange}
                            error={form.touched.password && form.errors.password} onBlur={form.handleBlur}
                        />
                        <Button type='submit' title="Create Account" disabled={!(form.isValid && form.dirty)} />
                        <Anchor to='/login' name='Already have a account' />
                    </form>
                </div>
                <div className="col-span-full lg:col-span-1 flex items-center h-64 lg:h-full justify-center order-1 lg:order-2">
                    <img src={SignUpSvg} alt="Login-svg " className='aspect-video' />
                </div>
            </div>
        </UnProtectedRoute>
    )
}

