import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

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
    </section>
  )
}

export default Dashboard
