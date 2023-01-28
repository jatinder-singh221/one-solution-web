import { useContext } from 'react'
import { store } from '../App'
import EmptyResult from '../components/EmptyResult'

export default function Notifications() {
    const storeState = useContext(store) ?? false
    const { user } = storeState.state
    document.title = 'Notifications'

  return (
    <div className='space-y-6'>
        <h1 className='text-2xl '>Notifications</h1>
        <ul>
            {user.notifications.length >0 ?<>
            {user.notifications.map((data, index) => {
                return <li key={index} className='p-4 border-b border-violet-600'>
                    <p className='text-xl font-medium'>{data.subject}</p>
                    <p>{data.body}</p>
               </li>
            })}
            </>: <EmptyResult name='no notifications yet' />}
        </ul>
    </div>
  )
}
