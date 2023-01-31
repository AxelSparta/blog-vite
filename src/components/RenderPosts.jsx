import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../services/getPosts'

const RenderPosts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className='pt-20'>
      {posts.map(post => (
        <section
          className='mt-8 border-b-2 flex flex-col justify-center align-middle md:flex-row container mx-auto px-4 pb-4'
          key={post.id}
        >
          <div className='w-80 h-52 self-center'>
            <img
              className='w-full h-full object-cover'
              src={post.image.url}
              alt=''
            />
          </div>
          <div className='content flex flex-col items-center justify-between px-4'>
            <Link className='link' to={`/post/${post.id}`}>
              <h1 className='text-2xl font-bold text-center text-gray-900 hover:text-gray-700'>
                {post.title}
              </h1>
            </Link>
            <button className='mt-4 py-2 px-4 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition'>
              Ver artículo
            </button>
          </div>
        </section>
      ))}
    </div>
  )
}

export default RenderPosts
