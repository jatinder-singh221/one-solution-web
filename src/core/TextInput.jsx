import React from 'react'

export default function TextInput(props) {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <label htmlFor={props.id} className='text-xl font-light'>{props.label || "Label"}</label>
      <textarea type={props.type || 'text'} name={props.name} id={props.id} disabled={props.disabled}
        placeholder={props.placeholder || 'placeholder'} value={props.value}
        onChange={props.onChange} onBlur={props.onBlur} autoFocus={props.autoFocus}
        className="min-h-[300px] w-full p-2 rounded-md focus:border-violet-600 focus:border bg-violet-100 dark:bg-violet-500/10
            placeholder:capitalize outline-none transition-all border border-transparent placeholder:text-sm
            disabled:cursor-not-allowed
            "
      />
      {props.error && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{props.error || 'Error'}</p>}
    </div>

  )
}
