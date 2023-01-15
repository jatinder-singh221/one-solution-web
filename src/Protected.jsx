import { useContext, useEffect } from 'react'

import { store } from './App'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ProtectedRoutes({children}) {

  const storeState = useContext(store) ?? false
  const navigate = useNavigate()
  const location = useLocation() ?? false

  useEffect(() => {
    const { isAuthenciated } = storeState.state
    if (!isAuthenciated){
      if (location){
        navigate(`/login?next=${location.pathname}${location.search}`)
      }
      else 
        navigate('/login')
    }
  }, [storeState, navigate, location])
  
  return (
    <>{children}</>
  )
}