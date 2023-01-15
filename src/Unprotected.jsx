import { useContext, useEffect } from 'react'

import { store } from './App'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function UnProtectedRoute({ children }) {

    const storeState = useContext(store) ?? false
    const navigate = useNavigate()

    let [search] = useSearchParams()

    useEffect(() => {
        const { isAuthenciated } = storeState.state
        let next = search.get('next') ?? false
        if (isAuthenciated) {
            storeState.Session()
            if (next)
                navigate(next)
            else
                navigate('/dashboard')
        }
    }, [storeState, navigate, search])

    return (
        <>{children}</>
    )
}