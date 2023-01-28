import { useState, useEffect } from 'react'

export default function PhoneInput(props) {

    const [phone, setphone] = useState({
        code: '+91',
        value: props.value
    })

    const handleOnChange = (e) => {
        setphone(pre => ({ ...pre, value: e.target.value }))
        e.target.value = phone.code + e.target.value
        props.onChange(e)
    }
    

    return (
        <div className='flex flex-col space-y-4 w-full'>
            <label htmlFor={props.id} className='text-xl font-light'>{props.label || "Label"}</label>
            <div className='flex items-center space-x-2'>
                <select name="code" value={phone.code} onChange={(e) => setphone(pre => ({ ...pre, code: e.target.value }))} id="code" className='h-12 px-1 rounded-md border border-violet-600  bg-violet-100 dark:bg-violet-500/10'>
                    <option value="+91" className='bg-white dark:bg-black'>IN +91</option>
                    <option value="+1" className='bg-white dark:bg-black'>CAD +1</option>
                    <option value="+44" className='bg-white dark:bg-black'>UK +44</option>
                </select>
                <input type={props.type || 'text'} name={props.name} id={props.id} disabled={props.disabled}
                    placeholder={props.placeholder || 'placeholder'} value={phone.value} readOnly={props.readOnly}
                    onChange={handleOnChange} onBlur={props.onBlur} autoFocus={props.autoFocus}
                    className="h-12 w-full px-2 rounded-md focus:border-violet-600 focus:border bg-violet-100 dark:bg-violet-500/10
                placeholder:capitalize outline-none transition-all border border-transparent placeholder:text-sm
                disabled:cursor-not-allowed
                "
                />
            </div>
            {props.error && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{props.error || 'Error'}</p>}
        </div>
    )
}