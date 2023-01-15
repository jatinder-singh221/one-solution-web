import logo from '../logo.svg'

export default function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div className='animate-bounce flex items-center space-x-2 outline-none font-medium' title='Go To Home'>
        <img src={logo} alt="logo" className='h-9' />
        <span className='text-2xl'>One Solution</span>
      </div>
    </div>
  )
}