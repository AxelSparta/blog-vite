import moment from 'moment'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { BiTrashAlt, BiEdit } from 'react-icons/bi'
import Dialog from './Dialog'
import { deletePost } from '../services/posts'
import Loader from './Loader'

const PostCard = ({ post, handleGetPosts }) => {
  const [currentUserPostAuthor, setCurrentUserPostAuthor] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const { _id, title, createdAt, image, category, userId } = post
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (userId === currentUser?._id) setCurrentUserPostAuthor(true)
  }, [currentUser?._id, userId])

  const showDialog = e => {
    setDialog(true)
  }

  const handleDelete = value => {
    if (value) {
      // DELETING POST
      setLoading(true)
      setDialog(false)
      deletePost(_id)
        .then(res => {
          handleGetPosts()
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    } else {
      setDialog(false)
    }
  }

  return (
    <section className='mx-auto border-b border-gray-400 my-4 flex flex-col items-center justify-center md:flex-row md:justify-between max-w-4xl py-4 relative'>
      {loading && <Loader />}
      {dialog && <Dialog handleDelete={handleDelete} />}
      <img
        className='md:w-72 w-72 h-44 object-cover'
        src={
          image?.url ||
          '/src/assets/blog_noimage.jpg'
        }
        alt='post img'
      />
      <div className='w-full md:ml-6 md:w-3/5 flex flex-col justify-between content-between'>
        <Link to={`/post/${_id}`}>
          <h2 className='text-gray-700 hover:text-gray-800 font-bold text-xl'>
            {title}
          </h2>
        </Link>
        <Link
          className='text-blue-500 my-2'
          to={`/?cat=${category.toLowerCase()}`}
        >
          {_.capitalize(category)}
        </Link>
        <div className='flex justify-between'>
          <p className='text-sm text-gray-500'>{moment(createdAt).fromNow()}</p>
          {currentUserPostAuthor && (
            <div className='flex'>
              <Link
                className='text-3xl ml-2 text-blue-500 hover:text-blue-600 cursor-default'
                to={`/edit/${_id}`}
              >
                <BiEdit />
              </Link>
              <button
                className='text-3xl ml-2 text-red-500 hover:text-red-600 cursor-default'
                onClick={showDialog}
              >
                <BiTrashAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PostCard
