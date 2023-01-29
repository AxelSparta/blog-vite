import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Confirm from '../components/Confirm'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'
import { getPosts } from '../services/posts'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getPosts({ category: cat })
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [cat])

  return (
    <div className='pt-[72px] px-4 min-h-screen relative'>
      {loading && <Loader />}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
      <Confirm />
    </div>
  )
}

export default Home
