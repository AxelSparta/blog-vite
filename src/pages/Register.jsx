import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { AuthContext } from '../context/authContext'

const initialForm = {
  username: '',
  email: '',
  password: ''
}

const Register = () => {
  const { register, currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [err, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.username || !form.password) {
      setError('Some data is missing.')
      return
    }
    try {
      setLoading(true)
      await register(form)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(err.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex bg-gray-200'>
      <form className='relative mx-auto shadow-lg w-96 self-center bg-white rounded-lg'>
        {loading && <Loader format='rounded-lg' />}
        <h1 className='font-bold text-3xl text-center my-4'>Register</h1>
        <input
          required
          type='email'
          placeholder='email'
          name='email'
          onChange={handleChange}
          className='input'
        />

        <input
          required
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
          className='input'
        />

        <input
          required
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
          className='input'
        />
        <button className='btn' onClick={handleSubmit}>
          Register
        </button>
        {err && <p className='text-center text-red-600 text-sm'>{err}</p>}

        <p className='text-center my-2'>
          Do you already have an account?{' '}
          <Link
            className='font-bold text-gray-900 hover:text-gray-800'
            to='/login'
          >
            Login
          </Link>
        </p>
        <Link to='/' className='block text-center mb-2 text-blue-500'>
          Return to home{' '}
        </Link>
      </form>
    </div>
  )
}

export default Register
