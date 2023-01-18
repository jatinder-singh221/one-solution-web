import { useContext } from 'react'
import { store } from '../App'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import { as } from './RegisterProfessional'
import Select from '../core/SelectInput'
import { useNavigate } from 'react-router-dom'

export default function Switch() {
  const storeState = useContext(store) ?? false
  const { user } = storeState.state
  const navigate = useNavigate()

  const handleToProfessional = (e) => {
    const { value } = e.target
   navigate(`/register-${value}`)
  }


  return (
    <>
      <Appbar />
      <main className="mt-20 min-h-screen">
        {user.is_user ? <form className='px-4 w-full lg:w-[60%] m-auto space-y-6'>
          <legend className='text-2xl font-bold'>Switch To Professional</legend>
          <Select {...as} required={true} onChange={handleToProfessional}/>
          <p>Note you can change back and forth any time</p>
        </form> : ''}
      </main>
      <Footer />
    </>
  )
}
