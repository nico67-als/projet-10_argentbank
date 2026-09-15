import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import '../styles/SignInForm.scss'

const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, error } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(login({ email, password }))
        if (login.fulfilled.match(result)) {
            navigate('/user')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            {status === 'failed' && <p className="error-message">{error}</p>}
            <button className="sign-in-button" disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    )
}

export default SignInForm
