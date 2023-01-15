import errorimg from '../assests/error.svg'
import Logo from './Logo';
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    console.error(error);
  
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center space-y-8'>
      <Logo />
      <img src={errorimg} alt="errorImage" loading='lazy' className='aspect-video ' />
      <h1 className='text-4xl font-bold'>{error.status}</h1>
      <i>{error.statusText || error.message}</i>
      {/* <Anchor name='Go to home' to='/' /> */}
    </div>
  )
}