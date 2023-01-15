
export default function Icon(props) {
    return (
      <props.icon 
      onClick={props.onClick}
      className='w-10 h-10 p-1 rounded-full transition-all active:scale-90 active:border border-black 
      text-violet-600 drop-shadow-xl '/>
    )
  }