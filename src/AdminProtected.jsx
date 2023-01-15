import { useContext, useEffect } from 'react'

import { store } from './App'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ProtectedRoutes({children}) {

  const storeState = useContext(store) ?? false
  const navigate = useNavigate()
  const location = useLocation() ?? false

  useEffect(() => {
    const { isAuthenciated, user } = storeState.state
    if ((!isAuthenciated && user.is_staff) || user.is_service_provider || user.is_product_seller){
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