import axios from 'axios'
import { serverUrl } from '../config'

export const getUser = async id => {
  return await axios.get(`${serverUrl}/api/users/userInfo/${id}`)
}

export const changeUsername = async data => {
  return await axios.put(`${serverUrl}/api/users/username`, data, {
    withCredentials: true
  })
}

export const changePassword = async data => {
  return await axios.put(`${serverUrl}/api/users/password`, data, {
    withCredentials: true
  })
}

export const editAvatar = async data => {
  return await axios.put(`${serverUrl}/api/users/avatar`, data, {
    withCredentials: true
  })
}
