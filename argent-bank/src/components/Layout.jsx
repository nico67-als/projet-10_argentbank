import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getUserProfile } from '../features/user/userSlice'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)

    useEffect(() => {
        if(token) {
            dispatch(getUserProfile())
        }
    }, [token, dispatch])
    
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout