import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserName } from '../features/user/userSlice'

const EditUserForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const { firstName, lastName, userName } = useSelector((state) => state.user)
    const [nameInput, setNameInput] = useState(userName || '')

    const handleSave = async (e) => {
        e.preventDefault()
        await dispatch(updateUserName(nameInput))
        onClose()
    }

    return (
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
                <button type="button" className="edit-button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default EditUserForm