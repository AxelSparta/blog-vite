import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { editAvatar } from '../services/users'
import { imageValidation } from '../validations/image.validation'
import Alert from './Alert'
import Loader from './Loader'

const initialErrorState = { error: false, message: '' }

const ChangeAvatar = () => {
  const [error, setError] = useState(initialErrorState)
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const { currentUser, getCurrentUser } = useContext(AuthContext)
  const handleEditAvatar = async e => {
    setError(initialErrorState)
    const imageValidationResult = imageValidation(e.target.files[0], 2)
    if (imageValidationResult.error) {
      setError({ error: true, message: imageValidationResult.message })
    } else {
      // all valid
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append('avatar', e.target.files[0])
        await editAvatar(formData)
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 3000)
        getCurrentUser()
      } catch (error) {
        console.error(error)
        setError({ error: true, message: error.response.data })
      } finally {
        setLoading(false)
      }
    }
  }
  const deleteAlert = () => {
    setShowAlert(false)
  }
  return (
    <div className='flex flex-col items-center relative p-5 rounded'>
      {showAlert && (
        <Alert
          message='Avatar changed successfully!'
          deleteAlert={deleteAlert}
        />
      )}
      {loading && <Loader format='rounded' />}
      <div className='flex items-center justify-center'>
        <img
          className='w-36 h-36 rounded-full object-cover object-left-top'
          src={currentUser.avatar?.url || '/src/assets/user_noimage.jpg'}
          alt='user avatar'
        />
        <h3 className='font-bold text-xl px-4'>{currentUser.username}</h3>
      </div>
      {error.error && (
        <p className='error-message text-center'>{error.message}</p>
      )}
      <input
        type='file'
        name='avatar'
        id='avatar'
        className='hidden'
        onChange={handleEditAvatar}
      />
      <label
        htmlFor='avatar'
        className='border py-2 px-4 rounded-lg border-gray-800 text-gray-800 hover:text-white hover:bg-gray-800 my-4'
      >
        Cambiar avatar
      </label>
    </div>
  )
}

export default ChangeAvatar
