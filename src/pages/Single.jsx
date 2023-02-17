import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getPost } from '../services/posts'
import DOMPurify from 'dompurify'
import Loader from '../components/Loader'
import { getUser } from '../services/getUser'

const Single = () => {
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const postRes = await getPost(id)
        const authorRes = await getUser(postRes.data.userId)
        setAuthor(authorRes.data)
        setPost(postRes.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <section className='pt-[72px] min-h-screen'>
      {loading && <Loader />}
      {!post && (
        <p className='text-center font-bold p-4'>Post not found</p>
      )}
      {post && (
        <>
          {post.image && (
            <div className='h-52 sm:h-72 md:h-72 '>
              <img
                className='max-w-5xl mx-auto w-full h-full object-cover'
                src={post.image.url}
                alt='post-img'
              />
            </div>
          )}
          <div className='max-w-5xl md:w-10/12 mx-auto p-4 md:p-0'>
            <div className='flex justify-between mt-2'>
              <p className='text-sm text-gray-700'>
                Posted {moment(post.createdAt).fromNow()}
              </p>
              <div className='flex items-center'>
                <img
                  src={
                    author.avatar.url ||
                    '/src/assets/user_noimage.jpg'
                  }
                  alt='avatar'
                  className='w-10 h-10 object-cover rounded-full mr-4'
                />
                <p className='text-sm font-bold'>{author.username}</p>
              </div>
            </div>
            <h1 className='text-4xl font-bold my-6'>{post.title}</h1>
            <div
              className='post'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content)
              }}
            />
          </div>
        </>
      )}
    </section>
  )
}

export default Single
