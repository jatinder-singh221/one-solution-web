import { useNavigate } from 'react-router-dom'
import Svg from '../assests/landing.svg'
import { ArrowDownLeftIcon, CurrencyRupeeIcon, 
  WrenchIcon, ClockIcon 
} from '@heroicons/react/24/outline'
import SearchInput from '../core/SearchInput'

import Unprotected from '../Unprotected'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'

export default function Landing() {

  document.title = 'One Solution'
  const navigate = useNavigate()

  return (
    <Unprotected>
      <Appbar />
      <main className="pt-20 px-4 w-full min-h-[calc(100vh-3.5rem)] grid grid-cols-2 gap-4 mt-3">
        <section className="px-4 col-span-full lg:col-span-1 flex flex-col space-y-6  items-center justify-center">
          <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 
          lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight text-center md:text-start"
          >
            Quality services and products at your door
          </h1>
          <p className="text-xl leading-normal text-gray-500 lg:text-xl 
            xl:text-xl text-center md:text-start"
          >
            Concerned that your geyser has stopped operating or that your kitchen sink is clogged.
            Don't worry; we'll provide services from professionals
          </p>
          <div className="flex flex-col lg:flex-row  space-y-4 lg:space-y-0 lg:space-x-4 w-full">
            <button className='px-8 py-3 text-lg font-medium text-center text-white
              bg-violet-600 rounded-md active:scale-90 transition-all shadow-xl shadow-violet-300'
              onClick={() => navigate('/login')}
            >
              Book a Professional
            </button>
            <button className='px-8 py-3 text-lg font-medium text-center border 
              border-black rounded-md active:scale-90 transition-all shadow-xl shadow-gray-100'
              onClick={() => navigate('/services')}
            >
              Our services
            </button>
          </div>
          <a href="#about" className="hidden lg:flex self-start text-sm items-center space-x-4 group">
            <div className="border border-black p-2 rounded-sm group-active:scale-90">
              <ArrowDownLeftIcon className="w-5 h-5 " />
            </div>
            <p className="group-hover:underline">Explore More</p>
          </a>
        </section>
        <section className="relative col-span-full lg:col-span-1 flex items-center justify-center">
          <img src={Svg} alt="door-step-group-svg" loading='lazy' />
          <div className="absolute w-[90%] lg:w-[70%] top-8 shadow-lg shadow-violet-300 rounded-md overflow-hidden  transition-all bg-white">
            <SearchInput />
          </div>
        </section>
        <section className='col-span-full'>
          <div className="container mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
            <div className="text-sm font-bold tracking-wider text-violet-600 uppercase">
              Benefits
            </div>
            <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight 
              text-gray-800 lg:leading-tight lg:text-4xl"
            >
              Why should you use One Solution
            </h2>
            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl 
              xl:text-xl"
            >
              Concerned that your geyser has stopped operating or that your kitchen sink is clogged.
              Don't worry; we'll provide services from professionals
            </p>
          </div>
        </section>
        <section className="col-span-full grid grid-cols-3 gap-4">
          <div className="space-y-4 col-span-full lg:col-span-1 flex flex-col items-center justify-center">
            <CurrencyRupeeIcon className="w-20 h-20 p-2 rounded-md text-violet-500" />
            <p className="text-2xl font-medium">Affodable Price</p>
            <p className="text-center w-[80%] text-gray-500">Have your work done at your doorstep without calculating pricing because it is affordable</p>
          </div>
          <div className="space-y-4 col-span-full lg:col-span-1 flex flex-col items-center justify-center ">
            <WrenchIcon className="w-20 h-20  p-2 rounded-md text-violet-500" />
            <p className="text-2xl font-medium">Professional Work</p>
            <p className="text-center w-[80%] text-gray-500 ">You don't need to worry because a skilled individual will handle the task</p>
          </div>
          <div className="space-y-4 col-span-full lg:col-span-1 flex flex-col items-center justify-center ">
            <ClockIcon className="w-20 h-20 p-2 rounded-md text-violet-500" />
            <p className="text-2xl font-medium">Punctual Work</p>
            <p className="text-center w-[80%] text-gray-500 ">There is no need to be concerned about whether or not the employee will show up for the job</p>
          </div>
        </section>

        <section className='col-span-full bg-violet-500 rounded  p-8'>
          <div className="container mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
            <div className="text-sm font-bold tracking-wider text-black uppercase">
              services
            </div>
            <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight 
              text-white lg:leading-tight lg:text-4xl"
            >
              One Solution Services
            </h2>
            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-100 lg:text-xl 
              xl:text-xl"
            >
              One Solution Services offers a wide range of services that can be done at the comfort of your own home. 
            </p>
            <button className='px-8 py-3 text-lg font-medium text-center border 
              border-black rounded-md active:scale-90 transition-all'
              onClick={() => navigate('/services')}
            >
              Our services
            </button>
          </div>
        </section>

        <section className='col-span-full rounded py-8'>
          <div className="container mx-auto xl:px-0 flex w-full flex-col mt-4 items-center justify-center text-center">
            <div className="text-sm font-bold tracking-wider text-violet-600 uppercase">
              products
            </div>
            <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight 
              text-black lg:leading-tight lg:text-4xl"
            >
              One Solution Products
            </h2>
            <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl 
              xl:text-xl"
            >
              Our goal is to make your life easier by providing quality  products that can be delivered to your doorstepd equipped to handle any task.
            </p>
            <button className='px-8 py-3 text-lg font-medium text-center text-white
              bg-violet-600 rounded-md active:scale-90 transition-all shadow-xl shadow-violet-300'
              onClick={() => navigate('/products')}
            >
              Our Products
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </Unprotected>
  )
}
