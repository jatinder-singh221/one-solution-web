export default function Select(props) {
    return (
      <div className='flex flex-col space-y-4 w-full'>
        <label htmlFor={props.id} className='text-xl font-light'>{props.label || "Label"}</label>
        <select type={props.type || 'text'} name={props.name} id={props.id} disabled={props.disabled}
          placeholder={props.placeholder || 'placeholder'} value={props.value} required={props.required}
          onChange={props.onChange} onBlur={props.onBlur} autoFocus={props.autoFocus}
          className="h-12 w-full px-2 rounded-md focus:border-violet-600 focus:border bg-violet-100 dark:bg-violet-500/10
              placeholder:capitalize outline-none transition-all border border-transparent placeholder:text-sm
              disabled:cursor-not-allowed
              "
        >
          {props.list.map((data,index) => {
              return <option key={index} value={data.value}>{data.name}</option>
          })}
        </select>
        {props.error && <p className='transition-all text-red-500 py-1 px-2 rounded text-sm bg-red-100 dark:bg-red-500/10'>{props.error || 'Error'}</p>}
      </div>
  
    )
  }