import { useState } from 'react'
import { changePassword } from '../services/users'
import { validatePassword } from '../validations/user.validations'
import Alert from './Alert'
import Loader from './Loader'

const initialErrorState = { error: false, message: '' }

const ChangePasswordForm = () => {
  const [error, setError] = useState(initialErrorState)
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmitForm = async e => {
    e.preventDefault()
    setError(initialErrorState)
    const newPassword = e.target.newPassword.value
    const newPasswordRepeated = e.target.repeatNewPassword.value
    const password = e.target.password.value

    // validations
    if (!newPassword || !newPasswordRepeated || !password) {
      setError({ error: true, message: 'Some data is missing.' })
      return
    }
    if (validatePassword(newPassword) && newPassword === newPasswordRepeated) {
      try {
        setLoading(true)
        await changePassword({ password, newPassword })
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
      } catch (error) {
        setError({ error: true, message: error.response.data })
      } finally {
        e.target.reset()
        setLoading(false)
      }
    } else {
      setError({ error: true, message: 'New password is not valid.' })
    }
  }

  const deleteAlert = () => {
    setShowAlert(false)
  }

  return (
    <>
      {showAlert && (
        <Alert
          message='Password changed successfully!'
          deleteAlert={deleteAlert}
        />
      )}
      <form className='relative p-5 rounded-sm' onSubmit={handleSubmitForm}>
        {loading && <Loader format='rounded' />}
        <h3 className='text-center font-bold text-2xl'>Change password</h3>
        <input
          className='input'
          type='password'
          name='newPassword'
          placeholder='New password'
        />
        <input
          className='input'
          type='password'
          name='repeatNewPassword'
          placeholder='Repeat'
        />
        <input
          className='input'
          type='password'
          name='password'
          placeholder='Password'
        />
        {error.error && (
          <p className='error-message text-center'>{error.message}</p>
        )}
        <input type='submit' className='btn' value='Change password' />
      </form>
    </>
  )
}

export default ChangePasswordForm
