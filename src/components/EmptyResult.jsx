import Empty from '../assests/empty.svg'

export default function EmptyResult(props) {
  return (
    <div className='col-span-full flex items-center justify-center flex-col space-y-8'>
        <img src={Empty} alt="empty" className='aspect-video h-60' />
        <p className='text-xl font-bold text-violet-500 animate-pulse capitalize'>{props.name}</p>
    </div>
  )
}