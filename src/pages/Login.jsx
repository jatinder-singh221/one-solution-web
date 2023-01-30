import { useState, useContext } from 'react'
import { useFormik } from 'formik'
import Otp from '../components/OTP'
import Input from '../core/Input'
import Logo from '../core/Logo'
import LoginSvg from '../assests/login.svg'
import Button from '../core/Button'
import Anchor from '../core/Anchor'
import { useNavigate } from 'react-router-dom'

import UnProtected from '../Unprotected'
import { loginValidtion } from '../validation'
import { login } from '../api/Authenciation'
import { store } from '../App'
import PhoneInput from '../core/PhoneInput'

export default function Login() {

  document.title = 'Login'

  const storeState = useContext(store) ?? false
  const [isOpen, setisOpen] = useState(false)
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {phone: '', password: ''},
    validationSchema: loginValidtion,
    onSubmit: () =>{
      setisOpen(true)
    }
  })

  const successFunction = async () => {
    const api = await login(form.values)
    switch (api.status) {
      case 200:
        setisOpen(false)
        const apiRes = await api.json()
        storeState.setstate(pre => ({...pre, user:apiRes, isAuthenciated: true}))
        storeState.setmessage({
          hidden: false,
          message: 'Loging In'
        })
        break;
      case 401:
        setisOpen(false)
        form.setErrors({phone:'Invalid phone number or', password: 'Invalid password'})
        break;
      default:
        navigate(`/${api.status}`)
        break;
    }
  }
  

  return (
    <UnProtected>
      <Otp isOpen={isOpen} setisOpen={setisOpen} phone={form.values.phone} successFunction={successFunction} />
      <div className='w-full h-screen grid grid-cols-2 place-content-start lg:place-content-center gap-5'>
        <div className="col-span-full lg:col-span-1 order-2 lg:order-1">
          <form className='px-4 w-full lg:w-[60%] m-auto space-y-6' onSubmit={form.handleSubmit}>
            <Logo />
            <legend className='text-2xl font-bold'>Login to One Solution</legend>
            <PhoneInput {...phonenumber} value={form.values.phone} onChange={form.handleChange}
              error={form.touched.phone && form.errors.phone} onBlur={form.handleBlur}
            />
            <Input {...password} value={form.values.password} onChange={form.handleChange}
              error={form.touched.password && form.errors.password} onBlur={form.handleBlur}
            />
            <Button type='submit' title="Login" disabled={!(form.isValid && form.dirty)} />
            <div className='flex items-center space-x-4'>
              <Anchor to='/sign-up' name='Create New Account'/>
              <Anchor to='/forget-password' name='Forget Password?'/>
            </div>
          </form>
        </div>
        <div className="col-span-full lg:col-span-1 flex items-center h-64 lg:h-full justify-center order-1 lg:order-2">
          <img src={LoginSvg} alt="Login-svg " className='aspect-video' />
        </div>
      </div>
    </UnProtected>
  )
}

const phonenumber = {
  name: 'phone',
  id: 'phone',
  placeholder: 'Your phone number',
  label: 'Phone Number',
  autoFocus: true
}

const password = {
  name: 'password',
  id: 'password',
  placeholder: 'a strong password',
  label: 'Password',
  type: 'password'
}


export { phonenumber, password }