import axios from 'axios'
import { serverUrl } from '../config'
export const getPosts = async ({ category, userId }) => {
  // by category or by userId
  let url = `${serverUrl}/api/posts`
  if (category) {
    url = `${url}/cat${category}`
  }
  if (userId) {
    url = `${url}/${userId}`
  }

  return await axios.get(url)
}

export const getPost = async id => {
  return axios.get(`${serverUrl}/api/post/${id}`)
}

export const createPost = async formData => {
  return await axios.post(`${serverUrl}/api/posts`, formData, {
    withCredentials: true
  })
}
