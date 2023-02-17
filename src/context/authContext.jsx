import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { serverUrl } from '../config'

export const AuthContext = createContext()

export const AuthContexProvider = ({ children }) => {
  const url = serverUrl

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem('user')) || null
  )
  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  const getUser = async () => {
    return await axios.get(`${url}/api/users/dashboard`, {
      withCredentials: true
    })
  }

  const login = async data => {
    await axios.post(`${url}/api/signin`, data, {
      withCredentials: true
    })
    const res = await getUser()
    setCurrentUser(res.data)
  }

  const register = async data => {
    await axios.post(`${url}/api/signup`, data, {
      withCredentials: true
    })
    const res = await getUser()
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.post(`${url}/api/logout`, null, {
      withCredentials: true
    })
    setCurrentUser(null)
  }

  const getCurrentUser = () => {
    getUser()
      .then(res => {
        setCurrentUser(res.data)
      })
      .catch(err => console.error(err))
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, getUser, getCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
