import { Fragment, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import Logo from '../core/Logo'
import Button from '../core/Button'
import Icon from '../core/Icon'
import Input from '../core/Input'

import { GetOtp, ValidateOtp } from '../api/Authenciation'
import { useFormik } from 'formik'
import { otpValidation } from '../validation'

export default function Otp(props) {
    const navigate = useNavigate()

    const form = useFormik({
        initialValues: { otp: "" },
        validationSchema: otpValidation,
        onSubmit: async (values) => {
            const api = await ValidateOtp(props.phone, values)
            switch (api) {
                case 200:
                    props.successFunction()
                    break;
                case 401:
                    form.setErrors({ otp: 'Invalid Otp Code' })
                    form.setFieldValue(otp, '')
                    break;
                default:
                    navigate(`/${api}`)
                    break;
            }
        }
    })

    const handleClose = () =>{ 
        props.setisOpen(!props.isOpen)
        form.setFieldValue(otp, '')
    }

    const getOtpCall = useCallback(async () => {
        if (props.isOpen) {
            const api = await GetOtp(props.phone)
            switch (api) {
                case 200:
                    break;
                default:
                    navigate(`/${api}`)
                    break;
            }
        }
    }, [props.phone, props.isOpen, navigate])

    useEffect(() => { getOtpCall() }, [getOtpCall])


    return (
        <Transition
            show={props.isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100 duration-200"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog open={props.isOpen} onClose={handleClose} className='backdrop-filter 
                backdrop-blur-md fixed top-0 left-0 w-full h-screen flex items-end justify-center
            '>
                <Dialog.Panel className='mb-24 lg:mb-2 bg-white w-[95%] lg:w-[40%] min-h-[75%] 
                rounded p-6 drop-shadow-xl space-y-6'>
                    <Dialog.Title className='flex items-center justify-between'>
                        <Logo />
                        <Icon icon={XMarkIcon} onClick={handleClose} />
                    </Dialog.Title>
                    <Dialog.Description className='space-y-6' as='div'>
                        <p className='font-medium text-xl capitalize'>verify phone number</p>
                        <p className='text-sm'>Note: Do not provide your OTP to anyone, we donot call or message your for same.</p>
                        <p className='text-violet-500 py-3 px-6 text-sm bg-violet-100  rounded-md'>OTP has been sended to {props.phone}</p>
                        <form className='space-y-4' onSubmit={form.handleSubmit}>
                            <Input {...otp} value={form.values.otp} onChange={form.handleChange}
                                error={form.touched.otp && form.errors.otp} onBlur={form.handleBlur}
                            />
                            <Button title='validate' type='submit' disabled={!(form.isValid && form.dirty)} />
                        </form>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}


const otp = {
    name: 'otp',
    id: 'otp',
    placeholder: '4 digit otp code',
    label: 'Otp Code',
    autoFocus: true
}