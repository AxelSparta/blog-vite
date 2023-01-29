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
    <section className='pt-[72px]'>
      {loading && <Loader />}
      {post && (
        <>
          <div className='h-52 md:h-72 '>
            {post.image && (
              <img
                className='w-full h-full object-cover'
                src={post.image.url}
                alt='post-img'
              />
            )}
          </div>
          <div className='md:w-10/12 mx-auto p-4'>
            <div className='flex justify-between mt-2'>
              <p className='text-sm text-gray-700'>
                Posted {moment(post.createdAt).fromNow()}
              </p>
              <div className='flex items-center'>
                <img
                  src={
                    author.avatar.url ||
                    'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg'
                  }
                  alt='avatar'
                  className='w-10 rounded-full mr-4'
                />
                <p className='text-sm font-bold'>{author.username}</p>
              </div>
            </div>
            <h1 className='text-3xl font-bold my-6'>{post.title}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content)
              }}
            ></div>
          </div>
        </>
      )}
    </section>
  )
}

export default Single
