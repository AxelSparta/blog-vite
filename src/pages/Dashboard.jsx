import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])
  return <div>Dashboard</div>
}

export default Dashboard
