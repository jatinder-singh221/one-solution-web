import { useState, useContext } from 'react'
import Input from '../core/Input'
import Button from '../core/Button'
import { password } from '../pages/Login'
import { updatePasswordValidation } from '../validation'
import { useFormik } from 'formik'
import { store } from '../App'
import { useNavigate } from 'react-router-dom'
import { PasswordUpdate, DeleteAccount } from '../api'

export default function Security() {

  document.title = 'Security'

  const stateStore = useContext(store) ?? false
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: updatePasswordValidation,
    onSubmit: async (values) => {
      const api = await PasswordUpdate(values)
      switch (api.status) {
        case 200:
          stateStore.setstate({ user: {}, isAuthenciated: false, })
          stateStore.setmessage({
            hidden: false,
            message: 'Account Updated And Loging out'
          })
          break;
        default:
          navigate(`/${api.status}`)
          break;
      }
    }
  })

  const [confirmType, setconfirmType] = useState('')
  const [disabled, setdisabled] = useState(true)
  const handleConfirmValueChange = (e) => {
    const value = e.target.value
    setconfirmType(value)
    if (value === "YES I AM SURE")
      setdisabled(false)
    else
      setdisabled(true)
  }

  const handleDeleteAccount = async () => {
    const api = await DeleteAccount()
    switch (api.status) {
      case 200:
        navigate('/')
        break
      default:
        navigate(`/${api.status}`)
        break;
    }
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl'>Security</h1>
      <form className='space-y-4 w-full lg:w-[85%] mx-auto' onSubmit={form.handleSubmit}>
        <p className='text-red-500'>Caution! Take any action with care</p>
        <legend className='text-xl'>Update Password</legend>
        <Input {...password} value={form.values.password} onChange={form.handleChange}
          error={form.touched.password && form.errors.password} onBlur={form.handleBlur}
        />
        <Input {...confirmPassword} value={form.values.confirmPassword} onChange={form.handleChange}
          error={form.touched.confirmPassword && form.errors.confirmPassword} onBlur={form.handleBlur}
        />
        <Button title="Update Password" type='submit' disabled={!(form.dirty && form.isValid)} />
      </form>
      <div className='space-y-4 w-full lg:w-[85%] mx-auto'>
        <p className='text-red-500'>Caution! once you delete your account you are not able to recover it</p>
        <legend className='text-xl'>Delete Account</legend>
        <Input {...confirm} value={confirmType} onChange={handleConfirmValueChange} />
        <Button title='Delete Account' disabled={disabled} onClick={handleDeleteAccount} />
      </div>
    </div>
  )
}

const confirmPassword = {
  name: 'confirmPassword',
  id: 'confirmPassword',
  placeholder: 'a strong password',
  label: 'Confirm Password',
  type: 'password'
}

const confirm = {
  name: 'confirm',
  id: 'confirm',
  placeholder: 'Type',
  label: 'Type "YES I AM SURE" to delete account'
}