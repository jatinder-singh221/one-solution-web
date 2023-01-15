import * as yup from 'yup'

const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
const addressRegExp = /[a-zA-Z0-9,#.-]+/

const loginValidtion = yup.object({
    phone: yup.string().required('Phone nuber is required').matches(phoneRegExp, 'Does not seem a Phone number'),
    password:yup.string().required('password is required').matches(passwordRegExp, 'It seems a week password')
})

const otpValidation = yup.object({
    otp: yup.number().required('OTP is required').min(6)
})

const updatePasswordValidation = yup.object({
    password:yup.string().required('password is required').matches(passwordRegExp, 'It seems a week password'),
    confirmPassword:yup.string().required('confirm password is required').oneOf([yup.ref('password'), null], 'Password mismatch')
})

const bookValidation = yup.object({
    phone:yup.string().required('Phone number is required').matches(phoneRegExp, 'Does not seem a Phone number'),
    alter_phone:yup.string().required('Alternative Phone number is required').matches(phoneRegExp, 'Does not seem a Phone number'),
    address:yup.string().required('Address is required').matches(addressRegExp, 'Not an address'),
})

const ServiceDetailValidation = yup.object({
    name: yup.string().required('Name is required'),
    services: yup.array().min(1, 'Select one or more service you offer'),
    catarogies: yup.array().min(1, 'Select one or more catarogies you offer'),
    address: yup.string().required('address is required'),
    phone_number: yup.string().required('Phone number is required').matches(phoneRegExp, 'Does not seem a Phone number'),
    pincode:yup.string().required('Pincode is required'),
})


export { loginValidtion, otpValidation, updatePasswordValidation, bookValidation, ServiceDetailValidation }