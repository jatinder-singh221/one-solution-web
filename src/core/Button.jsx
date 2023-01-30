export default function Button(props) {
    return (
      <button type={props.type || 'button'} className='w-full lg:w-auto px-6 py-2 text-white 
      active:scale-95 text-lg lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-violet-300
      bg-violet-600 rounded-md transition-all capitalize' onClick={props.onClick || null} title={props.title}
      disabled={props.disabled}
      >
        {props.title || 'no title'} 
      </button>
    )
  }
