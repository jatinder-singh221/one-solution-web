import { useEffect, useContext, useCallback } from 'react'
import { logoutUser } from '../api'
import { store } from '../App'
import { useNavigate } from 'react-router-dom'

export default function Logout() {

    const navigate = useNavigate()
    const stateStore = useContext(store) ?? false

    const handleLogout = useCallback( async () => {
        const api = await logoutUser()
        switch (api) {
            case 200:
                stateStore.setstate({user:{}, isAuthenciated: false,})
                navigate('/')
                break;
            default:
                navigate(`/${api.status}`)
                break;
        }
    },[navigate, stateStore])

    useEffect(() => { handleLogout() }, [handleLogout])
    
  return (
    <></>
  )
}