import AccountItem from '../components/AccountItem'
import accounts from '../data/accounts'
import '../styles/User.scss'

const User = () => {
    const firstName = 'Tony'
    const lastName = 'Jarvis'

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
