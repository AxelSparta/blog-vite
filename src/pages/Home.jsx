import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import PostCard from '../components/PostCard'
import { getPosts } from '../services/posts'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const cat = useLocation().search

  const handleGetPosts = async () => {
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
  useEffect(() => {
    handleGetPosts()
  }, [cat])

  return (
    <div className='pt-[72px] px-4 min-h-screen relative'>
      {loading && <Loader />}
      {posts.length === 0 ? (
        <p className='text-center font-bold text-lg m-6'>There aren't any post</p>
      ) : (
        posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            handleGetPosts={handleGetPosts}
          />
        ))
      )}
    </div>
  )
}

export default Home
