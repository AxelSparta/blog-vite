import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/authContext'
import { getPosts } from '../services/posts'
import { validateUsername } from '../validations/user.validations'

const initialErrorState = {
  username: {
    error: true,
    message: 'This is an error message.'
  },
  password: {
    error: true,
    message: 'This is an error message.'
  },
  avatar: {
    error: true,
    message: 'This is an error message.'
  }
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialErrorState)
  const { currentUser } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
<<<<<<< HEAD
  const handleGetPosts = () => {
    setLoading(true)
    getPosts({ userId: currentUser._id })
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false)
      })
  }
=======
>>>>>>> a111dadfc4d39e2a019230e1591ce2aac6b3893c

  useEffect(() => {
    // if user is not logged in redirect home
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

<<<<<<< HEAD
  useEffect(() => {
    handleGetPosts()
  }, [])

  const handleUsernameForm = e => {
    e.preventDefault()
    // validar username y que sean iguales
    if (!e.target.newUsername.value) {
      setError(prev => ({
        ...prev,
        username: { error: true, message: 'New Username is empty.' }
      }))
    }
    // if (validateUsername(e.target.newUsername.value)) {
    // }
    console.log(e.target.newUsername.value)
    console.log(e.target)
  }
  return (
    <section className='pt-[80px] px-4'>
      {loading && <Loader />}
      {currentUser && (
        <div className='flex flex-col justify-around items-center max-w-5xl mx-auto md:flex-row'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center'>
              <img
                className='w-36 rounded-full'
                src={currentUser.avatar?.url || '/src/assets/user_noimage.jpg'}
                alt='user avatar'
              />
              <h3 className='font-bold text-xl px-4'>{currentUser.username}</h3>
            </div>
            {error.avatar.error && <p className='error-message text-center'>{error.avatar.message}</p>}
            <input type='file' name='avatar' id='avatar' className='hidden' />
            <label
              htmlFor='avatar'
              className='border py-2 px-4 rounded-lg border-gray-800 text-gray-800 hover:text-white hover:bg-gray-800 my-4'
            >
              Cambiar avatar
            </label>
          </div>
          <div className=''>
            <form onSubmit={handleUsernameForm}>
              <h3 className='text-center font-bold text-2xl'>
                Change username
              </h3>
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
              {error.username.error && <p className='error-message text-center'>{error.username.message}</p>}
              <input type='submit' className='btn' value='Change username' />
            </form>
            <form>
              <h3 className='text-center font-bold text-2xl'>
                Change password
              </h3>
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
              {error.password.error && <p className='error-message text-center'>{error.password.message}</p>}
              <input type='submit' className='btn' value='Change password' />
            </form>
          </div>
        </div>
      )}
      {posts.length !== 0 ? (
        posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            handleGetPosts={handleGetPosts}
          />
        ))
      ) : (
        <p className='text-lg text-center font-bold'>
          There aren't any post created
        </p>
      )}
=======
  return (
    <section className='pt-[72px]'>
      <h2>{currentUser.username}</h2>
      <img
        src='{currentUser.avatar.publicId}'
        alt={`${currentUser.username} avatar`}
      />
      <form>
        <input type='password' placeholder='Password' />
        <input type='password' placeholder='New password' />
        <input type='password' placeholder='Repeat new password' />
      </form>
>>>>>>> a111dadfc4d39e2a019230e1591ce2aac6b3893c
    </section>
  )
}

export default Dashboard
