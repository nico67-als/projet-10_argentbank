import { useState } from 'react'
import { useSelector } from 'react-redux'
import EditUserForm from '../components/EditUserForm'
import AccountItem from '../components/AccountItem'
import accounts from '../data/accounts'
import '../styles/User.scss'

const User = () => {
    const { firstName, lastName, userName } = useSelector((state) => state.user)
    const [isEditing, setIsEditing] = useState(false)

    const displayName = userName || (firstName ? `${firstName} ${lastName}` : '')

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <EditUserForm onClose={() => setIsEditing(false)} />
                ) : (
                    <>
                        <h1>Welcome back<br />{displayName}!</h1>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit Name
                        </button>
                    </>
                )}

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
