import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../features/user/userSlice'
import AccountItem from '../components/AccountItem'
import accounts from '../data/accounts'
import '../styles/User.scss'

const User = () => {
    const dispatch = useDispatch()
    const { firstName, lastName } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account) => (
                <AccountItem
                    key={account.id}
                    title={account.title}
                    amount={account.amount}
                    description={account.description}
                />
            ))}
        </main>
    )
}

export default User
