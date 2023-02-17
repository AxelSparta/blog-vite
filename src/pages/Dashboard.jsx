import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangeAvatar from '../components/ChangeAvatar'
import ChangePasswordForm from '../components/ChangePasswordForm'
import ChangeUsernameForm from '../components/ChangeUsernameForm'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/authContext'
import { getPosts } from '../services/posts'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const handleGetPosts = () => {
    setLoading(true)
    getPosts({ userId: currentUser._id })
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    // if user is not logged in redirect home
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

  useEffect(() => {
    handleGetPosts()
  }, [])

  return (
    <section className='pt-[80px] px-4 min-h-screen'>
      {loading && <Loader format='z-10' />}
      {currentUser && (
        <div className='flex flex-col justify-around items-center max-w-5xl mx-auto md:flex-row'>
          <ChangeAvatar />
          <div>
            <ChangeUsernameForm />
            <ChangePasswordForm />
          </div>
        </div>
      )}
      {posts.length !== 0
        ? (
            posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                handleGetPosts={handleGetPosts}
              />
            ))
          )
        : (
          <p className='text-center font-bold'>
            No post has been created
          </p>
          )}
    </section>
  )
}

export default Dashboard
