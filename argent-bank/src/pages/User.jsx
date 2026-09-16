import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserName } from '../features/user/userSlice'
import AccountItem from '../components/AccountItem'
import accounts from '../data/accounts'
import '../styles/User.scss'

const User = () => {
    const dispatch = useDispatch()
    const { firstName, lastName, userName } = useSelector((state) => state.user)
    const [isEditing, setIsEditing] = useState(false)
    const [nameInput, setNameInput] = useState('')

    const displayName = userName || (firstName ? `${firstName} ${lastName}` : '')

    const handleEditClick = () => {
        setNameInput(userName || '')
        setIsEditing(true)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        await dispatch(updateUserName(nameInput))
        setIsEditing(false)
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <form className="edit-form" onSubmit={handleSave}>
                        <h1>Edit user info</h1>
                        <div className="edit-form-group">
                            <label htmlFor="userName">User name:</label>
                            <input
                                type="text"
                                id="userName"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                            />
                        </div>
                        <div className="edit-form-group">
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" value={firstName || ''} disabled />
                        </div>
                        <div className="edit-form-group">
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" value={lastName || ''} disabled />
                        </div>
                        <div className="edit-form-actions">
                            <button type="submit" className="edit-button">Save</button>
                            <button type="button" className="edit-button" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h1>Welcome back<br />{displayName}!</h1>
                        <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
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
