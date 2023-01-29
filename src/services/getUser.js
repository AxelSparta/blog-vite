import axios from 'axios'
import { serverUrl } from '../config'

export const getUser = async id => {
  return await axios.get(`${serverUrl}/api/users/userInfo/${id}`)
}
