import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Loader from '../components/Loader'

const Login = () => {
  const { login, currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [currentUser, navigate])

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [err, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // validations
    if (!form.username || !form.password) {
      setError('The username and the password are required')
      return
    }
    try {
      setLoading(true)
      await login(form)
      // navigate('/')
    } catch (err) {
      setError(err.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex bg-gray-200'>
      <form className='relative mx-auto shadow-lg w-96 self-center bg-white rounded-lg'>
        {loading && <Loader format='rounded-lg' />}
        <h1 className='font-bold text-3xl text-center my-4'>Login</h1>
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
          Login
        </button>
        {err && <p className='text-center text-red-600 text-sm'>{err}</p>}
        <p className='text-center my-2'>
          Don't you have an account?{' '}
          <Link
            className='font-bold text-gray-900 hover:text-gray-800'
            to='/register'
          >
            Register
          </Link>
        </p>
        <Link to='/' className='block text-center mb-2 text-blue-500'>
          Return to home{' '}
        </Link>
      </form>
    </div>
  )
}

export default Login
