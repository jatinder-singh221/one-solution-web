import Svg from '../assests/logo.svg'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to='/' className='flex items-center space-x-2 outline-none font-medium
    ' title='Go To Home'>
      <img src={Svg} alt="logo" className='h-9' />
      <span className='text-2xl'>One Solution</span>
    </Link>
  )
}
