import { createContext, useState, useCallback, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routers'
import { SessionStatus } from './api/Authenciation'
import Loading from './components/Loading'
import Messages from './core/Messages'

const store = createContext()

export default function App() {

  const [state, setstate] = useState(
    {
      user: {},
      isAuthenciated: false,
    }
  )
  const [message, setmessage] = useState(
    {
      hidden: true,
      message: null
    }
  )
  const [initialLoading, setinitialLoading] = useState(true)


  const Session = useCallback(async () => {
    const api = await SessionStatus()
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setstate(pre => ({ ...pre, user: apiRes, isAuthenciated: true }))
        break
      default:
        break;
    }
    setinitialLoading(false)
  }, [])

  useEffect(() => { Session() }, [Session])

  const stateValues = {
    state, setstate, message, setmessage, Session
  }

  return (
    <store.Provider value={stateValues}>
      {!message.hidden && <Messages message={message.message} />}
      {initialLoading ? <Loading /> : <RouterProvider router={routes} />}
    </store.Provider>
  )
}

export { store }