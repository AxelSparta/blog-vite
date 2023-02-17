import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { changeUsername } from '../services/users'
import { validateUsername } from '../validations/user.validations'
import Loader from './Loader'
import Alert from './Alert'

const initialErrorState = { error: false, message: '' }

const ChangeUsernameForm = () => {
  const [error, setError] = useState(initialErrorState)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const { getCurrentUser } = useContext(AuthContext)

  const handleUsernameForm = async e => {
    e.preventDefault()
    // error reset
    setError(initialErrorState)
    // empty validation data
    if (
      !e.target.newUsername.value ||
      !e.target.password.value ||
      !e.target.repeatNewUsername.value
    ) {
      setError({ error: true, message: 'Some data is missing.' })
    }
    // validation data
    if (
      validateUsername(e.target.newUsername.value) &&
      e.target.newUsername.value === e.target.repeatNewUsername.value
    ) {
      try {
        setLoading(true)
        await changeUsername({
          username: e.target.newUsername.value,
          password: e.target.password.value
        })
        getCurrentUser()
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
        e.target.reset()
      } catch (error) {
        setError({ error: true, message: error.response.data })
      } finally {
        setLoading(false)
      }
    } else {
      setError({
        error: true,
        message: 'New username is not valid.'
      })
    }
  }
  const deleteAlert = () => {
    setAlert(false)
  }
  return (
    <>
      {alert && (
        <Alert
          message='Username changed successfully!'
          deleteAlert={deleteAlert}
        />
      )}
      <form className='relative p-5 rounded' onSubmit={handleUsernameForm}>
        {loading && <Loader format='rounded' />}
        <h3 className='text-center font-bold text-2xl'>Change username</h3>
        <input
          className='input'
          type='text'
          name='newUsername'
          placeholder='New username'
        />
        <input
          className='input'
          type='text'
          name='repeatNewUsername'
          placeholder='Repeat new username'
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
        <input type='submit' className='btn' value='Change username' />
      </form>
    </>
  )
}

export default ChangeUsernameForm
