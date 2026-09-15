import '../styles/Header.scss'
import logo from '../assets/images/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.token)
    const firstName = useSelector((state) => state.user.firstName)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className="main-nav">
            <Link to='/' className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token ? (
                    <>
                        <Link to='/user' className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {' '}{firstName}
                        </Link>
                        <Link to='/' className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            {' '}Sign Out
                        </Link>
                    </>
                ) : (
                    <Link to='/sign-in' className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {' '}Sign In
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header